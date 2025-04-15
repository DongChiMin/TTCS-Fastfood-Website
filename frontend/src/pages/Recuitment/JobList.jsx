const jobs = [
  { title: "Phục vụ", location: "Hà Nội", type: "Full-time" },
  { title: "Bếp chính", location: "TP. HCM", type: "Part-time" },
];

const JobList = () => {
  return (
    <div>
      <h2>Vị trí đang tuyển:</h2>
      <ul>
        {jobs.map((job, i) => (
          <li key={i}>
            <strong>{job.title}</strong> - {job.location} ({job.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
