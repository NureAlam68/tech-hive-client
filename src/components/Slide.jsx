import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Slide = ({ image, title, text }) => {
  return (
    <div
      className="relative w-full h-full bg-center bg-cover"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60">
        <div className="flex items-center justify-center h-full max-w-7xl mx-auto px-4">
          <div className="text-center max-w-[900px]">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:text-xl text-gray-200 mt-6 mb-8 w-[80%] mx-auto"
            >
              {text}
            </motion.p>
            <Link to={'/products'}>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="group relative inline-flex items-center px-4 py-2 text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-lg"
            >
              <span className="relative z-10 flex items-center">
                Explore Now
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              {/* <div className="absolute inset-0 bg-gradient-to-r from-[#A67C5B] to-[#C19B76] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
            </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Slide.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Slide;