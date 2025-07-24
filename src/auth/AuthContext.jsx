// src/auth/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios_log';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem('token') || '');
    const [favorites, setFavorites] = useState([]);

    const [localAvatar, setLocalAvatar] = useState(user?.image || null);

    // Avatar-bestand inlezen en als Base64 opslaan
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setLocalAvatar(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // Voeg token toe aan alle axios requests
    useEffect(() => {
        const interceptor = api.interceptors.request.use((config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                delete config.headers.Authorization;
            }
            return config;
        });

        return () => api.interceptors.request.eject(interceptor);
    }, [token]);

    // Gebruiker ophalen met token
    const refreshUser = useCallback(async () => {
        try {
            const { data } = await api.get('/user');
            console.log('refreshUser haalt user data op:', data);
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
        } catch (err) {
            console.error('Kon gebruiker niet ophalen:', err);
        }
    }, []);

    // Inloggen
    const login = async (username, password) => {
        try {
            const { data } = await api.post('/auth/signin', { username, password });

            const token = data.accessToken;
            setToken(token);
            localStorage.setItem('token', token);

            await refreshUser();

            try {
                const favRes = await api.get(`/favorites/${data.id}`);
                setFavorites(favRes.data || []);
            } catch (err) {
                console.warn('Favorieten ophalen mislukt:', err);
                setFavorites([]);
            }

            navigate('/profile');
        } catch (err) {
            const msg = err.response?.data?.message || 'Inloggen mislukt';
            throw new Error(msg);
        }
    };

    // Registreren
    const register = async (formData) => {
        try {
            await api.post('/auth/signup', formData);
            await login(formData.username, formData.password);
        } catch (err) {
            const msg = err.response?.data?.message || 'Registratie mislukt';
            throw new Error(msg);
        }
    };

    // Uitloggen
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('favorites');
        setUser(null);
        setToken('');
        setFavorites([]);
        setLocalAvatar(null);
        navigate('/login');
    };

    const isLoggedIn = !!user;

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn,
                login,
                logout,
                register,
                refreshUser,
                favorites,
                setFavorites,
                localAvatar,
                setLocalAvatar,
                handleFileChange,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
