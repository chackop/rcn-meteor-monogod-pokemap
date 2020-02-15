import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './src/SignIn';
import Meteor, { createContainer, Accounts } from 'react-native-meteor';
import PokeMap from './src/PokeMap';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    console.log('connecting');
    Meteor.connect(SERVER_URL);
    console.log(Meteor.userId())
    if (Meteor.userId()) {
      flipLogin(true);
    }
  });

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

  return (
    <View style={styles.container}>
      {renderView()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
