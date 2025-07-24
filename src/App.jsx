// src/App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import Header from './components/header/Header.jsx';
import Footer from "./components/footer/Footer.jsx";

// Pagina's
import HomePage from './pages/homePage/HomePage.jsx';
import LoginPage from './pages/loginPage/LoginPage.jsx';
import RegisterPage from './pages/registerPage/RegisterPage.jsx';
import ProfilePage from './pages/profilePage/ProfilePage.jsx';
import CollectionPage from './pages/collectionPage/CollectionPage.jsx';
import DetailPage from './pages/detailPage/DetailPage.jsx';
import NotFoundPage from './pages/notFoundPage/NotFoundPage.jsx';
import FavoritesPage from './pages/favoritesPage/FavoritesPage.jsx';
import ApiWakeUp from "./pages/wakeUp/ApiWakeUp.jsx";

function App() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <div className="layout">
            <ApiWakeUp />

            <Header />

            <main className={`main${isHomePage ? ' home' : ''}`}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/collection" element={<CollectionPage />} />

                    {/* Beveiligde routes */}
                    <Route path="/favorite" element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
                    <Route path="/detail/:objectNumber" element={<PrivateRoute><DetailPage /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                    <Route path="/id" element={<PrivateRoute><h1>ID Pagina</h1></PrivateRoute>} />

                    {/* Fallback route */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;
