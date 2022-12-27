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
          </Route>
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
