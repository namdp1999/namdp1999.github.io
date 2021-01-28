var lien_he_tu_van = `
<div class="container">
  <div class="row">
    <div class="col-md-2"></div>
    <div class="col-md-8">
      <div class="row">
        <div class="col-md-12">
          <h2 class="title_lien_he">LIÊN HỆ TƯ VẤN</h2>
        </div>
      </div>
      <div class="row mt-5 bg-primary-2">
        <div class="col-md-4">
          <img class="img_tac_gia" src="[memberimage]" alt="">
          <p class="ten_tac_gia">[membername]</p>
        </div>
        <div class="col-md-8 bg-white">
          <ul class="list_contact">
            <li><span style="color:#863F98;background:url(https://cdn.aisystem.dev/uploads/meeylandvietnam.com/1/ICON/icon-phone.png)left center no-repeat;padding-left: 35px;background-size: 20px auto;"><a href="tel:[memberphone]">[memberphone]</a></span></li>
            <li><span style="color:#863F98;background:url(https://cdn.aisystem.dev/uploads/meeylandvietnam.com/1/ICON/icon-zalo.png)left center no-repeat;padding-left: 35px;background-size: 20px auto;">[memberzalo]</span></li>
            <li><span style="color:#863F98;background:url(https://cdn.aisystem.dev/uploads/meeylandvietnam.com/1/ICON/icon-whatsapp.png)left center no-repeat;padding-left: 35px;background-size: 20px auto;">[memberwhatsapp]</span></li>
            <li><span style="font-size:14px;background:url(https://cdn.aisystem.dev/uploads/meeylandvietnam.com/1/ICON/icon-facebook.png)left center no-repeat;padding-left: 35px;background-size: 20px auto;">[memberfacebook]</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-md-2"></div>
  </div>
</div>
`;

document.getElementById("lien-he-tu-van").innerHTML = lien_he_tu_van;
