import React, { useEffect, useState } from 'react';
import './HomePage.css';
import {
    hasSeenWelcome,
    setWelcomeSeen,
} from '../../utils/welcomeSessionHelper.js';
import { fetchArtObjectById } from '../../api/axios_rijksmuseum.js';

const ART_OBJECT_NUMBERS = ['SK-C-5', 'SK-A-317', 'SK-A-1505'];

function HomePage() {
    const [artworks, setArtworks] = useState([]);
    const [showWelcome, setShowWelcome] = useState(false);
    const [isFirstVisit, setIsFirstVisit] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const firstTime = !hasSeenWelcome();
        setIsFirstVisit(firstTime);

        if (firstTime) {
            setShowWelcome(true);
            setWelcomeSeen();

            setTimeout(() => {
                setShowWelcome(false);
                setIsReady(true);
            }, 9000);
        } else {
            setIsReady(true);
        }
    }, []);

    useEffect(() => {
        const fetchSelectedArtworks = async () => {
            try {
                const responses = await Promise.all(
                    ART_OBJECT_NUMBERS.map((id) => fetchArtObjectById(id))
                );

                const formatted = responses.map((art) => ({
                    objectNumber: art.objectNumber,
                    title: art.title,
                    image: art.webImage?.url,
                }));

                setArtworks(formatted);
            } catch (error) {
                console.error('Fout bij ophalen van kunstobjecten:', error);
            }
        };

        fetchSelectedArtworks();
    }, []);

    const renderAnimatedText = (text) => (
        <h1 className="animated-welcome">
            {text.split('').map((char, index) => (
                <span
                    key={index}
                    className="letter"
                    style={{ animationDelay: `${index * 0.05}s` }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </h1>
    );

    return (
        <>
            {showWelcome && (
                <section className="homepage-intro">
                    <header>
                        {renderAnimatedText('Welkom bij het Rijksmuseum')}
                        <p>Ontdek meesterwerken uit de Nederlandse geschiedenis</p>
                    </header>
                </section>
            )}

            {!showWelcome && isReady && (
                <section className="homepage-artline" aria-label="Uitgelichte kunstwerken">
                    {artworks.map((art, index) => (
                        <figure
                            key={index}
                            className={`homepage-artwork ${index === 1 ? 'highlighted' : ''}`}
                        >
                            <div className="art-image-wrapper">
                                <img src={art.image} alt={art.title} loading="lazy" />
                            </div>
                            <figcaption>{art.title}</figcaption>
                        </figure>
                    ))}
                </section>
            )}
        </>
    );
}

export default HomePage;
