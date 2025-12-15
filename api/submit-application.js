import { put } from '@vercel/blob';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;
    
    // Add timestamp and unique ID
    const submission = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...formData
    };

    // Store in Vercel Blob
    const filename = `submissions/${submission.id}.json`;
    const blob = await put(filename, JSON.stringify(submission), {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Application submitted successfully',
      submissionId: submission.id 
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    return res.status(500).json({ 
      error: 'Failed to submit application',
      details: error.message 
    });
  }
}
