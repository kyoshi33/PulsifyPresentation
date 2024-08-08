require('dotenv').config();
var express = require('express');
var router = express.Router();

//This function generate a token from front request
async function getToken() {
    const URL = 'https://accounts.spotify.com/api/token';
    // const clientId = "63d43efc1a494587bfea2e2889d11551";
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    //const clientSecret = "84bc502de29d407aa14fd79c2feb85ee";
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const bClient = btoa(`${clientId}:${clientSecret}`);

    const config = {
        method: 'POST',
        headers: {
            Authorization: `Basic ${bClient}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: 'grant_type=client_credentials',
    };
    return await fetch(URL, config)
        .then(res => res.json())
        .then(data => data.access_token);
}

// route get music genres from artist name
router.post('/', async (req, res) => {
    let token = await getToken();
    console.log('token :', token)
    const response = await fetch(`https://api.spotify.com/v1/search?q=${req.body.search}&type=artist&limite=1`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
    });
    const data = await response.json()
    console.log('data :', data)
    res.json(data.artists.items[0].genres)
})
module.exports = router;