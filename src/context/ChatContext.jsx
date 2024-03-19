import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer, useContext } from "react";
import { auth } from "../misc/firebase";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({children}) => {

  const {currentUser} = useContext(AuthContext);

  const INITIAL_STATE = {
    chatId: "null",
    user: null
  }

  const chatReducer = (state,action) => {
    switch(action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId: currentUser.uid > action.payload.uid 
          ? currentUser.uid + action.payload.uid 
          : action.payload.uid + currentUser.uid
        }
      default: 
      break;
    }
  }

  const [state,dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}