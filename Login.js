import React, { useState, useEffect } from "react";
import { Button, View, ImageBackground, Text, StyleSheet, TouchableOpacity, Image, TextInput, StatusBar, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useLogin } from '../Main/LoginProvider';
import { CustomInput } from "../components/CustomInput";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
export function Login({ navigation }) {
    const { isLoggedIn, setIsLoggedIn, SubMenu, setSubMenu } = useLogin();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [borderName, SetBorderName] = useState(false)
    const [SecondBorderName, setSecondBorderName] = useState(false)
    //  confirm Password icons
    const [securePassword, setSecurePassword] = useState(true)
    // valid the username and password
    const [fillName, setFillName] = useState(false)
    const [fillPassword, setFillPassword] = useState(false)
    const [fillConfirmPassword, setFillConfirmPassword] = useState(false)
    const [noUser, setNoUser] = useState(false)
    const [valid, setValid] = useState(false)

    const [data, setData] = useState([{ title: 'First Title' }]);
    const [title, setTitle] = useState({ title: 'First Title' })
    const [description, setDescription] = useState({ description: 'Hello Description' })

    // useEffect(() => {
    //     fetch('http://192.168.220.220/user/', {
    //         method: 'GET'
    //     })
    //         .then(res => res.json())
    //         // .then(data => { setData(data)})
    //         .then(data => {
    //             console.log(data)
    //             setData(data)
    //         })

    //         .catch(err => console.log("Error Acquired", err));
    // }, [])
    const useFetch = () => {
        fetch('http://192.168.223.220/user/', {
            method: 'GET'
        })
            .then(res => res.json())

            // .then(data => { setData(data)})
            .then(data => {
                console.log(data)
                setData(data)
            })
            .catch(err => console.log("Error Acquired", err));
    }
    useEffect(() => {
        useFetch()
    }, [valid, fillName, fillPassword, password, username, noUser, isLoggedIn])

    const checker = () => {
        console.log(username, password)
        if (!username) {

            setFillName(true)
        }
        else {
            setFillName(false)

        }
        if (!password) {

            setFillPassword(true)
        }
        else {
            setFillPassword(false)

        }

        if (username && password) {
            console.log('username and password all enterd...')
            setValid(true)
        }

        if (valid) {
            useFetch()
            // console.log(username, password)
            data.map((item) => {
                console.log(item.username, item.password)
                if (item.username == username && item.password == password) {
                    console.log("user Entered the App...")
                    setNoUser(false)
                    setIsLoggedIn(true)

                }
                else {
                    // Alert.alert("No User", "There is  no user")
                    setNoUser(true)
                }
            })
        }


    }

    const check = () => {
        if ("Kamal" == username && "123456" == password) {
            console.log("user Entered the App...")
            setIsLoggedIn(true)
        }
        // setIsLoggedIn(true)
    }
    return (
        <ScrollView>
            <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#0E5E6F', '#3A8891', '#192F6A']}>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.container}>
                        <Text style={{ textAlign: 'center', color: '#F5F5F5', letterSpacing: 3, fontSize: 35, margin: 30, marginBottom: 50 }}>LOGIN</Text>
                        <View style={styles.headerWrapper}>
                            {/* <CustomInput placeHolder={'User'}
                            setState1={SetBorderName}
                            setState2={setSecondBorderName}
                            placeName={borderName}
                        /> */}

                            <TextInput
                                style={styles.input}
                                value={username}
                                placeholder="U S E R N A M E"
                                placeholderTextColor="white"
                                onChangeText={(text) => setUserName(text)}
                            />
                            {fillName ?
                                <Text style={styles.ErrorText}>enter the username</Text>
                                : null
                            }
                        </View>
                        <View style={styles.headerWrapper}>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    style={styles.input}
                                    value={password}
                                    placeholder="P A S S W O R D"
                                    placeholderTextColor="white"
                                    secureTextEntry={securePassword}
                                    onChangeText={(password) => setPassword(password)}
                                />
                                <FontAwesome5 name={securePassword ? 'eye-slash' : 'eye'}
                                    size={18} color={'black'}
                                    style={{ paddingTop: 18, marginLeft: -30 }}
                                    onPress={() => setSecurePassword(!securePassword)} />

                            </View>

                            {fillPassword ?
                                <Text style={styles.ErrorText}>enter the password</Text>
                                : null
                            }
                        </View>
                        <TouchableOpacity style={styles.loginBtn}>
                            <Text style={styles.loginText} onPress={() => checker()}>LOGIN</Text>
                        </TouchableOpacity>
                        <View>
                            {noUser ?
                                <Text style={{ color: 'red', marginTop: 23 }}>Username Invalid</Text>
                                : null
                            }
                        </View>
                        {/* <TouchableOpacity>
                    <Text onPress={() => navigation.navigate('SignUp')} style={styles.signupButton}>SIGN UP</Text>
                </TouchableOpacity> */}
                        {/* <TouchableOpacity>
                    <Text onPress={() => check()} style={styles.signupButton}>Check</Text>
                </TouchableOpacity> */}
                        <View style={{
                            display: 'flex', marginTop: 30, alignItems: 'center',
                            position: 'absolute', left: 0, right: 0, bottom: 50
                        }}>
                            <Text style={{ padding: 10, color: 'white' }}
                                onPress={() => {
                                    navigation.navigate("Forgot");
                                }}
                            >Forgot Passsword</Text>
                            <Text style={{ textAlign: 'center', color: 'white' }}
                                onPress={() => {
                                    navigation.navigate("SignUp");
                                }}
                            >New user ? Sign up now</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>

        </ScrollView >
    );
}
const styles = StyleSheet.create({
    container: {
        resizeMode: 'cover',
        height: 500,
        width: 320,
        alignItems: "center",
        // justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginBottom: 190,
        marginTop: 150,
        marginLeft: 30,
        marginRight: 30,
        // paddingLeft: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'black',
    },
    headerWrapper: {
        marginBottom: 15,
        // width: 250,
    },
    input: {
        fontSize: 12,
        color: 'white',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: 250,
    },
    loginBtn: {
        width: 100,
        borderRadius: 10,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: '#5B8FB9',
        // marginRight: 45,
        color: 'white'
    },
    signupButton: {
        height: 30,
        marginBottom: 10,
        color: '#EEEEEE',
        marginTop: 40,
        // marginRight: 45,
        fontWeight: 'bold'
    },
    loginText: {
        color: 'white',
    },
    ErrorText: {
        color: 'red', left: 0, letterSpacing: 2, marginBottom: 0, fontSize: 12, fontWeight: 'bold'
    },
});

// import React, { useState } from 'react';
// import { View, TextInput, Animated, StyleSheet } from 'react-native';

// export const SignIn = () => {
//     const [isFocused, setIsFocused] = useState(false);
//     const animatedIsFocused = React.useRef(new Animated.Value(0)).current;

//     const handleFocus = () => setIsFocused(true);
//     const handleBlur = () => setIsFocused(false);
// let value=''
//     React.useEffect(() => {
//         Animated.timing(animatedIsFocused, {
//             toValue: isFocused || value !== '' ? 1 : 0,
//             duration: 200,
//             useNativeDriver: false,
//         }).start();
//     }, [animatedIsFocused, isFocused, value]);

//     const labelStyle = {
//         position: 'absolute',
//         left: 0,
//         top: animatedIsFocused.interpolate({
//             inputRange: [0, 1],
//             outputRange: [18, 0],
//         }),
//         fontSize: animatedIsFocused.interpolate({
//             inputRange: [0, 1],
//             outputRange: [20, 14],
//         }),
//         color: animatedIsFocused.interpolate({
//             inputRange: [0, 1],
//             outputRange: ['#aaa', '#000'],
//         }),
//     };

//     return (
//         <View style={styles.container}>
//             <Animated.Text style={labelStyle}>Username</Animated.Text>
//             <TextInput
//                 style={styles.input}
//                 onFocus={handleFocus}
//                 onBlur={handleBlur}
//                 underlineColorAndroid="transparent"
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         marginTop: 20,
//         width: '100%',
//         height: 60,
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
//     input: {
//         fontSize: 18,
//         marginTop: 10,
//         paddingLeft: 6,
//         paddingBottom: 10,
//     },
// });

// // export default StylishTextInput;

// import { View, Text } from 'react-native'
// import React, { useState } from 'react'
// import { CustomInput } from '../components/CustomInput';
// export const Login = () => {
//     const [borderName, SetBorderName] = useState(false)
//     const [SecondBorderName, setSecondBorderName] = useState(false)
//     return (
//         <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//             <Text>Login</Text>
//             <CustomInput placeHolder={'User'}
//                 setState1={SetBorderName}
//                 setState2={setSecondBorderName}
//                 placeName={borderName}


//             />
//             <CustomInput placeHolder={'Password'}
//                 setState1={setSecondBorderName}
//                 setState2={SetBorderName}
//                 placeName={SecondBorderName}

//             />

//         </View>
//     )
// }
