var header = `
<div class="sticky-header main-bar-wraper header-curve ">
  <div class="main-bar clearfix bg-primary-2">
    <div class="container clearfix">
      <div class="logo-header mostion">
        <a href="index.html"><img src="https://namdp1999.github.io/projects/teknailsjsc/images/logo.png" alt=""></a>
      </div>
      <button data-target=".header-nav" data-toggle="collapse" type="button" class="navbar-toggle collapsed" aria-expanded="false">
        <i class="flaticon-menu"></i>
      </button>
      <div class="header-nav navbar-collapse collapse">
        <ul class="nav navbar-nav">
          <li><a href="index.html?a=[memberphone]">Trang chủ</a></li>
          <li><a href="./pages/gioi-thieu.htm?a=[memberphone]">Giới thiệu</a></li>
          <li class="active"> <a href="javascript:;">Sản phẩm<i class="fa fa-chevron-down"></i></a>
            <ul class="sub-menu">
              <li> <a href="./nhom-san-pham/kem-cat-da.htm?a=[memberphone]">Kềm Cắt Da</a></li>
              <li> <a href="./nhom-san-pham/kem-cat-mong.htm?a=[memberphone]">Kềm Cắt Móng</a></li>
              <li> <a href="./nhom-san-pham/sui-da.htm?a=[memberphone]">Sủi Da</a></li>
              <li> <a href="./nhom-san-pham/giua.htm?a=[memberphone]">Giũa</a></li>
              <li> <a href="./nhom-san-pham/moc-khoe.htm?a=[memberphone]">Móc Khóe</a></li>
            </ul>
          </li>
          <li><a href="./pages/album-anh.htm?a=[memberphone]">Album ảnh</a></li>
          <li><a href="./pages/video.htm?a=[memberphone]">Video</a></li>
          <li><a href="./pages/lien-he.htm?a=[memberphone]">Liên hệ</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
`;

document.getElementById("header").innerHTML = header;
