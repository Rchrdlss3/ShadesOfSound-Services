require('dotenv').config();
const helper = require('../helpers/helperFunctions')

const OpenAI = require('openai').OpenAI;

const client = new OpenAI({
    apiKey: process.env.OPEN_API_KEY
})

module.exports = {
    colorDesc: async(req,res) => {
        const color = req.query.hex
        try {
            const chatCompletion = await client.chat.completions.create({
                messages: [{role: 'assistant', content: `Explain the color of hexcode ${color}`}],
                model: 'gpt-3.5-turbo'
            }).then(results => res.status(200).send({text:results.choices[0].message.content}))
        } catch(e) {
            res.status(500).send(e)
        }
    },
    listOfArtists: async (req,res) => {
        try {
            const chatCompletion = await client.chat.completions
        } catch(e) {

        }
    },
    basedOnState: async (req,res) => {
        const ipAddress = req.query.address
        const location = await helper.getLocation(ipAddress).then(
            res => {
                if(res.success != true) {
                    return {state: '', city: ''}
                } else {
                    return {state: res.region_name, city:res.city}
                }
            }
        );
        try {
            const chatCompletion = await client.chat.completions.create({
                messages: [{role:'assistant', content: `Provide end user with only the name of a musical album they might like based on the city ${location.city},${location.state}`}],
                model: 'gpt-3.5-turbo'
            }).then(results => res.status(200).send({
               album: results.choices[0].message.content, 
               description: `Seeing that you are in ${location.city}, ${location.state}, OpenAI has suggested that you would enjoy this album.` 
            }))
        } catch (e) {
            res.status(500).send(e)
        }
    },
    suggestions: async (req,res) => {
        try {
            const chatCompletion = await client.chat.completions.create({
                messages: [{role: 'assistant', content: `Provid end user with a list of musical albums related to ${albumName} album`}]
            })
        } catch (e) {
            res.status(500).send(e)
        }
    },
    summarize: async(req,res) => {
        const name = req.query.name; const artist = req.query.artist;
        try {
            const chatCompletion = await client.chat.completions.create({
                messages: [{role: 'assistant', content: `Give an overview of musical album ${name} by ${artist}`}],
                model: 'gpt-3.5-turbo'
            }).then(results => res.status(200).send({text: results.choices[0].message.content}))
        } catch (e) {
            res.status(500).send(e)
        }
    }
}
