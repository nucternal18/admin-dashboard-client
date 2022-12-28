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


function App() {
  const mode = useAppSelector(themeSelector)
  console.log("🚀 ~ file: App.tsx:17 ~ App ~ mode", mode)
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
          </Route>
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
