import React, { useEffect, useState } from 'react';
import { StyleSheet, Modal } from 'react-native';
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import store from "@store/store";

import BottomTabs from '@/components/bottomtabs';
import ModalOpen from '@/components/modalopen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '@/pages/login';

function App() {
  const [islogin,setLogin] = useState(false)
  return (
    <Provider store={store}>
      {!islogin ? <Login setLogin={()=>{setLogin(true)}} />:
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>}
    </Provider>
  );
}

const styles = StyleSheet.create({

});
export default App;
