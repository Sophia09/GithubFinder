
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

RCT_EXPORT_METHOD(test) {
    NSLog(@"%s", __func__);
}

RCT_EXPORT_METHOD(initDatabase:(RCTResponseSenderBlock)callback) {
    NSLog(@"%s", __func__);
    NSString *dbPath = [self dataFilePath];
    if (![[NSFileManager defaultManager] fileExistsAtPath:dbPath]) {
        // copy database from main bundle to document dir
        NSString *sourcePath = [[[NSBundle mainBundle] resourcePath] stringByAppendingPathComponent:kDatabaseName];
        if ([[NSFileManager defaultManager] fileExistsAtPath:sourcePath]) {
            NSError *error;
            [[NSFileManager defaultManager] copyItemAtPath:sourcePath
                                                    toPath:dbPath
                                                     error:&error];
            if (error) {
                callback(@[[error localizedDescription]]);
            }
        }
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
            char *personID = sqlite3_column_text(statement, 0);
            char *name = sqlite3_column_text(statement, 1);
            char *address = sqlite3_column_text(statement, 2);
            
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

@end
  
