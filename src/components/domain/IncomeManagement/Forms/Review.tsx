import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Review: React.FC = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} >
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={4}>Good Company that Pay You Out</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>CNPJ</TableCell>
            <TableCell colSpan={3}>82.913.562/0001-78</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Start Date</TableCell>
            <TableCell>02/03/2019</TableCell>
            <TableCell colSpan={2}>Present Work</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Salary</TableCell>
            <TableCell colSpan={3}>
              <TableContainer>
                <Table size="small" >
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3}>Income received every 5th of the month</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Gross Amount</TableCell>
                      <TableCell colSpan={3}>R$ 3128,13</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={5}>Discounts</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>INSS</TableCell>
                      <TableCell colSpan={2}>R$ 100,00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>IRRF</TableCell>
                      <TableCell colSpan={2}>R$ 300,00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>MEALS</TableCell>
                      <TableCell colSpan={2}>R$ 120,00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><b>Discounts Total</b></TableCell>
                      <TableCell colSpan={2}><b>R$ 520,00</b></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Net Amount</TableCell>
                      <TableCell colSpan={2}>R$ 2739,88</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Thirteen Salary Advance</TableCell>
            <TableCell colSpan={3}>
              <TableContainer>
                <Table size="small" >
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3}>Income received every November 20th</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Gross Amount</TableCell>
                      <TableCell colSpan={3}>R$ 3128,13</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Net Amount</TableCell>
                      <TableCell colSpan={2}>R$ 2739,88</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Thirteen Salary</TableCell>
            <TableCell colSpan={3}>
              <TableContainer>
                <Table size="small" >
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3}>Income received every December 20th</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Gross Amount</TableCell>
                      <TableCell colSpan={3}>R$ 3128,13</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={5}>Discounts</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>INSS</TableCell>
                      <TableCell colSpan={2}>R$ 100,00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>IRRF</TableCell>
                      <TableCell colSpan={2}>R$ 300,00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>MEALS</TableCell>
                      <TableCell colSpan={2}>R$ 120,00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><b>Discounts Total</b></TableCell>
                      <TableCell colSpan={2}><b>R$ 520,00</b></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Net Amount</TableCell>
                      <TableCell colSpan={2}>R$ 2739,88</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Review;