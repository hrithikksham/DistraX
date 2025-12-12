/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from '../app.json';
import { AppProviders } from './app/providers/AppProviders';
import { RootNavigator } from './app/navigation/RootNavigator';

const App = () => {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
};

AppRegistry.registerComponent(appName, () => App);