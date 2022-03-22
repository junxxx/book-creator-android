/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useRef } from 'react';
import type { Node } from 'react';
import { RNCamera } from 'react-native-camera';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';

import { CreatePage } from './component/api.js';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const [isbn, setIsbn] = useState('')
  const [response, setResponse] = useState('')
  const isDarkMode = useColorScheme() === 'dark';
  let isCreating = false

  const cam = useRef.current;

  const handleBarCodeScanned = ({ data }) => {
    setIsbn(data)
    setResponse("")
  }

  const handleCreateBook = async () => {
    if (isbn == "") {
      return
    }
    if (isCreating) {
      return
    }
    isCreating = true
    console.log('create')
    setResponse(JSON.stringify(await CreatePage(isbn)))
    isCreating = false
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.camera}>
          <RNCamera
            ref={cam}
            style={styles.preview}
            onBarCodeRead={handleBarCodeScanned}
            type={RNCamera.Constants.Type.back}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          >

          </RNCamera>
        </View>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title={"Scanner"}>
            <Text style={styles.isbn}>
              ISBN:{isbn}
            </Text>
          </Section>
          <Section>
            <Button title="Create"
              onPress={handleCreateBook}
            />
          </Section>
          <Section title={"Response"}>
            {response}
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  camera: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
  },
  preview: {
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 400,
    width: 400,
  },
  isbn: {
    textAlign: 'center'
  }
});

export default App;
