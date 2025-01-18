// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slide from './Slide'

import bgimg1 from '../assets/bg-one.jpg'
import bgimg2 from '../assets/bg-two.jpg'
import bgimg3 from '../assets/bg-three.jpg'

export default function Banner() {
  return (
    <div className='w-full'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Slide
            image={bgimg2}
            title='Welcome to TechHive'
            text='Discover, share, and shape the future of technology—all in one buzzing community.'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg1}
            title='TechHive: Where Innovation Thrives'
            text='Explore the best in web apps, AI tools, software, games, and more. Your next favorite product awaits.'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg3}
            title='Join the Buzz at TechHive'
            text='Connect with creators, upvote groundbreaking ideas, and unleash the power of innovation.'
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
