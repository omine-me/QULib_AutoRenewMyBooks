const core = require('@actions/core');
// const github = require('@actions/github');
const axios = require('axios');

let redirectUrl = "https://www.lib.kyushu-u.ac.jp/ja/activities/usage_ref/re"
axios.get(redirectUrl, {withCredentials: true})
    .then((res) => {
        console.log(res);
    })
    .catch(err => {
        console.log("err:", err);
    });


// let cookies = response.getHeaders()["Set-Cookie"];
// let cookie_SSESS = CookieUtil.getValue(cookies, 'SSESS')
// redirectUrl = response.getHeaders()['Location'];
// console.log(redirectUrl)

// try {
  // `who-to-greet` input defined in action metadata file
//   const nameToGreet = core.getInput('who-to-greet');

//   console.log(`Hello World!`);
//   const time = (new Date()).toTimeString();
//   console.log(time);

//   core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
// } catch (error) {
//   core.setFailed(error.message);
// }
