# Web site health checker
checks for 200 range status code and content type for html

## Install
clone the repository by running `https://github.com/lavilabs/healthCronLambda.git`
run `npm install` or `yarn` to install dependancies
run `serverless offline` to run functions locally
change `WEBSITE_URL` in the `constants.js` file with the website url you want to track
send a post request to `http://localhost:3000/dev/checkSite` to invoke the function

