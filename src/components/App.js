import React from 'react';
import { SeatContext } from './SeatContext';
import { BookingContext } from './BookingContext';
import GlobalStyles from './GlobalStyles';
import TicketWidget from './TicketWidget';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

function App() {
  const {
    state: { numOfRows },
    actions: { receiveSeatInfoFromServer }
  } = React.useContext(SeatContext);
  const {
    state :{
      status
    },
    actions: {
      clearSnackBar
    }
  } = React.useContext(BookingContext);

  React.useEffect(() => {
      fetch('/api/seat-availability')
        .then(res => res.json())
        .then(data => receiveSeatInfoFromServer(data))
  }, [receiveSeatInfoFromServer]);
  return (
    <>
      <GlobalStyles />
      <TicketWidget />
      <Snackbar open={status === 'purchased'} severity='success'>
        <Alert 
          severity='success'
          onClose={clearSnackBar}
          elevation={6}
          variant='filled'
        >
          Bought ur Tix 
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
