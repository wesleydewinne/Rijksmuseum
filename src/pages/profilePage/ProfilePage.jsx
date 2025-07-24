import { useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext.jsx';
import './ProfilePage.css'
import {UserCirclePlus} from "phosphor-react";

function ProfilePage() {
    const { user, refreshUser, localAvatar } = useAuth();

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    if (!user) {
        return <p>Je bent niet ingelogd.</p>;
    }

    return (
        <>
            <section className="profile-header">
                <h3>Welkom, {user.username} </h3>
            </section>

            <section className="profile-content">
                <article className="profile-card">
                    {localAvatar ? (
                        <img
                            src={localAvatar}
                            alt={`Profielfoto van ${user.username}`}
                            className="profile-avatar"
                        />
                    ) : (
                        <div className="profile-placeholder">
                            {user.username?.[0]?.toUpperCase() || "?"}
                        </div>
                    )}
                    <p className="profile-name">{user.username}</p>
                    <p className="profile-email">{user.email}</p>
                </article>

                <article className="profile-info">
                    <h2 className="profile-info__title">Informatie over de Rijksmuseum-app!</h2>

                    <p className="profile-info__paragraph">
                        Zodra je bent ingelogd, open je de volledige kracht van onze app. Je kunt namelijk jouw
                        favoriete kunstwerken gemakkelijk toevoegen aan je persoonlijke favorietenpagina. Dit geeft
                        je de mogelijkheid om een eigen collectie op te bouwen van de werken die jij bijzonder vindt.
                    </p>

                    <p className="profile-info__paragraph">
                        Op de favorietenpagina zie je een overzicht van de kunstwerken die je hebt opgeslagen. Wil je
                        meer details over een specifiek kunstwerk, dan klik je eenvoudig op de betreffende foto. Dit
                        brengt je naar een speciale detailpagina, waar je uitgebreid leesbaar krijgt welke
                        achtergrondinformatie,
                        ingrediënten van de kunst en de context ervan worden weergegeven. Zo blijf je telkens goed
                        geïnformeerd
                        over de kunstwerken die je inspireert.
                    </p>

                    <p className="profile-info__paragraph">
                        Wat de app extra gebruiksvriendelijk maakt, is dat alle door jou toegevoegde favorieten blijven
                        staan zolang je ingelogd bent. Dit betekent dat je jouw verzameling kunt opbouwen en raadplegen
                        zonder dat je je zorgen hoeft te maken over het kwijtraken van je selectie. Zodra je echter
                        uitlogt,
                        worden alle favorieten automatisch verwijderd. Dit maakt deel uit van de sessie-gebaseerde
                        opslag:
                        zodra je weer inlogt, begin je opnieuw met een schone lei en kun je opnieuw favorieten
                        toevoegen.
                    </p>

                    <p className="profile-info__paragraph">
                        Daarnaast is er nog een extra functie: wanneer je in de header op het icoontje <UserCirclePlus size={20}/> klikt, krijg je
                        de mogelijkheid om een afbeelding toe te voegen. Deze afbeelding wordt niet aan de kunstwerken
                        gekoppeld, maar blijft in de header van je profielpagina staan en is daar zichtbaar totdat je
                        besluit uit te loggen. Zo kun je jouw header personaliseren en zorgen voor een unieke,
                        persoonlijke uitstraling op je profiel.
                    </p>


                    <p className="profile-info__paragraph">Samenvattend, wanneer je bent ingelogd:</p>

                    <ul className="profile-info__list">
                        <li className="profile-info__list-item">
                            Kun je kunstwerken aan je favorieten toevoegen.
                        </li>
                        <li className="profile-info__list-item">
                            Leid je, door op een favoriet te klikken, direct naar een detailpagina met uitgebreide
                            informatie over dat kunstwerk.
                        </li>
                        <li className="profile-info__list-item">
                            Blijven je favorieten en toegevoegde afbeeldingen beschikbaar gedurende je sessie.
                        </li>
                        <li className="profile-info__list-item">
                            Worden je favorieten verwijderd zodra je uitlogt, zodat je telkens met een frisse start
                            opnieuw kunt beginnen.
                        </li>
                    </ul>

                    <p className="profile-info__paragraph">
                        Deze dynamische en gebruikersvriendelijke aanpak zorgt ervoor dat je altijd en overal opnieuw de
                        kans
                        krijgt om je favoriete kunstwerken te ontdekken en te bewaren, helemaal afgestemd op jouw
                        persoonlijke kunstsmaak.
                    </p>
                </article>


            </section>
        </>
    );
}

export default ProfilePage;
