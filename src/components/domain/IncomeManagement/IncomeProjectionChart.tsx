import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {ArgumentAxis, BarSeries, Chart, Legend, Tooltip, ValueAxis,} from '@devexpress/dx-react-chart-material-ui';
import {ArgumentScale, EventTracker, HoverState, Stack, ValueScale} from '@devexpress/dx-react-chart';
import {FinancialMovementsProjection} from "./types";

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

export interface ProjectionItem {
  month: string,
  grossIncome: number,
  netIncome: number,
  discount: number,
}

interface IncomeProjectionChartProps {
  projections: FinancialMovementsProjection[],
}

const IncomeProjectionChart: React.FC<IncomeProjectionChartProps> = (props) => {

  const grossIncomeProjections = props.projections.find(p => p.label === 'Gross Income');

  const grossIncomeChartData = grossIncomeProjections ? grossIncomeProjections
    .financialMovements
    .map(f => ({
      month: new Date(f.dateTime).getMonth(),
      year: new Date(f.dateTime).getFullYear(),
      grossIncome: f.amount.amount/100,
    })) : [];

  const netIncomeProjections = props.projections.find(p => p.label === 'Net Income');

  const netIncomeChartData = netIncomeProjections ? netIncomeProjections
    .financialMovements
    .map(f => ({
      netIncome: f.amount.amount/100,
    })) : [];

  const discountProjections = props.projections.find(p => p.label === 'Discounts');

  const discountsChartData = discountProjections ? discountProjections
    .financialMovements
    .map(f => ({
      discount: f.amount.amount/100,
    })) : [];

  const chartData: ProjectionItem[]  = grossIncomeChartData
    .map((grossIncomeChartData, i) => ({
      ...netIncomeChartData[i],
      ...discountsChartData[i],
      ...grossIncomeChartData,
    }))
    .map(v => ({...v, month: `${monthLabels[v.month]}/${v.year}`}));

  return (
    <Paper>
      <Chart data={chartData} height={300}>
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