import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    ListView,
    TextInput,
} from 'react-native'

import RNSqLiteManager from '../SQLiteManager/index'

export default class SQLiteDemo extends Component {

    constructor() {
        super();
        this.state = {
          personArray: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
          }),
        };
    }

    getAllPersonInfo(event) {
        RNSqLiteManager.initDatabase((result) => {
            console.log('name of first person = ' + result[0]['name'] );
            this.setState({
                personArray: this.state.personArray.cloneWithRows(result),
            });
        });
    }

    searchByPersonName(event) {
        let name = this.nameInput._lastNativeText.toLowerCase();
        console.log('search by person name = ' + name);
        RNSqLiteManager.searchByName(name, (result) => {
            this.setState({
                personArray: this.state.personArray.cloneWithRows(result),
            });
        });
    }

    render() {
        var content;
        if (this.state.personArray.getRowCount() === 0) {
            content = <Text style={{padding: 10}}>No Info to show.</Text>
        }
        else {
            content = <ListView
                dataSource={this.state.personArray}
                renderRow={this.showPersonalInfo.bind(this)}
                automaticallyAdjustContentInsets={false}
                keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps='always'
                showsVerticalScrollIndicator={true}
            />
        }

        return(
            <View style={styles.container}>
                <View style={styles.showAll}>
                    <Button
                        title='Show All'
                        onPress={this.getAllPersonInfo.bind(this)}
                    />
                </View>
                <View style={{flexDirection: 'row', margin: 10,}}>
                    <TextInput
                        style={styles.nameInput}
                        placeholder='Search by name'
                    ref={(nameInput) => {this.nameInput = nameInput}}/>
                    <Button title='Search'
                            onPress={this.searchByPersonName.bind(this)}
                    />
                </View>
                <View style={styles.topBorder}/>
                {content}

            </View>
        );
    }

    showPersonalInfo(person) {
        return(
            <View style={styles.personalRow}>
                <View style={styles.personalInfo}>
                    <Text>{person.name}</Text>
                    <Text>{person.address}</Text>
                </View>
                <View style={styles.cellBorder}/>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    showAll: {
        margin: 5,
        marginTop: 40,
        alignItems: 'flex-start',
    },
    personalRow: {
        padding: 5,
        flexDirection: 'column',
    },
    personalInfo: {
        flexDirection: 'row',
        paddingTop: 5,
    },
    cellBorder: {
        backgroundColor: 'black',
        height: 1,
        marginTop: 10,
    },
    topBorder: {
        backgroundColor: 'black',
        height: 1,
        marginTop: 20,
    },
    nameInput: {
        backgroundColor: '#EAEAEA',
        width: 200,
    },
});

