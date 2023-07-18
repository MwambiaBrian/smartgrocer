
import styled from 'styled-components'

const Widget = ({data}: any) => {
    return(
        <StyledWidget>
        <Icon color={data.color}>
           {data.icon}
        </Icon>
        <Text>
            <h3>{data.digits}</h3>
            <p>{data.title}</p>
        </Text>
    </StyledWidget>
    ) ;
}

export default Widget

const StyledWidget = styled.div`
display: flex;
align-items: center;
`;

const Icon = styled.div`
margin-right: 0.5rem;
padding: 0.5rem;
color: ${({ color }) => color};
display: flex;
justify-content: space-around
border-radius: 3px;
font-size: 20px;
`;
const Text = styled.div`
h3 {
    font-weight: 900;
},
p {
    font-size: 14px;
    color: rgb(234,234,255, .68);
}
`;