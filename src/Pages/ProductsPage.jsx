import { productContext } from "@/components/Wrapper/Wrapper";
import { Filter, ShoppingCart, Star } from "lucide-react";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { prod_data } from "@/data/products";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";

const ProductsPage = () => {
  const { addToCart } = useContext(productContext);

  const [clickedId, setclickedId] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const navigate = useNavigate();

  console.log(prod_data);
  const handleCartToggle = (id) => {
    console.log(id);
    setclickedId((prevId) => (prevId === id ? null : id));
  };

  const NavigateHandler = (id) => {
    navigate(`/products/${id}`);
  };
  const sortByPriceAsc = (prod_data) => {
    return [...prod_data].sort((a, b) => a.price - b.price);
  };

  const sortByPriceDesc = (products) => {
    return [...products].sort((a, b) => b.price - a.price);
  };

  const sortedProducts = sortOrder === "asc" ? sortByPriceAsc(prod_data) : sortByPriceDesc(prod_data);
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -50,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 1,
        ease: "easeIn",
        delay: 0.8,
      }}
      className="w-screen h-screen mt-10 text-white"
    >
      <div className="container mx-auto w-[90%] h-[90%] px-3 py-10 mb-10">
        <NavLink to={"/"}>
          <p className="text-neutral-400 text-xs font-text">
            Home {`>`} <span className="inline-block">Products </span>
          </p>
        </NavLink>

        <div className="w-full  flex justify-between items-end">
          <h2 className="text-2xl md:text-3xl block mt-6 font-display tracking-wide text-red-400">
            PRODUCTS
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-center font-display px-2 py-0.5 rounded-full items-center md:mr-36">
              <Button className=" shadow-[0px_1px_2px] border-r border-red-500 shadow-red-500 active:scale-110 ">
                <Filter className="h-2" />
                <p className="text-red-400">Filters</p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 hover:cursor-pointer rounded-lg  font-nav text-sm bg-neutral-900 text-neutral-100 px-2 py-1">
              <DropdownMenuLabel className="bg-neutral-900 text-neutral-100 px-2 py-0.5 rounded-lg">
                {" "}
                Price{" "}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel onClick={() => setSortOrder("asc")} className="flex gap-1">
                {" "}
                {sortOrder === "asc" ? <p>✅</p> : ""} Low to High 
              </DropdownMenuLabel>
              <DropdownMenuLabel onClick={() => setSortOrder("desc")}  className="flex gap-1" >
                 {sortOrder === "desc" ? <p>✅</p> : ""} High To Low
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="prod_container md:overflow-y-scroll min-w-full  py-3 grid  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2  xl:gap-y-2 gap-2 px-1 mt-3 h-[90%]">
          {sortedProducts.map((prod) => {
            return (
              <div
                key={prod.id}
                className="flex flex-col  md:flex-row h-[24rem] md:w-[34rem]  md:h-[16rem] rounded-3xl shadow-[2px_0_15px] shadow-red-900 "
              >
                <div
                  onClick={() => {
                    NavigateHandler(prod.id);
                  }}
                  className={`img mx-1 my-1 md:mx-2 md:my-2 rounded-2xl md:object-center md:flex md:justify-center md:items-center md:aspect-video md:w-[60%]   ${prod.bgColor}`}
                >
                  <img
                    src={prod.primaryImg}
                    className="hover:scale-110  transition-all  ease-in-out h-[10rem] w-[10rem]"
                    alt="Product_image"
                    loading="lazy"
                  />
                </div>
                <div className="md:flex md:flex-col flex flex-col justify-between md:gap-y-10 md:py-4">
                  <div className="details mt-2 ">
                    <div className="mb-4">
                      <p className="ratings flex text-[8px] text-slate-300 items-center">
                        <Star className="h-2" />
                        <span className="text-[10px] ">{prod.rating}/5 </span>
                      </p>
                      <p className="prod-name text-sm font-text font-bold px-2 mt-1  text-red-700 italic">
                        {prod.prod_name}{" "}
                      </p>
                    </div>
                    <div className="">
                      <div className="price-mrp-discount px-2 mt-3 flex items-end gap-x-2">
                        <p className="text-sm font-nav font-bold italic">
                          ₹{prod.price}
                        </p>{" "}
                        <span className="strike text-[10px] text-slate-300 line-through">
                          ₹{prod.mrp}
                        </span>{" "}
                        <span className="text-green-400 text-xs">
                          {Math.floor(
                            ((prod.mrp - prod.price) / prod.mrp) * 100
                          )}
                          % off
                        </span>
                      </div>
                      <div className=" border border-neutral-700  md:mx-2.5 mx-2 mt-1 " />
                      <div className="mx-2  flex gap-x-2 flex-wrap">
                        <span className="px-2 py-1 rounded-full text-[8px] bg-neutral-800 shadow-[0_0_10px] shadow-neutral-700  mt-2">
                          {prod.desc.split(",")[2]}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="Cart mx-2 mt-4 ">
                    <button
                      onClick={() => {
                        addToCart(prod.id);
                      }}
                      className={`px-3 py-1  active:scale-105  md:ml-3 rounded-full text-sm font-nav flex gap-x-2 items-center hover:cursor-pointer  shadow-[0_0_10px] shadow-neutral-700 ${
                        clickedId === prod.id
                          ? "bg-green-800 text-white font-display"
                          : "bg-neutral-800"
                      }`}
                    >
                      {" "}
                      <ShoppingCart className={`h-4`} />
                      {clickedId === prod.id ? " Remove " : " Add to Cart"}{" "}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductsPage;
