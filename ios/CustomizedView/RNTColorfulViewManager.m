//
//  RNTColorfulViewManager.m
//  GithubFinder
//
//  Created by Li Sai on 24/11/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "RNTColorfulViewManager.h"
#import "ColorfulView.h"

@implementation RNTColorfulViewManager

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(isRed, BOOL);

- (UIView *)view {
  return [[ColorfulView alloc] initWithFrame:CGRectMake(0, 0, 10, 10)];
}

@end
