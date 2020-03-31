import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { dateFormate } from "../../utility";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

function TransactionDetailsPage() {
  const classes = useStyles();
  const [transaction, setTransaction] = useState({});
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const transactionReducer = useSelector(
    state => state.transactionDetails,
    shallowEqual
  );

  useEffect(() => {
    if (transactionReducer) {
      setTransaction(transactionReducer);
    } else {
      dispatch({ type: "GET_TRANSACTION_DETAIL", hash: params.id });
    }
  }, [transactionReducer]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" gutterBottom>
                  <b>Block: #{transaction.block_height}</b>
                </Typography>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="body1" gutterBottom>
                  Hash
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1" gutterBottom>
                  {transaction.hash}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="body1" gutterBottom>
                  size
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1" gutterBottom>
                  {transaction.size}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="body1" gutterBottom>
                  Time
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1" gutterBottom>
                  {transaction.time
                    ? dateFormate(transaction.time)
                    : "loading..."}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TransactionDetailsPage;
