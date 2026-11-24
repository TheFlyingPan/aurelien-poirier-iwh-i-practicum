require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;
const CUSTOM_OBJECT = process.env.CUSTOM_OBJECT;

const headers = {
  Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
  'Content-Type': 'application/json'
};

const hubspotUrl = `https://api.hubapi.com/crm/v3/objects/${encodeURIComponent(CUSTOM_OBJECT || '')}`;

app.get('/', async (req, res) => {
  const url = `${hubspotUrl}?properties=name,species,bio`;
  try {
    const resp = await axios.get(url, { headers });
    res.render('homepage', { title: 'Homepage | Integrating With HubSpot I Practicum', data: resp.data.results });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.render('homepage', { title: 'Homepage | Integrating With HubSpot I Practicum', data: [] });
  }
});

app.get('/update-cobj', (req, res) => {
  res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

app.post('/update-cobj', async (req, res) => {
  const body = {
    properties: {
      name: req.body.name,
      species: req.body.species,
      bio: req.body.bio
    }
  };

  try {
    await axios.post(hubspotUrl, body, { headers });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }

  res.redirect('/');
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
