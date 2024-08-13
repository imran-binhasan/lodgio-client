import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import AuthContext from "./AuthContext";
import { auth } from "../configs/firebase";
import { useEffect, useState } from "react";




const AuthProvider = ({children}) => {

const [loading,setLoading] = useState(true);
const [user,setUser] = useState(null)


const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateNewUser = (userData) => {
    return updateProfile(auth.currentUser, userData);
  };


const handleGoogleLogin = ()=> {
    setLoading(true)
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then(res => {
        const user = res.user;
        setUser(user)
    })
    .catch((error) => {
        console.log(error.message); 
      });

} 

const logoutUser = () => {
    setLoading(true)
    signOut(auth)
}

    const authInfo = {
        user,
        setUser,
        handleGoogleLogin,
        logoutUser,
        loading,
        setLoading,
        createUser,
        loginUser,
        updateNewUser
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
                setUser(currentUser);
                console.log('Updated')
                setLoading(false)
        });
        return ()=> unsubscribe();
    },[])
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;