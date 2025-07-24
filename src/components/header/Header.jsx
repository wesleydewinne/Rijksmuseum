// src/components/Header.jsx
import { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext.jsx';
import { SignIn, SignOut, UserCirclePlus } from 'phosphor-react';
import BasicButton from '../button/basic/BasicButton.jsx';
import './Header.css';
import LogoColor from '../../../src/assets/logo-icon-color.png';

function Header() {
    const {
        user,
        logout,
        localAvatar,
        handleFileChange
    } = useAuth();

    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getLinkClass = ({ isActive }) =>
        isActive ? 'nav-link active' : 'nav-link';

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <header className="header">
            <div className="header-inner">
                <div className="logo-container">
                    <img src={LogoColor} alt="Bedrijfslogo" />
                </div>

                <nav className="nav-center">
                    <ul className="nav-list nav-left">
                        <li><NavLink to="/" className={getLinkClass}>Home</NavLink></li>
                        <li><NavLink to="/collection" className={getLinkClass}>Collectie</NavLink></li>
                        {user && (
                            <>
                                <li><NavLink to="/favorite" className={getLinkClass}>Favorieten</NavLink></li>
                                <li><NavLink to="/profile" className={getLinkClass}>Profiel</NavLink></li>
                            </>
                        )}
                    </ul>
                </nav>

                <div className="nav-right">
                    {!user ? (
                        <NavLink to="/login" className={getLinkClass}>
                            <SignIn size={16}/> Login
                        </NavLink>
                    ) : (
                        <>
                            <div className="user-info">
                                <div
                                    className="user-avatar-wrapper"
                                    onClick={handleAvatarClick}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAvatarClick()}
                                    title="Klik om avatar te wijzigen"
                                >
                                    {localAvatar ? (
                                        <img
                                            src={localAvatar}
                                            alt={user.username}
                                            className="user-avatar"
                                        />
                                    ) : (
                                        <UserCirclePlus size={55} className="user-avatar-icon"/>
                                    )}
                                </div>
                                <span className="user-name">{user.username}</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{display: 'none'}}
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                            </div>
                            <BasicButton
                                className="btn-danger"
                                onClick={handleLogout}
                                icon={<SignOut size={20}/>}
                                iconPosition="left"
                            >
                                Log uit
                            </BasicButton>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
