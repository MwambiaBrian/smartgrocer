import {Outlet, useNavigate} from "react-router-dom";
import {AdminHeaders, PrimaryButton} from './CommonStyled'

export default function products ()  {
    const navigate = useNavigate();

    return (
        <>
        <AdminHeaders>
            Products 
            <PrimaryButton onClick={()=> navigate("/seller/add")}>
                Create
         
            </PrimaryButton>
         
        </AdminHeaders>
<Outlet />

       
        </>
       
    )
}