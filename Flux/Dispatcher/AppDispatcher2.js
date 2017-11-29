'use strict';

import { Dispatcher } from 'flux'
import ListStore from '../Stores/ListStore2'

const AppDispatcher = new Dispatcher();

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case 'ADD_NEW_ITEM': {
            ListStore.addNewItemHandler(action.text);
            ListStore.emitChange();
        }
            break;

        default:
    }
});

export default AppDispatcher;


// export default class AppDispatcher {
//     static dispatch(action) {
//
//     }
// }