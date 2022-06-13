import React from "react";

import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { apiURL } from "../utils/api";

import { StatusBar } from 'expo-status-bar';

import _ from "lodash";
import { ScreenThemeContext } from "./theme";

export const AuthContext = React.createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = React.useState({});
  const { screenTheme } = React.useContext(ScreenThemeContext)

  auth.onAuthStateChanged(() => {
    if (auth.currentUser) {
      getUser(auth.currentUser.email)
    }
  })

  async function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function getUser(email, reload) {
    if (!_.isEmpty(user) && !reload) return;

    apiURL.get(`/users/${email}`).then(response => {
      setUser(response.data);
    })
  }

  return (
    <AuthContext.Provider value={{ 
      signIn, 
      user, 
      getUser,
      setUser
    }}>
      {children}

      <StatusBar style={'dark' === screenTheme ? "light" : "dark"} />
    </AuthContext.Provider>
  )
}