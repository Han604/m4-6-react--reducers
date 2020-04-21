import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { SeatContext } from './SeatContext'
import { BookingContext } from './BookingContext';
import React from 'react'
import styled from 'styled-components'
import { decodeSeatId } from '../helpers'
import CircularProgress from '@material-ui/core/CircularProgress'


const PurchaseModal = () => {
    let { state: {
        status,
        error,
        selectedSeatId,
        price
    },
    actions: {
        cancelBookingProcess,
        purchaseTicketRequest,
        purchaseTicketFailure,
        purchaseTicketSuccess
    }} = React.useContext(BookingContext)
    const handleClose = () => {
        cancelBookingProcess()
    }
    
    const decodedSeat = decodeSeatId(selectedSeatId)
    const {rowName, seatNum} = decodedSeat    

    const [creditCard, setCreditCard] = React.useState('');
    const [expiration, setExpiration] = React.useState('');


    
    return <Dialog 
        onClose={() => handleClose()}open={selectedSeatId !== null}>
    <div>
        <DialogTitle>Purchase ticket</DialogTitle>
        <p>You're purchasing <strong>1</strong> ticket for the price of ${price}</p>
        <TicketTable aria-label="ticket information">
        <TableHead>
            <TableRow>
                <TableCell>Row</TableCell>
                <TableCell>Seat</TableCell>
                <TableCell>Price</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            <TableRow>
                <TableCell>{rowName}</TableCell>
                <TableCell>{seatNum}</TableCell>
                <TableCell>${price}</TableCell>
            </TableRow>
            </TableBody>
        </TicketTable>
        <div>
            <h3>Enter payment details</h3>
            <div className='inlineDiv'>
                <form onSubmit={ev =>{
                    ev.preventDefault();
                    purchaseTicketRequest();
                    fetch ('/api/book-seat', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            creditCard,
                            expiration,
                            seatId: selectedSeatId
                        })
                    }).then(res => res.json())
                    .then(res => {
                        if(res.success === true) {
                            purchaseTicketSuccess()
                            console.log(res)
                        } else {
                            purchaseTicketFailure('Please provide credit card information')
                            console.log(res)
                        }
                    })
                }}>
                    <TextField
                        variant = 'outlined'
                        label = 'Credit card'
                        type = 'text'
                        value = {creditCard}
                        onChange={ev => setCreditCard(ev.currentTarget.value)}
                    />
                    <TextField
                        variant = 'outlined'
                        label = 'Expiration'
                        type = 'text'
                        value = {expiration}
                        onChange={ev => setExpiration(ev.currentTarget.value)}
                    />
                    <Button variant="contained" type='submit'>{status === 'awaiting-response' ? <CircularProgress size={24}></CircularProgress>: 'purchase' }</Button>
                </form>

            </div>
        </div>

    </div>
    </Dialog>
}
export default PurchaseModal

const TicketTable = styled(Table)`
    width: 75% !important;
    margin-top: 16px;
    margin-bottom: 32px;
    margin-left: auto;
    margin-right: auto;
`;