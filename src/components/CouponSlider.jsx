import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { Tag, Gift, Clock3 } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const CouponSlider = () => {
  const [coupons, setCoupons] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axiosPublic.get("/coupons");
        const validCoupons = response.data.filter(
          (coupon) => new Date(coupon.expiryDate) > new Date()
        );
        setCoupons(validCoupons);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, [axiosPublic]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section className="py-16 px-4 mt-10 md:mt-[60px] lg:mt-[80px] 2xl:mt-[100px]">
      <div className="max-w-[1600px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Exclusive Offers
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Don&apos;t miss out on these amazing deals!</p>
        </div>

        <div className="relative px-8">
          {coupons.length > 0 ? (
            <Slider {...sliderSettings}>
              {coupons.map((coupon) => (
                <div key={coupon._id} className="px-4 py-2">
                  <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border dark:border-gray-600 overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
                    <div className="relative p-8">
                      <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-purple-600 text-white px-6 py-2 rounded-bl-2xl font-semibold">
                        {coupon.discount}$ OFF
                      </div>
                      
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                          <Tag className="w-6 h-6 text-blue-600" />
                          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                            {coupon.code}
                          </h3>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Gift className="w-5 h-5 text-purple-600" />
                          <p className="text-gray-600 dark:text-gray-300">{coupon.description}</p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Clock3 className="w-5 h-5 text-red-500" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Expires: {new Date(coupon.expiryDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <Link to="/dashboard/userProfile">
                        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold transform hover:translate-y-[-2px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10">
                          Claim Offer
                        </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow-md dark:bg-gray-900">
              <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No active coupons available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CouponSlider;