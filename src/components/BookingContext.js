import React from 'react';

export const BookingContext = React.createContext();

const initialState = {
    status: 'idle',
    error: null,
    selectedSeatId: null,
    price: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'begin-booking-process': {
            console.log(action)
            return {
                ...state,
                selectedSeatId: action.seatId,
                price: action.price,
                status: 'seat-selected'
            }
        }
        case 'cancel-booking-process': {
            return {
                status: 'idle',
                error: null,
                selectedSeatId: null,
                price: null,
            }
        }
        case 'purchase-ticket-request': {
            return {
                status: 'awaiting-response',
                error: null,
                selectedSeatId: action.seatId,
                price: action.price,
            }
        }
        case 'purchase-ticket-failure': {
            return {
                status: 'error',
                error: action.message,
                selectedSeatId: action.seatId,
                price: action.price,
            }
        }
        case 'purchase-ticket-success': {
            return {
                status: 'purchased',
                error: null,
                selectedSeatId: null,
                price: null,
            }
        }
        case 'clear-snack-bar': {
            return {
                status: 'idle',
                error: null,
                selectedSeatId: null,
                price: null
            }
        }
        default:
            throw new Error('Unrecognized');
    }
}

export const BookingProvider = ({ children }) => {
    const [state,dispatch] = React.useReducer(reducer, initialState);
    const bookSeat = data => {
        dispatch({
            type: 'begin-booking-process',
            ...data
        });
    }
    const cancelBookingProcess = () => {
        dispatch({
            type: 'cancel-booking-process'
        });
    }
    const purchaseTicketRequest = data => {
        dispatch({
            ...data,
            type:'purchase-ticket-request'
        });
    }
    const purchaseTicketFailure = message => {
        dispatch({
            message,
            type:'purchase-ticket-failure'
        });
    }
    const purchaseTicketSuccess = () => {
        dispatch({
            type:'purchase-ticket-success'
        }); 
    }
    const clearSnackBar = () => {
        dispatch({
            type:'clear-snack-bar'
        })
    }
    return (
        <BookingContext.Provider
            value = {{
                state,
                actions: {
                    bookSeat,
                    cancelBookingProcess,
                    purchaseTicketRequest,
                    purchaseTicketFailure,
                    purchaseTicketSuccess,
                    clearSnackBar,
                },
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};