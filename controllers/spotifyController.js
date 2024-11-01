require('dotenv').config();
const SPOTIFY_URL = require('../helpers/spotifyConstants').SPOTIFY_URL;

module.exports = {
    getToken: async(req,res) => {
        try {
            let formData = new URLSearchParams();
            formData.append("grant_type","client_credentials"); formData.append("client_id",process.env.SPOTIFY_CLIENT_ID); formData.append("client_secret",process.env.SPOTIFY_CLIENT_SECRET);
            const response = await fetch('https://accounts.spotify.com/api/token',
                {
                    method: "POST",
                    body: formData
            })
            res.status(200).send(await response.json());
        } catch (e) {
            res.status(500).send(e)
        }
    },
    search: async(req,res) => {
        try {        
            const accessToken = req.headers.authorization
            const name = req.query.name; const type = req.query.type;
            const data = await fetch(`${SPOTIFY_URL}/search?q=${name}&type=${type}`,
                {headers: {Authorization: `${accessToken}`}}
            )
            .then(res => res.json())
            .then(data => res.status(200).send(data))
             
        } catch (e) {
            res.status(500).send(e)
        }
    },
    getAlbum: async(req,res) => {
        try {
            const id = req.query.id; const accessToken = req.headers.authorization
            const data = await fetch(`${SPOTIFY_URL}/albums/${id}`,{headers: {Authorization: `${accessToken}`}})
            .then(res => res.json())
            .then(data => res.status(200).send(data))
        } catch (e) {
            res.status(500).send(e)
        }
    }
}