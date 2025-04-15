import img1 from "../assets/images/menus/menu-slider-1.jpg";
import PageHeader from "../components/PageHeader/PageHeader";
import TitleWithSubtitle from "../components/TitleWithSubtitle/TitleWithSubtitle";
import OverlayCard from "../components/OverlayCard/OverlayCard";

function CookingClassRegister() {
  return (
    <div>
      <PageHeader
        backgroundType={"image"}
        backgroundSrc={img1}
        h2Title={""}
        title={"Recuitment"}
        subTitle={"Welcome to our delicious corner"}
        height="65vh"
      />
      <div className="section">
        <div className="row">
          <div className="col-6">
            <TitleWithSubtitle
              title="Our courses"
              subTitle="Find your cooking journey."
            />
          </div>
          <div className="col-6">
            <p>
              Choose the perfect class for your skill level and start your
              culinary journey today. Whether you're just starting or want to
              refine your skills, we have something for everyone.
            </p>
          </div>
          <div className="col-6">
            <OverlayCard
              title="Beginners"
              imageSrc={img1}
              height="450px"
              description={[
                "For those who are new to the kitchen, this class offers a gentle introduction to the art of cooking, teaching you essential techniques and simple yet delightful dishes that will inspire your culinary journey.",
              ]}
            />
          </div>
          <div className="col-6">
            <OverlayCard
              title="Intermediate"
              imageSrc={img1}
              height="450px"
              description={[
                "Designed for home cooks eager to enhance their skills, this class delves deeper into cooking methods, flavor pairing, and refining your ability to create more intricate, mouthwatering dishes.",
              ]}
            />
          </div>
          <div className="col-12" style={{ marginTop: "25px" }}>
            <OverlayCard
              title="Advanced"
              imageSrc={img1}
              height="450px"
              description={[
                "For the seasoned cook, this class offers an opportunity to master advanced techniques, fine-dining recipes, and the art of presentation, pushing the boundaries of your culinary expertise to new heights.",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookingClassRegister;
