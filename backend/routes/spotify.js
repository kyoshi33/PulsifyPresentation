var express = require('express');
var router = express.Router();

//API_TOKEN = "BQAq7LOFdfb3MJ42Vj_aeeLGTx3Gl9-nOJ0lL880HBjYuKFMQDY7x5AD89PxTdEL0HsMLpVWF-xxBkQRy2_bLpfc_DZRWc-RcbtwSrKkqGaMANfOWHc"

async function getToken() {

    const URL = 'https://accounts.spotify.com/api/token';
    const clientId = process.env.SPOTIFY_CLIENT_ID;
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

router.post('/', async (req, res) => {
    let token = await getToken();
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