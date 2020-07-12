import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {NewFinancialContractForm} from "../NewFinancialContract";
import Dinero from "dinero.js";

const useStyles = makeStyles({
  cover: {
    minWidth: 650,
  },
});

interface ReviewFormProps {
  formData: NewFinancialContractForm;
}

const Review: React.FC<ReviewFormProps> = (props) => {
  const classes = useStyles();

  const { formData } = props;

  const toMonetaryVisualization = (amount: number) => {
    return Dinero({
      amount: parseInt((amount * 100).toString()),
      currency: "BRL" }
    ).toFormat();
  };

  return (
    <TableContainer component={Paper} >
      <Table className={classes.cover}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={4}>{formData.contractType} contract with {formData.name}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>CNPJ</TableCell>
            <TableCell colSpan={3}>{formData.companyCnpj}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Start Date</TableCell>
            <TableCell>{formData.startDate.toDateString()}</TableCell>
            {
              formData.endDate?
                <div>
                  <TableCell>End Date</TableCell>
                  <TableCell>{formData.endDate.toDateString()}</TableCell>
                </div>
              :
                <TableCell colSpan={2}>Present</TableCell>
            }
          </TableRow>
          {formData.incomes.map((income, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{income.incomeType}</TableCell>
                <TableCell colSpan={3}>
                  <TableContainer>
                    <Table size="small" >
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={3}>
                            {
                              income.occurrencesMonths.length === 12?
                                <Typography>Income is received every {income.occurrencesDay}th</Typography>
                                :
                                <Typography>
                                  Income is received at {income.occurrencesDay}th
                                   in month(s) {income.occurrencesMonths.join(",")}
                                </Typography>
                            }
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Gross Amount</TableCell>
                          <TableCell colSpan={3}>{toMonetaryVisualization(income.amount)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell rowSpan={5}>Discounts</TableCell>
                        </TableRow>
                        {income.discounts.map((discount, index) => (
                          <TableRow key={index}>
                            <TableCell>{discount.discountType}</TableCell>
                            <TableCell colSpan={2}>{toMonetaryVisualization(discount.amount)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TableCell>
              </TableRow>
            );
          })}


        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Review;