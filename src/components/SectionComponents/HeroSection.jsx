import { easeOut, motion } from "motion/react"; 

export default function HeroSection() {
  return (
    <section className="relative w-screen h-[100vh] bg-[#070310]  text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* Image on top */}
        <div className="relative z-10  flex items-center justify-center h-full">
          <motion.img
            initial={{ opacity: 0, y: 50, rotate: 320 }}
            animate={{ opacity: 1, y: 30, scale: 1.1, rotate: 360 }}
            transition={{ duration: 2 }}
            src="https://www.boat-lifestyle.com/cdn/shop/products/eb8e0fbd-c412-48b3-9c91-5b49ddf35800_17432771-6821-4dbf-86ac-9cb7c8dfe460_600x.png?v=1658829303z"
            alt="Model with Headphones"
            className="  h-[50%] md:h-[90%]  w-full  object-contain"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black"></div>
      </div>
      {/* Overlay Content */}
      <div className="relative  flex flex-col items-center justify-center h-full text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20, zIndex: -30 }}
          animate={{ opacity: 1, y: 0, zIndex: 25 }}
          transition={{ duration: 2, delay: 0.5, ease: easeOut }}
          className="text-5xl  md:text-8xl text-[#fb2c36dd] font-display font-extrabold mb-6"
        >
          Hear Beyond Limits
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-xs md:text-xl mb-8 max-w-2xl font-text"
        >
          Discover premium sound with boAt headphones — engineered for immersive
          audio, designed for those who dare.
        </motion.p>

        <motion.button
          initial={{ y: "-30%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.8,
          }}
          className="text-white w-[8rem] border-b-1 border-r-1 border-red-700 px-6 py-2 rounded-full flex justify-between gap-x-4 items-center"
        >
          <p className="font-nav font-bold">Shop Now</p>
        </motion.button>
      </div>

      {/* Transition Text */}
    </section>
  );
}


