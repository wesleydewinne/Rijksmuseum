// CollectionCard.jsx
import './CollectionCard.css';
import FavoriteButton from '../button/favorite/ButtonFavorite.jsx';

function CollectionCard({
                            imageSrc,
                            title,
                            objectNumber,
                            isFavorite = false,
                            onFavoriteToggle,
                            isLoggedIn = false,
                            onCardClick,
                        }) {

    const handleFavoriteToggle = (newFavoriteStatus) => {
        if (onFavoriteToggle) onFavoriteToggle(newFavoriteStatus);
    };

    return (
        <article
            className="collection-card"
            onClick={() => onCardClick?.(objectNumber)}
            tabIndex={0}
            role="button"
            aria-pressed="false"
        >
            <img src={imageSrc} alt={title} className="card-image" />
            <aside className="card-overlay">
                <h3 className="card-title">{title}</h3>
                {isLoggedIn && (
                    <div className="card-favorite">
                        <FavoriteButton
                            isFavorite={isFavorite}
                            onToggle={handleFavoriteToggle}
                        />
                    </div>
                )}
            </aside>
            {!isLoggedIn && (
                <aside className="login-tooltip" role="tooltip">
                    Log in om meer info te zien
                </aside>
            )}
        </article>
    );
}

export default CollectionCard;
