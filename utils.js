const axios = require('axios')

module.exports.sendMessage = async (message) => {
    const { SLACK_WEBHOOK } = process.env
    try {
        await axios.post(
            SLACK_WEBHOOK,
            {
                text: message
            },
            {
              'content-type': 'text/json'
            })
    } catch (error) {
        console.log('error sending slack message: ', error)
    }
    
}