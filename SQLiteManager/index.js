
import { NativeModules } from 'react-native';

const { RNSqLiteManager } = NativeModules;

export default class NativeSqLiteManager {
    static test() {
        RNSqLiteManager.test();
    }

    static initDatabase(callback) {
        RNSqLiteManager.initDatabase(callback);
    }
}
