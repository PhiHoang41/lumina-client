import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <>
      {/*breadcrumbs area start*/}
      <div className="breadcrumbs_area other_bread">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb_content">
                <ul>
                  <li>
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li>/</li>
                  <li>Về chúng tôi</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*breadcrumbs area end*/}

      {/*about section area */}
      <div className="about_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="about_content">
                <h1>Chào mừng đến với Lumina Store!</h1>
                <p>
                  Chúng tôi tự hào là điểm đến tin cậy cho những ai yêu thời trang.
                  Với sứ mệnh mang đến những sản phẩm chất lượng và dịch vụ tốt nhất,
                  Lumina luôn nỗ lực để đáp ứng mọi nhu cầu của khách hàng.
                </p>
                <p>
                  Đội ngũ của chúng tôi cam kết mang đến những bộ sưu tập mới nhất,
                  phù hợp với xu hướng thời trang hiện đại.
                </p>
                <div className="view__work">
                  <a href="#">Xem thêm </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="about_thumb">
                <img src="/assets/img/about/about1.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*about section end*/}

      {/*counterup area */}
      <div className="counterup_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single_counterup">
                <div className="counter_img">
                  <img src="/assets/img/about/count.png" alt="" />
                </div>
                <div className="counter_info">
                  <h2 className="counter_number">2170</h2>
                  <p>Khách hàng hài lòng</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single_counterup count-two">
                <div className="counter_img">
                  <img src="/assets/img/about/count2.png" alt="" />
                </div>
                <div className="counter_info">
                  <h2 className="counter_number">8080</h2>
                  <p>Giải thưởng</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single_counterup">
                <div className="counter_img">
                  <img src="/assets/img/about/count3.png" alt="" />
                </div>
                <div className="counter_info">
                  <h2 className="counter_number">2150</h2>
                  <p>Giờ làm việc</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single_counterup count-two">
                <div className="counter_img">
                  <img src="/assets/img/about/count4.png" alt="" />
                </div>
                <div className="counter_info">
                  <h2 className="counter_number">2170</h2>
                  <p>Dự án hoàn thành</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*counterup end*/}

      {/*about progress bar */}
      <div className="about_progressbar">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="progressbar_inner">
                <h2>Kỹ năng của chúng tôi</h2>
                <div className="progress_skill one">
                  <div className="progress">
                    <div
                      className="progress-bar about_prog wow fadeInLeft"
                      data-wow-duration="0.8s"
                      data-wow-delay=".3s"
                      role="progressbar"
                      aria-valuenow={25}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                  <span className="progress_discount">60%</span>
                </div>
                <div className="progress_skill two">
                  <div className="progress">
                    <div
                      className="progress-bar about_prog wow fadeInLeft"
                      data-wow-duration="0.8s"
                      data-wow-delay=".5s"
                      role="progressbar"
                      aria-valuenow={25}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                  <span className="progress_discount">90%</span>
                </div>
                <div className="progress_skill three">
                  <div className="progress">
                    <div
                      className="progress-bar about_prog wow fadeInLeft"
                      data-wow-duration="0.8s"
                      data-wow-delay=".7s"
                      role="progressbar"
                      aria-valuenow={25}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                  <span className="progress_discount">70%</span>
                </div>
                <div className="progress_skill four">
                  <div className="progress">
                    <div
                      className="progress-bar about_prog wow fadeInLeft"
                      data-wow-duration="0.8s"
                      data-wow-delay=".7s"
                      role="progressbar"
                      aria-valuenow={25}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                  <span className="progress_discount">80%</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="about__img">
                <img src="/assets/img/about/about2.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*about progress bar end */}
    </>
  );
};

export default AboutPage;
