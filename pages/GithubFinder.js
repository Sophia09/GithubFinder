'use strict';


import React, { Component } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    ListView,
    Text,
    Image,
} from 'react-native';

var BASE_URL = 'http://api.github.com/search/repositories?q=';

export default class GithubFinder extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }

    render() {
        var content;
        if (this.state.dataSource.getRowCount() === 0) {
            content = <Text style={styles.blankText}>Please enter a search term.</Text>;
        }
        else {
            content = <ListView
            ref="listView"
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            automaticallyAdjustContentInsets={false}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={true}
            />;
        }

        return(
            <View style={styles.container}>
              <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Search for a project..."
                  style={styles.searchBarInput}
                  onEndEditing={this.onSearchChange.bind(this)}
              />
                {content}
            </View>
        );
    }

    renderRow(item) {
        return(
            <View>
                <View style={styles.row}>
                    <Image
                    source={{uri: item.owner.avatar_url}}
                    style={styles.profpic}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>
                            {item.name}
                        </Text>
                        <Text style={styles.subTitle}>
                            {item.owner.login}
                        </Text>
                    </View>
                 </View>
                <View style={styles.cellBorder}/>
            </View>
        );
    }


    onSearchChange(event) {
        var searchTerm = event.nativeEvent.text.toLowerCase();
        var queryURL = BASE_URL + encodeURIComponent(searchTerm);
        fetch(queryURL)
            .then((response) => response.json())
            .then((responseData) => {
               if (responseData.items) {
                   this.setState({
                       // update search result
                       dataSource: this.state.dataSource.cloneWithRows(responseData.items),
                   });
               }
               else {
                   this.setState({
                       // update search result
                       dataSource: this.state.dataSource.cloneWithRows([]),
                   });
               }
            })
            .catch(error => {
                console.log('onSearchChange' + error);
        })
            .done();
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchBarInput: {
        marginTop: 30,
        marginRight: 5,
        marginLeft: 5,
        padding: 5,
        fontSize: 15,
        height: 30,
        backgroundColor: '#EAEAEA',
    },
    row: {
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 5,
    },
    cellBorder: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 1,
        marginLeft: 4,
    },
    profpic: {
        width: 50,
        height: 50,
    },
    textContainer: {
        paddingLeft: 10,
        flexDirection: 'column',
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 16,
        marginBottom: 8,
    },
    blankText: {
        padding: 10,
        fontSize: 20,
    }
});
