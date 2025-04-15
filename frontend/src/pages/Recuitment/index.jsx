import JobList from "./JobList";
import RecruitmentForm from "./RecruitmentForm";

const Recruitment = () => {
  return (
    <div>
      <h1 className="mb-4">Cơ hội nghề nghiệp tại Nhà Hàng</h1>
      <JobList />
      <hr className="my-4" />
      <RecruitmentForm />
    </div>
  );
};

export default Recruitment;
