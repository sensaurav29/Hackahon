import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { prod_data } from "@/data/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ShoppingCart, Star } from "lucide-react";
import { productContext } from "@/components/Wrapper/Wrapper";

const ProductDetail = () => {
  const{ addToCart} = useContext(productContext);
  const [clickedId, setclickedId] = useState(null);

  const handleCartToggle = (id) => {
    console.log(id);
    setclickedId((prevId) => (prevId === id ? null : id));
  };

  const { id } = useParams();
  console.log(id);

  if (!prod_data || prod_data.length === 0) {
    return <div className="text-white">Loading...</div>;
  }

  const product = prod_data.find((item) => item.id === id);

  if (!product) {
    return <div className="text-white">Product not found</div>;
  }

  const images = [
    product.primaryImg,
    product.secondaryImg,
    product.modelImg,
  ].filter(Boolean);

  return (
    <div className="text-white w-[90%] flex flex-col items-center justify-start pt-8  mx-auto mt-12 h-screen ">
      <div className=" rounded-3xl bg-white/5 backdrop-blur-2xl border-1 border-neutral-800  w-[90%] h-[70%] shadow-[2px_0_30px] shadow-red-900 flex max-sm:flex-col max-sm:h-full justify-between p-4">
        <div className="img-container w-full md:w-[50%] 2xl:h-full min-xl:h-[90%] rounded-2xl  p-3 flex justify-evenly items-center">
          <div>
            <ImageCarousel images={images} product={product} />
          </div>
        </div>
        <div className="dets-container p-3 w-full md:w-[50%] h-full  flex flex-col justify-start lg:justify-center gap-y-10">
          <div className="trio mt-4">
            <div className="rating">
              <p className="ratings flex text-[8px] text-slate-200 items-center">
                <Star className="h-2 md:h-3" />
                <span className={`text-[10px] md:text-[1rem] `}>
                  <span
                    className={`${
                      product.rating < 4 ? "text-amber-300" : "text-green-300"
                    } `}
                  >
                    {product.rating}
                  </span>
                  /5{" "}
                </span>
              </p>
            </div>
            <div className="name">
              <p className="prod-name text-sm md:text-[1.2rem] font-text font-bold px-2 mt-1  text-red-700 italic">
                {product.prod_name}{" "}
              </p>
            </div>
            <div className="description ml-[0.5rem] text-slate-300 font-nav text-sm">
              {product.desc}
            </div>
          </div>
          <div className="price-mrp-discount-images px-2 mt-3 flex flex-col justify-end gap-x-2">
            <div className=" flex gap-x-2">
              <p className="text-[1.1rem] font-nav font-bold italic">
                ₹{product.price}
              </p>{" "}
              <span className="strike text-[1rem] text-slate-300 line-through">
                ₹{product.mrp}
              </span>{" "}
              <span className="text-green-400 text-[0.9rem]">
                {Math.floor(
                  ((product.mrp - product.price) / product.mrp) * 100
                )}
                % off
              </span>
            </div>
            <div className=" border border-neutral-700  md:mx-2.5 mx-2 mt-1 w-50 " />
            <p className="font-display text-neutral-200 italic">
              Browse Photos
            </p>
            <div className="images flex justify-start gap-2">
              {images.map((img, idx) => {
                return (
                  <div key={idx} className="h-12 w-12  ">
                    <img src={img} alt="prod-img" loading="lazy" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="Cart  mt-4 ">
            <button
              onClick={() => {
                addToCart(product.id);
              }}
              className={`px-3 py-1  active:scale-105   md:ml-3 rounded-full text-sm font-nav flex gap-x-2 items-center hover:cursor-pointer  shadow-[0_0_10px] shadow-neutral-700 ${
                clickedId === product.id
                  ? "bg-green-800 text-white font-display"
                  : "bg-neutral-800"
              }`}
            >
              {" "}
              <ShoppingCart className={`h-4`} />
              {clickedId === product.id ? " Remove " : " Add to Cart"}{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageCarousel = ({ images, product }) => {
  if (!images || images.length === 0) return null;

  return (
    <Carousel className="w-full max-w-lg">
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index} className={`h-[29.5rem]  p-3`}>
            <div
              className={`${product.bgColor} rounded-4xl shadow-[2px_0_15px] shadow-neutral-600`}
            >
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-[28rem] object-contain  "
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ProductDetail;
