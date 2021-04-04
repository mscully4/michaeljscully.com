import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import { dollarFormatter } from './utils.js'

const styles = {
  accountInfoContainer: {
    position: 'absolute',
    top: '50%',
    left: '60%',
    width: '30%'
  },
};

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render = () => {
    const classes = this.props.classes;
    const account = this.props.account;
    console.log(this.props)
    const transfers = this.props.transfers.reduce((acc, cur) => {
      return acc + cur.net_amount
    }, 0)

    return (
      <TableContainer component={Paper} className={classes.accountInfoContainer}>
        <Table className={classes.table} size='small'>
          <TableBody>
            <TableRow key={"cash"}>
              <TableCell component="th" scope="row">Cash</TableCell>
              <TableCell align="right">{dollarFormatter(account.cash, 2)}</TableCell>
            </TableRow>
            <TableRow key={"equity"}>
              <TableCell component="th" scope="row">Equity Value</TableCell>
              <TableCell align="right">{dollarFormatter(account.long_market_value, 2)}</TableCell>
            </TableRow>
            <TableRow key={"total"}>
              <TableCell component="th" scope="row">Total Value</TableCell>
              <TableCell align="right">{dollarFormatter(account.cash + account.long_market_value, 2)}</TableCell>
            </TableRow>
            <TableRow key={"invested"}>
              <TableCell component="th" scope="row">Amount Invested</TableCell>
              <TableCell align="right">{dollarFormatter(transfers, 2)}</TableCell>
            </TableRow>
            <TableRow key={"net"}>
              <TableCell component="th" scope="row">Net</TableCell>
              <TableCell align="right">{dollarFormatter(account.cash + account.long_market_value - transfers, 2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

export default withStyles(styles)(DataTable);