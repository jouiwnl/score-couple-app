import React from "react";

import { auth } from '../../firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { apiURL } from "../utils/api";

import _ from "lodash";

export const AuthContext = React.createContext({});

export default function AuthProvider({ children }) {

  const [user, setUser] = React.useState({});
  const [workspace, setWorkspace] = React.useState({});

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
      return response.data;
    }).then(user => {
      apiURL.get(`/workspaces/user/${user.id}`).then(response => {
        setWorkspace(response.data)
      })
    })
  }

  async function signOutNow() {
    return signOut(auth).then(() => {
      setUser({});
      setWorkspace({});
    })
  }

  return (
    <AuthContext.Provider value={{ 
      signIn, 
      signOutNow,
      user, 
      getUser,
      setUser,
      workspace,
      setWorkspace
    }}>
      {children}
    </AuthContext.Provider>
  )
}