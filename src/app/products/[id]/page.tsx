"use client";
import React, { use, useState } from "react";
import { products } from "@/data/products";
import { count } from "console";

const ProductDeitalsPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);
  const filteredProduct = products.filter((p) => p.id == Number(id));
  console.log(filteredProduct);

  const [counter, setCounter] = useState(0);
  const [decreaseCounter, setDecreaseCounter] = useState(counter);

  if (filteredProduct.length == 0) return <div>Product not found.</div>;

  const countingCart = () => {
    setCounter(counter + 1);
  };

  const decreaseCountingCard = () => {
    setDecreaseCounter(counter - 1);
  };

  return (
    <div className="p-6 flex flex-col">
      <h1 className="text-4xl">
        {filteredProduct[0].title} - {id}
      </h1>
      <img
        src={filteredProduct[0].image}
        alt={filteredProduct[0].title}
        className="rounded-lg w-1/2 mt-2"
      />
      <div>
        <button
          className="bg-amber-500 text-white w-28 px-6 rounded-2xl mt-4 cursor-pointer"
          onClick={countingCart}
        >
          Add to cart
        </button>
        <span className="text-lg font-bold">({counter})</span>
      </div>
      <div>
        <button
          className="bg-amber-500 text-white w-28 px-6 rounded-2xl mt-4 cursor-pointer"
          onClick={decreaseCountingCard}
        >
          Remove from cart
        </button>
        <span className="text-lg font-bold">({counter})</span>
      </div>
    </div>
  );
};

export default ProductDeitalsPage;
