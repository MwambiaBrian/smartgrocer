import { Outlet } from "react-router-dom"
import Header from "../../Shared/header/Header"
import Footer from "../../Shared/footer/Footer"

function SellerLayout() {
    return (
    <>
    <Header />
    <Outlet />
      
    </>
    )
  }
  
  export default SellerLayout