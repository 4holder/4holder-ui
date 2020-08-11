import React from "react";
import {RouteComponentProps} from "@reach/router";
import AuthenticatedPage from "../AuthenticatedPage";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import {Amount, Occurrences} from "./types";
import {
  Breadcrumbs,
  Grid,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell, TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import moment from "moment";
import Dinero from "dinero.js";

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const FINANCIAL_DETAILS_QUERY = gql`
query($id: String!) {
  financialContractDetails: getFinancialContractDetails(id: $id) {
    id
    name
    contractType
    companyCnpj
    totalYearlyGrossAmount {
      amount: valueInCents
      currency
    }
    totalYearlyNetAmount {
      amount: valueInCents
      currency
    }
    totalYearlyDiscountAmount {
      amount: valueInCents
      currency
    }
    startDate
    endDate
    createdAt
    modifiedAt
    incomes {
      id
      name
      grossAmount {
        amount: valueInCents
        currency
      }
      netAmount {
        amount: valueInCents
        currency
      }
      incomeType
      occurrences {
        day
        months
      }
      discounts {
        id
        name
        discountType
        amount {
          amount: valueInCents
          currency
        }
        createdAt
        modifiedAt
      }
      createdAt
      modifiedAt
    }
  }
}
`;

interface IncomeDiscount {
  id: string;
  name: string;
  discountType: string;
  amount: Amount;
  createdAt: Date
  modifiedAt: Date
}

interface Income {
  id: string;
  name: string;
  grossAmount: Amount;
  netAmount: Amount;
  incomeType: string;
  occurrences: Occurrences;
  discounts: IncomeDiscount[];
  createdAt: Date;
  modifiedAt: Date;
}

interface FinancialContract {
  id: string;
  name: string;
  contractType: string;
  companyCnpj: string;
  incomes: Income[];
  totalYearlyGrossAmount: Amount;
  totalYearlyNetAmount: Amount;
  totalYearlyDiscountAmount: Amount;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  modifiedAt: Date;
}

interface DetailsParams {
  id: string;
}

interface DetailsQuery {
  financialContractDetails: FinancialContract;
}

const IncomeDetails: React.FC<RouteComponentProps<DetailsParams>> = (props) => {
  const classes = useStyles();

  const { loading, data } = useQuery<DetailsQuery>(FINANCIAL_DETAILS_QUERY, {
    variables: {
      id: props.id,
    },
  });

  if (loading) {
    return (<Typography> Loading ... </Typography>);
  }

  const financialContractDetails = data?.financialContractDetails;
  const DATE_FORMAT = "DD MMMM YYYY";
  return (
    <AuthenticatedPage>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
              <Breadcrumbs>
                <Link href="/incomes" color={"textSecondary"}>Income List</Link>
                <Typography variant={"subtitle2"}>{financialContractDetails?.name} Details</Typography>
              </Breadcrumbs>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={3} component={Paper}>
                  <Grid item xs={12} sm={12}>
                    <Typography variant={"body1"} >{financialContractDetails?.name}</Typography>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Typography variant={"body2"} >Contract Type</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant={"body1"} >{financialContractDetails?.contractType}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant={"body2"} >CNPJ</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant={"body1"} >{financialContractDetails?.companyCnpj}</Typography>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Typography variant={"body2"} >Started at</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant={"body1"} >{moment(financialContractDetails?.startDate).format(DATE_FORMAT)}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant={"body2"} >Finished at</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant={"body1"} >{
                      financialContractDetails ?
                        moment(financialContractDetails.startDate).format(DATE_FORMAT) :
                        "Current Position"
                    }</Typography>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Typography variant={"body2"} >Yearly Gross Amount</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography variant={"body1"} >{Dinero(financialContractDetails?.totalYearlyGrossAmount).toFormat()}</Typography>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Typography variant={"body2"} >Yearly Discount Amount</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography variant={"body1"} >{Dinero(financialContractDetails?.totalYearlyDiscountAmount).toFormat()}</Typography>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Typography variant={"body2"} >Yearly Net Amount</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography variant={"body1"} >{Dinero(financialContractDetails?.totalYearlyNetAmount).toFormat()}</Typography>
                  </Grid>

                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                {financialContractDetails?.incomes.map((income, index) => (
                  <TableContainer key={index}>
                    <Table size="small" >
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={3}>
                            {
                              income.occurrences.months.length === 12?
                                <Typography><b>{income.name}</b> is received every {income.occurrences.day}th</Typography>
                                :
                                <Typography>
                                  <b>{income.name}</b> is received at {income.occurrences.day}th
                                  in month(s) {income.occurrences.months.join(",")}
                                </Typography>
                            }
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Gross Amount</TableCell>
                          <TableCell colSpan={3}>{Dinero(income.grossAmount).toFormat()}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Net Amount</TableCell>
                          <TableCell colSpan={3}>{Dinero(income.netAmount).toFormat()}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell rowSpan={
                            income.discounts.length > 0 ? income.discounts.length + 1 : 0
                          }>Discounts</TableCell>
                        </TableRow>
                        {(income.discounts.length > 0) ?
                          income.discounts.map((discount, index) => (
                            <TableRow key={index}>
                              <TableCell>{discount.discountType}</TableCell>
                              <TableCell colSpan={2}>{Dinero(discount.amount).toFormat()}</TableCell>
                            </TableRow>
                          )) :
                            <TableRow key={index}>
                              <TableCell>No Discount</TableCell>
                            </TableRow>
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </AuthenticatedPage>
  );
};

export default IncomeDetails;