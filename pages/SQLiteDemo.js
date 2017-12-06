import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ListView,
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

    componentDidMount() {
        RNSqLiteManager.initDatabase((result) => {
            console.log('name of first person = ' + result[0]['name'] );
            this.setState({
                personArray: this.state.personArray.cloneWithRows(result),
            });
        });
    }

    render() {

        return(
            <View style={styles.container}>
                <Text style={styles.guide}>SQLite Demo</Text>
                <View style={styles.topBorder}/>
                <ListView
                    dataSource={this.state.personArray}
                    renderRow={this.showPersonalInfo.bind(this)}
                    automaticallyAdjustContentInsets={false}
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps='always'
                    showsVerticalScrollIndicator={true}
                />

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
    guide: {
        padding: 5,
        paddingTop: 40,
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
});

