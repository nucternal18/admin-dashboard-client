import React from 'react'
import { Box, useTheme, FormControl, MenuItem, InputLabel, Select } from '@mui/material';

import { Header, OverviewChart } from '../../components';
import { useGetSalesQuery } from '../../app/api';


function Overview() {
  const theme = useTheme()
  const [view, setView] = React.useState('units')

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="OVERVIEW" subtitle="Overview of the general revenue and profit." />
      <Box
        mt="40px"
        height="75vh"
      >
        <FormControl sx={{ mt: 1, minWidth: 120 }}>
          <InputLabel>View</InputLabel>
          <Select value={view} onChange={(e) => setView(e.target.value as string)}>
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
        </Box>
      </Box>
  )
}

export default Overview