import PageHeader from "../components/PageHeader/PageHeader";
import OverlayCard from "../components/OverlayCard/OverlayCard";

import img1 from "../assets/images/menus/menu-slider-1.jpg"; // Hình ảnh mặc định cho OverlayCard

function Chefs() {
  return (
    <div>
      <PageHeader
        backgroundType={"image"}
        backgroundSrc={img1}
        h2Title={""}
        title={"Our Chefs"}
        subTitle={"Welcome to our delicious corner"}
        height="65vh"
      />
      <div className="section">
        <div className="row">
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}

export default Chefs;
