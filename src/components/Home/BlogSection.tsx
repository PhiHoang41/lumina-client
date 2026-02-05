import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      title: "Mercedes Benz– Mirror To The Soul 360",
      author: "ecommerce Themes",
      date: "30 Oct 2017",
      excerpt:
        "Maria Denardo is Fashion Director at theFashionSpot. Prior to joining tFS, she worked as...",
      img: "blog1.jpg",
    },
    {
      id: 2,
      title: "Dior F/W 2015 First Fashion Experience",
      author: "ecommerce Themes",
      date: "30 Oct 2017",
      excerpt:
        "Maria Denardo is Fashion Director at theFashionSpot. Prior to joining tFS, she worked as...",
      img: "blog2.jpg",
    },
    {
      id: 3,
      title: "London Fashion Week & Royal Day",
      author: "ecommerce Themes",
      date: "30 Oct 2017",
      excerpt:
        "Maria Denardo is Fashion Director at theFashionSpot. Prior to joining tFS, she worked as...",
      img: "blog3.jpg",
    },
    {
      id: 4,
      title: "Best of New York Spring/Summer 2016",
      author: "ecommerce Themes",
      date: "30 Oct 2017",
      excerpt:
        "Maria Denardo is Fashion Director at theFashionSpot. Prior to joining tFS, she worked as...",
      img: "blog2.jpg",
    },
  ];

  return (
    <section className="blog_section blog_section_three">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section_title">
              <h2>Bài viết mới nhất</h2>
              <p>Cập nhật xu thế thời trang</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="blog_wrapper blog_column3"
            style={{ position: "relative" }}
          >
            <Swiper
              modules={[Navigation]}
              spaceBetween={30}
              slidesPerView={3}
              navigation={{
                nextEl: ".blog-swiper-button-next",
                prevEl: ".blog-swiper-button-prev",
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                576: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 3,
                },
              }}
              className="blog-swiper"
            >
              {blogs.map((blog) => (
                <SwiperSlide key={blog.id}>
                  <div className="col-lg-4 col-md-6">
                    <div className="single_blog">
                      <div className="blog_thumb">
                        <a href="blog-details.html">
                          <img src={`/assets/img/blog/${blog.img}`} alt="" />
                        </a>
                        <div className="blog_icon">
                          <a href="blog-details.html"></a>
                        </div>
                      </div>
                      <div className="blog_content">
                        <h3>
                          <a href="blog-details.html">{blog.title}</a>
                        </h3>
                        <div className="author_name">
                          <p>
                            <span className="post_by">by</span>
                            <span className="themes">{blog.author}</span>/{" "}
                            {blog.date}
                          </p>
                        </div>
                        <div className="post_desc">
                          <p>{blog.excerpt}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="blog-swiper-button-next">
              <i className="fa fa-angle-right"></i>
            </div>
            <div className="blog-swiper-button-prev">
              <i className="fa fa-angle-left"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
