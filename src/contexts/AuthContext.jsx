import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [userProfile, setUserProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchUserProfile = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single()
            if (error) throw error
            setUserProfile(data)
            return data
        } catch (err) {
            console.error('Error fetching user profile:', err)
            setUserProfile(null)
            return null
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
            if (session?.user) {
                fetchUserProfile(session.user.id)
            }
            setLoading(false)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setUser(session?.user ?? null)
                if (session?.user) {
                    await fetchUserProfile(session.user.id)
                } else {
                    setUserProfile(null)
                }
                setLoading(false)
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    const signUp = async (email, password, name) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name } },
        })
        if (error) throw error

        // The Postgres trigger on auth.users automatically creates
        // the public.users row using raw_user_meta_data.name
        if (data.user) {
            // Small delay to let the trigger run before fetching
            await new Promise((r) => setTimeout(r, 500))
            await fetchUserProfile(data.user.id)
        }

        return data
    }

    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) throw error
        if (data.user) {
            await fetchUserProfile(data.user.id)
        }
        return data
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        setUser(null)
        setUserProfile(null)
    }

    const value = {
        user,
        userProfile,
        loading,
        signUp,
        signIn,
        signOut,
        fetchUserProfile,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
