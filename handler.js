'use strict';
const axios = require('axios')
const { sendMessage } = require('./utils')

module.exports.checkSite = async () => {
  const { WEBSITE_NAME, WEBSITE_URL, SUCCESS_MSG } = process.env

  try {
    const { status, headers} = await axios.get(WEBSITE_URL, { validateStatus: false })
    let error
    if(status < 200 | status >= 300) {
      error = new Error(`Heads up! \n your website \"${WEBSITE_NAME}\" is down. status received =>  ${status}`)
            
    } else if(!/^text\/html/.test(headers["content-type"])){
      error = new Error(`Heads up! \n your website \"${WEBSITE_NAME}\" content-type failed \n it returns  \"${headers["content-type"]}\" instead of "text/html"`)
    }

    if(error) {
      await sendMessage(error.message)
      return
    }

    console.log(SUCCESS_MSG)
  } catch (error) {
    console.log("error occured: ", error.message)
    await sendMessage('Something went wrong with the health check')
  }
};
