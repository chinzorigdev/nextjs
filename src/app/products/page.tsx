const productPage = () => {
  const products = [
    {
      id: 1,
      title: "Product 1",
      price: 2500,
      image:
        "https://m.media-amazon.com/images/I/51nKsS46GiL._SY445_SX342_QL70_FMwebp_.jpg",
    },
    {
      id: 2,
      title: "Product 2",
      price: 3400,
      image:
        "https://m.media-amazon.com/images/I/719V-rLGfXL._AC_UY436_FMwebp_QL65_.jpg",
    },
    {
      id: 3,
      title: "Product 3",
      price: 5400,
      image:
        "https://m.media-amazon.com/images/I/710KoJMG2lL._AC_UY436_FMwebp_QL65_.jpg",
    },
    {
      id: 4,
      title: "Product 4",
      price: 1200,
      image:
        "https://m.media-amazon.com/images/I/519aOqUZ0pL._AC_UY436_FMwebp_QL65_.jpg",
    },
    {
      id: 5,
      title: "Product 5",
      price: 2100,
      image:
        "https://m.media-amazon.com/images/I/61xm4W2w5EL._AC_UL640_FMwebp_QL65_.jpg",
    },
    {
      id: 6,
      title: "Product 6",
      price: 4300,
      image:
        "https://m.media-amazon.com/images/I/51xGcS8AtwS._AC_UL640_FMwebp_QL65_.jpg",
    },
    {
      id: 7,
      title: "Product 7",
      price: 2600,
      image:
        "https://m.media-amazon.com/images/I/61DvOBOAewL._AC_UY436_FMwebp_QL65_.jpg",
    },
  ];
  return (
    <div>
      <h1>productPage</h1>

      <div className="flex flex-col md:flex-row justify-around items-center mt-5 space-x-2 space-y-2">
        {products.map((product) => (
          <div key={product.id} className="text-lg font-semibold ">
            <a href="/products/{products.id">
              <img src={product.image} alt="product" className="cover w-50" />
              <div className="flex justify-between items-center mt-2">
                <p>{product.title}</p>
                <p>{product.price}₮</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default productPage;
