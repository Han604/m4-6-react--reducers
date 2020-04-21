import React from 'react';
import seatImg from '../assets/seat-available.svg'
import Tippy from '@tippy.js/react'
import styled from 'styled-components'
import 'tippy.js/dist/tippy.css';
import { BookingContext } from './BookingContext';

const Seat = ({ seats, rowName, seatId }) => {
    const { isBooked } = seats
    const {
        actions: { bookSeat }
    } = React.useContext(BookingContext)
    const sendingData = {seatId: seatId,
        price: seats.price
    }
    const tippyContent = `Row ${rowName}, seat ${seatId} - $${seats.price}`
    if( isBooked === true) {
        return (
            <Tippy arrow={true} content = {tippyContent}>
                <SeatButton disabled={true} >
                    <img 
                    style = {{ filter: isBooked && 'grayscale(100%)' }}
                    src= {seatImg} 
                    alt="its a seat"/>
                </SeatButton>
            </Tippy>
        )
    } else {
        return (
            <Tippy arrow={true} content = {tippyContent}>
                <SeatButton disabled={false} onClick={() => bookSeat(sendingData)}>
                    <img 
                    style = {{ filter: isBooked && 'grayscale(100%)' }}
                    src= {seatImg} 
                    alt="its a seat"/>
                </SeatButton>
            </Tippy>
        )
    }
    
}

const SeatButton = styled.button`
    background: none;
    border: none;
`

export default Seat