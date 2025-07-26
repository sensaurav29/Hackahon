// Footer.jsx
import { FaFacebookF, FaTwitter, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 px-4 pb-20 flex flex-col items-center md:flex-col gap-y-4 md:justify-center">
      
      <div>
        <h2 className="text-2xl font-text italic font-bold text-red-300">Connect with us</h2>
      </div>
      <div className="flex space-x-6 items-center">
        <a
          href="https://www.facebook.com/yourbrand"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-500 transition hover:animate-bounce"
        >
          <FaFacebookF size={25} />
        </a>
        <a
          href="https://www.twitter.com/yourbrand"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-black hover:bg-white p-1 rounded-full transition hover:animate-bounce"
        >
          <FaXTwitter size={25} />
        </a>
        <a
          href="https://www.instagram.com/yourbrand"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-pink-500 transition hover:animate-bounce"
        >
          <FaInstagram size={25} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
