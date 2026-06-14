# Deployment Checklist

## Recommended Free-Tier Setup

- Frontend: Netlify or Vercel static site hosting.
- Backend: Render web service.
- Database: MongoDB Atlas free cluster.

This split keeps the static site fast and lets the API and database use free tiers that fit low traffic.

## Backend Environment Variables

Set these on the backend host:

```env
PORT=5000
MONGO_URI=your-mongodb-atlas-connection-string
FRONTEND_ORIGIN=https://your-frontend-domain.example
JWT_SECRET=use-a-long-random-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your-bcrypt-password-hash
```

Generate the admin password hash locally:

```bash
cd backend
npm run hash-password -- "your-strong-admin-password"
```

Use the printed hash as `ADMIN_PASSWORD_HASH`. Do not commit real secrets.

## Render Backend Settings

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Node version: `20.19.0` or newer

After deployment, copy the backend URL and use it as the frontend API base URL.

## Frontend Settings

Before deploying the static frontend, update `js/config.js` to the deployed backend URL. The current value falls back to `http://localhost:5000` for local development.

## Final Checks

- Confirm `npm audit --omit=dev` returns zero vulnerabilities.
- Confirm admin login works with the production password.
- Submit one test admission and one contact message.
- Confirm public notices, teachers, gallery, and stats load from the deployed API.
- Confirm only image files under 2 MB upload successfully.
