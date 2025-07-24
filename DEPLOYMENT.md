# 🚀 Deployment Guide

This guide will help you deploy your AI Chatbot application to various platforms.

## 📋 Pre-deployment Checklist

- [ ] All environment variables are properly set
- [ ] Application builds successfully (`npm run build`)
- [ ] Database is accessible from the deployment platform
- [ ] Google AI API key is valid and has proper permissions
- [ ] All secrets are properly configured

## 🔵 Deploy to Vercel (Recommended)

Vercel is the easiest platform to deploy Next.js applications.

### Step 1: Prepare Your Repository
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your repository
5. Configure environment variables:
   - `MONGODB_URI`
   - `GOOGLE_AI_API_KEY`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (set to your Vercel domain)

### Step 3: Deploy
- Click "Deploy"
- Wait for build to complete
- Your app will be live at `https://your-app-name.vercel.app`

## 🟢 Deploy to Netlify

### Step 1: Build Settings
- Build command: `npm run build`
- Publish directory: `.next`

### Step 2: Environment Variables
Add the same environment variables as listed for Vercel.

### Step 3: Deploy
- Connect your GitHub repository
- Configure build settings
- Deploy

## 🟣 Deploy to Railway

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Login and Deploy
```bash
railway login
railway init
railway add
```

### Step 3: Set Environment Variables
```bash
railway variables set MONGODB_URI="your-mongodb-uri"
railway variables set GOOGLE_AI_API_KEY="your-api-key"
railway variables set NEXTAUTH_SECRET="your-secret"
```

## 🔴 Deploy to DigitalOcean App Platform

### Step 1: Create App
1. Go to DigitalOcean App Platform
2. Create new app from GitHub repository

### Step 2: Configure Build
- Build command: `npm run build`
- Run command: `npm start`

### Step 3: Environment Variables
Add all required environment variables in the app settings.

## 🐳 Deploy with Docker

### Step 1: Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Step 2: Build and Run
```bash
docker build -t ai-chatbot .
docker run -p 3000:3000 ai-chatbot
```

## 🔧 Environment Variables for Production

Make sure to set these environment variables in your deployment platform:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aichatbot
GOOGLE_AI_API_KEY=your_google_gemini_api_key
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your_secure_random_secret
APP_NAME=AI Chatbot
```

## 🔐 Security Considerations

1. **Use strong secrets**: Generate random NEXTAUTH_SECRET
2. **Secure database**: Use MongoDB Atlas with IP whitelisting
3. **API key security**: Restrict Google AI API key usage
4. **HTTPS only**: Ensure your deployment uses HTTPS
5. **Environment variables**: Never commit secrets to git

## 🔍 Monitoring and Maintenance

### Health Checks
Create a health check endpoint at `/api/health`:

```javascript
export async function GET() {
  return Response.json({ status: 'ok', timestamp: new Date().toISOString() });
}
```

### Logging
Consider adding logging with services like:
- Vercel Analytics
- LogRocket
- Sentry

### Database Monitoring
- Monitor MongoDB Atlas metrics
- Set up alerts for connection issues
- Regular backups

## 🐛 Troubleshooting

### Common Issues

**Build fails with module not found**
```bash
npm install
npm run build
```

**Environment variables not loading**
- Check variable names are exact
- Restart the deployment
- Verify in platform settings

**Database connection fails**
- Check MongoDB URI format
- Verify network access
- Test connection locally

**API key issues**
- Verify Google AI API key is active
- Check API quotas and limits
- Regenerate key if needed

## 📊 Performance Optimization

1. **Enable caching** for static assets
2. **Optimize images** in the public folder
3. **Monitor bundle size** with `npm run build`
4. **Use CDN** for better global performance
5. **Enable compression** on your platform

---

For more help, check the main README.md or create an issue on GitHub.
