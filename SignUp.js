import React, { useState, useEffect } from "react";
import {View,  Text, StyleSheet, TouchableOpacity,  TextInput, StatusBar, Alert, KeyboardAvoidingView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useLogin } from '../Main/LoginProvider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from "react-native-linear-gradient";

export function SignUp({ navigation }) {
    //  confirm Password icons
    const { setIsLoggedIn, SubMenu, setSubMenu } = useLogin();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [answer, setAnswer] = useState("")
    const [recoverQuestion, setRecoverQuestion] = useState("");
    // validate the password

    const [fillName, setFillName] = useState(false); // user not entered the username
    const [fillPassword, setFillPassword] = useState(false);  // user not entered the password
    const [fillAnswer, setFillAnswer] = useState(false);  // user not entered the answer
    const [fillRecover, setFillRecover] = useState(false); // user not entered the Recover answer
    const [entry, setEntry] = useState(false)

    const [secureConfirmPassword, setSecureConfirmPassword] = useState(true) //eye Icon  for Confirm  password
    const [securePassword, setSecurePassword] = useState(true) //eye icon for password

    const [Error, setError] = useState(false) //Errror message Shown
    const [valid, setValid] = useState(false)//if new user it will be true
    const [accuracy, setAccuracy] = useState(false) // password accuracy

    const [userLength, setUserLength] = useState(false) // password Length
    const [passwordLength, setPasswordLength] = useState(false) // password Length
    const [confirmPasswordLength, setConfirmPasswordLength] = useState(false) //confirm  password Length
    const [answerLength, setAnswerLength] = useState(false) // password Length
    const [RecoverLength, setRecoverLength] = useState(false) //confirm  password Length
    // successfull
    const [successful, setSuccessful] = useState(false) //successfull message Shown for register password...

    const [data, setData] = useState([{ title: 'First Title' }]);
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
    }, [fillName, fillPassword, fillAnswer,
        username, password, answer, accuracy,
        userLength, RecoverLength, passwordLength,
        confirmPasswordLength, answerLength, entry])

    const fetchApi = async () => {
        // const obj = {
        //     "username": "kandhan",
        //     "password": "123456"
        // };
        console.log('Register butoon pressed...')
        if (!username) { setFillName(true) } else { setFillName(false) }
        if (!recoverQuestion) { setFillRecover(true) } else { setFillRecover(false) }
        if (!answer) { setFillAnswer(true) } else { setFillAnswer(false) }
        if (!password) { setFillPassword(true) } else { setFillPassword(false) }
        if (!confirmPassword) { setError(true) } else { setError(false) }

        if (username) {
            data.map(async (item) => {
                // console.log(item.username, item.password)
                if (item.username === username) {
                    setValid(true)
                    // Alert.alert("User Already Exist", "Please Enter New Username")
                }
                else {
                    setValid(false)
                    // console.log("new user")
                }
            })
        }
        if (username.length >= 5) {
            setUserLength(false)
        }
        else {
            setUserLength(true)
        }
        if (recoverQuestion.length >= 10) {
            setRecoverLength(false)
        }
        else {
            setRecoverLength(true)
        }
        if (answer.length >= 5) {
            setAnswerLength(false)
        }
        else {
            setAnswerLength(true)
        }
        if (password.length >= 5) {
            setPasswordLength(false)
        }
        else {
            setPasswordLength(true)
        }
        if (confirmPassword.length >= 5) {
            setConfirmPasswordLength(false)
        }
        else {
            setConfirmPasswordLength(true)
        }
        // const myJSON = JSON.stringify({ username, password });
        if (username && password && confirmPassword) {
            if (password != confirmPassword) {
                setAccuracy(true)
            }
            else {
                setAccuracy(false)
            }
        }
        if (userLength == false && passwordLength == false && answerLength == false && RecoverLength == false && accuracy == true) {
            setEntry(true)
        }
        // if (entry) {
        //     console.log("entry is :" + entry)
        //     data.map(async (item) => {
        //         console.log(item.username, item.password)
        //         if (item.username === username) {
        //             setValid(false)
        //             // Alert.alert("User Already Exist", "Please Enter New Username")
        //         }
        //         else {
        //             setValid(true)
        //             console.log("new user")
        //         }
        //     })
        // }
        if (entry) {
            const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                    "hint": recoverQuestion,
                    "answer": answer
                }),
            };

            try {
                const response = await fetch('http://192.168.223.220/user/', options);
                const responseData = await response.json();
                console.log(responseData);
                setSuccessful(true)
                setUserName("")
                setPassword("")
                setConfirmPassword("")
                setRecoverQuestion("")
                setAnswer("")
            } catch (error) {
                console.error(error);
            }
            console.log("Enter User is New User...")
        }
    }
    return (
        <KeyboardAvoidingView
            behavior='position' keyboardVerticalOffset={-400}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            <View >
                <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#0E5E6F', '#3A8891', '#192F6A']}>
                    <View style={styles.container}>
                        <Text style={{ textAlign: 'center', color: '#F5F5F5', letterSpacing: 3, marginBottom: 30, fontSize: 30 }}>REGISTER</Text>
                        <View style={styles.headerWrapper}>
                            <TextInput
                                style={styles.input}
                                value={username}
                                placeholder="U S E R N A M E"
                                placeholderTextColor="white"
                                onChangeText={(text) => setUserName(text)}
                            />
                            {fillName ?
                                <Text style={styles.ErrorText}>{'enter the username.'}</Text>
                                : null
                            }
                            {fillName == false && userLength == true ?
                                <Text style={styles.ErrorText}>{'username atleast five characters.'}</Text>
                                : null
                            }

                            {valid == true && fillName == false ?
                                <Text style={styles.ErrorText}>user already registered.</Text>
                                : null
                            }
                        </View>

                        <View style={styles.headerWrapper}>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    style={styles.input}
                                    value={recoverQuestion}
                                    placeholder="R E C O V E R Y   Q U E S T I O N"
                                    placeholderTextColor="white"
                                    // secureTextEntry={securePassword}
                                    onChangeText={(text) => setRecoverQuestion(text)}
                                />
                                {/* <FontAwesome5 name={securePassword ? 'eye-slash' : 'eye'}
                            size={18} color={'black'}
                            style={{ paddingTop: 18, marginLeft: -30 }}
                            onPress={() => setSecurePassword(!securePassword)} /> */}

                            </View>

                            {/* {fillRecover ?
                                <Text style={styles.ErrorText}>{`enter the recovery question.`}</Text>
                                : null
                            } */}
                            {fillRecover ?
                                <Text style={styles.ErrorText}>{'enter the recovery question'}</Text>
                                : null
                            }
                            {fillRecover == false && RecoverLength == true ?
                                <Text style={styles.ErrorText}>{'Question atleast ten characters.'}</Text>
                                : null
                            }

                        </View>
                        <View style={styles.headerWrapper}>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    style={styles.input}
                                    value={answer}
                                    placeholder="A N S W E R"
                                    placeholderTextColor="white"
                                    // secureTextEntry={securePassword}
                                    onChangeText={(text) => setAnswer(text)}
                                />
                                {/* <FontAwesome5 name={securePassword ? 'eye-slash' : 'eye'}
                            size={18} color={'black'}
                            style={{ paddingTop: 18, marginLeft: -30 }}
                            onPress={() => setSecurePassword(!securePassword)} /> */}

                            </View>

                            {fillAnswer ?
                                <Text style={styles.ErrorText}>enter the answer.</Text>
                                : null
                            }
                            {fillAnswer == false && answerLength == true ?
                                <Text style={styles.ErrorText}>{'Answer atleast five characters.'}</Text>
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
                                    onChangeText={(text) => setPassword(text)}
                                />
                                <FontAwesome5 name={securePassword ? 'eye-slash' : 'eye'}
                                    size={18} color={'black'}
                                    style={{ paddingTop: 18, marginLeft: -30 }}
                                    onPress={() => setSecurePassword(!securePassword)} />

                            </View>

                            {fillPassword ?
                                <Text style={styles.ErrorText}>enter the password.</Text>
                                : null
                            }
                            {fillPassword == false && passwordLength == true ?
                                <Text style={styles.ErrorText}>{'Password atleast five characters.'}</Text>
                                : null
                            }

                        </View>
                        <View style={styles.headerWrapper}>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    style={styles.input}
                                    value={confirmPassword}
                                    placeholder="C O N F I R M   P A S S W O R D"
                                    placeholderTextColor="white"
                                    secureTextEntry={secureConfirmPassword}
                                    onChangeText={(text) => setConfirmPassword(text)}
                                />
                                <FontAwesome5 name={secureConfirmPassword ? 'eye-slash' : 'eye'} size={18} color={'black'}
                                    onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}
                                    style={{ paddingTop: 18, marginLeft: -30 }} />
                            </View>

                            {Error || accuracy ?
                                <Text style={styles.ErrorText}>{accuracy ? "Passsword didn't match." : "enter the confirm password."}</Text>
                                : null
                            }

                        </View>
                        <TouchableOpacity style={styles.loginBtn}>
                            <Text onPress={() => fetchApi()} style={styles.loginText}>REGISTER</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity>
                    <Text onPress={() => navigation.navigate('SignIn')} style={styles.signupButton}>LOGIN</Text>
                </TouchableOpacity> */}
                        {
                            successful ?
                                <Text style={styles.success}>Your registration was successful.</Text>
                                : null
                        }
                    </View>
                </LinearGradient>
            </View>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: {
        resizeMode: 'cover',
        height: 580,
        width: 320,
        alignItems: "center",
        justifyContent: "center",
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
        width: 250,
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
        marginTop: 20,
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
        color: 'red',
        left: 0,
        letterSpacing: 2,
        marginBottom: 0,
        fontSize: 12,
        fontWeight: 'bold'
    },
    success: {
        color: 'white',
        marginTop: 18,
    }
});