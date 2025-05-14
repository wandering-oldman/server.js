const express = require('express');
const axios = require('axios');
const app = express();

app.get('/stream', async (req, res) => {
  const { url, ua, ref } = req.query;

  if (!url) return res.status(400).send('Missing URL');

  try {
    const response = await axios.get(url, {
      responseType: 'stream',
      headers: {
        'User-Agent': ua || '',
        'Referer': ref || ''
      }
    });

    res.setHeader('Content-Type', response.headers['content-type']);
    response.data.pipe(res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Stream fetch failed');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Proxy server running at http://localhost:${PORT}`);
});
