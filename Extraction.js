import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Pressable } from 'react-native';
// import * as RNFS from 'react-native-fs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from "react-native-linear-gradient";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useLogin } from '../Main/LoginProvider';


export const Extraction = ({ navigation, route }) => {
    const { setIsLoggedIn, SubMenu, setSubMenu } = useLogin();
    const [searchData, setSearchData] = useState([])
    const [subPulse, setSubPulse] = useState('');
    const [slotChannel, setSlotChannel] = useState('');
    const [edit, setEdit] = useState(true);
    // const { msg1, msg2, msg3 } = route.params;
    const [data, setData] = useState('');
    // const files = () => {
    //     RNFS.readFileAssets('hello.txt').then(result => {
    //         let word = result.toString();
    //         let term = ""
    //         let words = [];
    //         // console.log('Started....', msg1, msg2, msg3)
    //         let arr = word.split('\n')
    //         // console.log(slotChannel);
    //         // console.log('/n')
    //         arr.map((item, index) => {
    //             // term += "," + item;
    //             // if (index == 1) {
    //             words.push(item)
    //             // console.log(item);
    //             // }

    //         })
    //         words.map((word, index) => {
    //             console.log(word, index)
    //             // console.log(word.slice(0, 6))
    //             let slot = word.slice(0, 6);
    //             let pulse = word.slice(7, 11);
    //             // console.log(typeof (slot), "pulse", typeof (pulse))
    //             if (slot == slotChannel && pulse == subPulse) {
    //                 console.log("index", index)
    //                 navigation.navigate("Details", {
    //                     msg3: word,
    //                 })
    //             }
    //         })
    //     }).catch(err => {
    //         console.log(err);
    //     });

    //     const val = (index) => {
    //         console.log("Value...", index);
    //     }

    // }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.text1}>
                    <FontAwesome5 name={'arrow-left'} size={20} color={'black'} onPress={() => {
                        navigation.navigate("Home");
                    }} />
                </Text>
                <Text style={styles.text2}>Extraction</Text>
                <Text style={styles.text3}>
                    <AntDesign name={'logout'} size={20} color={'black'} onPress={() => { setIsLoggedIn(false) }} />
                </Text>
            </View>
            {/* options={{
                        title: 'Bluetooth App',
                        // headerTitle: () => <Text style={{ color: 'black' }}>Hello</Text>,
                        headerRight: () =>
                            <View style={{ marginRight: 10 }} >
                                <AntDesign name={'logout'} size={20} color={'black'} onPress={() => { setIsLoggedIn(false) }} />
                            </View>
                    }} */}
            <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#0E5E6F', '#3A8891', '#192F6A']}>
                <View style={styles.body}>
                    <View style={styles.form}>
                        <View style={{ alignItems: 'flex-start', width: 250, marginBottom: 10, marginTop: 60 }}>
                            <Text style={{ color: 'white', textAlign: 'left', fontSize: 20, fontWeight: 'bold' }}>Channel :</Text>
                        </View>
                        <TextInput
                            style={styles.input1}
                            placeholder={'Enter Channel'}
                            value={slotChannel}
                            editable={true}
                            onChangeText={(value) => setSlotChannel(value)}
                        />
                        <View style={{ alignItems: 'flex-start', width: 250, marginBottom: 10, }}>
                            <Text style={{ color: 'white', textAlign: 'left', fontSize: 20, fontWeight: 'bold' }}>SubPulse :</Text>

                        </View>
                        <TextInput
                            style={styles.input1}
                            placeholder={'Enter SubPulse'}
                            value={subPulse}
                            editable={true}
                            onChangeText={(value) => setSubPulse(value)}
                        />
                        <Pressable
                            onPress={() =>
                                navigation.navigate("Details", {
                                    msg1: slotChannel,
                                    msg2: subPulse,
                                    // msg3: "Slot_1_Channel_1",
                                })
                            }
                            style={styles.pressable}>
                            <Text style={styles.text}>
                                Save</Text>

                        </Pressable>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}
const styles = StyleSheet.create({
    body: {
        resizeMode: 'cover',
        height: 485,
        width: 335,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginBottom: 190,
        marginTop: 100,
        marginLeft: 25,
        marginRight: 30,

    },
    button: {
        borderColor: "black", borderWidth: 1, backgroundColor: 'green', width: 200, height: 40,
    },
    btnText: {
        fontSize: 20, textAlign: 'center', textAlignVertical: 'center'
    },
    input1: {
        width: 250,
        height: 40,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 10,
        backgroundColor: '#EEEEEE',
        // backgroundColor: 'rgba(0,0,0,0.2)',

        // color: '',
    },
    editContainer: {
        flexDirection: 'row'
    },
    pressable: {
        width: 120,
        height: 40,
        borderWidth: 1,
        borderColor: '#555',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#31c6d4',
        borderRadius: 10,
        marginTop: 50

    },
    text: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
    },
    form: {
        marginBottom: 15,
        width: 250,
        // height: 400,
        // borderRadius: 100,

        alignItems: 'center',
    },
    header: {
        display: 'flex',
        width: 380, height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    text1: {
        flex: 0.5, margin: 15
    },
    text2: {
        flex: 1, fontSize: 20, textAlign: 'center', color: 'black', fontWeight: 'bold', letterSpacing: 5,
    },
    text3: {
        flex: 0.5, marginRight: 10, textAlign: 'right'
    }


})