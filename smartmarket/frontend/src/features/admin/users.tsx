import {Outlet, useNavigate} from "react-router-dom";
import {AdminHeaders, PrimaryButton} from './CommonStyled'

export default function products ()  {
    const navigate = useNavigate();

    return (
        <>
        <AdminHeaders>
            Users
            <PrimaryButton onClick={()=> navigate("/admin/add")}>
                Create new user
         
            </PrimaryButton>
         
        </AdminHeaders>
<Outlet />

       
        </>
       
    )
}