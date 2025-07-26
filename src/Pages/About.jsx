// About.jsx
import React from "react";
import { motion } from "framer-motion";
import boatAbout from "../assets/boatAbout.jpg";

const revealVariants = {
  left: {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  },
  right: {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  }
};

const Section = ({ title, subtitle, text, reversed, imgLink, direction="left" }) => (
  <div
    className={`flex flex-col md:flex-row ${
      reversed ? "md:flex-row-reverse" : ""
    } items-center py-16 gap-10`}
  >
    <motion.div
        variants={revealVariants[direction === "left" ? "right" : "left"]} // Opposite for text
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        className="w-full md:w-1/2 text-white"
      >
        <h2 className="text-2xl md:text-5xl  font-display text-red-700 font-bold ">{title}</h2>
        <h4 className="text-slate-300 font-nav italic mb-4">{subtitle}  </h4>
        <p className="text-lg md:text-xl text-gray-300 font-serif italic">{text}</p>
      </motion.div>
    <div className="md:w-1/2 px-4 rounded-full">
      {/* Replace with a real image or animation */}
      <motion.img
        src={imgLink}
        alt={title}
        variants={revealVariants[direction]}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full md:w-1/2 rounded-xl shadow-lg"
      />
    </div>
  </div>
);

const About = () => {
  return (
    <div className="bg-black text-white px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center pt-20"
      >
        <h1 className="text-4xl md:text-6xl font-transition font-thin text-white">
          🚀 The Story Behind <span className="text-red-500">boAt</span>
        </h1>
        <p className="text-lg text-gray-400 mt-4 font-nav italic max-w-2xl mx-auto">
          Meet Aman Gupta, the visionary who rewired India’s audio tech space
          with bold ideas, gutsy marketing, and a desi-first attitude.
        </p>
      </motion.div>

      <Section
        imgLink="https://i0.wp.com/blog.velocity.in/wp-content/uploads/2024/08/Aman-Gupta-boat-Velocity.jpg?fit=1024%2C576&ssl=1"
        title="Humble Beginnings"
        subtitle="From Chartered Accountant to Changemaker"
        text="Aman Gupta started as a CA, working in finance roles across firms like Citibank. But he craved innovation. A passion for music and gadgets led him toward the world of consumer electronics."
      />

      <Section
        imgLink="https://i.pinimg.com/736x/a7/5a/7a/a75a7a85b1993268d6166165e23baa84.jpg"
        title="Spotting the Gap"
        subtitle="Where Are The Cool Indian Brands?"
        text="Aman noticed that all the youth loved music, but affordable, stylish, and durable audio gear was missing from the Indian market. So, he decided to fix that."
        reversed
      />

      <Section
        imgLink="https://i.pinimg.com/1200x/cd/38/f2/cd38f2ffe4cd8b7d66ce14be28760c67.jpg"
        title="boAt is Born"
        subtitle="Born out of Frustration. Built with Passion."
        text="In 2016, boAt launched with a mission — blend style, quality, and affordability. Its first product? An indestructible charging cable. Then came headphones, smartwatches, and a tribe of millions."
      />

      <Section
        imgLink={boatAbout}
        title="The Rise of the Tribe"
        subtitle="Not just customers. boAtheads."
        text="With clever influencer marketing, youth-centered design, and a made-for-India mindset, boAt became one of the top audio brands in the country, competing with global giants like JBL and Sony."
        reversed
      />

      <Section
        imgLink="https://i.pinimg.com/736x/7c/ab/5e/7cab5e556acc69cba7833b8906dbc9f5.jpg"
        title="Shark Tank & Beyond"
        subtitle="From Startup Hero to Mentor"
        text="Aman Gupta became a household name on Shark Tank India. But more than TV fame, he’s celebrated for putting Indian hardware on the global map. Today, boAt continues to innovate under his leadership."
      />

      <motion.div
      initial={{opacity:0, y:20}}
      animate={{opacity:1, y:0}}
      transition={{duration:0.8, delay:0.3, ease:"easeIn"}}
       className="text-center py-20 ">
        <h2 className="text-4xl font-bold font-display tracking-wide text-red-500 mb-4">
          Built for the Bold
        </h2>
        <p className="text-gray-300 font-nav max-w-xl mx-auto">
          boAt isn’t just a brand. It’s a lifestyle. We are a rebellion against the
          ordinary. Powered by passion, led by purpose — just like our founder.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
