const BannerSection = () => {
  return (
    <>
      {/* Top Banner Section */}
      <div className="banner_section banner_section_three">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="banner_area">
                <div className="banner_thumb">
                  <a href="shop.html"><img src="/assets/img/bg/banner8.jpg" alt="#" /></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="banner_area">
                <div className="banner_thumb">
                  <a href="shop.html"><img src="/assets/img/bg/banner9.jpg" alt="#" /></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="banner_area bottom">
                <div className="banner_thumb">
                  <a href="shop.html"><img src="/assets/img/bg/banner10.jpg" alt="#" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Banner Section with Content */}
      <section className="banner_section banner_section_three">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="banner_area">
                <div className="banner_thumb">
                  <a href="shop.html"><img src="/assets/img/bg/banner11.jpg" alt="#" /></a>
                  <div className="banner_content">
                    <h1>Handbag <br /> Men's Collection</h1>
                    <a href="shop.html">Discover Now</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="banner_area">
                <div className="banner_thumb">
                  <a href="shop.html"><img src="/assets/img/bg/banner12.jpg" alt="#" /></a>
                  <div className="banner_content">
                    <h1>Sneaker <br /> Men's Collection</h1>
                    <a href="shop.html">Discover Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BannerSection;
