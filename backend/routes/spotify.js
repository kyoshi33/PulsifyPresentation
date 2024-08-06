var express = require('express');
var router = express.Router();

API_TOKEN = "BQAq7LOFdfb3MJ42Vj_aeeLGTx3Gl9-nOJ0lL880HBjYuKFMQDY7x5AD89PxTdEL0HsMLpVWF-xxBkQRy2_bLpfc_DZRWc-RcbtwSrKkqGaMANfOWHc"

router.post('/', async (req, res) => {
    console.log(req.body.search)
    const response = await fetch(`https://api.spotify.com/v1/search?q=${req.body.search}&type=artist&limite=1`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
    });
    const data = await response.json()
    //console.log(data)
    res.json(data.artists.genres)
})
module.exports = router;