import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import FeaturedProducts from "../components/FeaturedProducts";
import TrendingProducts from "../components/TrendingProducts";
import CouponSlider from "../components/CouponSlider";
import HowWorks from "../components/HowWorks";
import Promotion from "../components/Promotion";
import TechNews from "../components/TechNews";
import Accordion from "../components/Accordion";



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>TechHive | Home</title>
            </Helmet>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
            <Promotion></Promotion>
            <TechNews></TechNews>
            <CouponSlider></CouponSlider>
            <HowWorks></HowWorks>
            <div className="mt-">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-8 dark:text-gray-200">
            Frequently Asked Questions
          </h2>
          <Accordion />
        </div>
        </div>
    );
};

export default Home;