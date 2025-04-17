import img1 from "../assets/images/menus/menu-slider-1.jpg";
import PageHeader from "../components/PageHeader/PageHeader";
import TitleWithSubtitle from "../components/TitleWithSubtitle/TitleWithSubtitle";
import Table from "../components/Table";

const columns = [
  { header: "Job vacancy", accessor: "job" },
  { header: "Type", accessor: "type" },
  { header: "Detail", accessor: "detail" },
  { header: "Quantity", accessor: "quantity" },
];

const data = [
  {
    _id: "1",
    job: "John",
    type: "Doe",
    detail: "john@example.com",
    quantity: "demo",
  },
  {
    _id: "2",
    job: "Mary",
    type: "Moe",
    detail: "mary@example.com",
    quantity: "demo",
  },
  {
    _id: "3",
    job: "July",
    type: "Dooley",
    detail: "july@example.com",
    quantity: "demo",
  },
];

const actions = [
  {
    label: "Aplly",
    onClick: (item) => console.log("Apply", item),
  },
];

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
          <Table columns={columns} data={data} actions={actions} />
        </div>
      </div>
      {/* Table End */}
    </div>
  );
}

export default Recuitment;
