import { useEffect, useState } from 'react';
import { fetchArtObjectById } from '../../api/axios_rijksmuseum';
import CollectionCard from '../../components/collectionCard/CollectionCard.jsx';
import './FavoritesPage.css';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import PaginationControls from "../../components/paginationControls/PaginationControls.jsx";
import PageSizeSelector from "../../components/pageSizeSelector/PageSizeSelector.jsx";
import Loading from '../../components/loading/Loading.jsx';

function FavoritesPage() {
    const { user } = useAuth();
    const isLoggedIn = !!user;
    const navigate = useNavigate();

    const [favorites, setFavorites] = useState([]);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadFavoritesFromStorage() {
            setLoading(true);
            setError(null);

            try {
                const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
                setFavorites(storedFavorites);

                if (storedFavorites.length > 0) {
                    const results = await Promise.all(
                        storedFavorites.map(async (id) => {
                            try {
                                return await fetchArtObjectById(id);
                            } catch {
                                return null;
                            }
                        })
                    );

                    const validItems = results.filter(item => item !== null);
                    setItems(validItems);
                } else {
                    setItems([]);
                }
            } catch (err) {
                setError('Kon favoriete objecten niet laden.');
            }

            setLoading(false);
        }

        loadFavoritesFromStorage();
    }, []);

    useEffect(() => {
        if (!user) {
            localStorage.removeItem('favorites');
            setFavorites([]);
            setItems([]);
        }
    }, [user]);

    const validItems = items.filter(item => item);
    useEffect(() => {
        setTotalPages(Math.ceil(validItems.length / pageSize));
    }, [validItems, pageSize]);

    const paginatedItems = validItems.slice((page - 1) * pageSize, page * pageSize);

    const handleFavoriteToggle = (objectNumber, isNowFavorite) => {
        const updatedFavorites = isNowFavorite
            ? [...favorites, objectNumber]
            : favorites.filter(id => id !== objectNumber);

        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        if (!isNowFavorite) {
            setItems(items.filter(item => item.objectNumber !== objectNumber));
        }
    };

    const handleCardClick = (objectNumber) => {
        navigate(`/detail/${objectNumber}`);
    };

    return (
        <div className="favorites-page">
            <section className="favorites-title">
                <h2>Mijn favorieten</h2>
            </section>

            <section className="collection-controls-favorites">
                <PageSizeSelector
                    pageSize={pageSize}
                    onChange={(value) => {
                        setPageSize(value);
                        setPage(1);
                    }}
                />
                <PaginationControls
                    page={page}
                    setPage={setPage}
                    isLastPage={page === totalPages}
                    totalPages={totalPages}
                />
            </section>

            {loading && <Loading message="Favorieten worden geladen..." />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && validItems.length === 0 && (
                <div className="no-favorites-message">
                    <p>Je hebt nog geen favorieten.</p>
                </div>
            )}

            {!loading && validItems.length > 0 && (
                <>
                    <section className="collection-list">
                        {paginatedItems.map((item) => (
                            <CollectionCard
                                key={item.objectNumber}
                                imageSrc={item.webImage?.url || 'https://via.placeholder.com/300x200'}
                                title={item.title}
                                objectNumber={item.objectNumber}
                                isFavorite={true}
                                isLoggedIn={isLoggedIn}
                                onFavoriteToggle={(val) => handleFavoriteToggle(item.objectNumber, val)}
                                onCardClick={() => handleCardClick(item.objectNumber)}
                            />
                        ))}
                    </section>

                    <section className="collection-controls bottom">
                        {pageSize >= 25 && (
                            <PaginationControls
                                page={page}
                                setPage={setPage}
                                isLastPage={page === totalPages}
                                totalPages={totalPages}
                            />
                        )}
                    </section>
                </>
            )}
        </div>
    );
}

export default FavoritesPage;
