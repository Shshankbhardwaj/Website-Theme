# Complete Setup Guide for PrimeBridge Capital Website

## 🚀 Quick Start (5 Minutes)

### Step 1: Push to GitHub (Already Done ✅)
Your code is already in the GitHub repository.

### Step 2: Deploy to Vercel

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add New" → "Project"
   - Select your GitHub repository: `Shshankbhardwaj/Website-Theme`
   - Click "Import"

3. **Configure Project** (Vercel will auto-detect settings)
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Click "Deploy"

### Step 3: Set Up Blob Storage (CRITICAL)

**Without this, form submissions will NOT work!**

1. **In Vercel Dashboard**
   - Go to your project
   - Click "Storage" tab at the top
   - Click "Create Database"

2. **Create Blob Store**
   - Select "Blob" from the options
   - Name: `form-submissions` (or any name you prefer)
   - Click "Create"

3. **Connect to Project**
   - After creation, click "Connect to Project"
   - Select your project from dropdown
   - Click "Connect"
   - ✅ Vercel automatically adds `BLOB_READ_WRITE_TOKEN` to environment variables

4. **Verify**
   - Go to Settings → Environment Variables
   - You should see `BLOB_READ_WRITE_TOKEN` listed

### Step 4: Redeploy (Important!)

After adding Blob storage, you need to redeploy:

1. Go to "Deployments" tab
2. Click the three dots (⋯) on the latest deployment
3. Click "Redeploy"
4. Check "Use existing Build Cache"
5. Click "Redeploy"

---

## 📋 Testing Your Setup

### Test the Application Form

1. Visit: `https://your-domain.vercel.app/apply-now.html`
2. Fill out all steps of the form
3. Click "Get Qualified" on the last step
4. You should see: "Thank you for applying! We will contact you within 24 hours."

### Test the Admin Panel

1. Visit: `https://your-domain.vercel.app/admin.html`
2. Login with default credentials:
   - **Username:** `admin`
   - **Password:** `PBC@dmin2025`
3. You should see all form submissions

---

## 🔐 Security Setup (IMPORTANT - Do This!)

### Change Admin Password

**Default credentials are publicly visible in your code. You MUST change them!**

#### Option 1: Quick Change (Hardcoded)

Edit `api/get-submissions.js` line 23:

```javascript
// Change this line:
const expectedAuth = `Basic ${Buffer.from('admin:PBC@dmin2025').toString('base64')}`;

// To your new credentials:
const expectedAuth = `Basic ${Buffer.from('newusername:newpassword').toString('base64')}`;
```

#### Option 2: Secure Change (Environment Variables) - RECOMMENDED

1. **Update Code** - Edit `api/get-submissions.js`:

```javascript
// Replace line 23 with:
const adminUser = process.env.ADMIN_USERNAME || 'admin';
const adminPass = process.env.ADMIN_PASSWORD || 'PBC@dmin2025';
const expectedAuth = `Basic ${Buffer.from(`${adminUser}:${adminPass}`).toString('base64')}`;
```

2. **Add Environment Variables in Vercel**:
   - Go to Settings → Environment Variables
   - Add: `ADMIN_USERNAME` = `your_username`
   - Add: `ADMIN_PASSWORD` = `your_secure_password`
   - Save and redeploy

3. **Push Changes to GitHub** (if you edited code)

---

## 📱 Admin Panel Features

### View All Submissions
- See all loan applications in one dashboard
- Sorted by newest first
- Shows all applicant information

### Filter Applications
- By funding amount
- By industry
- By credit score

### Application Details
Each submission shows:
- Unique ID and timestamp
- Company name
- Funding amount
- Contact information (name, email, phone)
- Business details (industry, revenue, time in business)
- Credit score
- Funding purpose
- Business address (if provided)

---

## 🔧 Troubleshooting

### Form Submissions Not Appearing in Admin Panel

**Possible Causes:**

1. **Blob Storage Not Set Up**
   - Solution: Follow Step 3 above to create Blob storage
   - Redeploy after setting up

2. **Environment Variable Missing**
   - Go to Settings → Environment Variables
   - Verify `BLOB_READ_WRITE_TOKEN` exists
   - If missing, reconnect Blob storage to project

3. **API Route Error**
   - Check Vercel Functions logs:
     - Go to "Deployments" → Click latest deployment
     - Click "Functions" tab
     - Check for errors in `/api/submit-application` and `/api/get-submissions`

### Admin Login Not Working

1. **Check Credentials**
   - Default: `admin` / `PBC@dmin2025`
   - If changed: use your new credentials

2. **Browser Console Errors**
   - Press F12 to open Developer Tools
   - Check Console tab for errors
   - Check Network tab for failed API calls

3. **Authentication Issue**
   - Clear browser cache
   - Try incognito/private window

### Can't Access Admin Panel

1. **URL Check**
   - Must be: `https://your-domain.vercel.app/admin.html`
   - Not: `https://your-domain.vercel.app/admin`

2. **File Deployed**
   - Go to Vercel → Deployments → Latest
   - Check "Source" tab
   - Verify `admin.html` is listed

---

## 📊 Monitoring Submissions

### Real-Time Monitoring

The admin panel automatically loads all submissions when you log in. To see new submissions:
1. Simply refresh the page
2. All new applications will appear at the top

### Export Data (Future Enhancement)

Currently, data is stored in Vercel Blob. To export:
1. Use Vercel's Blob API
2. Or build an export feature in the admin panel

---

## 🎨 Customization

### Modify Form Fields

1. Edit `apply-now.html` - Add/remove form steps
2. Update `admin.js` - Add new fields to display
3. No changes needed to API (it stores all fields automatically)

### Change Styling

- Edit `styles.css` for main site
- Edit inline styles in `admin.html` for admin panel

### Add Email Notifications

To receive email when someone submits a form:

1. Add an email service (e.g., SendGrid, Resend)
2. Update `api/submit-application.js` to send email:

```javascript
// After storing in Blob, send email
await sendEmail({
  to: 'your@email.com',
  subject: 'New Loan Application',
  body: `New application from ${submission.company_name}`
});
```

---

## 📝 Site URLs

After deployment, your site will have these pages:

- **Homepage:** `https://your-domain.vercel.app/`
- **Application Form:** `https://your-domain.vercel.app/apply-now.html`
- **Admin Panel:** `https://your-domain.vercel.app/admin.html`
- **Privacy Policy:** `https://your-domain.vercel.app/privacy-policy.html`
- **Terms of Service:** `https://your-domain.vercel.app/terms-of-service.html`
- **Disclosures:** `https://your-domain.vercel.app/disclosures.html`
- **Disclaimer:** `https://your-domain.vercel.app/disclaimer.html`

---

## 💡 Pro Tips

1. **Custom Domain**
   - Go to Settings → Domains in Vercel
   - Add your custom domain (e.g., primebridgecapital.com)
   - Follow Vercel's instructions to configure DNS

2. **Analytics**
   - Vercel automatically provides analytics
   - Go to "Analytics" tab to see visitor stats

3. **Performance**
   - Your site is automatically optimized by Vercel
   - Scores well on Google PageSpeed Insights

4. **Backups**
   - Vercel Blob data is automatically backed up
   - You can also periodically export via the Blob API

5. **Rate Limiting**
   - Consider adding rate limiting to prevent spam
   - Use Vercel's Edge Middleware or a service like Upstash

---

## 🆘 Support

If you encounter any issues:

1. Check Vercel's deployment logs
2. Check browser console for errors (F12)
3. Verify environment variables are set
4. Ensure Blob storage is properly connected
5. Try redeploying

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Project imported to Vercel
- [ ] Vercel Blob storage created
- [ ] Blob storage connected to project
- [ ] Environment variables verified
- [ ] Site redeployed after adding Blob
- [ ] Test form submission works
- [ ] Admin panel login works
- [ ] Submission appears in admin panel
- [ ] Admin password changed from default
- [ ] Custom domain added (optional)

---

**Congratulations! Your site is now live with a fully functional admin panel!** 🎉
