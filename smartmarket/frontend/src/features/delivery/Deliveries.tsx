import {Outlet, useNavigate} from "react-router-dom";
import {DriverHeaders} from './CommonStyled'

export default function products ()  {
    const navigate = useNavigate();

    return (
        <>
        <DriverHeaders>
            Deliveries
        
         
        </DriverHeaders>
<Outlet />

       
        </>
       
    )
}