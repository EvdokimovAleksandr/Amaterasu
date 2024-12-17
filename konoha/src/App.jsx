import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import YM from 'Pages/YM/YM'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<YM />} />
        <Route path="/callback" element={<YM />} />
      </Routes>
    </Router>
  )
}
