import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">The Wild Oasis</Heading>
        <Heading as="h2">Checkin and Checkout</Heading>

        <Button onClick={() => alert('Checkin')}>Checkin</Button>
        <Button onClick={() => alert('Checkout')}>Checkout</Button>

        <Heading as="h3">Form</Heading>
        <Input
          type="number"
          placeholder="Number of guests"
        />

        <Input
          type="number"
          placeholder="Number of guests"
        />
      </StyledApp>
    </>
  );
}

export default App;
