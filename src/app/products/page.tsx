import { products } from "@/data/products";

const productPage = () => {
  return (
    <div>
      <h1>productPage</h1>

      <div className="flex flex-col md:flex-row justify-around items-center mt-5 space-x-2 space-y-2">
        {products.map((product) => (
          <div key={product.id} className="text-lg font-semibold ">
            <a href={`/products/${product.id}`}>
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
