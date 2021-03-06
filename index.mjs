import axios from 'axios';
import * as cheerio from 'cheerio';
import {Octokit} from "octokit";

const client = axios.create({
  // withCredentials: true,
  maxRedirects: 0,
  validateStatus: status => status < 500,
});

// axios.interceptors.request.use(request => {
//   console.log('Starting Request: ', request)
//   return request
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
  return inputDate.getDate() == now.getDate()+3 &&
    inputDate.getMonth() == now.getMonth() &&
    inputDate.getFullYear() == now.getFullYear()
}

const isWithinNDays = (now, inputDate, withinDays=6) => {
  const nDaysLater = new Date(now.getTime())
  nDaysLater.setDate(now.getDate()+withinDays)
  // console.log(inputDate , nDaysLater)
  return inputDate < nDaysLater
}

let redirectUrl = 'https://www.lib.kyushu-u.ac.jp/ja/activities/usage_ref/re'
let res = await client.get(redirectUrl)
let cookie_SSESS = CookieUtil.getValue(res.headers['set-cookie'][0], 'SSESS')
// console.log(cookie_SSESS)

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
// console.log('116 data', res.data)
// console.log('116 csrf_token', token)

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

res = await client.get('https://www.lib.kyushu-u.ac.jp/ja/activities/usage_ref/re', { headers: { Cookie: cookie_SSESS[0]+'='+cookie_SSESS[1]+'; '+cookie_shibsession[0]+'='+cookie_shibsession[1]} })
cookie_SSESS = CookieUtil.getValue(res.headers['set-cookie'][0], 'SSESS')
$ = cheerio.load(res.data)
// console.log(span)
// -----------------------------以上ページ取得-----------------------------

const form_build_id = $('[name="form_build_id"]').val()
const form_token = $('[name="form_token"]').val()
// タイトル、返却期限、延長可能か、target_keyを取得
const bookData = []
const numberRegex = /[^0-9]/g;
$('ul[class="line_block clearfix"]').each((i, elem) => {
  // console.log("inside: ",$(elem).text())
  let returnDate;
  let title = $("h4", elem).text()
  let renewable = false;
  let target_key;
  $('span', elem).each((i, span) => {
    let span_txt = $(span).text()
    if (span_txt.match(/返却期限 2/)){
      returnDate = new Date(span_txt.slice(span_txt.indexOf("2")).replace(/\./g, '-')) //"返却期限 2022.08.01"　などから2以降の文字列を取り出し、.を-に置き換え、日付に変換
      // validSpanCount++;
    }
  })
  $('li[class="line btn"]', elem).each((i, li) => {
    // renewable = li.find("input")
    // console.log($(li).first())
    $("input", li).each((i, input) => {
      if ($(input).attr("value") == "貸出更新"){
        renewable = true;
        target_key = $(input).attr("onclick").replace(numberRegex, "")
      }
    })
  })
  bookData.push({"title": title, "returnDate": returnDate, "renewable": renewable, "target_key": target_key})
  // console.log(title, renewable, returnDate, target_key)
})

// console.log(bookData)
const nowUTC = new Date();
const nowTokyo = new Date(nowUTC.setHours(nowUTC.getHours()+9))
let messege = ""
let target_key =""
console.log("tokyoの現在時刻:", nowTokyo)
bookData.forEach((elem)=>{
  if (isToday(nowTokyo, elem.returnDate)){
    if (target_key != "") {
      target_key += ",";
      messege+=", "
    }
    target_key += elem.target_key;
    messege+=elem.title
    console.log("today",elem.title)
  }
})
bookData.forEach((elem)=>{
  if (isWithinNDays(nowTokyo, elem.returnDate, 6)){
    if (elem.renewable){
      console.log("within&renewable",elem.title)
    }
  }
})

// console.log({
//   'form_build_id': form_build_id,
//   'form_token': form_token,
//   "form_id": "ecats_ref_borrow_re",
//   "page": 1,
//   "target_key": target_key,
//   "act": "ext",
// })
res = await client.post('https://www.lib.kyushu-u.ac.jp/ja/activities/usage_ref/re',
                        new URLSearchParams({
                          "active_page_top": 1,
                          "disp_count": 10,
                          "sort": "re.rtnlimdt-_-asc",
                          "target_key[]": target_key,
                          "active_page_bottom": 1,
                          'form_build_id': form_build_id,
                          'form_token': form_token,
                          "form_id": "ecats_ref_borrow_re",
                          "page": 1,
                          "target_key": target_key,
                          "act": "ext",
                        }),
                        { headers: { Cookie: cookie_SSESS[0]+'='+cookie_SSESS[1]+'; '+cookie_shibsession[0]+'='+cookie_shibsession[1], 'Content-Type': 'application/x-www-form-urlencoded'} })
// console.log(res)

res = await client.get('https://www.lib.kyushu-u.ac.jp/ja/activities/usage_ref/re', { headers: { Cookie: cookie_SSESS[0]+'='+cookie_SSESS[1]+'; '+cookie_shibsession[0]+'='+cookie_shibsession[1]} })
// console.log(res)

// GITHUB Actions Scheduleの更新
const octokit = new Octokit({ auth: process.env.GITTOHABU_TOKEN });
const content = `
name: QULib_AutoRenewMyBooks

    on:
      workflow_dispatch:
    
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
      path: ".github/workflows/test1.yml",
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

// await client.post('https://notify-api.line.me/api/notify',
//                   new URLSearchParams({
//                     'message': "以下の本を延長しました："+messege
//                   }),
//                   { headers: { 'Authorization': 'Bearer '+ process.env.LINE_TOKEN }})