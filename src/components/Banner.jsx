import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import Slide from './Slide';
import bgimg1 from '../assets/bg-one.jpg'
import bgimg2 from '../assets/bg-two.jpg'
import bgimg3 from '../assets/bg-three.jpg'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const slides = [
  {
    image: bgimg1,
    title: "Welcome to TechHive",
    text: "Discover, share, and shape the future of technology—all in one buzzing community."
  },
  {
    image: bgimg2,
    title: "TechHive, Where Innovation Thrives",
    text: "Explore the best in web apps, AI tools, software, games, and more. Your next favorite product awaits."
  },
  {
    image: bgimg3,
    title: "Join the Buzz, at TechHive",
    text: "Connect with creators, upvote groundbreaking ideas, and unleash the power of innovation."
  }
];

export default function Banner() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full"
    >
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-pagination-bullet"></span>`;
          },
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="mySwiper h-[75vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Slide {...slide} />
          </SwiperSlide>
        ))}
        <div className="swiper-button-next !text-white after:!text-2xl"></div>
        <div className="swiper-button-prev !text-white after:!text-2xl"></div>
      </Swiper>
    </motion.div>
  );
}