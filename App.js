/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import KochavaTracker from 'react-native-kochava-tracker';

const configTracker  = () => {
  const configMapObject = {}
  //configMapObject[KochavaTracker.PARAM_ANDROID_APP_GUID_STRING_KEY] = "_YOUR_ANDROID_APP_GUID";
  //configMapObject[KochavaTracker.PARAM_WINDOWS_APP_GUID_STRING_KEY] = "_YOUR_WINDOWS_APP_GUID";
  configMapObject[KochavaTracker.PARAM_LOG_LEVEL_ENUM_KEY] = KochavaTracker.LOG_LEVEL_ENUM_DEBUG_VALUE;
  configMapObject[KochavaTracker.PARAM_IOS_APP_GUID_STRING_KEY] = '';
  KochavaTracker.configure(configMapObject);
}

const setIdentity = opts => {
  const config = {}
  config['user_id'] = opts.user_id
  KochavaTracker.setIdentityLink(config);
}

const sendEventString = opts =>
  KochavaTracker.sendEventString(opts.event, opts.str);


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  componentDidMount() {
    console.log('.....component mounted.....');
    configTracker();
    setIdentity({user_id: 'test-user-id'});
    sendEventString({event: 'my_event', str: 'event_string'});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <View>
          <Button 
           onPress={() => sendEventString({event: 'button_click', str: 'clicked'})}
           title='Event'/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
