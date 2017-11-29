'use strict';

import React from 'react'
import { EventEmitter }  from 'events'

 class ListStoreClass extends EventEmitter {

    constructor(props) {
        super(props);
        this.items = [];
        // this.emitter = new EventEmitter();
    }


    getAll() {
        return this.items;
    }

     addNewItemHandler(text) {
        this.items.push(text);
    }

    // emit an event to view
      emitChange() {
        this.emit('change');
    }

     addChangeListener(callback) {
        console.log( 'this = ' + this);
        this.on('change', callback);
    }

     removeChangeListener(callback) {
        this.removeListener('change', callback);
    }
}

export default new ListStoreClass();