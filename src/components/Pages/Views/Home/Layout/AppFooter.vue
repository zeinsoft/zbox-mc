<template>
  <footer class="footer footer-black footer-white">
    <div class="footer clearfix">
      <div class="container">
        <div class="row">
          <div class="col-sm-4 col-xs-12">
            <div class="footerContent">
              <a href="index.html" class="footer-logo"><img src="/static/img/background/logo.png" alt="footer-logo"></a>
              <p></p>
              <ul class="list-unstyled">
                <li><i class="fa fa-home" aria-hidden="true"></i>(100-391) 서울시 중구 장충동 1가 63-3 </li>
                <li><i class="fa fa-phone" aria-hidden="true"></i>2036-7702~8, 7712~5, 7762~6</li>
                <li><i class="fa fa-fax" aria-hidden="true"></i>2036-7632, 7633</li>
              </ul>
            </div>
          </div>
          <div class="col-sm-4 col-xs-12">
            <div class="footerContent">
              <h5>와이드칼라 담당 및 문의</h5>
              <p>신규계약 및 해지 안내 / 세금계산서 관련 및 변경<br>사업자정보 변경 안내</p>
              <ul class="list-unstyled">
                <li><i class="fa fa-phone" aria-hidden="true"></i>(02)2036-7700</li>
                <li><i class="fa fa-fax" aria-hidden="true"></i>(02)2036-7831</li>
                <li><i class="fa fa-user" aria-hidden="true"></i>이문성 : <a href="mailTo:lms_rms@naver.com">lms_rms@naver.com</a></li>
                <li><i class="fa fa-user" aria-hidden="true"></i>하동호 : <a href="mailTo:lms_rms@naver.com">hadh1029@naver.com</a></li>
              </ul>
            </div>
          </div>
          <div class="col-sm-4 col-xs-12">
            <div class="footerContent">
              <h5>시공업체 소개</h5>
              <p>업체명   : 시공데코</p>
              <ul class="list-unstyled">
                <li><i class="fa fa-user" aria-hidden="true"></i>박일권 대리</li>
                <li><i class="fa fa-phone" aria-hidden="true"></i>031-726-0515</li>
                <li><i class="fa fa-envelope" aria-hidden="true"></i><a href="mailTo:seegokim@naver.com">seegokim@naver.com</a></li>
              </ul>
              <p>업체명   : 밸류포인트</p>
              <ul class="list-unstyled">
                <li><i class="fa fa-user" aria-hidden="true"></i>조준성 대리</li>
                <li><i class="fa fa-phone" aria-hidden="true"></i>070-8290-2740</li>
                <li><i class="fa fa-envelope" aria-hidden="true"></i><a href="mailTo:value_isp@valuepoint.co.kr">value_isp@valuepoint.co.kr</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="credits ml-auto">
          <div class="copyright">
            Copyright © 2020 Zeinsoft.com, Inc. All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    name: 'main-footer'
  }
</script>
<style scoped>
  .footer {
    padding: 12px 0;
    background-color: #262a2e;
  }

  .footer ul li a {
    padding: 0rem;
  }

  .footer .copyright {
    color: #51cbce;
  }

  .footerContent h5 {
    font-size: 18px;
    color: #ffffff;
    line-height: 21px;
    margin-top: 25px;
    margin-bottom: 35px;
    text-transform: uppercase;
    font-family: "Montserrat",sans-serif;
  }
  .footerContent p {
    margin-top: 30px;
    color: #929497;
  }

  .footerContent .list-unstyled li {
    color: #929497;
    margin-bottom: 8px;
  }

  .list-unstyled {
    padding-left: 0;
    list-style: none;
  }

  .footerContent .list-unstyled li i {
    margin-right: 14px;
  }

  .ml-auto, .mx-auto {
    margin: auto;
  }
</style>
