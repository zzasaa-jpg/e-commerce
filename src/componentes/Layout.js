import { Outlet } from "react-router-dom";
import Allproduct from './Allproduct'
import SmartPhone from './SmartPhone'
import Loptop from './Loptop'
import Furniture from "./Furniture";
import Imageslider from "../ImageSlider/Imageslider";

function layout() {
    return (
        <>
            <Outlet />
            <Imageslider />
            <Allproduct />
            <SmartPhone />
            <Loptop />
            <Furniture />
        </>
    )
}

export default layout;