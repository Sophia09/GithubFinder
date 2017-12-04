'use strict';


import React, { Component } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    ListView,
    Text,
    Image,
    ActivityIndicator,
} from 'react-native';

var BASE_URL = 'http://api.github.com/search/repositories?q=';

export default class GithubFinder extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            spinnerAnimating : false,
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
                  onEndEditing={this.searchRepositoriesForGithub.bind(this)}
              />
                {content}

                <ActivityIndicator
                    ref={ (spinner) => this.spinner = spinner }
                    style={styles.spinner}
                    animating={this.state.spinnerAnimating}
                    hidesWhenStopped={true}
                />
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
        // fetch(queryURL, {
        //     method: 'GET',
        //     header: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json',
        //     },
        // })
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

    // ES7 中的 async & await，异步操作
    async searchRepositoriesForGithub(event) {

        this.setState({
            spinnerAnimating: true,
        });

        console.log('searching ' + event.nativeEvent.text.toLowerCase());
        try {
            let keywords = event.nativeEvent.text.toLowerCase();
            let queryURL = BASE_URL + encodeURIComponent(keywords);
            let response = await fetch(queryURL);
            let responseJson = await response.json();
            if (responseJson.items && responseJson.items.length > 0) {
                this.setState({
                    // update search result
                    dataSource: this.state.dataSource.cloneWithRows(responseJson.items),
                    spinnerAnimating: false,
                });
            }
            else {
                alert('Oops, no related repository');
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows([]),
                    spinnerAnimating: false,
                });
            }

        } catch(error) {
           this.setState({
               spinnerAnimating: false,
           });
            console.log('searchRepositoriesForGithub' + error);
        }
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
    },
    spinner: {
        marginTop: 20,
    },
});
