import React from 'react'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ResponsiveChoropleth } from '@nivo/geo';
import { geoData } from '../../utils/geoData';

import { Header } from "../../components";
import { useGetGeographyQuery } from '../../app/api';

function Geography() {
  const theme = useTheme();
  const { data, isLoading } = useGetGeographyQuery();

  if(isLoading) return <div>Loading...</div>
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="GEOGRAPHY" subtitle="Find where your users are located." />
      <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary.light}`}
      >
        <ResponsiveChoropleth
          data={data!}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: theme.palette.secondary.light,
                }
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
                }
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
              }
            }
          }}
          features={geoData.features}
          margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
          domain={[0,60]}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionScale={150}
          projectionTranslation={[0.45, 0.6]}
          projectionRotation={[0, 0, 0]}
          enableGraticule={true}
          borderWidth={1.3}
          borderColor="#fff"
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: true,
              translateX: 0,
              translateY: -125,
              itemsSpacing: 0,
              itemWidth: 94,
              itemHeight: 18,
              itemDirection: "left-to-right",
              itemTextColor: theme.palette.secondary.light,
              itemOpacity: 0.85,
              symbolSize: 18,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: theme.palette.background.paper,
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Box>
    </Box>
  );
}

export default Geography