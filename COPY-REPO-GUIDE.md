# Guide: Copy Repository to Another GitHub Account

## Method 1: Using Git Commands (Recommended)

### Step 1: Create New Repository
1. Login to your **second GitHub account**
2. Create a **new repository** (e.g., "primebridge-capital-website")
3. **Do NOT initialize** with README, .gitignore, or license
4. Copy the repository URL (will be like: `https://github.com/NEW-USERNAME/NEW-REPO-NAME.git`)

### Step 2: Push to New Repository

In your terminal, run these commands:

```bash
# Navigate to your project directory
cd /workspace

# Add the new remote
git remote add new-origin https://github.com/NEW-USERNAME/NEW-REPO-NAME.git

# Push all branches to new repository
git push new-origin --all

# Push all tags (if any)
git push new-origin --tags

# Optional: Remove the new-origin remote after pushing
git remote remove new-origin
```

**Replace:**
- `NEW-USERNAME` with your second GitHub account username
- `NEW-REPO-NAME` with your new repository name

### Alternative: Change Origin Permanently

If you want to completely switch to the new repository:

```bash
# Remove old origin
git remote remove origin

# Add new origin
git remote add origin https://github.com/NEW-USERNAME/NEW-REPO-NAME.git

# Push everything
git push -u origin main

# Verify
git remote -v
```

---

## Method 2: GitHub Import (Easiest)

### Step 1: Use GitHub's Import Feature
1. Login to your **second GitHub account**
2. Go to: https://github.com/new/import
3. Enter your old repository URL: `https://github.com/Shshankbhardwaj/Website-Theme`
4. Choose repository name
5. Select **Private** or Public
6. Click "Begin Import"
7. Wait for import to complete (usually 1-2 minutes)

---

## Method 3: Download and Re-upload

### Step 1: Download as ZIP
1. Go to: https://github.com/Shshankbhardwaj/Website-Theme
2. Click "Code" → "Download ZIP"
3. Extract the ZIP file

### Step 2: Create New Repo and Upload
1. Create new repository in second account
2. Clone the empty repository:
   ```bash
   git clone https://github.com/NEW-USERNAME/NEW-REPO-NAME.git
   cd NEW-REPO-NAME
   ```
3. Copy all files from extracted ZIP (except `.git` folder)
4. Commit and push:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

---

## Deploy to Vercel from New Repository

### Step 1: Connect Vercel to New GitHub Account

1. Go to [vercel.com](https://vercel.com)
2. **Login/Create account** (use email, not GitHub initially)
3. Go to **Account Settings** → **Connected Accounts**
4. Click "Connect" next to GitHub
5. Authorize Vercel to access your **second GitHub account**

### Step 2: Import New Project

1. In Vercel dashboard, click "**Add New**" → "**Project**"
2. Select your **second GitHub account** from the dropdown
3. Find and import your new repository
4. Click "**Import**"

### Step 3: Configure Project

Vercel will auto-detect settings:
- Framework Preset: **Other**
- Build Command: (leave empty)
- Output Directory: (leave empty)

Click "**Deploy**"

### Step 4: Set Up Vercel Blob Storage

**CRITICAL:** Form submissions won't work without this!

1. After deployment, go to project dashboard
2. Click "**Storage**" tab
3. Click "**Create Database**" → Select "**Blob**"
4. Name it: `form-submissions`
5. Click "**Create**"
6. Click "**Connect to Project**"
7. Select your project
8. Click "**Connect**"

### Step 5: Redeploy

After adding Blob storage:
1. Go to "**Deployments**" tab
2. Click **⋯** (three dots) on latest deployment
3. Click "**Redeploy**"
4. Click "**Redeploy**" again to confirm

---

## Security Checklist for New Deployment

### 1. Change Admin Credentials

**Current default credentials are:**
- Username: `admin`
- Password: `PBC@dmin2025`

**To change:**

Edit `/api/get-submissions.js` and update line 23:

```javascript
// OLD:
const expectedAuth = `Basic ${Buffer.from('admin:PBC@dmin2025').toString('base64')}`;

// NEW:
const expectedAuth = `Basic ${Buffer.from('newusername:newpassword').toString('base64')}`;
```

Or use environment variables (recommended):

1. Add to Vercel: Settings → Environment Variables
   - `ADMIN_USERNAME` = your username
   - `ADMIN_PASSWORD` = your password

2. Update code:
```javascript
const adminUser = process.env.ADMIN_USERNAME || 'admin';
const adminPass = process.env.ADMIN_PASSWORD || 'PBC@dmin2025';
const expectedAuth = `Basic ${Buffer.from(`${adminUser}:${adminPass}`).toString('base64')}`;
```

### 2. Make Repository Private

If it's public:
1. Go to repository Settings
2. Scroll to "Danger Zone"
3. Click "Change visibility" → "Make private"

### 3. Add Custom Domain (Optional)

1. In Vercel: Settings → Domains
2. Add your domain (e.g., `primebridgecapital.com`)
3. Configure DNS as instructed by Vercel

---

## Troubleshooting

### "Repository not found" when pushing

**Solution:** Make sure you've created the repository on GitHub first and copied the correct URL.

### "Permission denied" error

**Solution:** 
- Use HTTPS URL, not SSH
- Or set up SSH keys for your second account
- Or use a Personal Access Token

To use Personal Access Token:
```bash
git remote set-url new-origin https://USERNAME:TOKEN@github.com/USERNAME/REPO.git
```

### Vercel can't see my repository

**Solution:**
- Go to Vercel → Account Settings → Connected Accounts
- Disconnect and reconnect GitHub
- Grant access to the new repository

### Form submissions not working

**Solution:**
- Ensure Vercel Blob storage is created
- Verify `BLOB_READ_WRITE_TOKEN` is in environment variables
- Redeploy after adding Blob storage

---

## Important Notes

### About Repository Privacy
- Consider making the repository **private** since it contains business information
- Free GitHub accounts can have unlimited private repositories

### About Domain
- After deploying, you'll get a Vercel domain like: `your-project.vercel.app`
- You can add a custom domain later in Vercel settings

### About Git History
- All methods preserve full commit history
- Method 2 (GitHub Import) is cleanest

---

## Quick Command Summary

```bash
# Quick push to new repository
git remote add new-origin https://github.com/NEW-USERNAME/NEW-REPO.git
git push new-origin --all
git push new-origin --tags

# Or change origin permanently
git remote set-url origin https://github.com/NEW-USERNAME/NEW-REPO.git
git push -u origin main
```

---

## Need Help?

If you encounter any issues:
1. Check GitHub repository exists
2. Verify you have push access
3. Ensure Vercel is connected to correct GitHub account
4. Check Vercel deployment logs for errors

---

**That's it! Your site should now be deployed from the new repository.** 🎉
