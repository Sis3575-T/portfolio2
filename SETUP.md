# Portfolio Setup Guide

## 1. MongoDB Atlas (Free)
1. Go to https://cloud.mongodb.com → create free account
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Paste into `backend/.env` as `MONGODB_URI`

## 2. Cloudinary (Free - for image uploads)
1. Go to https://cloudinary.com → sign up free
2. Go to Dashboard → copy Cloud Name, API Key, API Secret
3. Paste into `backend/.env`

## 3. Install Backend
```bash
cd backend
npm install
npm run dev
```

## 4. Seed Database (first time only)
```bash
cd backend
node seed.js
```
This creates: admin user, sample hero, about, skills, project, education

## 5. Admin Login
- URL: http://localhost:5173/admin/login
- Email: sisay3575@gmail.com
- Password: admin123
- **Change password after first login!**

## 6. Deploy Backend
- Use Railway.app, Render.com, or any Node.js host
- Add all env variables from backend/.env
- Set NODE_ENV=production

## 7. Update Frontend API URL
After deploying backend, update `.env`:
```
VITE_API_URL=https://your-backend-url.com/api
```
Then redeploy frontend.

## Admin Dashboard Routes
- `/admin/login` - Login page
- `/admin` - Dashboard home
- `/admin` → Projects, Skills, Messages, Blog, Settings (via sidebar)
