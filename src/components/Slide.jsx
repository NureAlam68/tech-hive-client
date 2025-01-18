/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const Slide = ({ image, title, text }) => {
  return (
    <div
      className='w-full bg-center bg-cover h-[500px] lg:h-[70vh] xl:h-[80vh]'
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className='flex items-center justify-center w-full h-full bg-black bg-opacity-50'>
        <div className='text-center'>
          <h1 className='text-3xl font-semibold text-white lg:text-4xl'>
            {title}
          </h1>
          <p className='text-white mt-4 w-[70%] mx-auto'>
            {text}
          </p>
          <br />
          <Link
            to='/products'
          >
            <button className='text-white hover:bg-black bg-primary px-6 py-2 mt-4 font-bold'>
                Explore
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Slide
