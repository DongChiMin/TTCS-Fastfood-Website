import React, { useState } from "react";

// // Mảng các trường của form
// const formFields = [
//   {
//     name: "name",
//     label: "Full Name",
//     type: "text",
//     placeholder: "Enter your full name",
//     required: true,
//   },
//   {
//     name: "email",
//     label: "Email",
//     type: "text",
//     placeholder: "Enter your email",
//     required: true,
//   },
//   {
//     name: "subscribe",
//     label: "Subscribe to newsletter",
//     type: "checkbox",
//     required: false,
//   },
//   {
//     name: "country",
//     label: "Country",
//     type: "select",
//     options: [
//       { value: "us", label: "United States" },
//       { value: "ca", label: "Canada" },
//       { value: "uk", label: "United Kingdom" },
//     ],
//     required: true,
//   },
// ];

// // Hàm xử lý khi submit form
// const handleFormSubmit = (formData) => {
//   console.log("Form submitted with data:", formData);
// };

// <CustomForm
//   fields={formFields}
//   onSubmit={handleFormSubmit}
//   buttonText="Submit Form"
// />;

const CustomForm = ({ fields, onSubmit, buttonText = "Place order" }) => {
  const initialState = fields.reduce((acc, field) => {
    acc[field.name] =
      field.type === "checkbox"
        ? false
        : field.type === "select"
        ? field.options[0].value
        : "";
    return acc;
  }, {});
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Xóa lỗi khi người dùng thay đổi giá trị
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kiểm tra các trường bắt buộc
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Không submit nếu có lỗi
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded p-4 bg-white">
      {fields.map((field) => {
        switch (field.type) {
          case "text":
            return (
              <div className="mb-5" key={field.name}>
                <label
                  htmlFor={field.name}
                  className="form-label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  {field.label}
                  {field.required && <span style={{ color: "red" }}>*</span>}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={field.name}
                  value={formData[field.name]}
                  placeholder={field.placeholder || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  style={{
                    fontSize: "15px",
                    padding: "10px",
                  }}
                  required={field.required}
                />
                {errors[field.name] && (
                  <div className="text-danger">{errors[field.name]}</div>
                )}
              </div>
            );

          case "checkbox":
            return (
              <div className="form-check mb-5" key={field.name}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={field.name}
                  checked={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.checked)}
                  style={{ transform: "scale(1.5)" }}
                  required={field.required}
                />
                <label
                  className="form-check-label"
                  htmlFor={field.name}
                  style={{
                    fontSize: "15px",
                  }}
                >
                  {field.label}
                  {field.required && <span style={{ color: "red" }}>*</span>}
                </label>
                {errors[field.name] && (
                  <div className="text-danger">{errors[field.name]}</div>
                )}
              </div>
            );

          case "select":
            return (
              <div className="mb-5" key={field.name}>
                <label
                  htmlFor={field.name}
                  className="form-label"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  {field.label}
                  {field.required && <span style={{ color: "red" }}>*</span>}
                </label>
                <select
                  className="form-select"
                  id={field.name}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  style={{
                    fontSize: "15px",
                    padding: "10px",
                  }}
                  required={field.required}
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors[field.name] && (
                  <div className="text-danger">{errors[field.name]}</div>
                )}
              </div>
            );

          default:
            return null;
        }
      })}

      <button
        type="submit"
        style={{
          fontSize: "15px",
        }}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default CustomForm;
