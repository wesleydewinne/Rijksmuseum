// src/pages/LoginPage.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            navigate('/profile');
        }
    }, [user, navigate]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await login(form.username, form.password);
        } catch {
            setError('Inloggen is mislukt');
        }
    }

    return (
        <div className="login-page">
            <section className="login-card">
                <h2>Login</h2>

                {error && <div className="login-error">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <fieldset>
                        <label>Gebruikersnaam</label>
                        <input
                            type="text"
                            value={form.username}
                            onChange={e => setForm({ ...form, username: e.target.value })}
                            placeholder="Gebruikersnaam"
                            required
                        />
                    </fieldset>

                    <fieldset>
                        <label>Wachtwoord</label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            placeholder="Wachtwoord"
                            required
                        />
                    </fieldset>

                    <button type="submit">Inloggen</button>
                </form>

                <p className="register-text">
                    Nog geen account? <Link to="/register">Registreren</Link>
                </p>
            </section>
        </div>
    );
}
