import { useState, useEffect } from 'react';
import { fetchArtObjects } from '../../api/axios_rijksmuseum';
import PaginationControls from '../../components/paginationControls/PaginationControls.jsx';
import CollectionCard from '../../components/collectionCard/CollectionCard.jsx';
import SearchBar from '../../components/searchBar/SearchBar.jsx';
import PageSizeSelector from '../../components/pageSizeSelector/PageSizeSelector.jsx';
import Loading from '../../components/loading/Loading.jsx';
import './CollectionPage.css';
import { useAuth } from '../../auth/AuthContext';
import { filterUniqueByTitle } from '../../utils/filterUnique.js';

function CollectionPage() {
    const { user } = useAuth();
    const isLoggedIn = !!user;
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    useEffect(() => {
        async function loadPage() {
            setLoading(true);
            setError(null);
            try {
                const overFetchFactor = 5;
                const fetchAmount = Math.min(pageSize * overFetchFactor, 100); // Max 100 kaarten

                const { artObjects, count } = await fetchArtObjects({
                    pageSize: fetchAmount,
                    currentPage: page,
                    searchTerm: searchTerm.trim(),
                });

                const uniqueItems = filterUniqueByTitle(artObjects).slice(0, pageSize);
                setItems(uniqueItems);
                setTotalPages(Math.ceil(count / pageSize));
            } catch (err) {
                setError('Kan de data niet laden.');
            }
            setLoading(false);
            setInitialLoad(false);
        }

        loadPage();
    }, [page, pageSize, searchTerm]);

    const handleSearch = (term) => {
        setSearchTerm(term);
        setPage(1);
    };

    const handleFavoriteToggle = (objectNumber, newFavoriteStatus) => {
        if (!isLoggedIn) {
            window.location.href = '/login';
            return;
        }

        const updatedFavorites = newFavoriteStatus
            ? [...favorites, objectNumber]
            : favorites.filter((id) => id !== objectNumber);

        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <>
            <section className="collection-title">
                <h2>De Collectie</h2>
            </section>

            <section className="collection-controls">
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
                <SearchBar onSearch={handleSearch} />
            </section>

            <section className="collection-list">
                {initialLoad && <Loading message="De collectie wordt geladen..." />}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!initialLoad && items.length > 0 && (
                    items.map((item) => (
                        <CollectionCard
                            key={item.objectNumber}
                            imageSrc={item.webImage?.url || 'https://via.placeholder.com/300x200'}
                            title={item.title}
                            objectNumber={item.objectNumber}
                            isFavorite={favorites.includes(item.objectNumber)}
                            isLoggedIn={isLoggedIn}
                            onCardClick={(number) => {
                                if (!isLoggedIn) {
                                    window.location.href = '/login';
                                } else {
                                    console.log('Card clicked with objectNumber:', number);
                                }
                            }}
                            onFavoriteToggle={(newFavoriteStatus) =>
                                handleFavoriteToggle(item.objectNumber, newFavoriteStatus)
                            }
                        />
                    ))
                )}
                {!initialLoad && !loading && items.length === 0 && <p>Geen resultaten gevonden.</p>}
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
    );
}

export default CollectionPage;