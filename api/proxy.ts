import { NowRequest, NowResponse } from '@now/node';
import fetch from 'node-fetch';

// @ts-ignore
const url: string = process.env.NOW_GITHUB_API_URL;

module.exports = async (req: NowRequest, res: NowResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, HEAD, POST');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.status(200).send('');
  }

  const params = {
    ...JSON.parse(req.body),
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URL,
    client_secret: process.env.CLIENT_SECRET
  };

  if (req.method === 'POST') {
    try {
      const githubResponse = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });
      const data = await githubResponse.json();
      res.status(200).json(data);
    } catch (e) {
      res.status(500).json(e);
    }
  }
};
