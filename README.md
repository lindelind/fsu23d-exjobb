[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/GF-s5kgK)

# HittaVet - Dokumentation

## Översikt
HittaVet är en användarvänlig webbapplikation som hjälper djurägare att snabbt hitta närmaste öppna veterinärklinik baserat på deras plats. Webbappen prioriterar automatiskt öppna kliniker, men användaren kan också söka efter kliniker baserat på namn, län eller stad. För varje klinik finns en detaljerad sida med all viktig information. Som inloggad användare kan du dessutom spara dina favoriter och lämna recensioner. Perfekt för alla djurägare som behöver snabb och enkel tillgång till rätt hjälp!

## Teknisk stack
- **Frontend**: React med Vite och TypeScript
- **Backend**: Node.js med Express
- **Databas**: Firebase Firestore och Typesense för sökfunktionalitet
- **Authentication**: Firebase Auth
- **API**: Google Places API för att hämta information om veterinärkliniker
- **Hosting**:
  - Frontend: Firebase Hosting
  - Backend: Render

## Förutsättningar för utveckling

### Program och tillägg
För att kunna utveckla och köra projektet lokalt, behöver du följande program och verktyg:
- **Node.js** (minst version 16)
- **Yarn eller npm** för att hantera beroenden
- **Firebase** för integration med Firebase
- **Typesense** för lokal hantering av sökfunktioner

### Installation och start

#### Klona projektet från GitHub
 - git clone <repository-url>
- cd client

## Installera beroenden
För frontend, kör:
- npm install
  
För backend, gå till server-mappen och kör:
- cd server
- npm install
- 
## Konfigurera miljövariabler
- I client: Skapa en .env-fil i root-mappen och lägg till följande variabler:
# Firebase
VITE_FIREBASE_API_KEY=<din-firebase-api-nyckel>
VITE_FIREBASE_AUTH_DOMAIN=<ditt-firebase-auth-domain>
VITE_FIREBASE_PROJECT_ID=<ditt-firebase-project-id>
VITE_FIREBASE_STORAGE_BUCKET=<ditt-firebase-storage-bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<ditt-sender-id>
VITE_FIREBASE_APP_ID=<ditt-firebase-app-id>
VITE_FIREBASE_MEASUREMENT_ID=<ditt-measurement-id>

- I server: Skapa en .env-fil i root-mappen och lägg till följande variabler:

# Google API
GOOGLE_API_KEY=<din-google-api-nyckel>

# Typesense
TYPESENSE_API_KEY=<din-typesense-api-nyckel>
TYPESENSE_HOST=<din-typesense-host>


## Starta utvecklingsklienten:
För frontend:
- npm run dev
  
För backend:
- npm start
  
Öppna appen i webbläsaren:
- Gå till http://localhost:5173 i din webbläsare.

##Externa tjänster och konton
För att projektet ska fungera korrekt, krävs följande externa tjänster och konton:

- Google Places API: Kräver ett Google Cloud-konto och en aktiv API-nyckel.
- Firebase: Kräver ett Firebase-projekt med aktiverad Firestore, Auth och Hosting.
- Typesense: Kräver en konfigurerad Typesense-instans och en aktiv API-nyckel.
  
## Övrig information
Förändringar och prioriteringar
- Pet First Aid-funktionen har prioriterats bort i denna omgång och ingår inte i produkten.
- Planen att packa ner webappen i en webview implementerades inte.
  
## Funktionalitet
- Filtrering av kliniker: Kliniker filtreras automatiskt baserat på avstånd och öppettider. Öppna kliniker prioriteras och visas först.
- Sökfunktion: Användare kan söka efter kliniker baserat på namn, län eller stad.
- Detaljerad klinikinformation: Varje klinik har en detaljerad sida med all nödvändig information.
- Favoriter och recensioner: Inloggade användare kan spara sina favoriter och lämna recensioner på kliniker.
