# Tableau de bord d'une ferme aquacole

Application web qui affiche en direct la température et la pression de l'eau d'une ferme aquacole, garde l'historique des mesures et gère les comptes de l'équipe.

Projet réalisé chez SEA-GUST (Tunis), de février à juin 2024.

![Tableau de bord : jauges en direct et graphiques de température et de pression](docs/screenshots/dashboard.png)

## Ce que fait l'application

- **Suivi en direct** : deux jauges (température, pression) mises à jour toutes les 5 secondes.
- **Graphiques** : courbes et histogrammes de la température et de la pression dans le temps.
- **Historique** : toutes les mesures dans un tableau triable et filtrable.
- **Comptes et rôles** : connexion par e-mail et mot de passe. Un administrateur crée les comptes, change les rôles et supprime des utilisateurs. Un manager consulte les données.
- **Thème clair ou sombre**, au choix.

## Architecture

![Schéma : le nœud ESP32 publie en MQTT, Node-RED enregistre dans MongoDB et pousse la dernière mesure à l'API, l'interface React affiche le tout](docs/architecture.svg)

Le trajet d'une mesure :

1. Le **nœud ESP32** publie la température et la pression sur un sujet MQTT.
2. **Node-RED** reçoit le message, ajoute la date et l'heure, l'enregistre dans **MongoDB** et envoie la dernière mesure à l'API. Il peut aussi envoyer une alerte WhatsApp.
3. L'**API Express** sert l'historique, la dernière mesure et les comptes.
4. L'**interface React** affiche les jauges, les graphiques et les tableaux.

Ce dépôt contient l'interface et l'API. Les deux autres parties ont leur propre dépôt :

| Partie | Dépôt |
|---|---|
| Nœud capteur (ESP32, PlatformIO) | [End-Node-Aquaculture-farm](https://github.com/Rythme19/End-Node-Aquaculture-farm) |
| Flux Node-RED | [Node-Red-Aquaculture-monitoring-system](https://github.com/Rythme19/Node-Red-Aquaculture-monitoring-system) |

## Captures d'écran

| Température | Pression |
|---|---|
| ![Courbe et histogramme de la température](docs/screenshots/temperature.png) | ![Courbe et histogramme de la pression](docs/screenshots/pressure.png) |

| Historique des mesures | Gestion de l'équipe |
|---|---|
| ![Tableau de toutes les mesures](docs/screenshots/history.png) | ![Liste des comptes avec leur rôle](docs/screenshots/team.png) |

| Création d'un compte | Connexion |
|---|---|
| ![Formulaire de création d'un utilisateur](docs/screenshots/form.png) | ![Page de connexion](docs/screenshots/login.png) |

Captures faites en local, avec des données de démonstration.

## Technologies

| Côté | Outils |
|---|---|
| Interface | React 18, Material UI, Nivo (graphiques), MobX, React Router, Formik et Yup |
| API | Node.js, Express, Mongoose, JWT, bcrypt |
| Données | MongoDB |

## Lancer le projet

Il faut Node.js et une base MongoDB qui écoute sur `127.0.0.1:27017`.

**1. L'API** (port 3001)

```bash
cd server
npm install
PORT=3001 npm start
```

**2. L'interface** (port 3000)

```bash
cd client
npm install --legacy-peer-deps
npm start
```

**3. Le premier compte administrateur**

```bash
curl -X POST http://localhost:3001/api/role -H "Content-Type: application/json" -d '{"label":"admin"}'
curl -X POST http://localhost:3001/api/role -H "Content-Type: application/json" -d '{"label":"manager"}'
curl -X POST http://localhost:3001/api/user/register -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@example.com","phone":20000000,"password":"VOTRE_MOT_DE_PASSE","role":"admin"}'
```

**4. Une mesure de test** (sans capteur ni Node-RED)

```bash
curl -X POST http://localhost:3001/api/realtime -H "Content-Type: application/json" \
  -d '{"date":"2024-06-10","time":"20:00:00","temperature":23.8,"pressure":133212}'
```

Ouvrir ensuite `http://localhost:3000` et se connecter.

## Routes de l'API

| Méthode | Route | Rôle |
|---|---|---|
| POST | `/api/user/login` | Connexion, renvoie un jeton JWT et le rôle |
| POST | `/api/user/register` | Création d'un compte |
| GET | `/api/user` | Liste des comptes |
| PUT | `/api/user/role` | Changement de rôle |
| PUT | `/api/user/:id` | Mise à jour d'un compte |
| DELETE | `/api/user` | Suppression de comptes |
| GET, POST | `/api/role` | Liste et ajout de rôles |
| GET | `/api/aquastats/getData` | Historique des mesures |
| GET, POST | `/api/realtime` | Dernières mesures reçues |

## Limites connues

- Limite connue : les mesures en direct sont gardées en mémoire par l'API et disparaissent au redémarrage. L'historique, lui, reste dans MongoDB.
- Limite connue : les adresses de MongoDB et de l'API sont écrites dans le code (`localhost`). Il faut les passer en variables d'environnement avant un déploiement.
- Limite connue : le contrôle des rôles se fait dans l'interface. Côté API, la vérification du jeton reste à étendre à toutes les routes.
- Limite connue : dans son dépôt, le nœud ESP32 publie des valeurs simulées, ce qui permet de tester toute la chaîne sans capteur.
