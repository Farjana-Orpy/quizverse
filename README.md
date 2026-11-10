# QuizVerse

**Learn, challenge yourself, and track your progress.**

QuizVerse is a full-stack quiz application with user accounts, interactive quizzes, scores, and a leaderboard.

## Features

- **User accounts** — Sign up and sign in.
- **Interactive quizzes** — Answer questions and view results.
- **Score tracking** — Review quiz performance.
- **Leaderboard** — Compare results with other participants.
- **Responsive interface** — Use the app across screen sizes.

## Technology

React · Vite · Node.js · Express · MongoDB · JWT

## Repository guide

| Location | Contents |
| --- | --- |
| [`client/`](client/) | React frontend |
| [`server/`](server/) | API, authentication, and database |
| [`screenshots/`](screenshots/) | Application screenshots |

## Local setup

1. Run `npm install` and `npm run dev` in `client/`.
2. Run `npm install` and `node index.js` in `server/`.
3. Configure the server's `MONGO_URI` and `JWT_SECRET` environment variables.

Never commit real credentials or `.env` files.

*Built as a practical full-stack web development project.*
