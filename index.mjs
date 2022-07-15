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

import { saveState } from '@actions/core';
import axios from 'axios';
import * as cheerio from 'cheerio';
// const cheerio = require('cheerio');
// import { CookieJar } from 'tough-cookie';
// import { HttpCookieAgent, HttpsCookieAgent } from 'http-cookie-agent/http';

// const jar = new CookieJar();

const client = axios.create({
  // httpAgent: new HttpCookieAgent({ cookies: { jar } }),
  // httpsAgent: new HttpsCookieAgent({ cookies: { jar } }),
  // withCredentials: true,
  maxRedirects: 0,
  validateStatus: status => status < 500,
});

axios.interceptors.request.use(request => {
  console.log('Starting Request: ', request)
  return request
})

/**
 * Cookieのユーティリティクラス
 */
class CookieUtil {
  /**
   * 値を抽出
   * @param {string} cookie Cookieデータ（'name=value;...')
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


let redirectUrl = 'https://www.lib.kyushu-u.ac.jp/ja/activities/usage_ref/re'
let res = await client.get(redirectUrl)
// console.log(res.headers['set-cookie'][0])
let cookie_SSESS = CookieUtil.getValue(res.headers['set-cookie'][0], 'SSESS')
console.log(cookie_SSESS)

redirectUrl = 'https://www.lib.kyushu-u.ac.jp/Shibboleth.sso/Login?target=/ja/activities/usage_ref/re'
res = await client.get(redirectUrl, { headers: { Cookie: cookie_SSESS[0]+'='+cookie_SSESS[1] } })
// console.log(res.headers)
let cookie_opensaml_req_ss = CookieUtil.getValue(res.headers['set-cookie'][0], 'opensaml')
redirectUrl = res.headers['location']

res = await client.get(redirectUrl)
let cookie_JSESSIONID = CookieUtil.getValue(res.headers['set-cookie'][0], 'JSESSIONID')
redirectUrl = res.headers['location']
redirectUrl = 'https://idp.kyushu-u.ac.jp'+redirectUrl

res = await client.get(redirectUrl, { headers: { Cookie: 'JSESSIONID=' + cookie_JSESSIONID[1]} })
let $ = cheerio.load(res.data)
let token = $('[name="csrf_token"]').val()
// console.log('csrf_token', token)
// console.log('csrf_token', res.data)

const postform = new URLSearchParams({'csrf_token': token,
'shib_idp_ls_exception.shib_idp_session_ss': '',
'shib_idp_ls_success.shib_idp_session_ss': 'false',
'shib_idp_ls_value.shib_idp_session_ss': '',
'shib_idp_ls_exception.shib_idp_persistent_ss': '',
'shib_idp_ls_success.shib_idp_persistent_ss': 'false',
'shib_idp_ls_value.shib_idp_persistent_ss': '',
'shib_idp_ls_supported': '',
'_eventId_proceed': '',})
console.log(postform)
res = await axios.post(redirectUrl,
                      postform,
                      { headers: { Cookie: 'JSESSIONID=' + cookie_JSESSIONID[1]} }
                      )
                      // { headers: { Cookie: 'JSESSIONID=' + cookie_JSESSIONID[1], 'Content-Type': 'application/x-www-form-urlencoded'} })
redirectUrl = "https://idp.kyushu-u.ac.jp/idp/profile/SAML2/Redirect/SSO?execution=e1s2"
// redirectUrl = res.headers['location']
// redirectUrl = 'https://idp.kyushu-u.ac.jp'+redirectUrl
// console.log('110',res.headers)
// console.log('110',res.data)

res = await client.get(redirectUrl, { headers: { Cookie: 'JSESSIONID=' + cookie_JSESSIONID[1]} })
$ = cheerio.load(res.data)
token = $('[name="csrf_token"]').val()
console.log('116 data', res.data)
console.log('116 csrf_token', token)

res = await client.post(redirectUrl,
  new URLSearchParams({
    'csrf_token': token,
    'j_username': process.env.USERNAME,
    'j_password': process.env.PW,
    '_eventId_proceed': 'Login'
  }),
  { headers: { Cookie: 'JSESSIONID=' + cookie_JSESSIONID[1], 'Content-Type': 'application/x-www-form-urlencoded'} })
$ = cheerio.load(res.data)
const RelayState = $('[name="RelayState"]').val()
const SAMLResponse = $('[name="SAMLResponse"]').val()
// console.log(res.data)
// console.log(SAMLResponse)

res = await client.post('https://www.lib.kyushu-u.ac.jp/Shibboleth.sso/SAML2/POST',
                        new URLSearchParams({
                          'RelayState': RelayState,
                          'SAMLResponse': SAMLResponse
                        }),
                        { headers: { Cookie: cookie_SSESS[0]+'='+cookie_SSESS[1]+'; '+cookie_opensaml_req_ss[0] +'=' + cookie_opensaml_req_ss[1], 'Content-Type': 'application/x-www-form-urlencoded'} })
let allCookie = res.headers['set-cookie'].toString()
const replaceWord = /,/g
allCookie = allCookie.replace(replaceWord, '; '); //getAllHeadersの場合
let cookie_shibsession = CookieUtil.getValue(allCookie, 'shibsession')

res = await client.get('https://www.lib.kyushu-u.ac.jp/ja/activities/usage_ref/re', { headers: { Cookie: 'JSESSIONID=' + cookie_JSESSIONID[1]+'; '+cookie_shibsession[0]+'='+cookie_shibsession[1]} })
// res = res.data.slice(res.data.indexOf('<body'))
$ = cheerio.load(res.data)
// console.log(res)
// console.log($('#ecats_ref_borrow').val())
const span = []
let span_txt
let validSpanCount = 0;
$('span', '.ecats_ref_list' ).each((i, elem) => {   //'m_unit'クラス内のh3タグ内要素に対して処理実行
  span_txt = $(elem).text()
  if (span_txt.match(/返却期限 2/)){
    span[validSpanCount] = new Date(span_txt.slice(span_txt.indexOf("2")).replace(/\./g, '-')) //"返却期限 2022.08.01"　などから2以降の文字列を取り出し、.を-に置き換え、日付に変換
    validSpanCount++;
  }

})
console.log(span)