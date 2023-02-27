import * as React from "react";
import Paper from "@mui/material/Paper";
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { ArgumentScale, EventTracker, Animation } from "@devexpress/dx-react-chart";
import { scaleBand } from "@devexpress/dx-chart-core";
import { Tooltip } from "@devexpress/dx-react-chart-material-ui";
import dayjs from "dayjs";

export default function TransactionChart({data}) {
    const chartData = data.map(item => {
        item.month = dayjs().month(item._id-1).format("MMMM")
        return item
    })
console.log(data);
    return (
        
        <Paper sx={{marginTop:5}}>
          <Chart data={chartData}>
            <ArgumentScale factory={scaleBand} />
            <ArgumentAxis />
            <ValueAxis />
            <EventTracker />
            <Tooltip />
            <Animation/>
            <BarSeries valueField="totalExpenses" argumentField="month" />
          </Chart>
        </Paper>
      );
}

