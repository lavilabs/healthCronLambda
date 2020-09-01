'use strict';
const https = require('https')
const { WEBSITE_URL, SUCCESS_MSG } = require('./constants')

module.exports.hello = async event => {
  https.request(
    WEBSITE_URL,
    {method: "HEAD"},
    ({statusCode, headers }) => {

      let error;

      //checks for 200 code for now
      if(statusCode !== 200) {
        error=new Error(`Request failed \n accepted: 200 \n received: ${statusCode}`)
      }else if(!/^text\/html/.test(headers["content-type"])){
        error = new Error(`Content type failed \n accepted: text/html \n received ${headers["content-type"]}`)
      }
      
      if(error) {
        console.log(error.message)
      }

      console.log(SUCCESS_MSG)

    }
    )
    .on('error', (error) => console.log(error)).end()
};
