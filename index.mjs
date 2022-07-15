// const
//   axios = require('axios').default,
//   { CookieJar } = require('tough-cookie'),
//   { HttpCookieAgent, HttpsCookieAgent } = require('http-cookie-agent');

// const jar = new CookieJar();

// axios.defaults.httpAgent = new HttpCookieAgent({
//   jar,
//   keepAlive: true,
//   rejectUnauthorized: false, // disable CA checks
// });
// axios.defaults.headers.common = {
//   'User-Agent': 'HTTPie/2.3.0',
//   Accept: '*/*',
// };

import axios from 'axios';
import * as cheerio from 'cheerio';
// const cheerio = require('cheerio');
// import { CookieJar } from 'tough-cookie';
// import { HttpCookieAgent, HttpsCookieAgent } from 'http-cookie-agent/http';

// const jar = new CookieJar();

const client = axios.create({
  // httpAgent: new HttpCookieAgent({ cookies: { jar } }),
  // httpsAgent: new HttpsCookieAgent({ cookies: { jar } }),
  withCredentials: true,
  maxRedirects: 0,
  validateStatus: status => status < 500,
});

/**
 * Cookieのユーティリティクラス
 */
class CookieUtil {
  /**
   * 値を抽出
   * @param {string} cookie Cookieデータ（"name=value;...")
   * @return {string} value
   */
  static getValue(cookies, key) {
    // const cookiesArray = cookies.split(';');
    const cookiesArray = cookies.split('; ');

    for(const c of cookiesArray){
      const cArray = c.split('=');
      // if(cArray[0] == key){
      if(cArray[0].match(key)){
        console.log(cArray)
        return cArray //cArray[0] is name, cArray[1] is value
      }
    }

    return false
  }
}



// const core = require('@actions/core');
// // const github = require('@actions/github');
// const axios = require('axios');
// const cheerio = require('cheerio');
// const AxiosCookiejarSupport = require('axios-cookiejar-support').default;

// const tough = require('tough-cookie');
// const cookieJar = new tough.CookieJar();
// AxiosCookieJarSupport(axios);
// axios.defaults.withCredentials = true;
// axios.defaults.jar = cookieJar;


let redirectUrl = "https://www.lib.kyushu-u.ac.jp/ja/activities/usage_ref/re"
let res = await client.get(redirectUrl)
// console.log(res.headers["set-cookie"][0])
let cookie_SSESS = CookieUtil.getValue(res.headers["set-cookie"][0], 'SSESS')
console.log(cookie_SSESS)

redirectUrl = "https://www.lib.kyushu-u.ac.jp/Shibboleth.sso/Login?target=/ja/activities/usage_ref/re"
res = await client.get(redirectUrl, { headers: { Cookie: cookie_SSESS[0]+"="+cookie_SSESS[1] } })
// console.log(res.headers)
let cookie_opensaml_req_ss = CookieUtil.getValue(res.headers["set-cookie"][0], "opensaml")
redirectUrl = res.headers["location"]

res = await client.get(redirectUrl)
let cookie_JSESSIONID = CookieUtil.getValue(res.headers["set-cookie"][0], "JSESSIONID")
redirectUrl = res.headers["location"]
redirectUrl = "https://idp.kyushu-u.ac.jp"+redirectUrl

res = await client.get(redirectUrl, { headers: { Cookie: 'JSESSIONID=' + cookie_JSESSIONID[1]} })
let $ = cheerio.load(res.data)
let token = $('[name="csrf_token"]').val()
console.log("csrf_token", token)


// client.get(redirectUrl)
//     .then((res) => {
//         console.log(res);
// //         const $ = cheerio.load(res.data);
// //         const RelayState = $('[name="RelayState"]').val();
// //         console.log('RelayState: ', RelayState);
// //         const SAMLRequest = $('[name="SAMLRequest"]').val();
// //         console.log('SAMLRequest: ', SAMLRequest);
// //         redirectUrl = "https://idp.kyushu-u.ac.jp/idp/profile/SAML2/POST/SSO"
        
// //         let params = new URLSearchParams()
// //         params.append('RelayState', RelayState)
// //         params.append('SAMLRequest', SAMLRequest)
// //         axios.post(redirectUrl, params,{withCredentials: true}) 
// //             .then((res) => {
// //                 console.log(res);
// // //                 const $ = cheerio.load(res.data);

// //             })
// //             .catch(err => {
// //                 console.log("err:", err);
// //             });
    
    
    
//     })
//     .catch(err => {
//         console.log("err:", err);
//     });


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
