import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import FeaturedProducts from "../components/FeaturedProducts";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>TechHive | Home</title>
            </Helmet>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
        </div>
    );
};

export default Home;