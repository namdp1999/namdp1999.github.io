var masthead = `
<div class="header-main clearfix">
  <div class="container">
    <div class="row menu-row">
      <div class="site-logo col-lg-3 col-xs-9">
        <a href="index.html" class="logo"><img src="https://namdp1999.github.io/projects/mocnguyen/images/logo.png" alt="Mộc Nguyên Eco" class="logo"></a>
      </div>
      <div class="header-content col-lg-9 col-md-12 col-xs-12 pull-right">
        <div id="topbar" class="topbar ">
          <div class="topbar-widgets clearfix">
            <div class="widget">
              <ul class="socials">
                <li> <a href="#"><i class="fa fa-linkedin"></i></a></li>
                <li> <a href="#"><i class="fa fa-skype"></i></a></li>
                <li> <a href="#"><i class="fa fa-twitter"></i></a></li>
                <li> <a href="#"><i class="fa fa-facebook"></i></a></li>
              </ul>
            </div>
            <div class="widget">
              <div class="pull-left"><span class="svg-icon"><i class="flaticon-call-answer"></i></span></div>
              <div class="pull-right">
                <div>Gọi ngay</div>
                <div>0983 279 859</div>
              </div>
            </div>
            <div class="widget">
              <div class="pull-left"><span class="svg-icon"><i class="fas fa-envelope"></i></span></div>
              <div class="pull-right">
                <div class="title">Email</div>
                <div class="sub-title">info@mocnguyen.vn</div>
              </div>
            </div>
            <div class="menu-block-right"></div>
          </div>
        </div>
        <div class="site-menu">
          <div id="site-navigation" class="main-nav primary-nav nav">
            <ul class="menu">
              <li class="active"><a href="index.html">Trang chủ</a></li>
              <li class="has-children"><a href="#" class="dropdown-toggle">Giới thiệu</a>
                <ul class="sub-menu">
                  <li><a href="#">Ống hút tre Mộc Nguyên</a></li>
                  <li><a href="#">Xưởng sản xuất Mộc Nguyên</a></li>
                </ul>
              </li>
              <li class="has-children"><a href="#" class="dropdown-toggle">Sản phẩm</a>
                <ul class="sub-menu">
                  <li><a href="#">Túi sinh học</a></li>
                  <li><a href="#">Cốc, nắp sinh học</a></li>
                  <li><a href="#">Bát đĩa sinh học</a></li>
                  <li><a href="#">Dao, Thìa, Nĩa, Ống hút sinh học</a></li>
                  <li><a href="#">Găng tay sinh học</a></li>
                  <li><a href="#">Hộp / khay sinh học</a></li>
                  <li><a href="#">Câu hỏi thường gặp (FAQs)</a></li>
                </ul>
              </li>
              <li class="has-children"><a href="#" class="dropdown-toggle">Kênh phân phối</a>
                <ul class="sub-menu">
                  <li><a href="#">Toàn quốc</a></li>
                  <li><a href="#">Chính sách đại lý</a></li>
                </ul>
              </li>
              <li><a href="#">Liên hệ</a></li>
              <li id="mf-active-menu" class="mf-active-menu"></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="navbar-toggle col-xs-3">
        <span id="mf-navbar-toggle" class="navbar-icon"> <span class="navbars-line"></span> </span>
      </div>
    </div>
  </div>
</div>
`;

document.getElementById("masthead").innerHTML = masthead;
