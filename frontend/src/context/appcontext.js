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
      const [reports, setReports] = useState([]);

      useEffect(() => {
        const fetchReports = async () => {
          try {
            const response = await axios.get('http://localhost:3001/api/getAllReports');
            setReports(response.data.reports);
          } catch (error) {
            console.error('Error fetching reports:', error);
          }
        };
    
        fetchReports();
      }, []);
    
    
        const value = 
        {
            user,setuser,loginData,setLoginData,signupData,setSignupData,reports,setReports
        }
         return <Appcontext.Provider value={value}>
             {children}
         </Appcontext.Provider>
}