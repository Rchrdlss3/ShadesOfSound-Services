require('dotenv').config();

module.exports = {
    getLocation: async(ipAddress) => {
        try {
            const data = await fetch(`https://api.ipstack.com/${ipAddress}?access_key=${process.env.IP_STACK_SECRET}`)
            return data.json();
        } catch(e) {
            console.log(e)
        }
    }
}