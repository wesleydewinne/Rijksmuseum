import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchArtObjectById } from '../../api/axios_rijksmuseum';
import { FaSearchPlus, FaTimes } from 'react-icons/fa';
import BasicButton from '../../components/button/basic/BasicButton.jsx';
import './DetailPage.css';

function DetailPage() {
    const { objectNumber } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('details');
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const data = await fetchArtObjectById(objectNumber);
                setItem(data || null);
            } catch (e) {
                console.error(e);
                setError('Kon kunstobject niet ophalen.');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [objectNumber]);

    if (loading) return <p>Bezig met laden...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!item) return <p>Geen data beschikbaar.</p>;

    return (
        <article className="detail-page">
            <header className="detail-header">
                <h1>{item.title || 'Geen titel bekend'}</h1>
            </header>

            <section className="detail-content">
                <figure className="detail-image">
                    {item.webImage?.url ? (
                        <div className="image-container" onClick={() => setIsZoomed(true)}>
                            <img src={item.webImage.url} alt={item.title || 'Kunstwerk'} />
                            <span className="zoom-icon"><FaSearchPlus /></span>
                        </div>
                    ) : (
                        <figcaption>Geen afbeelding beschikbaar.</figcaption>
                    )}
                </figure>

                <section className="detail-info">
                    <nav className="tab-buttons">
                        <BasicButton
                            onClick={() => setActiveTab('details')}
                            className={activeTab === 'details' ? 'active' : ''}
                        >
                            Kunstwerk
                        </BasicButton>
                        <BasicButton
                            onClick={() => setActiveTab('artist')}
                            className={activeTab === 'artist' ? 'active' : ''}
                        >
                            Artiest
                        </BasicButton>
                        <BasicButton
                            onClick={() => setActiveTab('location')}
                            className={activeTab === 'location' ? 'active' : ''}
                        >
                            Locatie
                        </BasicButton>
                    </nav>

                    <section className="tab-content">
                        {activeTab === 'details' && (
                            <div>
                                <p><strong>Objectnummer:</strong> {item.objectNumber}</p>
                                <p><strong>Beschrijving:</strong> {item.longTitle || 'Geen beschrijving beschikbaar'}</p>
                                <p><strong>Techniek:</strong> {item.techniques?.join(', ') || 'Niet gespecificeerd'}</p>
                                <p><strong>Datering:</strong> {item.dating?.presentingDate || 'Geen datum bekend'}</p>
                                <p><strong>Categorieën:</strong> {item.objectTypes?.join(', ') || 'Geen categorieën bekend'}</p>
                                <p><strong>Thema's:</strong> {item.classificationIconography?.join(', ') || 'Geen thema’s beschikbaar'}</p>
                                <p><strong>Kunstschool/stijl:</strong> {item.subStyles?.join(', ') || item.school || 'Niet gespecificeerd'}</p>
                            </div>
                        )}

                        {activeTab === 'artist' && (
                            <div>
                                <p><strong>Maker:</strong> {item.principalOrFirstMaker || 'Onbekend'}</p>
                                <p><strong>Nationaliteit:</strong> {item.principalMakerNationality || 'Onbekend'}</p>
                                <p><strong>Geboortejaar:</strong> {item.principalMakerBirthDate || 'Onbekend'}</p>
                                <p><strong>Sterfjaar:</strong> {item.principalMakerDeathDate || 'Onbekend'}</p>
                            </div>
                        )}

                        {activeTab === 'location' && (
                            <div>
                                <p><strong>Locatie in museum:</strong> {item.location || 'Geen locatie bekend'}</p>
                                <p><strong>Afmetingen:</strong>{' '}
                                    {item.dimensions?.map((dim, index) => (
                                        <span key={index}>
                                            {dim.value} {dim.unit} ({dim.type})
                                            {index < item.dimensions.length - 1 && ', '}
                                        </span>
                                    )) || 'Geen afmetingen bekend'}
                                </p>
                            </div>
                        )}
                    </section>
                </section>
            </section>

            {isZoomed && (
                <div className="zoom-overlay" onClick={() => setIsZoomed(false)}>
                    <div className="zoomed-container" onClick={e => e.stopPropagation()}>
                        <img className="zoomed-image" src={item.webImage.url} alt={item.title || 'Kunstwerk'} />
                        <button className="close-button" onClick={() => setIsZoomed(false)}>
                            <FaTimes />
                        </button>
                    </div>
                </div>
            )}
        </article>
    );
}

export default DetailPage;
