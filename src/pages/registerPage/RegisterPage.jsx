import { useState } from 'react';
import { useAuth } from '../../auth/AuthContext.jsx';
import {Link, useNavigate} from 'react-router-dom';
import './RegisterPage.css';

export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        role: ['user']
    });
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await register(form);
            navigate('/login');
        } catch {
            setError('Registratie is mislukt');
        }
    }

    return (
        <div className="register-page">
            <section className="register-card">
                <h2>Registreren</h2>

                {error && <div className="register-error">{error}</div>}

                <form onSubmit={handleSubmit} className="register-form">
                    <fieldset>
                        <label>Gebruikersnaam</label>
                        <input
                            type="text"
                            value={form.username}
                            onChange={e => setForm({...form, username: e.target.value})}
                            placeholder="Gebruikersnaam"
                            required
                        />
                    </fieldset>

                    <fieldset>
                        <label>Email</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={e => setForm({...form, email: e.target.value})}
                            placeholder="Email"
                            required
                        />
                    </fieldset>

                    <fieldset>
                        <label>Wachtwoord</label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={e => setForm({...form, password: e.target.value})}
                            placeholder="Wachtwoord"
                            required
                        />
                    </fieldset>

                    <button type="submit">Registreren</button>
                    <p className="login-text">
                        Heeft u een account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </section>
        </div>
    );
}
