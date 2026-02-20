import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const AUTH_KEY = 'empowerher_auth'
const USERS_KEY = 'empowerher_users'

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const stored = localStorage.getItem(AUTH_KEY)
        if (stored) {
            try {
                setUser(JSON.parse(stored))
            } catch { }
        }
        setLoading(false)
    }, [])

    const getUsers = () => {
        try {
            return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
        } catch { return [] }
    }

    const signup = (name, email, password) => {
        const users = getUsers()
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            return { success: false, error: 'An account with this email already exists.' }
        }
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            joinedAt: new Date().toISOString()
        }
        users.push(newUser)
        localStorage.setItem(USERS_KEY, JSON.stringify(users))

        const authUser = { id: newUser.id, name: newUser.name, email: newUser.email, joinedAt: newUser.joinedAt }
        localStorage.setItem(AUTH_KEY, JSON.stringify(authUser))
        // Also update the app-level user so Dashboard picks up the name
        localStorage.setItem('empowerher_currentUser', JSON.stringify({
            id: authUser.id,
            firstName: name.split(' ')[0],
            lastName: name.split(' ').slice(1).join(' '),
            email: authUser.email,
            joinedAt: authUser.joinedAt
        }))
        setUser(authUser)
        return { success: true }
    }

    const login = (email, password) => {
        const users = getUsers()
        const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
        if (!found) {
            return { success: false, error: 'Invalid email or password.' }
        }
        const authUser = { id: found.id, name: found.name, email: found.email, joinedAt: found.joinedAt }
        localStorage.setItem(AUTH_KEY, JSON.stringify(authUser))
        localStorage.setItem('empowerher_currentUser', JSON.stringify({
            id: authUser.id,
            firstName: found.name.split(' ')[0],
            lastName: found.name.split(' ').slice(1).join(' '),
            email: authUser.email,
            joinedAt: authUser.joinedAt
        }))
        setUser(authUser)
        return { success: true }
    }

    const logout = () => {
        localStorage.removeItem(AUTH_KEY)
        localStorage.removeItem('empowerher_currentUser')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}

export default AuthContext
