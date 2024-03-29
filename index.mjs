import axios from 'axios';
import * as cheerio from 'cheerio';
import {Octokit} from "octokit";

const client = axios.create({
  // withCredentials: true,
  maxRedirects: 0,
  validateStatus: status => status < 500,
});

// client.interceptors.request.use(request => {
//   console.log('Starting Request: ', request.url, request.headers)
//   return request
// })
// client.interceptors.response.use(response => {
//   console.log('Respose: ', response.headers)
//   return response
// })

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
        // console.log(cArray)
        return cArray //cArray[0] is name, cArray[1] is value
      }
    }

    return false
  }
}

const isToday = (now ,inputDate) => {
  // console.log("isToday",now, now.getDate(),now.getDate()+1,now.getDate()+8)
  return inputDate.getDate() == now.getDate() &&
    inputDate.getMonth() == now.getMonth() &&
    inputDate.getFullYear() == now.getFullYear()
}

const isWithinNDays = (now, inputDate, withinDays=6) => {
  const nDaysLater = new Date(now.getTime())
  nDaysLater.setDate(now.getDate()+withinDays)
  // console.log(inputDate , nDaysLater)
  return inputDate < nDaysLater
}

//// /re
let redirectUrl = 'https://www.lib.kyushu-u.ac.jp/ja/activities/usage_ref/re?check_logged_in=1'
let res = await client.get(redirectUrl)
// console.log(res.headers)
let SimpleSAMLSessionID
let cookie_SSESS
if (res.headers['set-cookie']){
  SimpleSAMLSessionID = CookieUtil.getValue(res.headers['set-cookie'][0], 'SimpleSAMLSessionID')
  redirectUrl = res.headers['location']
}else{
  $ = cheerio.load(res.data)
  redirectUrl = $().find('a').attr('href');
}

// console.log(cookie_SSESS)

//// https://idp.kyushu-u.ac.jp/idp/profile/SAML2/Redirect/SSO?SAMLRequest=hVJdj9MwEPwrkd8T54NwrdVWKlchKh1c1RQeeEFOvCUGxw7eNeX%2BPU4K4uChPK013pmdHe0K5WBGsQ3U2yN8C4CU%2FBiMRTF%2FrFnwVjiJGoWVA6CgTjTbtw%2BizHIxekeuc4Y9o9xmSETwpJ1lyX63Zp%2BKqmzPqlJ58WJZVKpYdHW1XJaxyrotyju1aCt4WbQgWfIBPEbmmkWhSEcMsLdI0lKE8rJK8yLN61NRi%2FpOVIuPLNnFbbSVNLN6ohEF51qN2dengH1IQya77Ms4QTzuctYG%2BGS15EdQ2kNHvGkeWbL97freWQwD%2BAb8d93B%2B%2BPDH93L5ZIZ3f6rjXoYDcxh9iMfnAoGsuk5QRyvtUxlhzOq4CyDoRRHlhx%2BxftKW6Xt59vJttcmFG9Op0N6eGxObLOatMWclN%2F8z2ev29YZoD7OXvHnzNX1Rt7FmfvdwRndPSWvnR8k3bY0IVql57lVkJcWNViKeRrjLvceJMGakQ%2FA%2BOY68u9L3PwE&RelayState=https%3A%2F%2Fwww.lib.kyushu-u.ac.jp%2Fja%2Factivities%2Fusage_ref%2Fre
res = await client.get(redirectUrl)
let cookie_JSESSIONID = CookieUtil.getValue(res.headers['set-cookie'][0], 'JSESSIONID')
redirectUrl = res.headers['location']
redirectUrl = 'https://idp.kyushu-u.ac.jp'+redirectUrl

//// GET /?e1s1
res = await client.get(redirectUrl, { headers: { Cookie: 'JSESSIONID=' + cookie_JSESSIONID[1]} })
let $ = cheerio.load(res.data)
let token = $('[name="csrf_token"]').val()
// console.log('csrf_token', token)

const postform = new URLSearchParams({'csrf_token': token,
                                      'shib_idp_ls_exception.shib_idp_session_ss': '',
                                      'shib_idp_ls_success.shib_idp_session_ss': 'false',
                                      'shib_idp_ls_value.shib_idp_session_ss': '',
                                      'shib_idp_ls_exception.shib_idp_persistent_ss': '',
                                      'shib_idp_ls_success.shib_idp_persistent_ss': 'false',
                                      'shib_idp_ls_value.shib_idp_persistent_ss': '',
                                      'shib_idp_ls_supported': '',
                                      '_eventId_proceed': '',})
// console.log(postform)
//// POST /?e1s1
res = await client.post(redirectUrl,
                      postform,
                      { headers: { Cookie: 'JSESSIONID=' + cookie_JSESSIONID[1]} }
                      )
                      // { headers: { Cookie: 'JSESSIONID=' + cookie_JSESSIONID[1], 'Content-Type': 'application/x-www-form-urlencoded'} })
redirectUrl = "https://idp.kyushu-u.ac.jp/idp/profile/SAML2/Redirect/SSO?execution=e1s2"
// redirectUrl = res.headers['location']
// redirectUrl = 'https://idp.kyushu-u.ac.jp'+redirectUrl
// console.log('110',res.headers)
// console.log('110',res.data)

//// GET /?e1s2
res = await client.get(redirectUrl, { headers: { Cookie: 'JSESSIONID=' + cookie_JSESSIONID[1]} })
$ = cheerio.load(res.data)
token = $('[name="csrf_token"]').val()
// console.log('116 data', res.data)
// console.log('116 csrf_token', token)

//// POST /?e1s2
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
let shib_idp_session = CookieUtil.getValue(res.headers['set-cookie'][0], 'shib_idp_session')
// console.log(res.data)
// console.log(SAMLResponse)

// POST default-sp
res = await client.post('https://www.lib.kyushu-u.ac.jp/simplesamlphp/module.php/saml/sp/saml2-acs.php/default-sp',
                        new URLSearchParams({
                          'RelayState': RelayState,
                          'SAMLResponse': SAMLResponse
                        }),
                        { headers: { 
                          Cookie: (typeof SimpleSAMLSessionID !== 'undefined' ? SimpleSAMLSessionID[0]+'='+SimpleSAMLSessionID[1] : ""), 
                          'Content-Type': 'application/x-www-form-urlencoded'} })
let allCookie = res.headers['set-cookie'].toString()
const replaceWord = /,/g
allCookie = allCookie.replace(replaceWord, '; '); //getAllHeadersの場合
if (CookieUtil.getValue(allCookie, 'SimpleSAMLSessionID')){
  SimpleSAMLSessionID = CookieUtil.getValue(allCookie, 'SimpleSAMLSessionID')
}
let SimpleSAMLAuthToken = CookieUtil.getValue(allCookie, 'SimpleSAMLAuthToken')
if (CookieUtil.getValue(allCookie, 'opensaml')){
  cookie_opensaml_req_ss = CookieUtil.getValue(allCookie, 'opensaml')
}

// // GET re
// res = await client.get('https://www.lib.kyushu-u.ac.jp/ja/activities/usage_ref/re?check_logged_in=1', { headers: { Cookie: SimpleSAMLSessionID[0]+'='+SimpleSAMLSessionID[1]+'; '+SimpleSAMLAuthToken[0]+'='+SimpleSAMLAuthToken[1]} })
// if (CookieUtil.getValue(res.headers['set-cookie'][0], 'SSESS')){
//   let cookie_SSESS = CookieUtil.getValue(res.headers['set-cookie'][0], 'SSESS')
// }
redirectUrl = res.headers['location']

// GET re?check_logged_in=1
if (cookie_SSESS){
  res = await client.get(redirectUrl, { headers: { Cookie: SimpleSAMLSessionID[0]+'='+SimpleSAMLSessionID[1]+'; '+SimpleSAMLAuthToken[0]+'='+SimpleSAMLAuthToken[1]+'; '+cookie_SSESS[0]+'='+cookie_SSESS[1]} })
}else{
  res = await client.get(redirectUrl, { headers: { Cookie: SimpleSAMLSessionID[0]+'='+SimpleSAMLSessionID[1]+'; '+SimpleSAMLAuthToken[0]+'='+SimpleSAMLAuthToken[1]} })
}
if (CookieUtil.getValue(res.headers['set-cookie'][0], 'SSESS')){
  cookie_SSESS = CookieUtil.getValue(res.headers['set-cookie'][0], 'SSESS')
}

if (res.headers['location']){
  redirectUrl = res.headers['location']
  // GET re?check_logged_in=1
  if (cookie_SSESS){
    res = await client.get(redirectUrl, { headers: { Cookie: SimpleSAMLSessionID[0]+'='+SimpleSAMLSessionID[1]+'; '+SimpleSAMLAuthToken[0]+'='+SimpleSAMLAuthToken[1]+'; '+cookie_SSESS[0]+'='+cookie_SSESS[1]} })
  }else{
    res = await client.get(redirectUrl, { headers: { Cookie: SimpleSAMLSessionID[0]+'='+SimpleSAMLSessionID[1]+'; '+SimpleSAMLAuthToken[0]+'='+SimpleSAMLAuthToken[1]} })
  }
  if (CookieUtil.getValue(res.headers['set-cookie'][0], 'SSESS')){
    cookie_SSESS = CookieUtil.getValue(res.headers['set-cookie'][0], 'SSESS')
  }
}


$ = cheerio.load(res.data)
// console.log("get re", res.headers)
// -----------------------------以上ページ取得-----------------------------

let form_build_id, form_token;
$('form[class="form_ecats_ref_borrow"]').each((i, elem)=>{
  form_build_id = $('input[name="target_key[]"]', elem).val()
  form_token = $('input[name="form_token"]', elem).val()
})
// タイトル、返却期限、延長可能か、target_keyを取得
const bookData = []
$('li[class="item list-group-item"]').each((i, elem) => {
  // console.log("inside: ",$(elem).text())
  let returnDate;
  let title = $("h4", elem).text()
  let renewable = false;
  let target_key;
  $('span', elem).each((i, span) => {
    let span_txt = $(span).text()
    if (span_txt.match(/返却期限\d+/)){
      returnDate = new Date(span_txt.slice(span_txt.indexOf(2)).replace(/\./g, '-')) //"返却期限 2022.08.01"　などから2以降の文字列を取り出し、.を-に置き換え、日付に変換
    }
  })
  $('input[class="btn-renew button js-form-submit form-submit form-control"]', elem).each((i, input) => {
    // renewable = li.find("input")
      if ($(input).attr("value") === "貸出更新"){
        renewable = true;
        target_key = $(input).attr("data-bookid")
      }
  })
  bookData.push({"title": title, "returnDate": returnDate, "renewable": renewable, "target_key": target_key})
  // console.log(title, renewable, returnDate, target_key)
})

console.log(bookData)
const nowUTC = new Date();
const nowTokyo = new Date(nowUTC.setHours(nowUTC.getHours()+9))
let messege = ""
let target_key =""
console.log("tokyoの現在時刻:", nowTokyo)
bookData.forEach((elem)=>{
  if (elem.renewable&&isToday(nowTokyo, elem.returnDate)){
    if (target_key != "") {
      target_key += ",";
      messege+=", "
    }
    target_key += elem.target_key;
    messege+=elem.title
    console.log("today",elem.title)
  }
})
// 次回実行日の決定
let next_execute_date = new Date(nowTokyo.setDate(nowTokyo.getDate() + 6));
nowTokyo.setDate(nowTokyo.getDate()-6)
next_execute_date.setHours(23, 59);
console.log("init next_execute_date", next_execute_date)
bookData.forEach((elem)=>{
  if (elem.renewable){
    if (!isToday(nowTokyo, elem.returnDate)){ //今日を次回実行日にしない
      if (isWithinNDays(nowTokyo, elem.returnDate, 6)){
        if (elem.returnDate < next_execute_date){
          next_execute_date = elem.returnDate
          console.log("updated next_execute_date", next_execute_date, elem.title)
        }
      }
    }
  }
})

// let data = new URLSearchParams({
//   "active_page_top": 1,
//   "disp_count": 10,
//   "sort": "re.rtnlimdt-_-asc",
//   "target_key[]": target_key,
//   "active_page_bottom": 1,
//   'form_build_id': form_build_id,
//   'form_token': form_token,
//   "form_id": "ecats_ref_borrow_re",
//   "page": 1,
//   // "op": "Go",
//   "target_key": target_key,
//   "act": "ext",
// })
if (target_key){
  res = await client.get('https://www.lib.kyushu-u.ac.jp/ja/activities/usage_ref/re/renew?status=&sort=due-asc&disp_count=10&' + 
                          'target_key%5B%5D='+target_key+
                          '&target_key='+target_key
                          ,
                          { headers: { Cookie: SimpleSAMLSessionID[0]+'='+SimpleSAMLSessionID[1]+'; '+
                                              SimpleSAMLAuthToken[0]+'='+SimpleSAMLAuthToken[1]+'; '+
                                              cookie_SSESS[0]+'='+cookie_SSESS[1]
                                              , 
                                        Referer: "https://www.lib.kyushu-u.ac.jp/ja/activities/usage_ref/re", Origin: "https://www.lib.kyushu-u.ac.jp"} })
  // console.log(res.headers)
  if (res.status == 302){
    res = await client.get('https://www.lib.kyushu-u.ac.jp/ja/activities/usage_ref/re', { headers: { Cookie: SimpleSAMLSessionID[0]+'='+SimpleSAMLSessionID[1]+'; '+
                                                                                                              SimpleSAMLAuthToken[0]+'='+SimpleSAMLAuthToken[1]+'; '+
                                                                                                              cookie_SSESS[0]+'='+cookie_SSESS[1], 
                                                                                                    Referer: "https://www.lib.kyushu-u.ac.jp/ja/activities/usage_ref/re",
                                                                                                    Origin: "https://www.lib.kyushu-u.ac.jp"} })
    // console.log(res.data)
    //notification to Line
    await axios.post('https://notify-api.line.me/api/notify',
    new URLSearchParams({
      'message': "以下の本を延長しました："+messege
    }),
    { headers: { 'Authorization': 'Bearer '+ process.env.LINE_TOKEN }})
  }else{
    await axios.post('https://notify-api.line.me/api/notify',
    new URLSearchParams({
      'message': "以下の本の延長処理に失敗："+messege
    }),
    { headers: { 'Authorization': 'Bearer '+ process.env.LINE_TOKEN }})
  }
}
// GITHUB Actions Scheduleの更新
next_execute_date.setDate(next_execute_date.getDate()-1)
const octokit = new Octokit({ auth: process.env.GITTOHABU_TOKEN });
const content = `
name: QULib_AutoRenewMyBooks
on:
  workflow_dispatch:
  schedule:
    - cron: '10 15 `+(next_execute_date.getDate())+" "+(next_execute_date.getMonth()+1)+` *'
jobs:
  QULib_AutoRenewMyBooks:
    runs-on: ubuntu-latest
    name: main
    steps:
      - name: main step
        id: main
        env:
          USERNAME: \${{secrets.USERNAME}}
          PW: \${{secrets.PW}}
          LINE_TOKEN: \${{secrets.LINE_TOKEN}}
          GITTOHABU_TOKEN: \${{secrets.GITTOHABU_TOKEN}}
          # GITTOHABU_OWNER: \$GITHUB_REPOSITORY_OWNER
          # GITTOHABU_REPO: \${GITHUB_REPOSITORY#\${GITHUB_REPOSITORY_OWNER}/}
        uses: omine-me/QULib_AutoRenewMyBooks@main
`
const target = {
  owner: "omine-me",
  repo: "QULib_AutoRenewMyBooks",
  branch: "main"
};
(async () => {
  const latestCommit = (await octokit.rest.repos.getBranch(target)).data.commit;

  const createdBlob = (await octokit.rest.git.createBlob({
    ...target,
    content: Buffer.from(content, "utf-8").toString("base64"),
    encoding: "base64"
  })).data;

  const createdTree = (await octokit.rest.git.createTree({
    ...target,
    tree: [{
      type: "blob",
      path: ".github/workflows/main.yml",
      mode: "100644",
      sha: createdBlob.sha
    }],
    base_tree: latestCommit.sha
  })).data;

  const createdCommit = (await octokit.rest.git.createCommit({
    ...target,
    message: "Update GitHub Actions Schedule",
    tree: createdTree.sha,
    parents: [latestCommit.sha],
  })).data;

  await octokit.rest.git.updateRef({
    ...target,
    ref: `heads/${target.branch}`,
    sha: createdCommit.sha
  });
})().catch( function ( error ) {
  console.log( error );
} );;

//notification to Line about next exec
next_execute_date.setDate(next_execute_date.getDate()+1)
await axios.post('https://notify-api.line.me/api/notify',
                  new URLSearchParams({
                    'message': "次回の実行日は"+(next_execute_date.getMonth()+1)+"/"+next_execute_date.getDate()+"です。"
                  }),
                  { headers: { 'Authorization': 'Bearer '+ process.env.LINE_TOKEN }})
