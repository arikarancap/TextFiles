import React, { useState, useEffect } from "react";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Button, View, ImageBackground, Text, StyleSheet, TouchableOpacity, Image, TextInput, StatusBar, Alert, KeyboardAvoidingView } from 'react-native';
import LinearGradient from "react-native-linear-gradient";

export const Forgot = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [answer, setAnswer] = useState("")

    const [data, setData] = useState([{ title: 'First Title' }]);
    const [noUser, setNoUser] = useState(false)  //user not valid yet
    const [answerNotMatch, setAnswerNotMacth] = useState(false) // answer not match

    const [fillName, setFillName] = useState(false) // user not entered the username
    const [fillPassword, setFillPassword] = useState(false)  // user not entered the password
    const [fillAnswer, setFillAnswer] = useState(false)  // user not entered the answer
    const [passwordLength, setPasswordLength] = useState(false) // password Length
    const [confirmPasswordLength, setConfirmPasswordLength] = useState(false) //confirm  password Length

    const [securePassword, setSecurePassword] = useState(true) // eye Icon  for password
    const [secureAnswer, setSecureAnswer] = useState(true)// eye Icon  for answer
    const [icon, setIcon] = useState(true) // eye Icon 

    const [accuracy, setAccuracy] = useState(false) //Errror message Shown
    const [Error, setError] = useState(false) //Errror message Shown confirm Password
    const [successful, setSuccessful] = useState(false)//successfull message Shown for updated password...

    // hint
    const [hint, setHint] = useState(false)
    const [hintText, setHintText] = useState("")

    const [reset, setReset] = useState(false)

    // Retrieving Datas from Database
    const useFetch = () => {
        fetch('http://192.168.82.220/user/', {
            method: 'GET'
        })
            .then(res => res.json())
            // .then(data => { setData(data)})
            .then(data => {
                // console.log(data)
                setData(data)
            })
            .catch(err => console.log("Error Acquired", err));
    }
    // check tha data is valid and make corrections
    // }
    const check1 = () => {

        if (!username) {
            console.log("Please enter a username", data.length)
            setFillName(true)
        }
        else {
            const temp = data.some(checkUser)
            console.log(temp);
            setNoUser(!temp)
            function checkUser(item) {
                return item.username === username.trim();
            }
            data.map((item, index) => {
                // console.log(item.username)
                if (item.username == username) {
                    setHintText(item.hint)
                    setHint(true)

                    if (item.answer == answer) {
                        console.log("answer is" + item.answer)
                        setReset(true)
                    }
                }
                else {
                    // Alert.alert("User Already Exist", "Please Enter New Username")
                    // if (index == data.length) {
                    // }
                }
            })
            setFillName(false)
        }
    }
    const check2 = () => {
        if (!answer) {
            setFillAnswer(true)
        }
        else {
            const temp = data.some(checkAnswer)
            console.log(temp);
            setAnswerNotMacth(!temp)
            function checkAnswer(item) {
                return item.answer === answer.trim();
            }
            setFillAnswer(false)
        }
        if (!username) {
            console.log("Please enter a username")
            setFillName(true)
        }
        else {
            data.map((item, index) => {
                // console.log(item.username)
                if (item.username == username) {
                    setHintText(item.hint)
                    setHint(true)
                    if (item.answer == answer) {
                        console.log("answer is" + item.answer)
                        setReset(true)
                    }
                }
            })
            setFillName(false)
        }
    }
    const checker = () => {
        // console.log(username, password, answer)
        if (!password) {
            setFillPassword(true)
        }
        else {
            setFillPassword(false)
        }
        if (!confirmPassword) {
            setError(true)
        }
        else {
            setError(false)
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
        if (password.length > 4 && confirmPassword.length > 4) {
            if (password === confirmPassword) {
                console.log("password and confirm Password same...")
                data.map(async (item) => {
                    // console.log(item.username, item.password)
                    if (item.username === username.trim()) {
                        temp1 = item.hint
                        temp2 = item.answer
                        const options = {
                            method: 'PUT',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                "username": username,
                                "password": password,
                                "hint": temp1,
                                "answer": temp2
                            }),
                        };
                        try {
                            const response = await fetch(`http://192.168.82.220/user/${item.id}/`, options);
                            const responseData = await response.json();
                            console.log(responseData);
                            // setSuccessful(true)
                            setUserName("")
                            setPassword("")
                            setAnswer("")
                            setConfirmPassword("")
                            setSuccessful(true)
                            setHint(false)
                            setReset(false)
                            // setConfirmPassword("")
                        } catch (error) {
                            console.error(error);
                        }
                        console.log("Enter User is New User...")
                        // setValid(false)
                        // Alert.alert("User Already Exist", "Please Enter New Username")
                    }
                    else {
                        // setValid(true)
                        console.log("new user")
                    }
                })
            }
        }
    }
    useEffect(() => {
        useFetch()
    }, [fillName, fillPassword, fillAnswer, username, password, noUser, hint, answer, accuracy, answerNotMatch])
    return (
        <KeyboardAvoidingView
            behavior='position' keyboardVerticalOffset={-145}
            style={{ flex: 1 }}
        >
            <View>
                <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#0E5E6F', '#3A8891', '#192F6A']}>
                    <View style={styles.container}>
                        <View style={styles.headerWrapper}>
                            <TextInput
                                style={[styles.input, { marginTop: 20 }]}
                                value={username}
                                placeholder="U S E R N A M E"
                                placeholderTextColor="white"
                                onChangeText={(text) => setUserName(text)}
                            />
                            {fillName ?
                                <Text style={{ color: 'red', left: 0, letterSpacing: 2, fontSize: 12 }}>enter the username</Text>
                                : null
                            }
                            {noUser == true && fillName == false ?
                                <Text style={{ color: 'red', left: 0, letterSpacing: 2, fontSize: 12 }}>user not valid</Text>
                                : null
                            }
                        </View>
                        {!hint ?
                            <TouchableOpacity style={[styles.loginBtn, { marginTop: 20 }]}>
                                <Text style={styles.loginText} onPress={() => check1()}>Next</Text>
                            </TouchableOpacity>
                            : null
                        }
                        {
                            hint ?
                                <View style={styles.headerWrapper}>
                                    <View style={{ width: 250 }}>
                                        <Text style={{ color: '#696969' }}>{`hint : ${hintText}`}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TextInput
                                            style={styles.input}
                                            value={answer}
                                            placeholder="A N S W E R"
                                            placeholderTextColor="white"
                                            // secureTextEntry={secureAnswer}
                                            onChangeText={(answer) => setAnswer(answer)}
                                        />
                                        {/* <FontAwesome5 name={secureAnswer ? 'eye-slash' : 'eye'}
                                    size={18} color={'black'}
                                    style={{ paddingTop: 18, marginLeft: -30 }}
                                    onPress={() => setSecureAnswer(!secureAnswer)}
                                /> */}
                                    </View>
                                    {fillAnswer ?
                                        <Text style={{ color: 'red', left: 0, letterSpacing: 2, marginBottom: 0, fontSize: 12 }}>enter the answer</Text>
                                        : null
                                    }
                                    {answerNotMatch == true && fillAnswer == false ?
                                        <Text style={{ color: 'red', left: 0, letterSpacing: 2, marginBottom: 0, fontSize: 12 }}>answer didn't match</Text>
                                        : null
                                    }
                                </View>
                                : null
                        }
                        {hint && !reset ?
                            <TouchableOpacity style={styles.loginBtn}>
                                <Text style={styles.loginText} onPress={() => check2()}>Next</Text>
                            </TouchableOpacity>
                            : null
                        }
                        {
                            reset ?
                                (
                                    <View>
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
                                                <Text style={{ color: 'red', left: 0, letterSpacing: 2, marginBottom: 0, fontSize: 12 }}>enter the answer</Text>
                                                : null
                                            }
                                            {passwordLength == true && fillPassword == false ?
                                                <Text style={{ color: 'red', left: 0, letterSpacing: 2, marginBottom: 0, fontSize: 12 }}>password atleast five Characters.</Text>
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
                                                    secureTextEntry={icon}
                                                    onChangeText={(text) => setConfirmPassword(text)}
                                                />
                                                <FontAwesome5 name={icon ? 'eye-slash' : 'eye'} size={18} color={'black'}
                                                    onPress={() => setIcon(!icon)}
                                                    style={{ paddingTop: 18, marginLeft: -30 }} />
                                            </View>

                                            {Error || accuracy ?
                                                <Text style={{ color: 'red', left: 0, letterSpacing: 2, marginBottom: 0, fontSize: 12 }}>{accuracy ? "Passsword didn't match." : "enter the confirm password."}</Text>
                                                : null
                                            }
                                            {/* {confirmPasswordLength == true && Error == false ?
                                                <Text style={{ color: 'red', left: 0, letterSpacing: 2, marginBottom: 0, fontSize: 12 }}>password atleast five Characters.</Text>
                                                : null
                                            } */}
                                        </View>
                                        <TouchableOpacity style={[styles.loginBtn, { marginLeft: 75, }]}>
                                            <Text style={styles.loginText} onPress={() => checker()}>LOGIN</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                                : null
                        }

                        <View>
                            {/* {noUser ?
                            <Text style={{ color: 'red', marginTop: 23 }}>Username Invalid</Text>
                            : null
                        } */}
                            {
                                successful ?
                                    <Text style={{ color: 'white', marginTop: 20, fontWeight: 'bold' }}>Your registration was successful.</Text>
                                    : null
                            }
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </KeyboardAvoidingView>
    )
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
        marginTop: 40,
        backgroundColor: '#5B8FB9',
        // marginLeft: 75,
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

    }
});