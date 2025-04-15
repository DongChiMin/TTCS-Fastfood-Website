import { useState } from "react";

const RecruitmentForm = () => {
  const [form, setForm] = useState({ name: "", email: "", position: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu ứng tuyển:", form);
    alert("Đã gửi đơn ứng tuyển!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Gửi đơn ứng tuyển:</h2>
      <div className="mb-3">
        <label>Họ tên</label>
        <input
          name="name"
          className="form-control"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input
          name="email"
          type="email"
          className="form-control"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Vị trí ứng tuyển</label>
        <input
          name="position"
          className="form-control"
          value={form.position}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Gửi
      </button>
    </form>
  );
};

export default RecruitmentForm;
