import { createContext, useState,useEffect } from "react";
import axios from 'axios';
export const  Appcontext = createContext();
export default function AppcontextProvider({children}){
    
        
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
      });
    
      const [signupData, setSignupData] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
        role: "",
      });
    
      const [user, setuser] = useState({
        username: "",
        email: "",
        role: "",
        jwt: "",
      });
    
    
        const value = 
        {
            user,setuser,loginData,setLoginData,signupData,setSignupData
        }
         return <Appcontext.Provider value={value}>
             {children}
         </Appcontext.Provider>
}