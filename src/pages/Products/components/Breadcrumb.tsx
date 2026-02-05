import { Link } from "react-router-dom";

const Breadcrumb = () => {
  return (
    <div className="breadcrumbs_area">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="breadcrumb_content">
              <ul>
                <li>
                  <Link to="/">home</Link>
                </li>
                <li>/</li>
                <li>shop</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
