import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from "react-redux";
import store from "@store/store";
import WonderWander from '@/wonderwander';

function App() {
  return (
    <Provider store={store}>
      <WonderWander />
    </Provider>
  );
}

const styles = StyleSheet.create({

});
export default App;
