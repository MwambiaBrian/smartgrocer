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
          to="/admin"
        >
          Summary
        </NavLink>
        <NavLink style={{fontSize: 20}}
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="products"
        >
          Products
        </NavLink>
     
     
        <NavLink style={{fontSize: 20}}
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="vehicles"
        >
          Transports
        </NavLink>
        <NavLink style={{fontSize: 20}}
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="businesses"
        >
          Transactions
        </NavLink>
        <NavLink style={{fontSize: 20}}
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="businesses"
        >
          Businesses
        </NavLink>
        <NavLink style={{fontSize: 20}}
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="deliveries"
        >
          Deliveries
        </NavLink>
        <NavLink style={{fontSize: 20}}
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="orders"
        >
          Orders
        </NavLink>
        <NavLink style={{fontSize: 20}}
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="users"
        >
          Users
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
  border-right: 1px solid gray;
  height: calc(100vh - 70px);
  position: fixed;
  overflow-y: auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  h3 {
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 17px;
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