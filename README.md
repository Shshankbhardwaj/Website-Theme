# PrimeBridge Capital Website

Professional business financing website with form submission and admin panel.

## Features

- Responsive business loan website
- Multi-step application form
- Admin panel for viewing submissions
- Vercel Blob storage for form data

## Setup for Vercel Deployment

### 1. Connect GitHub Repository to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will automatically detect the configuration

### 2. Configure Vercel Blob Storage

**Important:** You MUST set up Blob storage for the form submissions to work.

1. In your Vercel project dashboard, click on the "Storage" tab
2. Click "Create Database" → Select "Blob"
3. Give it a name (e.g., "form-submissions")
4. Click "Create"
5. After creation, click "Connect to Project"
6. Vercel will automatically add `BLOB_READ_WRITE_TOKEN` to your environment variables
7. Go to Settings → Environment Variables to verify it's there

**Note:** The token is automatically injected - you don't need to copy/paste it manually.

### 3. Deploy

Once the Blob storage is connected:
- Vercel will automatically deploy your site
- Any future pushes to `main` branch will trigger auto-deployments

### 4. Test the Setup

1. Visit your deployed site
2. Fill out the application form at `/apply-now.html`
3. Submit the form
4. Go to `/admin.html` and login to see the submission

## Admin Panel Access

**URL:** `https://your-domain.com/admin.html`

**Default Credentials:**
- Username: `admin`
- Password: `PBC@dmin2025`

**Important:** For production, you should:
1. Change the default credentials in `/api/get-submissions.js`
2. Use environment variables for credentials
3. Implement proper authentication (JWT, OAuth, etc.)

## File Structure

```
/
├── index.html              # Homepage
├── apply-now.html          # Application form
├── admin.html              # Admin panel
├── styles.css              # Main styles
├── script.js               # Homepage scripts
├── apply-form.js           # Form logic
├── admin.js                # Admin panel logic
├── api/
│   ├── submit-application.js   # Form submission endpoint
│   └── get-submissions.js      # Get applications endpoint
├── package.json            # Dependencies
├── vercel.json            # Vercel configuration
└── README.md              # This file
```

## API Endpoints

### POST /api/submit-application
Submit a new loan application.

**Body:**
```json
{
  "funding_amount": "string",
  "bank_account": "string",
  "monthly_revenue": "string",
  "time_in_business": "string",
  "credit_score": "string",
  "industry": "string",
  "funding_purpose": "string",
  "company_name": "string",
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "phone": "string",
  "business_address": "string"
}
```

### GET /api/get-submissions
Retrieve all loan applications (requires authentication).

**Headers:**
```
Authorization: Basic base64(username:password)
```

**Response:**
```json
{
  "success": true,
  "submissions": [...],
  "count": 0
}
```

## Security Notes

1. **Change Admin Credentials:** Update the hardcoded credentials in `/api/get-submissions.js`
2. **Use Environment Variables:** Store sensitive data in Vercel environment variables
3. **Add Rate Limiting:** Implement rate limiting for API endpoints
4. **HTTPS Only:** Ensure all traffic uses HTTPS in production
5. **Input Validation:** Add server-side validation for all form inputs

## Customization

### Change Admin Credentials

Edit `/api/get-submissions.js`:

```javascript
const expectedAuth = `Basic ${Buffer.from('newusername:newpassword').toString('base64')}`;
```

### Modify Form Fields

1. Edit `/apply-now.html` to add/remove form fields
2. Update `/api/submit-application.js` if needed
3. Update `/admin.js` to display new fields

## Support

For questions or issues, contact PrimeBridge Capital support.
