import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems, toggleCart } from "../Redux/Action";
import Cart from "./Cart";
import TimerIcon from '@material-ui/icons/Timer';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Schedule = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [freeSeats, setFreeSeats] = useState(
    Math.floor(Math.random() * 10 + 5)
  );
  const [countDown, setCountDown] = useState(
    Math.floor(Math.random() * 30 + 30)
  );

  const { cartItems, showCart } = useSelector((state) => state);
  const dispatch = useDispatch();

  let date = new Date();

  const generateRandomClassNumber = () => {
    let num = Math.floor(Math.random() * 9 + 1);
    return num;
  };

  const generateRandomSchedule = () => {
    const tempDailyData = [];

    for (let i = 1; i < 60; i++) {
      const newDate = new Date(date.setDate(date.getDate() + 1));
      const getDay = newDate.getDay();
      if (getDay === 1) {
        tempDailyData.push({
          courseName: "Python",
          startTime: "4 PM",
          endTime: "5 PM",
          date: newDate,
          availableSheets: generateRandomClassNumber(),
        });
      }
      if (getDay === 3) {
        tempDailyData.push({
          courseName: "Java",
          startTime: "5 PM",
          endTime: "6 PM",
          date: newDate,
          availableSheets: generateRandomClassNumber(),
        });
      }

      if (getDay === 5 || getDay === 6) {
        tempDailyData.push({
          courseName: "HTML",
          startTime: "9 PM",
          endTime: "10 PM",
          date: newDate,
          availableSheets: generateRandomClassNumber(),
        });
      }
    }
    let aryForRandomZeroSheets = [];

    while (aryForRandomZeroSheets.length < 5) {
      let num = Math.floor(Math.random() * 15);
      if (!aryForRandomZeroSheets.includes(num)) {
        aryForRandomZeroSheets.push(num);
      }
    }

    let isMaxCrossed = false;
    while (!isMaxCrossed) {
      let isTrue = false;
      aryForRandomZeroSheets.forEach((item, i) => {
        if (item < tempDailyData.length) {
          tempDailyData[item].availableSheets = 0;
          let isNumberUpdated = false;
          while (!isNumberUpdated) {
            let num = Math.floor(Math.random() * 15);
            if (!aryForRandomZeroSheets.includes(num + 15)) {
              aryForRandomZeroSheets[i] = aryForRandomZeroSheets[i] + num;
              isNumberUpdated = true;
            }
          }
        } else {
          isTrue = true;
        }
      });
      isMaxCrossed = isTrue;
    }
    setPageCount(Math.floor(tempDailyData.length / 15) + 1);

    return tempDailyData;
  };

  useEffect(() => {
    setData(generateRandomSchedule());
  }, []);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (countDown > 0) {
        setCountDown(countDown - 1);
      } else {
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const handleBookClass = (idx) => {
    if (cartItems.length === 3) {
      alert("You can only book maximum 3 classes per week!");
      return;
    }
    cartItems.push(idx);
    dispatch(setCartItems(cartItems));
    setFreeSeats(freeSeats - 1);
  };

  const classes = useStyles();
  return (
    <div className="mt-4 mb-5">
      <Card className="my-3 bg-light" variant="outlined">
        <CardContent>
          {showCart ? (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => dispatch(toggleCart(false))}
              >
                Back
              </Button>
            </div>
          ) : (
            <>
            <h2 className="text-center font-weight-bold text-primary" >Class Schedule</h2>
              <div className="bg-white font-weight-bold px-2 py-2 shadow-sm rounded">
               <TimerIcon /> Time left: <span className="text-muted">{countDown} seconds</span>
               <span className="float-right">
                  Free Seats Left: <strong>{freeSeats}</strong>
                </span>
              </div>
                <h5 className="text-danger p-2 mb-0">Claim Your Free Trial Class </h5>
               
            </>
          )}
        </CardContent>
      </Card>
      {showCart ? (
        <Cart data={data} />
      ) : (
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell align="left">Date</StyledTableCell>
                  <StyledTableCell align="right">Class</StyledTableCell>
                  <StyledTableCell align="right">Time</StyledTableCell>
                  <StyledTableCell align="right">Availability</StyledTableCell>
                  <StyledTableCell align="right">{}</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(
                    (page - 1) * 15 + 1,
                    page * 15 + 1 > data.length ? data.length : page * 15 + 1
                  )
                  .map((item, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell>
                        <strong>{i + (page - 1) * 15 + 1}.</strong>
                      </StyledTableCell>
                      <StyledTableCell align="left" className="font-weight-bold" >
                        {item.date.toDateString()}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.courseName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.startTime} to {item.endTime}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.availableSheets} seats available
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          disabled={
                            !item.availableSheets ||
                            !countDown ||
                            cartItems.includes(i)
                          }
                          onClick={() => handleBookClass(i)}
                        >
                          Book
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {pageCount && (
            <div className="my-2 bg-warning p-2 rounded-lg ">
              <Pagination
                count={pageCount}
                page={page}
                onChange={(e, value) => {
                  setPage(value);
                }}
                variant="outlined"
                shape="rounded"
                color="primary"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Schedule;
