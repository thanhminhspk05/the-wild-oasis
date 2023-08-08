import { useEffect, useState } from 'react';
import CabinTable from '../features/cabins/CabinTable';
import CabinForm from '../features/cabins/CabinForm';
import { getCabins } from '../services/apiCabins';
import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getCabins().then((data) => console.log(data));
  }, []);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />

        <Button onClick={() => setShowForm((prevValue) => !prevValue)}>Add new cabin</Button>
        {showForm && <CabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
