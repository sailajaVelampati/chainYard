import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { dateFormate } from "../../utility";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440
  }
});
function BlockDetailsPage() {
  const classes = useStyles();
  const [block, setBlock] = useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const blockReducer = useSelector(state => state.blockDetail, shallowEqual);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    if (blockReducer) {
      setBlock(blockReducer);
    } else {
      dispatch({ type: "GET_BLOCK_DETAIL", hash: params.id });
    }
  }, [blockReducer]);
  const showtransactionDetails = tx => {
    history.push(`/transaction/${tx.hash}`);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" gutterBottom>
                  <b>Block: #{block.height}</b>
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
              <TableCell align="left">
                <Typography variant="body1" gutterBottom>
                  {block.hash}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="body1" gutterBottom>
                  transactions
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body1" gutterBottom>
                  {block.tx ? block.tx.length : "loading..."}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="body1" gutterBottom>
                  Time
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body1" gutterBottom>
                  {block.time ? dateFormate(block.time) : "loading..."}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="body1" gutterBottom>
                  Parent Hash
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body1" gutterBottom>
                  {block.prev_block}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="body1" gutterBottom>
                  nonce
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body1" gutterBottom>
                  {block.nonce}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" gutterBottom>
        <b>Transactions List</b>
      </Typography>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" gutterBottom>
                    Height
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" gutterBottom>
                    Hash
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" gutterBottom>
                    Time
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {block.tx
                ? block.tx
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(tx => {
                      return (
                        <TableRow
                          key={tx.hash}
                          onClick={() => showtransactionDetails(tx)}
                        >
                          <TableCell component="th" scope="row">
                            <Typography variant="body1" gutterBottom>
                              {tx.hash}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="body1" gutterBottom>
                              {tx.relayed_by}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="body1" gutterBottom>
                              {dateFormate(tx.time)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })
                : "Loading Data"}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={block.tx ? block.tx.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Hash</TableCell>
              <TableCell>Relayed By</TableCell>
              <TableCell>Lock Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {block.tx
              ? block.tx.map(tx => (
                  <TableRow
                    key={tx.hash}
                    onClick={() => showtransactionDetails(tx)}
                  >
                    <TableCell component="th" scope="row">
                      {tx.hash}
                    </TableCell>
                    <TableCell align="center">{tx.relayed_by}</TableCell>
                    <TableCell align="center">{tx.lock_time}</TableCell>
                  </TableRow>
                ))
              : "No Data"}
          </TableBody>
        </Table>
      </TableContainer> */}
    </>
  );
}

export default BlockDetailsPage;
