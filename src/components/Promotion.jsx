import {  ChevronRight, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const Promotion = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white mt-10 md:mt-[60px] lg:mt-[80px] 2xl:mt-[100px]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl mb-6">
                Unlock Premium Features
              </h2>
              <ul className="space-y-4">
                {[
                  "Early access to new tech products",
                  "Exclusive discount coupons",
                  "Advanced analytics dashboard",
                  "Priority customer support"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Gift className="w-5 h-5 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/dashboard/userProfile">
              <button className="mt-8 bg-white text-indigo-600 py-3 px-8 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center">
                Get Premium
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692"
                alt="Premium Features"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 right-6 md:-right-6 bg-purple-500 text-white p-4 rounded-lg">
                <p className="text-xl font-bold">Save 20%</p>
                <p className="text-sm">Limited time offer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    );
};

export default Promotion;