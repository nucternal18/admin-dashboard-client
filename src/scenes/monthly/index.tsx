import React, { useMemo } from "react";
import {
  Box,
  useTheme,
} from "@mui/material";
import { ResponsiveLine, Serie } from "@nivo/line";

import { Header } from "../../components";
import { useGetSalesQuery } from "../../app/api";

type MonthlyData = {
  month: string;
  totalSales: number;
  totalUnits: number;
  _id: string;
};



function Monthly() {
  const theme = useTheme();
  const { data } = useGetSalesQuery();

  const [formattedData] = useMemo(() => {
    if (!data) return [];

    const { monthlyData }: { monthlyData: MonthlyData[] } = data;
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [] as Array<{ x: string; y: number }>,
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary.dark,
      data: [] as Array<{ x: string; y: number }>,
    };

    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
      totalSalesLine.data = [
        ...totalSalesLine.data,
        { x: month, y: totalSales },
      ];
      totalUnitsLine.data = [
        ...totalUnitsLine.data,
        { x: month, y: totalUnits },
      ];
    });

    const formattedData = [totalSalesLine, totalUnitsLine];
    return [formattedData];
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MONTHLY SALES" subtitle="Chart of monthlysales" />
      <Box height="75vh">
        {data ? (
          <ResponsiveLine
            data={formattedData as Serie[]}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary.light,
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary.light,
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary.light,
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary.light,
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary.light,
                },
              },
              tooltip: {
                container: {
                  background: theme.palette.primary.main,
                },
              },
            }}
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            // curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
}

export default Monthly