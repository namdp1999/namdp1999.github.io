var header = `
<div class="sticky-header main-bar-wraper header-curve ">
  <div class="main-bar clearfix bg-primary">
    <div class="container clearfix">
      <div class="logo-header mostion">
        <a href="index.html"><img src="images/logo.png" alt=""></a>
      </div>
      <button data-target=".header-nav" data-toggle="collapse" type="button" class="navbar-toggle collapsed" aria-expanded="false">
        <i class="flaticon-menu"></i>
      </button>
      <div class="header-nav navbar-collapse collapse">
        <ul class="nav navbar-nav">
          <li><a href="index.html">Trang chủ</a></li>
          <li><a href="#">Giới thiệu</a></li>
          <li class="active"> <a href="javascript:;">Sản phẩm<i class="fa fa-chevron-down"></i></a>
            <ul class="sub-menu">
              <li> <a href="#">Kềm Cắt Da</a></li>
              <li> <a href="#">Kềm Cắt Móng</a></li>
              <li> <a href="#">Sủi Da</a></li>
              <li> <a href="#">Giũa</a></li>
              <li> <a href="#">Móc Khóe</a></li>
            </ul>
          </li>
          <li><a href="#">Album ảnh</a></li>
          <li><a href="#">Video</a></li>
          <li><a href="#">Liên hệ</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
`;

document.getElementById("header").innerHTML = header;
