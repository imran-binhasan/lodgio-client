import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";

const Main = () => {
    return (
        <>
        <Header/>
        <Outlet/>
        </>
    );
};

export default Main;