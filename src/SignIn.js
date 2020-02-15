import React from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import { Form, Item, Label, Input, Button } from 'native-base';

let myBackground = require('../assets/icons/landing.jpg');
let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const SignIn = ({ signIn }) => {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");

    const logIn = () => {
        let email = email;
        let password = password;

        signIn(email, password);
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <Image source={myBackground} style={styles.backgroundImage}>
                    <View style={styles.inputStyle}>
                        <Form>
                            <Item floatingLabel>
                                <Label>Email</Label>
                                <Input
                                    autoCorrect={false}
                                    onChangeText={(email) => setEmail(email)}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input
                                    autoCorrect={false}
                                    onChangeText={(password) => setpassword(password)}
                                    secureTextEntry
                                />
                            </Item>
                        </Form>
                        <View style={{ marginTop: 10 }}>
                            <Button
                                primary
                                block
                                onPress={logIn}
                            >
                                <Text style={{ color: 'white' }}>Sign In/Sign Up</Text>
                            </Button>
                        </View>
                    </View>
                </Image>
            </View>
        </>
    )
}

const styles = StyleSheet.create({{
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: width,
        height: height
    },
    inputStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 10
    }
});


export default SignIn
