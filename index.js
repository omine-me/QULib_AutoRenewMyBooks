const core = require('@actions/core');
// const github = require('@actions/github');
const axios = require('axios');
const cheerio = require('cheerio');
const AxiosCookiejarSupport = require('axios-cookiejar-support').default;

AxiosCookiejarSupport(axios);

let redirectUrl = "https://www.lib.kyushu-u.ac.jp/ja/activities/usage_ref/re"
axios.get(redirectUrl, {withCredentials: true, jar: true})
    .then((res) => {
        console.log(res);
//         const $ = cheerio.load(res.data);
//         const RelayState = $('[name="RelayState"]').val();
//         console.log('RelayState: ', RelayState);
//         const SAMLRequest = $('[name="SAMLRequest"]').val();
//         console.log('SAMLRequest: ', SAMLRequest);
//         redirectUrl = "https://idp.kyushu-u.ac.jp/idp/profile/SAML2/POST/SSO"
        
//         let params = new URLSearchParams()
//         params.append('RelayState', RelayState)
//         params.append('SAMLRequest', SAMLRequest)
//         axios.post(redirectUrl, params,{withCredentials: true}) 
//             .then((res) => {
//                 console.log(res);
// //                 const $ = cheerio.load(res.data);

//             })
//             .catch(err => {
//                 console.log("err:", err);
//             });
    
    
    
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
