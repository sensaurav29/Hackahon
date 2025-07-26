import { MoveRightIcon } from "lucide-react";
import React, { useContext, useRef, useState } from "react";
import { productContext } from "../Wrapper/Wrapper";
import { motion, useInView, useMotionValue } from "motion/react";
import { useNavigate } from "react-router-dom";

const BUFFER_FOR_DRAG = 80;

const ProductsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const secvariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={secvariants}
        transition={{ duration: 0.6, ease: "easeIn", delay: 0.5 }}
        className="pb-20"
      >
        <h2 className="text-2xl md:text-7xl text-white font-display text-center bg-black">
          Our Products
        </h2>
        <SwipeCarousel />
      </motion.div>
    </>
  );
};

const SwipeCarousel = () => {
  const { data } = useContext(productContext);
  const [imgIndex, setimgIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragX = useMotionValue(0);

  const onDragStart = () => {
    setDragging(true);
  };

  const onDragEnd = () => {
    setDragging(false);
    let x = dragX.get();
    if (x <= BUFFER_FOR_DRAG && imgIndex < data.length - 1) {
      console.log(imgIndex, data.length);
      setimgIndex((pv) => pv + 1);
    } else if (x >= BUFFER_FOR_DRAG && imgIndex > 0) {
      console.log(imgIndex, data.length);

      setimgIndex((pv) => pv - 1);
    }
  };

  return (
    <div className="relative min-h-fit overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100 - imgIndex * 2}%`,
        }}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="h-screen flex cursor-grab active:cursor-grabbing justify-start items-center "
      >
        <Card />
      </motion.div>
      <Dots imgIndex={imgIndex} setimgIndex={setimgIndex} />
    </div>
  );
};

const Card = () => {
  const { data } = useContext(productContext);
  const navigate = useNavigate();

  const NavigateHandler = (id) => {
    navigate(`/products/${id}`);
  };
  console.log(data);
  return (
    <>
      {data.map((product) => {
        return (
          <div
            key={product.id}
            className={`relative sm:w-[50%] sm:h-[50%] md:w-[90%] md:h-[90%] ml-20 mr-10 rounded-2xl  shadow-[0_0_20px_#FDF4FF] ${product.bgColor}  flex justify-center shrink-0 items-center`}
          >
            <div
              style={{
                backgroundImage: `url(${product.primaryImg})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="card w-screen h-[80%] flex  flex-col justify-end aspect-video object-cover"
            >
              <div className="button flex flex-col gap-y-2 items-end  mr-10 mb-4 ">
                <h2 className="sm:text-md md:text-2xl lg:text-[2.5rem] font-display pr-2 font-extrabold mr-10 ">
                  {product.prod_name}
                </h2>
                <button
                  onClick={() => NavigateHandler(product.id)}
                  className=" text-black font-nav font-medium tracking-tighter flex items-center  shadow-[0_0_10px_#777,_0_0_15px] bg-gradient-to-r from-neutral-300 via-neutral-400 to-white/10 rounded-2xl p-2 sm:mr-12 md:px-4 md:py-2 lg:px-8 lg:text-xl  "
                >
                  View Details{" "}
                  <MoveRightIcon className="ml-2 h-4 w-8 lg:h-8 lg:w-9 text-red-500 font-bold mt-1" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const Dots = ({ imgIndex, setimgIndex }) => {
  const { data } = useContext(productContext);

  const HandleClick = (index, imgIndex) => {
    if (index > 0 && index > imgIndex) {
      setimgIndex(index);
    } else if (index < data.length - 1 && index < imgIndex) {
      setimgIndex(index);
    }
  };
  return (
    <div className="mt-2 flex w-full text-white justify-center gap-2">
      {data.map((_, idx) => {
        return (
          <div key={idx}>
            <button
              onClick={() => HandleClick(idx, imgIndex)}
              className={`md:w-3 md:h-3  lg:h-4 lg:w-4 rounded-full ${
                imgIndex == idx ? "bg-neutral-50 lg:w-5 " : "bg-neutral-500 "
              } `}
            ></button>
          </div>
        );
      })}
    </div>
  );
};
export default ProductsSection;
