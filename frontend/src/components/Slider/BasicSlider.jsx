function BasicSlider({
  images = [],
  width = "100%",
  height = "auto",
  margin = "0 auto",
}) {
  return (
    <div
      id="demo"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ width, height, margin }}
    >
      {/* Indicators */}
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
          ></button>
        ))}
      </div>

      {/* Carousel items */}
      <div className="carousel-inner" style={{ height }}>
        {images.map((img, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={img.src}
              alt={img.alt || `Slide ${index + 1}`}
              className="d-block w-100"
              style={{ height, objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#demo"
        data-bs-slide="prev"
        style={{ width: "8%" }}
      >
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#demo"
        data-bs-slide="next"
        style={{ width: "8%" }}
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}

export default BasicSlider;
