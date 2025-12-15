import { list } from '@vercel/blob';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Basic authentication check
    const authHeader = req.headers.authorization;
    const expectedAuth = `Basic ${Buffer.from('admin:PBC@dmin2025').toString('base64')}`;
    
    if (!authHeader || authHeader !== expectedAuth) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // List all submissions from Vercel Blob
    const { blobs } = await list({
      prefix: 'submissions/',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // Fetch all submission data
    const submissions = await Promise.all(
      blobs.map(async (blob) => {
        try {
          const response = await fetch(blob.url);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching blob:', error);
          return null;
        }
      })
    );

    // Filter out nulls and sort by timestamp (newest first)
    const validSubmissions = submissions
      .filter(s => s !== null)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return res.status(200).json({ 
      success: true, 
      submissions: validSubmissions,
      count: validSubmissions.length 
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch submissions',
      details: error.message 
    });
  }
}
