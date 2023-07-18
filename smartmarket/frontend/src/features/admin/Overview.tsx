
import styled from 'styled-components'
import{ FaUsers, FaChartBar, FaClipboard} from 'react-icons/fa'
import Widget from './Summary-components/Widget'
import { useSelector } from 'react-redux';
import { RootState } from '../../Store';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Summary = () => {
    const business= useSelector((state: RootState) => state.businesses);
    const [users, setUsers]=useState([
        {
            _id:'',
            name:"",
            
            email: "",
            password:'',
           
            role: '',
           
          }
           
    ]);
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
      const rows = orders && orders
      //   .filter(order => order.customerId === auth._id)
          .map(order => ({
            id: order._id,
            
           // pAmount: order.totalAmount.toLocaleString(),
          //   pDriver: order.Driver,
            pStatus: order.deliveryStatus,
            pPayment: order.paymentStatus,
            pTime: order.createdAt
          }));
    const myOrders = rows.length
    const fetchUsers = async () => {
        const response = await axios.get(`http://localhost:5001/api/auth`);
      
        return response.data;
      };
    useEffect(()=>{
        const getUsers = async ()=>{
          const users = await fetchUsers()
        
          setUsers(users)
          
        }
       
       getUsers()
       
       
      
      },[])
    const data = [

        {
            icon: <FaUsers />,
            digits: users.length,
            isMoney: false,
            title: 'Users',
            color: "rgb(102, 181, 40)",
            bgColor:  "rgba(102, 181, 40, 0.12)",
            percentage: 30
        },
        {
            icon: <FaClipboard />,
            digits: myOrders,
            isMoney: false,
            title: 'Orders',
            color: "rgb(38, 198, 249)",
            bgColor:  "rgba(38, 198, 249, 0.12)",
            percentage: 20
        },
     
      
        
        
    ]




    return <StyledSummarry>
        <MainStats>
            <Overview>
                <Title>
                    <h2>Overview</h2>
                    <p>Perfomance comparison</p>
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
justify-content: space-between
`;

const WidgetWrapper = styled.div`
display: flex;
width: 100%;
jusitify-content: space-between
`;

const SideStats = styled.div`
flex: 1;
display: flex;
flex-direction: column;
margin-left: 2rem;
width: 100%;
`