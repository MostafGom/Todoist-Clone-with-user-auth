import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'
// let auth = getAuth()
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}
const Loading = () => {
    return (
        <div className='d-flex align-items-center justify-content-center w-100' style={{ minHeight: '100vh' }}>
            <div className="spinner-border text-danger" role="status" >
                <span className="sr-only"></span>
            </div>
        </div>
    )
}
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }
    function signout() {
        return auth.signOut()
    }

    useEffect(() => {

        const unsub = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        });

        return () => unsub()
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        signout,
        resetPassword
    }
    return (
        <AuthContext.Provider value={value}>
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    )
}
