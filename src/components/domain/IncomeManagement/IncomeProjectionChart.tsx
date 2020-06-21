import * as React from 'react';
import {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import {ArgumentAxis, BarSeries, Chart, Legend, Tooltip, ValueAxis,} from '@devexpress/dx-react-chart-material-ui';
import {ArgumentScale, EventTracker, HoverState, Stack, ValueScale} from '@devexpress/dx-react-chart';
import {RouteComponentProps} from "@reach/router";
import {FinancialMovementsProjection} from "./types";
import {getIncomeProjections} from "../../../clients/publicApiClient";

interface IDataItem {
  month: string,
  grossIncome: number,
  netIncome: number,
  discount: number,
}

interface MonthLabels {
  [key: number]: string;
}

const monthLabels: MonthLabels = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

const currencyLabel = 'R$';
const makeLabel = (symbol: string) => ({ text, style, ...restProps }: any) => (
  <ValueAxis.Label
    text={`${symbol} ${text}`}
    style={{
      ...style,
    }}
    {...restProps}
  />
);
const PriceLabel = makeLabel(currencyLabel);

const TooltipContent = ({text, props}: any) => {
  return (
    <Tooltip.Content {...props} text={`${currencyLabel} ${text}`} />
  );
};

const IncomeProjectionChart: React.FC<RouteComponentProps> = () => {

  const [projections, setProjections] = useState<IDataItem[]>([]);

  useEffect(() => {
    getIncomeProjections(1, 100)
      .then((projections: FinancialMovementsProjection[]) => {
        const grossIncomeProjections = projections.find(p => p.label === 'Gross Income');

        const grossIncomeChartData = grossIncomeProjections ? grossIncomeProjections
          .financialMovements
          .map(f => ({
            month: f.dateTime.getMonth(),
            grossIncome: f.amount.amount/100,
          })) : [];

        const netIncomeProjections = projections.find(p => p.label === 'Net Income');

        const netIncomeChartData = netIncomeProjections ? netIncomeProjections
          .financialMovements
          .map(f => ({
            netIncome: f.amount.amount/100,
          })) : [];

        const discountProjections = projections.find(p => p.label === 'Discounts');

        const discountsChartData = discountProjections ? discountProjections
          .financialMovements
          .map(f => ({
            discount: f.amount.amount/100,
          })) : [];

        const chartData: IDataItem[] = grossIncomeChartData.map((grossIncomeChartData, i) => ({
          ...netIncomeChartData[i],
          ...discountsChartData[i],
          ...grossIncomeChartData,
        }))
          .sort((a,b)=> a.month - b.month)
          .map(v => (
            {...v, month: monthLabels[v.month]}
          ));

        setProjections(chartData);
      });
  }, []);

  return (
    <Paper>
      <Chart data={projections} height={300}>
        <ArgumentScale />
        <ArgumentAxis />
        <ValueAxis labelComponent={PriceLabel}/>

        <ValueScale name="grossIncome" />
        <ValueScale name="netIncome" />
        <ValueScale name="discount" />

        <BarSeries
          name="Gross Income"
          valueField="grossIncome"
          argumentField="month"
          color={"#2196f3"}
        />

        <BarSeries
          name="Net Income"
          valueField="netIncome"
          argumentField="month"
          color={"#2ec4b6"}
        />

        <BarSeries
          name="Discounts"
          valueField="discount"
          argumentField="month"
          color={"#b93f5a"}
        />

        <Legend />
        <EventTracker />
        <Tooltip contentComponent={TooltipContent}/>
        <HoverState />
        <Stack />
      </Chart>
    </Paper>
  );
};

export default IncomeProjectionChart;