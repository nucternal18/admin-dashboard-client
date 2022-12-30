import { useMemo, useState } from 'react'
import { createTheme, CssBaseline, ThemeProvider, PaletteOptions } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


// redux
import { useAppSelector } from './app/hooks';
import { themeSelector } from './features/global/globalSlice';
import { themeSettings } from './theme';

import Dashboard from './scenes/dashboard';
import Layout from './scenes/layout';
import Products from './scenes/products';
import Customers from './scenes/customers';
import Transactions from './scenes/transactions';
import Geography from './scenes/geography';
import Overview from './scenes/overview';
import Daily from './scenes/daily';
import Monthly from './scenes/monthly';
import Breakdown from './scenes/breakdown';
import Admin from './scenes/admin';
import Performance from './scenes/performance';
import Settings from './scenes/settings';

function App() {
  const mode = useAppSelector(themeSelector)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  
  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/monthly" element={<Monthly />} />
            <Route path="/breakdown" element={<Breakdown />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
