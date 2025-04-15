import img1 from "../assets/images/menus/menu-slider-1.jpg";
import PageHeader from "../components/PageHeader/PageHeader";
import TitleWithSubtitle from "../components/TitleWithSubtitle/TitleWithSubtitle";
import Table from "../components/Tables/Table";

function Recuitment() {
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

      {/* Title Start */}
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <TitleWithSubtitle
                title="Jobs that we have"
                subtitle="Get sweet memories"
              />
            </div>
            <div className="col-4">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                sed veritatis, doloribus magni fuga vitae. Dolorem maxime
                debitis possimus necessitatibus sunt corporis in.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* TItle End */}

      {/* Table Start */}
      <div className="section" style={{ padding: "0px 0px" }}>
        <div className="container">
          <Table
            columns={["Job vacancy", "Type", "Detail", "Quantity", "Action"]}
            data={[
              ["John", "Doe", "john@example.com", "demo", "demo"],
              ["Mary", "Moe", "mary@example.com", "demo", "demo"],
              ["July", "Dooley", "july@example.com", "demo", "demo"],
            ]}
            fontSize="20px"
          />
        </div>
      </div>
      {/* Table End */}
    </div>
  );
}

export default Recuitment;
