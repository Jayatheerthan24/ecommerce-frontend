import {Outlet} from "react-router"
import Header from "../component/Header"

const HomeLayout=()=>{
    return (
        <>
        <Header/>
        <Outlet/>
        </>
    )
}

export default HomeLayout;
