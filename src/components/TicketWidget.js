import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Seat from './Seat'

import { SeatContext } from './SeatContext';
import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import PurchaseModal from './PurchaseModal';

const TicketWidget = () => {
  // // TODO: use values from Context
  // const numOfRows = 6;
  // const seatsPerRow = 6;
  const {
    state: { numOfRows, seatsPerRow, hasLoaded, seats },
  } = React.useContext(SeatContext);
    if (!hasLoaded) {
    return <CircularProgress />
  }
  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  return (
    <Wrapper>
      <PurchaseModal></PurchaseModal>
      {range(numOfRows).map(rowIndex => {
        const rowName = getRowName(rowIndex);
        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map(seatIndex => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
              return (
                <SeatWrapper key={seatId}>
                  <Seat seats={seats[seatId]} rowName={rowName} seatId={seatId}></Seat>
                </SeatWrapper>
              );
            })}
          </Row>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
