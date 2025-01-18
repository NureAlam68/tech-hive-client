import { useNavigate } from "react-router-dom";
import ErrorImg from "../assets/error.jpg"

const ErrorPage = () => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate("/")
    }
    return (
        <div className="lg:h-[500px] md:w-[500px] mx-auto mt-[100px]">
      <div>
        <img src={ErrorImg} alt="" />
      </div>
      <button
        onClick={handleNavigate}
        className="btn btn-outline text-black font-bold mt-6 md:mt-8 lg:mt-10 mx-auto block"
      >
        Go Home
      </button>
    </div>
    );
};

export default ErrorPage;