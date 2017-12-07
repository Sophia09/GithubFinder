
#import "RNSqLiteManager.h"
#import <sqlite3.h>

@interface RNSqLiteManager() {
    sqlite3 *database;
}

- (NSString *)dataFilePath;

@end

@implementation RNSqLiteManager

RCT_EXPORT_MODULE()

const NSString *kDatabaseName = @"Citizen.db";

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

- (NSString *)dataFilePath {
    NSArray *docPaths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *docDir = docPaths[0];
    
    return [docDir stringByAppendingPathComponent:kDatabaseName];
}

RCT_EXPORT_METHOD(initDatabase:(RCTResponseSenderBlock)callback) {
    
    NSString *dbPath = [self dataFilePath];
    if (![[NSFileManager defaultManager] fileExistsAtPath:dbPath]) {
        [self copyDBToDocumentDir:callback];
    }
    
    if (sqlite3_open([[self dataFilePath] UTF8String], &database) != SQLITE_OK) {
        sqlite3_close(database);
        NSAssert(0, @"Open Database failed.");
    }
    
    NSString *queryPerson = @"select * from Person";
    sqlite3_stmt *statement;
    if (sqlite3_prepare_v2(database, [queryPerson UTF8String], -1, &statement, nil) == SQLITE_OK) {
        NSMutableArray *result = [NSMutableArray array];
        
        while (sqlite3_step(statement) == SQLITE_ROW) {
            char *personID = (char *)sqlite3_column_text(statement, 0);
            char *name = (char *)sqlite3_column_text(statement, 1);
            char *address = (char *)sqlite3_column_text(statement, 2);
            
            [result addObject:@{
                                @"id" : [[NSString alloc] initWithUTF8String:personID],
                                @"name" : [[NSString alloc] initWithUTF8String:name],
                                @"address" : [[NSString alloc] initWithUTF8String:address],
                                }];
        }
        callback(@[result]);
        sqlite3_finalize(statement);
    }
    sqlite3_close(database);
}


RCT_EXPORT_METHOD(searchByName:(NSString *)name callback:(RCTResponseSenderBlock)callback) {
    if (![[NSFileManager defaultManager] fileExistsAtPath:[self dataFilePath]]) {
        [self copyDBToDocumentDir:callback];
    }
    
    if (sqlite3_open([[self dataFilePath] UTF8String], &database) != SQLITE_OK) {
        sqlite3_close(database);
        NSAssert(0, @"open database failed.");
    }
    NSString *searchByName = [NSString stringWithFormat:@"select name, address from person where name like '%%%@%%'", name];
    sqlite3_stmt *statement;
    if (sqlite3_prepare_v2(database, [searchByName UTF8String], -1, &statement, nil) == SQLITE_OK) {
        NSMutableArray *result = [NSMutableArray array];
        while (sqlite3_step(statement) == SQLITE_ROW) {
            char *name = (char *)sqlite3_column_text(statement, 0);
            char *address = (char *)sqlite3_column_text(statement, 1);
            
            [result addObject:@{
                                @"name" : [[NSString alloc] initWithUTF8String:name],
                                @"address" : [[NSString alloc] initWithUTF8String:address],
                                }];
        }
        sqlite3_finalize(statement);
        callback(@[result]);
    }
    sqlite3_close(database);
}

RCT_EXPORT_METHOD(findFruitWithId:(nonnull NSNumber *)fruitId callback:(RCTResponseSenderBlock)callback) {
    if (![[NSFileManager defaultManager] fileExistsAtPath:[self dataFilePath]]) {
        [self copyDBToDocumentDir:callback];
    }
    
    if (sqlite3_open([[self dataFilePath] UTF8String], &database) != SQLITE_OK) {
        sqlite3_close(database);
        NSAssert(0, @"open database failed.");
    }
    NSString *findFruitById = [NSString stringWithFormat:@"select name from FruitInChina where id=%@", fruitId];
    sqlite3_stmt *statement;
    if (sqlite3_prepare_v2(database, [findFruitById UTF8String], -1, &statement, nil) == SQLITE_OK) {
        NSMutableArray *result = [NSMutableArray array];
        while (sqlite3_step(statement) == SQLITE_ROW) {
            char *fruitName = (char *)sqlite3_column_text(statement, 0);
            [result addObject:[[NSString alloc] initWithUTF8String:fruitName]];
        }
        callback(@[result]);
        sqlite3_finalize(statement);
    }
    sqlite3_close(database);
}

RCT_EXPORT_METHOD(addFruitByName:(NSString *)name result:(RCTResponseSenderBlock)message) {
    
    if (![[NSFileManager defaultManager] fileExistsAtPath:[self dataFilePath]]) {
        [self copyDBToDocumentDir:message];
    }
    if (sqlite3_open([[self dataFilePath] UTF8String], &database) == SQLITE_OK) {
        char *addFruit = "insert into FruitInChina (name) values (?);";
        sqlite3_stmt *statement;
        if (sqlite3_prepare_v2(database, addFruit, -1, &statement, nil) == SQLITE_OK) {
            sqlite3_bind_text(statement, 1, [name UTF8String], -1, NULL);
        }
        if (sqlite3_step(statement) == SQLITE_DONE) {
            message(@[@"add fruit by name done."]);
        }
        else {
            message(@[@"add fruit by name failed."]);
        }
        sqlite3_finalize(statement);
        sqlite3_close(database);
    }
}

- (void)copyDBToDocumentDir:(RCTResponseSenderBlock)callback {
    // copy database from main bundle to document dir
    NSString *sourcePath = [[[NSBundle mainBundle] resourcePath] stringByAppendingPathComponent:kDatabaseName];
    if ([[NSFileManager defaultManager] fileExistsAtPath:sourcePath]) {
        NSError *error;
        [[NSFileManager defaultManager] copyItemAtPath:sourcePath
                                                toPath:[self dataFilePath]
                                                 error:&error];
        if (error) {
            callback(@[[error localizedDescription]]);
        }
    }
}

@end
  
