/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, {Defs, LinearGradient, Stop, Rect} from 'react-native-svg';
import {Logo} from './src/Logo';

export const canvasWidth = Dimensions.get('window').width;
export const canvasHeight = Dimensions.get('window').height;

const App = () => {
  const containerStyle: ViewStyle = {
    flex: 1,
    justifyContent: 'center',
  };

  const darkness = useSharedValue(0);

  const darknessStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      darkness.value,
      [0, 1],
      ['#fff', '#000'],
    );

    return {
      backgroundColor: backgroundColor,
      width: canvasWidth,
      height: canvasHeight,
      opacity: 0.1,
    };
  });

  useEffect(() => {
    darkness.value = withRepeat(
      withTiming(1, {duration: 2000, easing: Easing.inOut(Easing.ease)}),
      -1,
      true,
    );
  });

  const LinearGradientView = () => {
    return (
      <View style={StyleSheet.absoluteFill}>
        <Svg height={canvasHeight} width={canvasWidth}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="1" x2="1" y2="0">
              <Stop offset="0%" stopColor="#e03364" stopOpacity="1" />
              <Stop offset="50%" stopColor="#001a46" stopOpacity="1" />
              <Stop offset="100%" stopColor="#001a46" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Rect
            x="0"
            y="0"
            width={canvasWidth}
            height={canvasHeight}
            fill="url(#grad)"
          />
        </Svg>
      </View>
    );
  };

  const textInputStyle: TextStyle = {
    color: 'white',
    fontSize: 16,
    height: 48,
    borderRadius: 8,
    borderColor: 'rgba(255,255,255,0.8)',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 24,
    marginVertical: 8,
    paddingHorizontal: 16,
  };

  const ctaButtonStyle: ViewStyle = {
    height: 48,
    backgroundColor: '#e03364',
    justifyContent: 'center',
    marginTop: 32,
  };

  const fullFlex = {flex: 1};

  const sublineStyle: TextStyle = {
    fontSize: 14,
    marginVertical: 4,
    fontWeight: '300',
    color: 'white',
    alignSelf: 'center',
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={fullFlex}>
      <StatusBar barStyle={'light-content'} />
      <LinearGradientView />
      <Animated.View style={[darknessStyle, StyleSheet.absoluteFill]} />
      <SafeAreaView style={fullFlex}>
        <View style={containerStyle}>
          <View>
            <Logo />
            <Text style={sublineStyle}>Ssshhhhh, just relax</Text>
          </View>
          <View style={{marginTop: 32}}>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              style={textInputStyle}
              placeholder="email"
              placeholderTextColor="rgba(255, 255, 255,0.5)"
            />
            <TextInput
              autoCapitalize="none"
              secureTextEntry={true}
              style={textInputStyle}
              placeholder="password"
              placeholderTextColor="rgba(255, 255, 255,0.5)"
            />
            <TouchableOpacity style={ctaButtonStyle}>
              <Text style={{fontSize: 16, color: 'white', alignSelf: 'center'}}>
                login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default App;
