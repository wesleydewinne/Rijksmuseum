// FavoriteButton.jsx
import { FaStar, FaRegStar } from 'react-icons/fa';
import './ButtonFavorite.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext.jsx';

function FavoriteButton({ isFavorite = false, onToggle }) {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.stopPropagation(); // voorkom doorklikken naar detailpagina
        if (!user) {
            navigate('/login');
            return;
        }

        if (onToggle) onToggle(!isFavorite);
    };

    return (
        <div className="favorite-button" onClick={handleClick}>
            {isFavorite ? (
                <FaStar className="icon-filled" />
            ) : (
                <FaRegStar className="icon-empty" />
            )}
        </div>
    );
}

export default FavoriteButton;
