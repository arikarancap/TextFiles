import React, { useState, useEffect } from "react";
import { Button, View, ImageBackground, Text, StyleSheet, ActivityIndicator, Image, TextInput, ScrollView, StatusBar, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import * as RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { COLORS } from '../constants';
export const Details = ({ navigation, route }) => {
    const { msg1, msg2, msg3 } = route.params;
    const [sendBluetooth, setSendBluetooth] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const objects = {
        Max_num_of_subpulse: '',
        max_freq: '100.0',
        Max_dur: '1000',
        Max_duty: '100',
        Max_offset: '100',
    }
    let values = [];
    let SendData = [];
    let text = ""
    SendData.push(msg1, msg2, 100.0, 100, 100)
    console.log('press', msg1, msg2);
    let repeat = msg2.slice(-2) * 3;
    console.log(repeat);
    let temp = 1;
    let offset = 1;
    let gate = 1;
    let arr = [1.35, 100, 25, 0.0, 200, 50, 5.68, 300, 75, 0.0, 500, 50, 1.35, 100, 25, 0.0, 200, 50, 5.68, 300, 75, 0.0, 500, 50, 1.35, 100, 25, 0.0, 200, 50, 5.68, 300, 75, 0.0, 500, 50]
    // values.push(['Slot Channel', msg1], ['Max_Num_of_SubPulse', msg2], ['Max_frequency', 100.0], ['Max_duration', 100], ['Max_duty', 100])

    for (let i = 0; i < repeat; i++) {
        // console.log(i);
        if (gate < 4) {
            if (gate === 1) {
                console.log('SubPulse_' + offset + '_freq', arr[i])
                values.push(['SubPulse_' + offset + '_freq', arr[i]])
                SendData.push(arr[i])
            }
            else if (gate === 2) {
                console.log('SubPulse_' + offset + '_dur', arr[i])
                values.push(['SubPulse_' + offset + '_dur', arr[i]])
                SendData.push(arr[i])
            }
            else if (gate === 3) {
                console.log('SubPulse_' + offset + '_duty', arr[i])
                values.push(['SubPulse_' + offset + '_duty', arr[i]])
                SendData.push(arr[i])
            }
            gate = gate + 1;
        }
        if (gate == 4) {
            gate = 1;
            offset = offset + 1
        }
    }
    const file = () => {
        values.map((item, index) => {
            text += item[0] + ':' + item[1] + ':';
        })
    }
    useEffect(() => {
        file()
    }, [text])

    const sharing = async () => {
        file()
        console.log('words');
        // RNFS.readFileAssets('hello.txt').then(result => {
        //     const word = result.split(',');
        //     const words = word.toString()
        //     console.log(typeof (words))
        //     setSendBluetooth(words)
        //     //     // this.setState({ sendBluetooth: words })
        // })
        shareOptions = {
            // message: "0x1000:0x97:0xA7:0xB7:0x45:0x2000:0xABCD:0x9100:0x04:100.0:100:0x64:100:1.35:100:25:0.0:200:50:5.68:300:75:0.0:500:50:0x9200:0x08:100.0:100:0x64:100:1.35:100:25:0.0:200:50:5.68:300:75:0.0:500:50:1.35:100:25:0.0:200:50:5.68:300:75:0.0:500:50:0x9300:0x0C:100.0:100:0x64:100:1.35:100:25:0.0:200:50:5.68:300:75:0.0:500:50:1.35:100:25:0.0:200:50:5.68:300:75:0.0:500:50:1.35:100:25:0.0:200:50:5.68:300:75:0.0:500:50",
            // title: `Share ${fileName}`,
            // url: `file://${JSON.stringify(this.state.sendBluetooth)}`,
            // type: 'text/txt',
            message: text,
            type: 'text/plain',
        }
        try {
            const ShareResponse = await Share.open(shareOptions);
        }
        catch (error) {
            console.log('Error is : ' + error)
        }
    }
    const renderItem = ({ item }) => {
        return (
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Text style={{ fontSize: 15 }}>{`${item[0]}`}</Text>
                <Text style={{ fontSize: 15 }}>{`${item[1]}`}</Text>
            </View>
        );
    };
    const renderLoader = () => {
        return (
            isLoading ?
                <View style={styles.loaderStyle}>
                    <ActivityIndicator size="20" color="#aaa" />
                </View> : null
        );
    };
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View
                style={styles.header}>
                <Text style={styles.text1}>
                    <FontAwesome5 name={'arrow-left'} size={20} color={'black'} onPress={() => {
                        navigation.navigate("Extraction");
                    }} />
                </Text>
                <Text style={styles.text2}>Details</Text>
                <Text style={styles.text3}>
                    <FontAwesome5 name={'share-alt'} size={20} color={'black'} onPress={sharing} />
                </Text>
            </View>
            <FlatList
                data={values}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListFooterComponent={renderLoader}
                // onEndReached={loadMoreItem}
                onEndReachedThreshold={0}
            />

        </View>
    )
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        // margin: 10,
    },
    container: {
        // flex: 1,
        // backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: "#0A2647",
        // backgroundColor: 'white'
    },
    header: {
        display: 'flex',
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.darkBlue,
    },
    subContainer: {
        width: 390,
        height: 35,
        // borderWidth: 1,
        borderColor: "black",
        // margin: 2,
        // backgroundColor: '#BADAE9',
        // backgroundColor: '#3C6255',
        color: 'white',
    },
    textStyle: {
        fontSize: 15,
        color: 'white',
        flex: 1,
        // color: 'white',
        paddingTop: 11,
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    text1: {
        flex: 1, marginLeft: 15
    },
    text2: {
        flex: 1, fontSize: 20, textAlign: 'center', color: 'black', fontWeight: 'bold', letterSpacing: 5

    },
    text3: {
        flex: 1, marginRight: 10, textAlign: 'right'
    }
})