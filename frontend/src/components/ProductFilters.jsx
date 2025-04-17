export default function ProductFilters({ onChange }) {
  const handleCategoryChange = (e) => {
    onChange({ category: e.target.value });
  };

  return (
    <div>
      <label>Loại sản phẩm: </label>
      <select onChange={handleCategoryChange}>
        <option value="all">Tất cả</option>
        <option value="electronics">Điện tử</option>
        <option value="fashion">Thời trang</option>
      </select>
    </div>
  );
}
