
import styled from 'styled-components'

const Widget = ({data}: any) => {
    return <StyledWidget>
        <Icon></Icon>
        
    </StyledWidget>
}

export default Widget

const StyledWidget = styled.div`
display: flex;
align-items: center;
`

const Icon = styled.div`
margin-right: 0.5rem;
padding: 0.5rem;
color: ${({ color }) => color};

border-radius: 3px;
font-size: 20px;
`