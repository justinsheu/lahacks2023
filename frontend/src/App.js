import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Selections from './pages/Selections';
import './App.css'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/selections' element={<Selections />} />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
