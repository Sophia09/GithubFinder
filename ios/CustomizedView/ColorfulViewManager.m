//
//  ColorfulViewManager.m
//  GithubFinder
//
//  Created by Li Sai on 24/11/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "ColorfulViewManager.h"
#import "ColorfulView.h"

@implementation ColorfulViewManager

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(isRed, BOOL);

- (UIView *)view {
  return [[ColorfulView alloc] initWithFrame:CGRectMake(0, 0, 10, 10)];
}

@end
