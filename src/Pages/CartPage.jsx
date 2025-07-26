import { productContext } from "@/components/Wrapper/Wrapper";
import { motion } from "motion/react";
import { useContext, useState } from "react";

const variants = {
  revealLeft: {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  },
  revealRight: {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  },
};

const CartItem = ({ item, index, addToCart, removeFromCart, removeOneFromCart }) => {
  const direction = index % 2 === 0 ? "revealLeft" : "revealRight";
  console.log(item);
  return (
    <motion.div
      key={item.id}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`flex flex-col md:flex-row items-center justify-between bg-zinc-900 rounded-2xl p-6 my-4`}
    >
      <motion.img
        src={item.primaryImg}
        alt={item.title}
        className={`w-32 h-32 object-contain ${item.bgColor} rounded-2xl`}
      />
      <div className="text-white mt-4 md:mt-0 md:ml-8 flex-1">
        <h3 className="text-xl font-nav uppercase font-semibold">
          {item.prod_name}
        </h3>
        <p className="text-sm text-zinc-400 mt-1">₹{item.price}</p>
        <div className="flex items-center mt-3 gap-2">
          <button
            onClick={() => removeOneFromCart(item.id)}
            className="px-3 py-1 bg-zinc-700 rounded"
          >
            -
          </button>
          <span className="text-white">{item.quantity}</span>
          <button
            onClick={() => addToCart(item.id)}
            className="px-3 py-1 bg-zinc-700 rounded"
          >
            +
          </button>
        </div>
      </div>
      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 mt-4 md:mt-0">
        Remove
      </button>
    </motion.div>
  );
};

const CartPage = () => {
  const { cart, removeFromCart, addToCart, removeOneFromCart } = useContext(productContext);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-black min-h-screen pt-28 px-6 md:px-20">
      <div className="overflow-hidden">
        <motion.h1
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 8, ease:"linear" }}
          className="text-[3rem] md:text-[4rem] text-red-500 font-transition uppercase  whitespace-nowrap tracking-normal italic"
        >
          Your Cart — boAt Vibes Only — Unleash Audio
        </motion.h1>
      </div>

      <div className="mt-12 max-w-6xl mx-auto">
        {cart.map(
          (item, index) =>
            item.id && (
              <CartItem
                key={item.id}
                item={item}
                index={index}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                removeOneFromCart={removeOneFromCart}
              />
            )
        )}
      </div>

      <div className="max-w-6xl mb-5 mx-auto bg-zinc-800 text-white rounded-2xl mt-12 p-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-semibold">Subtotal: ₹{subtotal}</div>
        <button className="mt-4 md:mt-0 px-6 py-2 bg-red-500 rounded-xl hover:bg-red-600 transition duration-300 text-lg font-medium">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
