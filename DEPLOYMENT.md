# Deployment Guide for CoolPage

This guide explains how to automatically deploy your CoolPage React application using GitHub Actions.

## Available Deployment Options

### 1. GitHub Pages (Recommended for Simple Static Sites)

**Setup Steps:**
1. Go to your repository on GitHub
2. Navigate to Settings → Pages
3. Under "Build and deployment", select "GitHub Actions" as the source
4. The workflow is already configured in `.github/workflows/deploy.yml`
5. Push to the main branch to trigger deployment
6. Your site will be available at: `https://[your-username].github.io/[repository-name]/`

**No additional configuration needed!**

### 2. Vercel Deployment

**Setup Steps:**
1. Create an account at [vercel.com](https://vercel.com)
2. Import your GitHub repository in Vercel
3. Get your Vercel credentials:
   - Install Vercel CLI: `npm i -g vercel`
   - Run `vercel` in your project directory
   - Get your org ID and project ID from `.vercel/project.json`
4. Add these secrets to your GitHub repository:
   - `VERCEL_TOKEN` - Get from https://vercel.com/account/tokens
   - `VERCEL_ORG_ID` - Your organization ID
   - `VERCEL_PROJECT_ID` - Your project ID
5. The workflow in `.github/workflows/vercel.yml` will handle deployments

### 3. Netlify Deployment

**Setup Steps:**
1. Create an account at [netlify.com](https://netlify.com)
2. Create a new site from Git and connect your repository
3. Get your Netlify credentials:
   - `NETLIFY_AUTH_TOKEN` - From User Settings → Applications → Personal Access Tokens
   - `NETLIFY_SITE_ID` - From your site's settings → General → Site ID
4. Add these secrets to your GitHub repository settings
5. The workflow in `.github/workflows/netlify.yml` will handle deployments

## Adding Secrets to GitHub

1. Go to your repository on GitHub
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add the required secrets for your chosen deployment method

## Triggering Deployments

All workflows are configured to deploy automatically when you push to the `main` branch.

## Build Configuration

The project uses Vite for building. The build output is in the `dist` directory.

Build command: `npm run build`
Output directory: `dist`

## Environment Variables

If you need to add environment variables:
- For local development: Create a `.env` file
- For production: Add them in your deployment platform's settings
- Variables must start with `VITE_` to be exposed to your app

Example:
```
VITE_API_URL=https://api.example.com
```

## Troubleshooting

### GitHub Pages 404 Errors
- Ensure the `base` in `vite.config.ts` is set correctly
- For root domain: `base: '/'`
- For subdirectory: `base: '/repository-name/'`

### Build Failures
- Check that all dependencies are listed in `package.json`
- Ensure Node version matches (currently using Node 20)
- Review build logs in GitHub Actions tab

### Deployment Not Triggering
- Verify you're pushing to the correct branch (main)
- Check that GitHub Actions are enabled for your repository
- Ensure all required secrets are set