
# react-native-sq-lite-manager

## Getting started

`$ npm install react-native-sq-lite-manager --save`

### Mostly automatic installation

`$ react-native link react-native-sq-lite-manager`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-sq-lite-manager` and add `RNSqLiteManager.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNSqLiteManager.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNSqLiteManagerPackage;` to the imports at the top of the file
  - Add `new RNSqLiteManagerPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-sq-lite-manager'
  	project(':react-native-sq-lite-manager').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-sq-lite-manager/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-sq-lite-manager')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNSqLiteManager.sln` in `node_modules/react-native-sq-lite-manager/windows/RNSqLiteManager.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Com.Reactlibrary.RNSqLiteManager;` to the usings at the top of the file
  - Add `new RNSqLiteManagerPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNSqLiteManager from 'react-native-sq-lite-manager';

// TODO: What to do with the module?
RNSqLiteManager;
```
  