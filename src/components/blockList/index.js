import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
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
    maxHeight: 640
  }
});
function BlockListPage() {
  const classes = useStyles();
  const [blocks, setBlocks] = useState([]);
  const [latestBlock, setLatestBlock] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const dispatch = useDispatch();
  const history = useHistory();
  const blocksReducer = useSelector(state => state.blocksList, shallowEqual);
  const latestBlocksReducer = useSelector(
    state => state.latestBlock,
    shallowEqual
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const date = new Date();
  useEffect(() => {
    console.log(blocks);
    if (blocksReducer) {
      console.log(blocks, "blocks");
      setBlocks(blocksReducer);
    }
  }, [blocksReducer]);

  useEffect(() => {
    if (latestBlocksReducer) {
      console.log("load latest");
      setLatestBlock(latestBlocksReducer);
      dispatch({ type: "GET_LIST", time: date.getTime() });
    } else {
      dispatch({ type: "GET_LATEST_BLOCK" });
    }
  }, [latestBlocksReducer]);

  const showBlockDetails = row => {
    history.push(`/block/${row.hash}`);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" gutterBottom>
                  <b>Latest Block: #{latestBlock.height}</b>
                </Typography>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="h6" gutterBottom>
                  Hash
                </Typography>
              </TableCell>
              <TableCell align="center">{latestBlock.hash}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="h6" gutterBottom>
                  transactions
                </Typography>
              </TableCell>
              <TableCell align="center">
                {latestBlock.tx ? latestBlock.txIndexes.length : 0}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="h6" gutterBottom>
                  Time
                </Typography>
              </TableCell>
              <TableCell align="center">
                {dateFormate(latestBlock.time)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Paper className={classes.root}>
        <Typography variant="h6" gutterBottom>
          <b> List of Blocks</b>
        </Typography>
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
              {blocks
                ? blocks
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      return (
                        <TableRow
                          value={row}
                          key={row.time}
                          onClick={() => showBlockDetails(row)}
                        >
                          <TableCell component="th" scope="row">
                            <Typography variant="body1" gutterBottom>
                              {row.height}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body1" gutterBottom>
                              {row.hash}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body1" gutterBottom>
                              {dateFormate(row.time)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })
                : "loading Data"}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={blocks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default BlockListPage;
