import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import FeaturedProducts from "../components/FeaturedProducts";
import TrendingProducts from "../components/TrendingProducts";
import CouponSlider from "../components/CouponSlider";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>TechHive | Home</title>
            </Helmet>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
            <CouponSlider></CouponSlider>
        </div>
    );
};

export default Home;