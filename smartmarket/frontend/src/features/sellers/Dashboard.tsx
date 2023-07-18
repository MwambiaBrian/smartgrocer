import styled from "styled-components";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import Header from "../../Shared/header/Header";

const Dashboard = () => {
  const auth = useSelector((state: RootState) => state.auth);

  // if (!auth.isAdmin) return <p>Access denied. Not an Admin!</p>;

  return (
    <StyledDashboard>
       <Header />
      <SideNav>
        <h3>Quick Links</h3>
        <NavLink style={{fontSize: 20}}
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/seller"
        >
          Summary
        </NavLink>
        <NavLink style={{fontSize: 20}}
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/seller/products"
        >
          Products
        </NavLink>
        <NavLink style={{fontSize: 20}}
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/seller/orders"
        >
          Orders
        </NavLink>
       
      </SideNav>
      <Content>
        <Outlet />
      </Content>
    </StyledDashboard>
  );
};

export default Dashboard;

const StyledDashboard = styled.div`
  display: flex;
  height: 100vh;
`;

const SideNav = styled.div`
color: White;
  border-right: 1px solid gray;
  height: calc(100vh - 70px);
  position: fixed;
  overflow-y: auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 4rem;
  font-size: 20px
  margin-top: 60px
  

  h3 {
    color: White;
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 16px;
  
  }

  a {
    text-decoration: none;
    margin-bottom: 1rem;
    font-size: 14px;
  }
`;

const Content = styled.div`
  margin-left: 200px;
  padding: 2rem 3rem;
  width: 100%;
`;