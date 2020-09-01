'use strict';
const axios = require('axios')

const { WEBSITE_NAME, WEBSITE_URL,SLACK_WEBHOOK, SUCCESS_MSG } = require('./constants')

module.exports.checkSite = async () => {
  try {
    const { status, headers} = await axios.get(WEBSITE_URL, { validateStatus: false })
    let error
    if(status < 200 | status >= 300) {
      error = new Error(`Heads up! \n your website \"${WEBSITE_NAME}\" is down. status received =>  ${status}`)
            
    } else if(!/^text\/html/.test(headers["content-type"])){
      error = new Error(`Heads up! \n your website \"${WEBSITE_NAME}\" content-type failed \n it returns  \"${headers["content-type"]}\" instead of "text/html"`)
    }

    if(error) {
      await axios.post(
      SLACK_WEBHOOK,
      {text: error.message},
      {
        'content-type': 'text/json'
      })
      return
    }

    console.log(SUCCESS_MSG)
  } catch (error) {
    console.log(error.response.status)
  }
  
};
