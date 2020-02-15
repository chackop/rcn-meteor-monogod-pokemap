import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './src/SignIn';
import Meteor, { createContainer, Accounts } from 'react-native-meteor';
import PokeMap from './src/PokeMap';
import { AppLoading, Font } from 'expo';
import Roboto
  from './node_modules/native-base/Fonts/Roboto.ttf';
import Roboto_medium
  from './node_modules/native-base/Fonts/Roboto_medium.ttf';


export default function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);
  const SERVER_URL = 'http://localhost:3000/websocket';


  useEffect(() => {
    fontLoad();
    console.log('connecting');
    Meteor.connect(SERVER_URL);
    console.log(Meteor.userId())
    if (Meteor.userId()) {
      flipLogin(true);
    }
  });

  const fontLoad = async () => {
    try {

      await Font.loadAsync({

        Roboto,

        Roboto_medium

      });

      setFontLoaded(true)

    } catch (error) {

      console.log('error loading icon fonts', error);

    }

  }


  const flipLogin = (x) => {
    setLoggedIn(x)
  }

  const signIn = (email, password) => {
    Meteor.loginWithPassword(email, password, (error, data) => {
      if (error) {
        if (error.reason === "User not found") {
          console.log('there was no email');
          Accounts.createUser({ email, password }, (error) => {
            console.log(error);
          })
        }
      }
      else {
        console.log('email');
        //TODO
        flipLogin(true);
      }
    });
    console.log(Meteor.userId())
  }

  const renderView = () => {
    if (!loggedIn) {
      return (
        <SignIn signIn={signIn} />
      )
    }
    else {
      return (
        <PokeMap flipLogin={flipLogin} />
      )
    }
  }

  if (!fontLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        {renderView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
