const html =`<!DOCTYPE html>
<!--[if IEMobile 7]><html class="iem7"  lang="ja" dir="ltr"><![endif]-->
<!--[if lte IE 6]><html class="lt-ie9 lt-ie8 lt-ie7"  lang="ja" dir="ltr"><![endif]-->
<!--[if (IE 7)&(!IEMobile)]><html class="lt-ie9 lt-ie8"  lang="ja" dir="ltr"><![endif]-->
<!--[if IE 8]><html class="lt-ie9"  lang="ja" dir="ltr"><![endif]-->
<!--[if (gte IE 9)|(gt IEMobile 7)]><!--><html  lang="ja" dir="ltr" prefix="og: http://ogp.me/ns# article: http://ogp.me/ns/article# book: http://ogp.me/ns/book# profile: http://ogp.me/ns/profile# video: http://ogp.me/ns/video# product: http://ogp.me/ns/product# content: http://purl.org/rss/1.0/modules/content/ dc: http://purl.org/dc/terms/ foaf: http://xmlns.com/foaf/0.1/ rdfs: http://www.w3.org/2000/01/rdf-schema# sioc: http://rdfs.org/sioc/ns# sioct: http://rdfs.org/sioc/types# skos: http://www.w3.org/2004/02/skos/core# xsd: http://www.w3.org/2001/XMLSchema#"><!--<![endif]-->

<head profile="http://www.w3.org/1999/xhtml/vocab">
  <meta charset="utf-8" />
<link rel="shortcut icon" href="https://www.lib.kyushu-u.ac.jp/sites/all/themes/zenSub_tmp/favicon.ico" type="image/vnd.microsoft.icon" />
<meta name="generator" content="Drupal 7 (http://drupal.org)" />
<link rel="canonical" href="https://www.lib.kyushu-u.ac.jp/ja/activities/usage_ref/re" />
<link rel="shortlink" href="https://www.lib.kyushu-u.ac.jp/ja/activities/usage_ref/re" />
<meta property="og:site_name" content="九州大学附属図書館" />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://www.lib.kyushu-u.ac.jp/ja/activities/usage_ref/re" />
<meta property="og:title" content="貸出更新／予約確認" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:url" content="https://www.lib.kyushu-u.ac.jp/ja/activities/usage_ref/re" />
<meta name="twitter:title" content="貸出更新／予約確認" />
  <title>貸出更新／予約確認 | 九州大学附属図書館</title>

      <meta name="MobileOptimized" content="width">
    <meta name="HandheldFriendly" content="true">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="cleartype" content="on">

  <style>
@import url("https://www.lib.kyushu-u.ac.jp/modules/system/system.base.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/modules/system/system.messages.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/modules/system/system.theme.css?r7sl1z");
</style>
<style media="screen">
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/libraries/shadowbox/shadowbox.css?r7sl1z");
</style>
<style media="print">#sb-container{position:relative;}#sb-overlay{display:none;}#sb-wrapper{position:relative;top:0;left:0;}#sb-loading{display:none;}
</style>
<style>
@import url("https://www.lib.kyushu-u.ac.jp/modules/book/book.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/modules/calendar/css/calendar_multiday.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/modules/comment/comment.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/modules/date/date_api/date.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/modules/date/date_popup/themes/datepicker.1.7.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/modules/date/date_repeat_field/date_repeat_field.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/modules/field/theme/field.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/modules/node/node.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/modules/search/search.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/modules/user/user.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/modules/views/css/views.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/modules/ckeditor/css/ckeditor.css?r7sl1z");
</style>
<style>
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/modules/ctools/css/ctools.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/modules/shib_auth/shib_auth.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/modules/ecatslibrary/ecats_util/media/css/ecats_util.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/modules/ecatslibrary/ecats_ref_borrow/media/css/ecats_ref_borrow.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/modules/lang_dropdown/msdropdown/dd_after.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/modules/addtoany/addtoany.css?r7sl1z");
</style>
<style>
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/themes/zenSub_tmp/css/normalize.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/themes/zenSub_tmp/css/wireframes.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/themes/zenSub_tmp/css/layouts/responsive-sidebars.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/themes/zenSub_tmp/css/tabs.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/themes/zenSub_tmp/css/pages.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/themes/zenSub_tmp/css/blocks.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/themes/zenSub_tmp/css/navigation.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/themes/zenSub_tmp/css/views-styles.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/themes/zenSub_tmp/css/nodes.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/themes/zenSub_tmp/css/comments.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/themes/zenSub_tmp/css/forms.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/themes/zenSub_tmp/css/fields.css?r7sl1z");
@import url("https://www.lib.kyushu-u.ac.jp/sites/all/themes/zenSub_tmp/css/print.css?r7sl1z");
</style>
	<!--[if lt IE 9]>
	    <link rel="stylesheet" type="text/css" href="/sites/all/themes/zenSub/css/ie8.css" />
	<![endif]-->
  <script src="https://www.lib.kyushu-u.ac.jp/sites/all/modules/jquery_update/replace/jquery/1.7/jquery.min.js?v=1.7.2"></script>
<script src="https://www.lib.kyushu-u.ac.jp/misc/jquery-extend-3.4.0.js?v=1.7.2"></script>
<script src="https://www.lib.kyushu-u.ac.jp/misc/jquery-html-prefilter-3.5.0-backport.js?v=1.7.2"></script>
<script src="https://www.lib.kyushu-u.ac.jp/misc/jquery.once.js?v=1.2"></script>
<script src="https://www.lib.kyushu-u.ac.jp/misc/drupal.js?r7sl1z"></script>
<script src="https://www.lib.kyushu-u.ac.jp/sites/all/libraries/shadowbox/shadowbox.js?v=3.0.3"></script>
<script src="https://www.lib.kyushu-u.ac.jp/sites/all/modules/shadowbox/shadowbox_auto.js?v=3.0.3"></script>
<script src="https://www.lib.kyushu-u.ac.jp/misc/form.js?v=7.88"></script>
<script src="https://www.lib.kyushu-u.ac.jp/sites/default/files/languages/ja_rS4ie8BMGawWD14LmQx4SZr5zdeIK1SV6BWEYVObONw.js?r7sl1z"></script>
<script src="https://www.lib.kyushu-u.ac.jp/sites/all/modules/ecatslibrary/ecats_ref_borrow/media/js/ecats_ref_borrow.js?r7sl1z"></script>
<script>var label_select_all   = 'すべて';</script>
<script>var label_unselect_all = '選択解除';</script>
<script src="https://www.lib.kyushu-u.ac.jp/misc/collapse.js?v=7.88"></script>
<script src="https://www.lib.kyushu-u.ac.jp/sites/all/modules/lang_dropdown/msdropdown/jquery.dd.js?r7sl1z"></script>
<script src="https://www.lib.kyushu-u.ac.jp/sites/all/modules/google_analytics/googleanalytics.js?r7sl1z"></script>
<script>(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","//www.google-analytics.com/analytics.js","ga");ga("create", "UA-37831014-1", {"cookieDomain":"auto"});ga("send", "pageview");</script>
<script src="/sites/all/themes/zenSub/js/jquery-ui.js?r7sl1z"></script>
<script src="https://www.lib.kyushu-u.ac.jp/sites/all/modules/lang_dropdown/lang_dropdown.js?r7sl1z"></script>
<!--[if lt IE 9]>
    <script src="/sites/all/themes/zen/js/html5-respond.js"></script>
    <![endif]-->
  	<!--[if lt IE 9]>
	<script src="/sites/all/themes/zenSub/js/css3-mediaqueries.js"></script> 
	<![endif]-->
	<!--[if !lt IE 9]><!-->
	<script src="/sites/all/themes/zenSub/js/responsive-tables.js"></script>
	<link rel="stylesheet" type="text/css" href="/sites/all/themes/zenSub/css/responsive-tables.css" />
	<!--<![endif]-->
	
	<link rel="shortcut icon" href="/favicon.ico" >
        <link rel="apple-touch-icon" href="/sites/all/themes/zenSub_tmp/apple-touch-icon.png" />

</head>
<body class="html not-front logged-in no-sidebars page-activities page-activities-usage-ref page-activities-usage-ref-re i18n-ja section-activities" >
      <p id="skip-link">
      <a href="#main-menu" class="element-invisible element-focusable">Jump to navigation</a>
    </p>
      
	<script type="text/javascript">
  jQuery(function() {
    jQuery('#btnShow').click(function() {
			jQuery('#libraries_top_image_a_summary').show();
			jQuery('#btnHidden').show();    
			jQuery('#btnShow').hide();    
    });
    jQuery('#btnHidden').click(function() {
			jQuery('#libraries_top_image_a_summary').hide();
			jQuery('#btnShow').show();    
			jQuery('#btnHidden').hide();    
    });
    jQuery('#libraries_top_image_a_summary').hide();    
    jQuery('#btnHidden').hide();    
  });
</script>




<link rel="stylesheet" href="/sites/all/themes/zenSub/css/jquery-ui.css" />



<div id="page">

  <header id="header" class="clearfix" role="banner">
  <div class="inner">

          <a href="/ja" title="ホーム" rel="home" id="logo"><img src="https://www.lib.kyushu-u.ac.jp/sites/default/files/logo_l_1_0.jpg" alt="ホーム" /></a>
        
                  <div class="region region-head-menu">
	<div class="region_wrap">
    <div id="block-block-8" class="block block-block first odd">

      
  <link href="/sites/all/themes/zenSub/menu/megamenu.css" media="screen" rel="stylesheet" type="text/css" />
<script src="/sites/all/themes/zenSub/menu/jquery.megamenu.js" type="text/javascript"></script>
<div id="func_menu">&nbsp;</div>
<script type="text/javascript">
  jQuery(document).ready(function() {
    var lang = 0;
    var login = 1;
    var login_url = "";
    var mode = 1;
    var can_use_ref_borrow = 1;
    var can_use_bokreq = 1;
    var can_use_fac_rsv = 1;
    var can_use_ill = 1;
    var can_use_intro_letter = 1;
    var can_use_bok_odr = 1;
    var can_use_journal_list = 0;
    var can_use_archives = 1;
    var can_use_settings = 1;
    var name  = '大嶺 太聖';
    var email = '';

    jQuery.post(
      '/sites/all/themes/zenSub/menu/megamenu.php'
      , { lang  : lang,
          base_url : 'https://www.lib.kyushu-u.ac.jp',
          cat_url : '/catalog/redirect',
          login : login,
          mode  : mode,
          can_use_ref_borrow : can_use_ref_borrow,
          can_use_bokreq : can_use_bokreq,
          can_use_fac_rsv : can_use_fac_rsv,
          can_use_ill : can_use_ill,
          can_use_intro_letter : can_use_intro_letter,
          can_use_bok_odr : can_use_bok_odr,
          can_use_journal_list : can_use_journal_list,
          can_use_archives : can_use_archives,
          can_use_settings : can_use_settings,
          login_url  : login_url,
          name  : name,
          email : email
        }
      , function(data) {
          jQuery('#func_menu').html(data);

          jQuery('ul.megamenu li.mypage a.mm-item-link').addClass('menu_active');
        }
      , 'html'
    );
  });
</script>
</div>
<div id="block-lang-dropdown-language" class="block block-lang-dropdown last even">

      
  <form action="/ja/activities/usage_ref/re" method="post" id="lang-dropdown-form" accept-charset="UTF-8"><div><div class="form-item form-type-select form-item-lang-dropdown-select">
 <select style="width:100px" class="lang-dropdown-select-element form-select" id="edit-lang-dropdown-select" name="lang_dropdown_select"><option value="ja" selected="selected">Japanese</option><option value="en">English</option></select>
</div>
<input type="hidden" name="lang_dropdown_type" value="language" />
<input type="hidden" name="ja" value="/ja/activities/usage_ref/re" />
<input type="hidden" name="en" value="/en/activities/usage_ref/re" />
<noscript><div>
<input type="submit" id="edit-submit" name="op" value="Go" class="form-submit" />
</div></noscript><input type="hidden" name="form_build_id" value="form-24kn02GvxiBbdH3Rds_EKERNJbCvqj3yld0usKeGiSg" />
<input type="hidden" name="form_token" value="nVs-LT2LL9a7ipPqvuW0q7kEvGKm6jk-CMWhWoYSLbY" />
<input type="hidden" name="form_id" value="lang_dropdown_form" />
</div></form>
</div>
	</div>
  </div><!-- /.region -->
  </div>
  </header>
  <div id="main" class="">
  	<div class="content_wrap clearfix">
				<div id="content" class="column" role="main">
		
		
		  		  		  
		  <a id="main-content"></a>
		  		  		  			<h2 class="title" id="page-title"><span>貸出更新／予約確認</span></h2>
		  		  
		  		  		  		  
		  <div id="high" class="clearfix">
		  		  		  		  </div>
		  <div  class="clearfix">
		    <div class="region region-help">
	<div class="region_wrap">
    <div id="block-block-65" class="block block-block first last odd">

      
  <div class="usage_ref_header borrow_re_header clearfix">
  <div class="notice">
    <p>返却期限内であれば、1回に限り貸出期間を延長できます（医学は2回まで、中央と理系の長期貸出は3回まで）。</p>
    <p>※他利用者から予約が入っている場合は延長できません。</p>
    <p>※貸出期間は延長処理日から起算します（返却期限日からではありません）。</p>
  </div>
</div>
</div>
	</div>
  </div><!-- /.region -->
		  		  


<form class="form_ecats_ref_borrow" onsubmit="jQuery(&quot;input:submit&quot;).attr(&quot;disabled&quot;, &quot;disabled&quot;); jQuery(&quot;input:button&quot;).attr(&quot;disabled&quot;, &quot;disabled&quot;); jQuery(&quot;input:reset&quot;).attr(&quot;disabled&quot;, &quot;disabled&quot;);" action="/ja/activities/usage_ref/re" method="post" id="ecats-ref-borrow-re" accept-charset="UTF-8"><div><div id="ecats_ref_borrow" class="ecats_container">
  <ul class="ecats_ref_tabs clearfix">
    <li><a href="/ja/activities/usage_ref/re" class="active">貸出中 (5)</a></li>
    <li><a href="/ja/activities/usage_ref/rs">予約 (0)</a></li>
  </ul>

<div class="tab_block clearfix"><div class="filterdisabled">filter</div><ul class="tabs clearfix"><li>延滞中 (0)</li></ul></div>
  <ul class="select_block clearfix">
    <li class="total"><span>5</span> 件</li>
    <li class="pagination">
      <input  type="button" value="前へ" class="prev shadow disabled" disabled="disabled" />      <div class="form-item form-type-textfield form-item-active-page-top">
 <input onchange="jumpPage(this.value); return false;" class="active_page form-text" type="text" id="edit-active-page-top" name="active_page_top" value="1" size="60" maxlength="5" />
</div>
/&nbsp;1 ページ      <input  type="button" value="次へ" class="next shadow disabled" disabled="disabled" />    </li>
    <li><div class="form-item form-type-select form-item-disp-count">
 <select onchange="if (this.value != &#039;&#039;) { changeSelect(); } return false;" id="edit-disp-count" name="disp_count" class="form-select"><option value="10">10 / ページ</option><option value="20">20 / ページ</option><option value="50">50 / ページ</option><option value="65536">すべて</option></select>
</div>
</li>
    <li><div class="form-item form-type-select form-item-sort">
 <select onchange="changeSelect(); return false;" id="edit-sort" name="sort" class="form-select"><option value="">並べ替え</option><option value="re.rtnlimdt-_-asc" selected="selected">返却期限順↑</option><option value="re.rtnlimdt-_-desc">返却期限順↓</option><option value="re.lnddt-_-desc">貸出日順↓</option><option value="re.lnddt-_-asc">貸出日順↑</option><option value="title-_-asc">タイトル順A-Z</option><option value="title-_-desc">タイトル順Z-A</option></select>
</div>
</li>
    <li class="archives"><a href="/ja/activities/usage_ref/hs">貸出履歴の参照</a></li>
  </ul>

  <ul class="ecats_ref_list">
      <li class="record">
      <ul class="line_block clearfix">
        <li class="line info">
          <div class="check">
            <p>1</p>
            <div class="form-item form-type-checkbox form-item-target-key-">
 <input type="checkbox" name="target_key[]" value="110012021107852" class="form-checkbox" />
</div>
          </div>
          <div class="detail">
            <h4>一億人の英会話 : 「話すため」に必要な英文の全パターンドリル / 大西泰斗, デイビット・エバンス著</h4>
            <ul class="record_info">
                  <li>
                      <span><span class="label">著者</span>&nbsp;大西, 泰斗(1961-), Evans, David</span>
                            <span><span class="label">出版社</span>&nbsp;ナガセ</span>
                    </li>
                  <li>
                <span><span class="label">所在</span>&nbsp;中央図 4階 きゅうとコモンズ[留学]</span>
                      <span><span class="label">請求記号</span>&nbsp;837.8/O 66</span>
                    </li>
              <li>
                <span><span class="label">貸出日</span>&nbsp;2022.07.11</span>
                <span><span class="label">返却期限</span>&nbsp;2022.07.25</span>
              </li>
                </ul>
          </div>
        </li>
        <li class="line btn">
          <input  type="button" value="貸出更新" onclick="extRec(&#039;110012021107852&#039;); return false;" />            </li>
      </ul>
    </li>
      <li class="record">
      <ul class="line_block clearfix">
        <li class="line info">
          <div class="check">
            <p>2</p>
                      </div>
          <div class="detail">
            <h4>感覚・感情とロボット : 人と機械のインタラクションへの挑戦 / 日本機械学会編</h4>
            <ul class="record_info">
                  <li>
                      <span><span class="label">著者</span>&nbsp;日本機械学会</span>
                            <span><span class="label">出版社</span>&nbsp;工業調査会</span>
                    </li>
                  <li>
                <span><span class="label">所在</span>&nbsp;仮設図書館(芸工)図書</span>
                      <span><span class="label">請求記号</span>&nbsp;501.9/N77</span>
                    </li>
              <li>
                <span><span class="label">貸出日</span>&nbsp;2022.06.28</span>
                <span><span class="label">返却期限</span>&nbsp;2022.07.27</span>
              </li>
                </ul>
          </div>
        </li>
        <li class="line btn">
          &nbsp;              <ul class="record_info list_inner">
            <li>
              <span><span class="label">更新済回数</span>&nbsp;1 回</span>
            </li>
          </ul>
            </li>
      </ul>
    </li>
      <li class="record">
      <ul class="line_block clearfix">
        <li class="line info">
          <div class="check">
            <p>3</p>
            <div class="form-item form-type-checkbox form-item-target-key-">
 <input type="checkbox" name="target_key[]" value="130012021009772" class="form-checkbox" />
</div>
          </div>
          <div class="detail">
            <h4>ITエンジニアのための機械学習理論入門 / 中井悦司著</h4>
            <ul class="record_info">
                  <li>
                      <span><span class="label">著者</span>&nbsp;中井, 悦司(1971-)</span>
                            <span><span class="label">出版社</span>&nbsp;技術評論社</span>
                    </li>
                  <li>
                <span><span class="label">所在</span>&nbsp;理系図1F 開架</span>
                      <span><span class="label">請求記号</span>&nbsp;007.13/N 34</span>
                    </li>
              <li>
                <span><span class="label">貸出日</span>&nbsp;2022.07.14</span>
                <span><span class="label">返却期限</span>&nbsp;2022.07.28</span>
              </li>
                </ul>
          </div>
        </li>
        <li class="line btn">
          <input  type="button" value="貸出更新" onclick="extRec(&#039;130012021009772&#039;); return false;" />            </li>
      </ul>
    </li>
      <li class="record">
      <ul class="line_block clearfix">
        <li class="line info">
          <div class="check">
            <p>4</p>
                      </div>
          <div class="detail">
            <h4>南極点のピアピア動画 / 野尻抱介著</h4>
            <ul class="record_info">
                  <li>
                      <span><span class="label">著者</span>&nbsp;野尻, 抱介</span>
                            <span><span class="label">出版社</span>&nbsp;早川書房</span>
                    </li>
                  <li>
                <span><span class="label">所在</span>&nbsp;仮設図書館(芸工)図書</span>
                      <span><span class="label">請求記号</span>&nbsp;913/N93</span>
                    </li>
              <li>
                <span><span class="label">貸出日</span>&nbsp;2022.07.02</span>
                <span><span class="label">返却期限</span>&nbsp;2022.08.01</span>
              </li>
                </ul>
          </div>
        </li>
        <li class="line btn">
          &nbsp;              <ul class="record_info list_inner">
            <li>
              <span><span class="label">更新済回数</span>&nbsp;1 回</span>
            </li>
          </ul>
            </li>
      </ul>
    </li>
      <li class="record">
      <ul class="line_block clearfix">
        <li class="line info">
          <div class="check">
            <p>5</p>
                      </div>
          <div class="detail">
            <h4>良いコード/悪いコードで学ぶ設計入門 : 保守しやすい成長し続けるコードの書き方 / 仙塲大也著</h4>
            <ul class="record_info">
                  <li>
                      <span><span class="label">著者</span>&nbsp;仙塲, 大也</span>
                            <span><span class="label">出版社</span>&nbsp;技術評論社</span>
                    </li>
                  <li>
                <span><span class="label">所在</span>&nbsp;仮設図書館(芸工)図書</span>
                      <span><span class="label">請求記号</span>&nbsp;548.963/Se57</span>
                    </li>
              <li>
                <span><span class="label">貸出日</span>&nbsp;2022.07.02</span>
                <span><span class="label">返却期限</span>&nbsp;2022.08.01</span>
              </li>
                </ul>
          </div>
        </li>
        <li class="line btn">
          &nbsp;              <ul class="record_info list_inner">
            <li>
              <span><span class="label">更新済回数</span>&nbsp;1 回</span>
            </li>
          </ul>
            </li>
      </ul>
    </li>
    </ul>

    <div class="button_block">
    <input  type="button" class="toggle_btn unselect" name="toggle" value="すべて" onclick="toggleChkbox(); return false;" />    <input  type="button" name="ext_all" value="貸出更新" onclick="extRecAll(); return false;" />  </div>
  
  <ul class="select_block">
    <li class="pagination">
      <input  type="button" value="前へ" class="prev shadow disabled" disabled="disabled" />      <div class="form-item form-type-textfield form-item-active-page-bottom">
 <input onchange="jumpPage(this.value); return false;" class="active_page form-text" type="text" id="edit-active-page-bottom" name="active_page_bottom" value="1" size="60" maxlength="5" />
</div>
/&nbsp;1 ページ      <input  type="button" value="次へ" class="next shadow disabled" disabled="disabled" />    </li>
  </ul>

<input type="hidden" name="form_build_id" value="form-LPvOuLopCRUHUZA3CImSwoXucSegmSxcHMGVCIvs5d0" />
<input type="hidden" name="form_token" value="8BLvt1464O667bn9XeJtvdCpDGxaIP8a9TRioXnPXHA" />
<input type="hidden" name="form_id" value="ecats_ref_borrow_re" />
<input type="hidden" name="page" value="1" />
<noscript><div>
<input type="submit" id="edit-hiddensubmit" name="op" value="Go" class="form-submit" />
</div></noscript><input type="hidden" name="target_key" value="" />
<input type="hidden" name="act" value="" />
</div>
</div></form>		  		  </div>
		  <div id="low" class="clearfix">
		  		  		  		  		  </div>
		</div><!-- /#content -->
	
			
		  	</div>
  </div><!-- /#main -->
    <footer id="footer" class="region region-footer">
    <div id="block-block-16" class="block block-block first last odd">

      
  <link href="/sites/all/themes/zenSub/menu/footer.css" media="screen" rel="stylesheet" type="text/css" />
<div id="func_footer">
	&nbsp;</div>
<script type="text/javascript">
  jQuery(document).ready(function() {
    var lang = 0;

    jQuery.post(
      '/sites/all/themes/zenSub/menu/footer.php'
      , { lang : lang,
          base_url : 'https://www.lib.kyushu-u.ac.jp',
          cat_url : '/catalog/redirect'
        }
      , function(data) {
          jQuery('#func_footer').html(data);
        }
      , 'html'
    );
  });
</script>
</div>
  </footer>

</div><!-- /#page -->

  </body>
</html>
`

import * as cheerio from 'cheerio';
let $ = cheerio.load(html)

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