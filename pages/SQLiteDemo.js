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
            fruitArray: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }

    getAllPersonInfo(event) {
        RNSqLiteManager.initDatabase((result) => {

            this.setState({
                personArray: this.state.personArray.cloneWithRows(result),
                fruitArray: this.state.fruitArray.cloneWithRows([]),
            });
        });
    }

    searchByPersonName(event) {

        let name = this.nameInput._lastNativeText.toLowerCase();

        RNSqLiteManager.searchByName(name, (result) => {
            this.setState({
                personArray: this.state.personArray.cloneWithRows(result),
                fruitArray: this.state.fruitArray.cloneWithRows([]),
            });
        });
    }

    searchFruitById(event) {
        let id = this.idInput._lastNativeText;
        // Use Number to change data from string to numeric
        RNSqLiteManager.findFruitWithId(Number(id), (result) => {
            this.setState({
                personArray: this.state.personArray.cloneWithRows([]),
                fruitArray: this.state.fruitArray.cloneWithRows(result),
            });
        });
    }

    addFruit(event) {
        let name = this.fruitNameInput._lastNativeText;
        RNSqLiteManager.addFruitByName(name, (message) => {
            alert(message);
        });
    }

    render() {

        var content;
        if (this.state.personArray.getRowCount() === 0 &&
            this.state.fruitArray.getRowCount() === 0) {
            content = <Text style={{padding: 10}}>No Info to show.</Text>
        }
        else {
            let dataSource = this.state.personArray.getRowCount() > 0 ? this.state.personArray : this.state.fruitArray;
            content = <ListView
                dataSource={dataSource}
                renderRow={this.renderRow.bind(this)}
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

                <View style={styles.searchText}>
                    <TextInput
                        style={styles.nameInput}
                        placeholder='Search person by name'
                        ref={(nameInput) => {this.nameInput = nameInput}}
                    />
                    <Button title='Search'
                            onPress={this.searchByPersonName.bind(this)}
                    />
                </View>

                <View style={styles.searchText}>
                    <TextInput
                        style={styles.nameInput}
                        placeholder='search fruit by id'
                        ref={(idInput) => {this.idInput = idInput} }
                        keyboardType='numeric'
                    />
                    <Button
                        title='Search'
                        onPress={this.searchFruitById.bind(this)}
                    />
                </View>

                <View style={styles.searchText}>
                    <TextInput
                        style={styles.nameInput}
                        placeholder='input fruit name'
                        ref={(fruitNameInput) => {this.fruitNameInput = fruitNameInput} }
                    />
                    <Button
                        title='Add Fruit'
                        onPress={this.addFruit.bind(this)}
                    />
                </View>

                <View style={styles.topBorder}/>
                {content}

            </View>
        );
    }

    renderRow(item) {

        if (this.state.personArray.getRowCount() > 0) {
            return(
                <View style={styles.personalRow}>
                    <View style={styles.personalInfo}>
                        <Text>{item.name}</Text>
                        <Text>{item.address}</Text>
                    </View>
                    <View style={styles.cellBorder}/>
                </View>
            );
        }
        else {

            return(
                <View style={styles.personalRow}>
                    <View style={styles.personalInfo}>
                        <Text>{item}</Text>
                    </View>
                    <View style={styles.cellBorder}/>
                </View>
            );
        }

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
    searchText: {
        flexDirection: 'row',
        margin: 10,
    },
});

