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
          <li><a href="index.html">Trang chủ</a></li>
          <li><a href="pages/gioi-thieu.htm">Giới thiệu</a></li>
          <li class="active"> <a href="javascript:;">Sản phẩm<i class="fa fa-chevron-down"></i></a>
            <ul class="sub-menu">
              <li> <a href="nhom-san-pham/kem-cat-da.htm">Kềm Cắt Da</a></li>
              <li> <a href="nhom-san-pham/kem-cat-mong.htm">Kềm Cắt Móng</a></li>
              <li> <a href="nhom-san-pham/sui-da.htm">Sủi Da</a></li>
              <li> <a href="nhom-san-pham/giua.htm">Giũa</a></li>
              <li> <a href="nhom-san-pham/moc-khoe.htm">Móc Khóe</a></li>
            </ul>
          </li>
          <li><a href="pages/album-anh.htm">Album ảnh</a></li>
          <li><a href="pages/video.htm">Video</a></li>
          <li><a href="pages/lien-he.htm">Liên hệ</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
`;

document.getElementById("header").innerHTML = header;
