import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Fetch additional user data from Firestore if needed
                try {
                    const docRef = doc(db, 'users', firebaseUser.uid)
                    const docSnap = await getDoc(docRef)

                    let userData = {
                        id: firebaseUser.uid,
                        name: firebaseUser.displayName || 'User',
                        email: firebaseUser.email,
                    }

                    if (docSnap.exists()) {
                        userData = { ...userData, ...docSnap.data() }
                    }

                    // Keep backward compatibility with existing Dashboard
                    localStorage.setItem('empowerher_currentUser', JSON.stringify({
                        id: userData.id,
                        firstName: userData.name.split(' ')[0],
                        lastName: userData.name.split(' ').slice(1).join(' '),
                        email: userData.email,
                        joinedAt: userData.joinedAt || new Date().toISOString()
                    }))

                    setUser(userData)
                } catch (error) {
                    console.error("Error fetching user data:", error)
                    setUser(null)
                }
            } else {
                setUser(null)
                localStorage.removeItem('empowerher_currentUser')
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const signup = async (name, email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const firebaseUser = userCredential.user

            // Set display name in Firebase Auth
            await updateProfile(firebaseUser, { displayName: name })

            // Save additional info in Firestore
            const joinedAt = new Date().toISOString()
            await setDoc(doc(db, 'users', firebaseUser.uid), {
                name,
                email,
                joinedAt
            })

            return { success: true }
        } catch (error) {
            let errorMessage = 'An error occurred during signup.'
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'An account with this email already exists.'
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password must be at least 6 characters.'
            }
            return { success: false, error: errorMessage }
        }
    }

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            return { success: true }
        } catch (error) {
            let errorMessage = 'Invalid email or password.'
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid email or password.'
            }
            return { success: false, error: errorMessage }
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}

export default AuthContext
