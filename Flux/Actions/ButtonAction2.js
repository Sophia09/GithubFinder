'use strict';

import  AppDispatcher  from '../Dispatcher/AppDispatcher2'

export default class ButtonAction {

    static addNewItem(text) {
        AppDispatcher.dispatch({
            actionType: 'ADD_NEW_ITEM',
            text: text
        });
    }
}