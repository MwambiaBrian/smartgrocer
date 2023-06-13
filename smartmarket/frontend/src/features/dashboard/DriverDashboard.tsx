import DisplayProduct from '../Product/DisplayProduct'
import './Dashboard.css'
function DriverDashboard() {
  return (
    <div className='row'>
    <DisplayProduct />
   <DisplayProduct />
     <DisplayProduct />
     <DisplayProduct />
     </div>
  )
}

export default DriverDashboard