import { useContext, useRef, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { LogOut, ShoppingCart } from "lucide-react";
import { LogIn } from "lucide-react";
import { productContext } from "../Wrapper/Wrapper";
import LoginPopover from "./LoginPopOver";

const Navbar = () => {
  return (
    <div>
      <div className=" top-0 left-0 w-full pt-5 px-10  z-50 flex  flex-col md:flex-row justify-between items-center gap-3 bg-black ">
        {/* <div className="flex justify-start items-center gap-3"> */}
        <NavLogo />
        <div className="ml-40">
          <SlideTabs />
        </div>
        <CartAndSignIn />
        {/* </div> */}
      </div>
    </div>
  );
};

const NavLogo = () => {
  return (
    <motion.div
      initial={{ y: "-30%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1,
        delay: 0.8,
      }}
      className="logo bg-transparent w-15"
    >
      <img src="https://www.boat-lifestyle.com/cdn/shop/files/boAt_logo_black_24889e30-925c-4185-a028-9fef497a8e44.svg?v=1732879339" alt="" />
    </motion.div>
  );
};

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [hoveredTabIndex, setHoveredTabIndex] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <div>
      {/* Desktop Nav */}
      <motion.ul
        initial={{ y: "-30%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        onMouseLeave={() => {
          setPosition((pv) => ({ ...pv, opacity: 0 }));
          setHoveredTabIndex(null);
        }}
        className="relative mx-auto hidden md:flex w-fit text-2xl rounded-full font-nav px-2 py-1 border border-white/10 bg-[#070310] backdrop-blur-[15px] shadow-[-4px_8px_32px] shadow-[#6b60544f]"
      >
        {["Home", "Products", "About"].map((text, i) => (
          <Tab
            key={i}
            setPosition={setPosition}
            index={i}
            setHoveredTabIndex={setHoveredTabIndex}
            isHovered={hoveredTabIndex === i}
          >
            <NavLink to={`/${text.toLowerCase()}`}>{text}</NavLink>
          </Tab>
        ))}
        <Cursor position={position} />
      </motion.ul>

      {/* Mobile Nav Icon */}
      <div className="md:hidden flex justify-end px-4 py-2">
        <button onClick={toggleMobileMenu} className="text-white text-3xl">
          {isMobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 space-y-4 bg-black py-4 transition-all ease-in-out rounded-lg shadow-md text-center">
          {["Home", "Products", "About"].map((text, i) => (
            <NavLink
              key={i}
              to={`/${text.toLowerCase()}`}
              className="block text-[#EFDBCB] font-nav font-thin uppercase rounded-xs py-1 px-2 border-b border-red-600 text-lg "
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {text}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

// Update Tab component props
const Tab = ({
  children,
  setPosition,
  index,
  setHoveredTabIndex,
  isHovered,
}) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
        setHoveredTabIndex(index);
      }}
      className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase ${
        isHovered ? "" : "text-[#fb2c36dd]"
      } md:px-5 md:py-3 md:text-base font-extrabold`}
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => (
  <motion.li
    animate={position}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="absolute z-0 h-7 rounded-full bg-[#EFDBCB] md:h-12"
  />
);

const CartAndSignIn = () => {
  const { cart } = useContext(productContext);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);
  console.log(cart);
  return (
    <div className="flex gap-x-1">
      <style>
        {`
          @keyframes rotateBorder {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg); /* Full rotation */
            }
          }

          .rotating-border-button {
            position: relative; /* Button is relative for ::before positioning */
            overflow: hidden; /* CRUCIAL: Clips the rotating ::before */
            background: black; /* Button's background color */
            border: none; /* No default border */
            z-index: 1; /* Button content is above the ::before */
          }

          .rotating-border-button::before {
            content: '';
            position: absolute;
            top: -100%; /* Large size to cover full rotation */
            left: -100%;
            width: 200%;
            height: 400%;
            
            /* Conic gradient for the shine effect */
            background: conic-gradient(
              from 0deg,
              transparent 0%,
              rgba(255, 255, 255, 0.3) 10%, /* Subtle white shine */
              rgba(255, 0, 0, 0.7) 20%,    /* Red glow */
              transparent 30%              /* Fade back to transparent */
            );
            
            animation: rotateBorder 3s linear infinite; /* Adjust speed and timing */
            z-index: -1; /* Place behind the button's content */
            border-radius: inherit; /* Inherit button's border-radius */
          }

          /* Ensure content (p tags, SVG) are above the pseudo-element */
          .rotating-border-button > p,
          .rotating-border-button > svg {
            position: relative; /* Creates new stacking context */
            z-index: 1; /* Place content above the pseudo-element */
          }
        `}
      </style>
      <NavLink to={"/cart"} className="Cart ">
        <motion.button
          initial={{ y: "-30%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.8,
          }}
          className="rotating-border-button  text-sm text-white px-3 py-2 md:px-6 md:py-2 rounded-full flex justify-between gap-x-4 items-center"
        >
          <p className="font-nav font-bold border-b border-b-red-500 rounded-b-2xl">
            Cart
          </p>
          <div className=" flex gap-x-1">
            <ShoppingCart
              className="text-red-400 h-5
          "
            />
            {cart[0]?.quantity && (
              <p className="text-white font-nav">
                {cart ? `${cart.length}` : ""}
              </p>
            )}
          </div>
        </motion.button>
      </NavLink>
      <div className="SignIn">
        <motion.button
          initial={{ y: "-30%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.8,
          }}
          className={` text-sm text-white px-3 py-2 md:px-6 md:py-2 border-b-1 ${
            isLoginOpen ? "border-green-700 " : "border-red-700"
          } rounded-full flex justify-between gap-x-4 items-center`}
          onClick={() => setIsLoginOpen(!isLoginOpen)}
        >
          <p className="font-nav font-bold">
            {checkLogin ? "Logout" : "Login"}
          </p>
          {checkLogin ? (
            <p>
              <LogOut className="text-white h-2 md:h-5" />
            </p>
          ) : (
            <p>
              <LogIn className="text-white h-2 md:h-5" />
            </p>
          )}
        </motion.button>
        {isLoginOpen && (
          <LoginPopover
            setCheckLogin={setCheckLogin}
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
