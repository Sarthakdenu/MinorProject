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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
      useEffect(() => {
        const fetchReports = async () => {
          try {
            const response = await axios.get('http://localhost:3001/api/getAllReports');
        
        console.log("API Response:", response.data); // Debugging log

        if (Array.isArray(response.data)) {
          setReports((prevReports) => [...response.data]); // Ensure state update
          console.log("Updated Reports State:", reports);
        } else {
          console.error("API did not return an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
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