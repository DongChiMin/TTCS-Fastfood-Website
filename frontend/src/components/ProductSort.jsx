export default function ProductSort({ onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label>Sắp xếp theo: </label>
      <select onChange={handleChange}>
        <option value="none">Mặc định</option>
        <option value="price-asc">Giá tăng dần</option>
        <option value="price-desc">Giá giảm dần</option>
      </select>
    </div>
  );
}
