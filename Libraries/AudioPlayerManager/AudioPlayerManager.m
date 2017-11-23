#import "AudioPlayerManager.h"
#import <Foundation/Foundation.h>
#import <React/RCTLog.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTConvert.h>

NSString *const AudioPlayerEventProgress = @"playerProgress";
NSString *const AudioPlayerEventFinished = @"playerFinished";

@implementation AudioPlayerManager {
  
  AVAudioPlayer *_audioPlayer;
  NSTimeInterval _currentTime;
  id _progresUpdateTimer;
  int _progressUpdateInterval;
  NSDate *_preProgressUpdateTimer;
  NSURL *_audioFileURL;
  
}

// this line of code is necessary
@synthesize bridge = _bridge;

// the default module name is the same as its name in OC
RCT_EXPORT_MODULE();

// dispatch currentTime of audio
- (void)sendProgressUpdate {
  if (_audioPlayer && _audioPlayer.playing) {
    _currentTime = _audioPlayer.currentTime;
  }
  
  if (_preProgressUpdateTimer == nil ||
      [_preProgressUpdateTimer timeIntervalSinceNow] * 1000.0 >= _progressUpdateInterval) {
    [_bridge.eventDispatcher sendDeviceEventWithName: AudioPlayerEventProgress
                                                body: @{
                                                        @"currentTime" : @(_currentTime)
                                                        }];
  }
  _preProgressUpdateTimer = [NSDate date];
}

- (void)stopProgressTimer {
  [_progresUpdateTimer invalidate];
}

- (void)startProgressTimer {
  _progressUpdateInterval = 250;
  _preProgressUpdateTimer = nil;
  _progresUpdateTimer = [CADisplayLink displayLinkWithTarget:self
                                                    selector:@selector(sendProgressUpdate)];
  [_progresUpdateTimer addToRunLoop:[NSRunLoop mainRunLoop]
                            forMode:NSDefaultRunLoopMode];
}

#pragma mark - AVAudioPlayerDelegate

- (void)audioPlayerDidFinishPlaying:(AVAudioPlayer *)player
                       successfully:(BOOL)flag {
  [_bridge.eventDispatcher sendDeviceEventWithName:AudioPlayerEventFinished
                                              body:@{
                                                     @"finished" : @(TRUE)
                                                     }];
}

RCT_EXPORT_METHOD(play: (NSString *)path)
{
  NSString *resourcePath = [[NSBundle mainBundle] resourcePath];
  NSString *audioFilePath = [resourcePath stringByAppendingPathComponent:path];
  
  _audioFileURL = [NSURL URLWithString:audioFilePath];
  
  NSError *error;
  _audioPlayer = [[AVAudioPlayer alloc] initWithContentsOfURL:_audioFileURL
                                                        error:&error];
  
  if (error) {
    NSLog(@"Error happened in play:NSString");
    [self stopProgressTimer];
  }
  else {
    [self startProgressTimer];
    [_audioPlayer play];
  }
}

RCT_EXPORT_METHOD(playWithURL: (NSURL *)url)
{
  NSError *error;
  _audioPlayer = [[AVAudioPlayer alloc] initWithContentsOfURL:url
                                                        error:&error];
  if (error) {
    [self startProgressTimer];
  }
  else {
    [self startProgressTimer];
    [_audioPlayer play];
  }
}

RCT_EXPORT_METHOD(pause)
{
  if (_audioPlayer.isPlaying) {
    [_audioPlayer pause];
  }
}

RCT_EXPORT_METHOD(stop)
{
  if (_audioPlayer.isPlaying) {
    [_audioPlayer stop];
  }
}

@end

