# Rijksmuseum

In onze samenleving is er een enorme behoefte aan informatie. Wanneer we iets willen weten, grijpen we snel naar onze
telefoon en zoeken op Google. Dit geldt ook voor bezoekers van het Rijksmuseum, die vaak vooraf de website raadplegen
voor informatie over kunstwerken. Gedetailleerde informatie over de collectie van het Rijksmuseum is zeker te vinden,
maar het vereist meestal goed zoeken en veel doorklikken.

Om dit proces te verbeteren en te vergemakkelijken, heb ik een applicatie ontwikkeld waarin bezoekers van het
Rijksmuseum eenvoudig en snel kunstobjecten kunnen opzoeken via een inlogportaal. Na het inloggen kunnen gebruikers met
behulp van een zoekfunctie gemakkelijk kunstobjecten vinden waarin zij geïnteresseerd zijn. Elk kunstobject heeft een
bijbehorende uitleg om de gebruiker meer context en achtergrondinformatie te bieden.

Er wordt een ruwe voorselectie gedaan, zodat gebruikers op interessegebied kunnen zoeken. Daarnaast kan men een
favorietenlijst samenstellen, waarin de gebruiker objecten kan opslaan die hij of zij graag wil bekijken. Dit stelt de
gebruiker in staat om een persoonlijke top 10 samen te stellen. Bovendien kunnen gebruikers per kunstenaar een selectie
maken, zodat alle werken van een specifieke kunstenaar direct beschikbaar zijn in de applicatie.

Deze applicatie zal de ervaring van het bezoeken van het Rijksmuseum aanzienlijk verbeteren door snelle en gemakkelijke
toegang te bieden tot gedetailleerde informatie over de kunstwerken. Hierdoor kunnen bezoekers hun museumbezoek beter
voorbereiden en optimaliseren.

---

## 🔍 Inhoudsopgave

1. [Over het project](#over-het-project)
2. [Features](#features)
3. [Softwarevereisten](#software-vereisten)
4. [Installatie](#installatie)
5. [Gebruik](#gebruik)
6. [API / Data](#api--data)
7. [Bestandstructuur](#bestandstructuur)
8. [Gebruikte technologieën](#gebruikte-technologieën)
9. [Toekomstige verbeteringen](#toekomstige-verbeteringen)
10. [Bronnen](#bronnen)
11. [Auteur](#auteur)
12. [Licentie](#licentie)
13. [Feedback](#feedback)

---

## Over het project

Mijn project is een webapplicatie waarmee bezoekers van het Rijksmuseum snel en eenvoudig kunstwerken kunnen opzoeken
via een persoonlijk inlogportaal. Gebruikers kunnen zoeken op kunstobject of kunstenaar, favorieten opslaan en een
persoonlijke top samenstellen, om zo hun museumbezoek optimaal voor te bereiden.

---

## Features

✅ Inloggen en registreren <br>
✅ Zoekfunctie met filtermogelijkheden <br>
✅ Detailpagina met uitleg per kunstobject <br>
✅ Favorietenlijst opstellen <br>
✅ Selectie op kunstenaar <br>
✅ Responsive design

---

## Software Vereisten

- [ ] Node.js (versie 18 of hoger)
- [ ] npm (komt standaard met node.js)
- [ ] github (voor het clonen van de repository)
- [ ] Een moderne webbrowser(Chrome, Firefox, Safari, Edge)

## Installatie

Stapsgewijze instructies om je project op te zetten en te draaien:

1. **Clone de repository:**
    ```sh
    git clone [repository-url]
    ```
2. **Dependecies installeren:**
    ```sh
    npm install 
    ``` 
3. **Development server starten:**
   ```sh
   npm run dev 
   ```  

## Beschikbare commando's

| Commando          | Beschrijving                                                       |
|-------------------|--------------------------------------------------------------------|
| `npm run dev`     | Start de ontwikkelserver                                           |
| `npm run build`   | Bouwt de applicatie voor productie in de `dist` map                |
| `npm run preview` | Start een lokale server om de gebouwde productieversie te bekijken |
| `npm run lint`    | Voert ESLint uit om de code te controleren op fouten               |

---

## Gebruik

Leg hier kort uit hoe je de applicatie gebruikt:

1. Start de server
2. Navigeer naar `http://localhost:5173/`
3. Registreer of log in
4. Gebruik de zoekfunctie of filter op kunstenaar/interesse
5. Bekijk kunstobjecten en sla je favorieten op
6. Bekijk je favorieten en druk op de favorite plaatje voor naar de detailpagina’s te gaan

---

## API / Data

Zie kladblok: Links & API

Indien van toepassing:

- Gebruikte API: Rijksmuseum API
- Endpoint: `https://www.rijksmuseum.nl/api/nl/collection`
- Parameters: <br>
  `key`: persoonlijke API-key <br>
  `ps`: page size <br>
  `p`: pagina <br>
  `q`: zoekterm <br>
  `imgonly`: alleen objecten met afbeeldingen


- Gebruikt API: Gebruikersauthenticatie
- Endpoint: `https://frontend-educational-backend.herokuapp.com/api`

---

## Bestandstructuur

```text
.
└── RijksmuseumEindopdracht/
    ├── node_modules
    ├── public/
    │   └── dar
    ├── src/
    │   ├── api/
    │   │   ├── axios.login.js
    │   │   └── axios.rijksmuseum.js
    │   ├── assets/
    │   │   └── logo.icon.png
    │   ├── auth/
    │   │   ├── AuthContext.jsx
    │   │   └── PrivateRoute.jsx
    │   ├── components/
    │   │   ├── button/
    │   │   │   ├── basic/
    │   │   │   │   ├── BasicButton.css
    │   │   │   │   └── BasicButton.jsx
    │   │   │   └── favorite/
    │   │   │       ├── ButtonFavorite.css
    │   │   │       └── ButtonFavorite.jsx
    │   │   ├── collectionCard/
    │   │   │   ├── CollectionCard.css
    │   │   │   └── CollectionCard.jsx
    │   │   ├── footer/
    │   │   │   ├── Footer.css
    │   │   │   └── Footer.jsx
    │   │   ├── header/
    │   │   │   ├── Header.css
    │   │   │   └── Header.jsx
    │   │   ├── loading/
    │   │   │   ├── Loading.css
    │   │   │   └── Loading.jsx    
    │   │   ├── pageSizeSelector/
    │   │   │   ├── PageSizeSelector.css
    │   │   │   └── PageSizeSelector.jsx
    │   │   ├── paginationControls/
    │   │   │   ├── PaginationControls.css
    │   │   │   └── PaginationControls.jsx
    │   │   └── searchBar/
    │   │       ├── SearchBar.css
    │   │       └── SearchBar.jsx
    │   ├── hooks/
    │   │   └── useWakeUpBackend.js 
    │   ├── pages/
    │   │   ├── collectionPage/
    │   │   │   ├── CollectionPage.css
    │   │   │   └── CollectionPage.jsx
    │   │   ├── detailPage  /
    │   │   │   ├── DetailPage.css
    │   │   │   └── DetailPage.jsx
    │   │   ├── favoritesPage/
    │   │   │   ├── FavoritesPage.css
    │   │   │   └── FavoritesPage.jsx
    │   │   ├── homePage/
    │   │   │   ├── Homepage.css
    │   │   │   └── Homepage.jsx
    │   │   ├── loginPage/
    │   │   │   ├── LoginPage.css
    │   │   │   └── LoginPage.jsx
    │   │   ├── notFoundPage/
    │   │   │   ├── NotFoundPage.css
    │   │   │   └── NotFoundPage.jsx
    │   │   ├── profilepage/
    │   │   │   ├── ProfilePage.css
    │   │   │   └── ProfilePage.jsx
    │   │   ├── registerPage/
    │   │   │   ├── RegisterPage.css
    │   │   │   └── RegisterPage.jsx
    │   │   └── wakeUpApiTest/
    │   │       └── WakeUpApiTest.jsx
    │   ├── styles/
    │   │   └── varialbles.css
    │   ├── utils/
    │   │   ├── filterUnique.js
    │   │   └── welkomSessionHelper.js
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .env
    ├── .gitignore
    ├── env.dist
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── README.md
    └── vite.config
```

---

## Gebruikte technologieën

- HTML5
- CSS3
- JavaScript (ES6)
- React
- React DOM
- React Router DOM
- Axios
- React Icons
- Phosphor React
- Vite

---

## Toekomstige verbeteringen

- [ ] Meertaligheid
- [ ] Admin dashboard
- [ ] Verbeterde mobile support
- [ ] Dark mode toggle

---

## Bronnen

- [Edhub](https://edhub.novi.nl)
- [NOVI Educational Backend](https://github.com/hogeschoolnovi/novi-educational-backend-documentation)
- [Rijksmuseum API](https://www.rijksmuseum.nl/nl/api)
- [React documentatie](https://reactjs.org)

---

## Auteur

**Naam:** Wesley De Winne <br>
**📧 E-mail**: wesleydewinne@gmail.com <br>
**🔗 GitHub**: https://github.com/wesleydewinne

---

## Licentie

Vrij te gebruiken onder de MIT-licentie. Voor gebruik van de Rijksmuseum API is een persoonlijke API-key vereist
via https://www.rijksmuseum.nl.

---

## Feedback

Vragen of feedback? Stuur gerust een mailtje of open een issue op GitHub.
