import React, { useMemo } from "react";
import { ResponsiveLine, Serie } from "@nivo/line";
import { useTheme } from "@mui/material";

import { useGetSalesQuery } from "../app/api";

type OverviewChartProps = {
  view: string;
  isDashboard?: boolean;
};

type MonthlyData = {
    month: string;
    totalSales: number;
    totalUnits: number;
    _id: string;
};


function OverviewChart({ view, isDashboard }: OverviewChartProps) {
  const theme = useTheme();
  const { data: sales, isLoading } = useGetSalesQuery();


  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!sales) return [];
    const { monthlyData }: { monthlyData: MonthlyData[]} = sales;
    const totalSalesLine: Serie = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [] as Array<{ x: string; y: number }>,
    };
    const totalUnitsLine: Serie = {
      id: "totalUnits",
      color: theme.palette.secondary.dark,
      data: [] as Array<{ x: string; y: number }>,
    };
    
    Object.values(monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const currentSales = acc.sales + totalSales;
        const currentUnits = acc.units + totalUnits;

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: month, y: currentSales },
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: month, y: currentUnits },
        ];
        
        return { sales: currentSales, units: currentUnits };
      },
      { sales: 0, units: 0 }
    );
    return [[totalSalesLine], [totalUnitsLine]];
  }, [sales]);

  if (!sales || isLoading) return <div>Loading...</div>;

  return (
    <ResponsiveLine
      data={view === "sales" ? (totalSalesLine as Serie[]): (totalUnitsLine as Serie[])}
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
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },

        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : view === "sales" ? "Revenue" : "Units",
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
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
            ]
          : undefined
      }
    />
  );
}

export default OverviewChart;
