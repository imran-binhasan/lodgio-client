import Banner from "./Banner";
import FeaturedRooms from "./FeaturedRooms";
import Map from "./Map";

const Home = () => {
    return (
        <div className=" space-y-10">
            <Banner/>
            <Map/>
            <FeaturedRooms/>
            <Map/>
        </div>
    );
};

export default Home;