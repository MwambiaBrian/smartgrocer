
import styled from 'styled-components'
import{ FaUsers, FaChartBar, FaClipboard} from 'react-icons/fa'
import Widget from './Summary-components/Widget'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../../Store'

const Summary = () => {
    

  const business= useSelector((state: RootState) => state.businesses);
const [earnings, setEarnings] =useState(0)
const [orders, setOrders]=useState([
    {
        _id:'',
        customerId:"",
        products: Array<{
         // productId: string;
          businessId:'';
          cartQuantity: '';
          price: '';
          // subtotal: number;
    
        }>,
        totalAmount: null,
        shippingAddress: {
          street: '',
          city: '',
          building: '',
          county: ''
          
        },
        deliveryStatus: '',
        paymentStatus:'',
        createdAt: ''
      }
       
]);

const fetchOrders = async () => {
    // const response = await axios.get(`http://localhost:5005/api/order/${customerId}}`);
    const response = await axios.get(`http://localhost:5005/api/order`);
    console.log(`from fetch${response.data}`)
    return response.data;
  };

  useEffect(()=>{
    const getMyOrders = async ()=>{
      const myOrders = await fetchOrders()
      console.log(`from app ${myOrders}`)
      setOrders(myOrders);
    }
   
   getMyOrders()
   
   //console.log(`from app file ${auth._id}`)
  
  },[])
  const rows = orders && Array.isArray(orders)
  ? orders
      .map(order => ({
        id: order._id,
        pProducts: Array.isArray(order.products)
          ? order.products.filter((product: any) => product.businessId === business.business._id)
          : [],
        pStatus: order.deliveryStatus,
        pPayment: order.paymentStatus,
        pTime: order.createdAt
      }))
      .filter(order => order.pProducts.length > 0)
  : [];
const myOrders = rows.length
const fetchEarnings= async (id: string) => {
const response = await axios.get(`http://localhost:5003/api/businesses/earnings/${id}`)
return response.data
}
useEffect(()=>{
    const getEarnings = async ()=>{
      const users = await fetchEarnings(business.business._id)
    
      setEarnings(users)
      
    }
   
   getEarnings()
   
   
  
  },[])
    const data = [

      
        {
            icon: <FaClipboard />,
            digits: myOrders,
            isMoney: false,
            title: 'Orders',
            color: "rgb(38, 198, 249)",
            bgColor:  "rgba(38, 198, 249, 0.12)",
            percentage: 20
        },
     
        {
            icon: <FaChartBar />,
            digits: earnings,
            isMoney: false,
            title: 'Earnings',
            color: "rgb(253, 108, 255)",
            bgColor:  "rgba(102, 108, 255, 0.12)",
            percentage: 60
        }
        
        
    ]




    return <StyledSummarry>
        <MainStats>
            <Overview>
                <Title>
                    <h2>Overview</h2>
                    <p>Perfomance </p>
                </Title>
                <WidgetWrapper>
                    {data?.map((data, index) => <Widget key={index} data={data}/>)}
                </WidgetWrapper>
            </Overview>
        </MainStats>
        <SideStats></SideStats>
    </StyledSummarry>
}

export default Summary

const StyledSummarry = styled.div`
width: 100%;
display: flex;
justify-content: space-around;

margin-top: 60px;
`;

const MainStats = styled.div`
flex: 2;
width: 100%;
`;

const Title = styled.div`
p {
    font-size: 14px;
    color: rgba(234, 234, 255, 0.68)
}
`;

const Overview = styled.div`
background: rgb(48,51,78);
color: rgba(234,234,255, 0.87);
width: 100%;
padding: 1.5rem;
height: 170px;
border-radius: 10px;
display: flex;
flex-direction: column;
justify-content: space-between;
`;

const WidgetWrapper = styled.div`
display: flex;
width: 100%;
jusitify-content: space-between;
`;

const SideStats = styled.div`
flex: 1;
display: flex;
flex-direction: column;
margin-left: 2rem;
width: 100%;
`