import { useRef } from "react";

import { motion, useInView } from "motion/react"; // Make sure easeOut is imported from framer-motion

// ... (Navbar, NavLogo, SlideTabs, Cursor, CartAndSignIn components unchanged) ...

// Updated TransitionTextSection
const TransitionTextSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const parentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger ChildReveal components
        delayChildren: 0.2,
      },
    },
  };

  return (
   <section>
     <div className="relative w-full  bg-black flex flex-col items-center justify-center text-center">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={parentVariants} // Use parentVariants for the main container
        className="max-w-4xl px-4"
      >
        <style>{`
               .text-stroke {
                 -webkit-text-stroke: 1px #fff;
                 color: transparent;
                }
        `}</style>
        {/* Each ChildReveal will now apply the "revealLeft" variant to its direct motion children */}
        <ChildReveal variant="revealLeft">
          <motion.p // Make p a motion component
            className="text-4xl md:text-[100px] uppercase md:mt-32 font-transition font-extrabold text-[#fb2c36a1]"
            // We'll apply the variant to this motion.p
          >
            The rhythm{" "}
            <motion.span className="animate-pulse">pulsates.</motion.span>{" "}
            {/* Delay here should work now */}
          </motion.p>
        </ChildReveal>

        <ChildReveal variant="revealRight">
          <motion.p // Make p a motion component
            className="text-stroke text-4xl md:text-[90px] uppercase  font-transition font-extrabold mt-20  md:mt-32 text-white mb-4"
            // We'll apply the variant to this motion.p
          >
            The adventure
            <motion.span className="animate-pulse block ">
              calls
            </motion.span>{" "}
          </motion.p>
        </ChildReveal>

        {/* ... (Other ChildReveal blocks remain the same) ... */}
        <ChildReveal variant="slideUp">
          {" "}
          {/* Or slideUp if you want different animation */}
          <motion.p 
          className={`text-xs md:text-2xl md:ml-15 font-text mt-20 md:mt-28 text-white pb-32 mb-32`}>
            Unleash the next level of audio innovation. Dive deeper to discover
            the <strong className="text-amber-500">boAt</strong> products
            engineered to elevate your every moment.
          </motion.p>
        </ChildReveal>
      </motion.div>
    </div>
   </section>
  );
};

// Updated ChildReveal component
const ChildReveal = ({ children, variant }) => {
  // Define variants that will be inherited by direct motion children
  const animations = {
    slideUp: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut", delay: 1.2 },
      },
    },
    revealLeft: {
      hidden: { opacity: 0, x: -50 }, // More aggressive initial x for clearer reveal
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 1, ease: "easeOut" },
      }, // Removed direct delay, parent stagger will handle
    },
    revealRight: {
      hidden: { opacity: 0, x: 50 }, // More aggressive initial x for clearer reveal
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 1, ease: "easeOut", delay: 1 },
      }, // Removed direct delay, parent stagger will handle
    },
  };

  return (
    <motion.div
      // This motion.div acts as a container that passes down the variants
      // to its direct motion children. It doesn't animate itself with these variants.
      // Its animation is controlled by the TransitionTextSection's staggerChildren.
      // It just needs to inherit the 'hidden' and 'visible' from its parent to correctly pass them down.
      variants={animations[variant]} // Pass the variant definitions to this motion.div
      // You might also need a staggerChildren here if you want to stagger multiple children within THIS ChildReveal
      // transition={{ staggerChildren: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export default TransitionTextSection;
