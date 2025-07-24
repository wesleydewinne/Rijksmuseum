// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
    return (
        <main className="notfound-page">
            <section className="notfound-content">
                <h1>Pagina niet gevonden</h1>
                <p>
                    De pagina die je zoekt bestaat niet. Ga terug naar de{' '}
                    <Link to="/" className="notfound-link">homepagina</Link>.
                </p>
            </section>
        </main>
    );
}

export default NotFoundPage;
