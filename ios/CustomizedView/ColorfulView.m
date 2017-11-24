//
//  ColorfulView.m
//  GithubFinder
//
//  Created by Li Sai on 24/11/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "ColorfulView.h"

@implementation ColorfulView {
  UIColor *squareColor;
}

- (void)setIsRed:(BOOL)isRed {
  squareColor = isRed ? [UIColor redColor] : [UIColor grayColor];
  [self setNeedsDisplay];
}

// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
  [squareColor setFill];
  CGContextFillRect(UIGraphicsGetCurrentContext(),
                    rect);
}

@end
