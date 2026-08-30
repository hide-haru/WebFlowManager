import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import MainLayout from './layouts/MainLayout'
import LoginPage from './pages/LoginPage/LoginPage'
import CalendarPage from './pages/CalendarPage/CalendarPage'
import ReservationDetailPage from './pages/ReservationDetailPage/ReservationDetailPage'
import ReportLayoutPage from './pages/ReportPages/ReportLayoutPage/ReportLayoutPage'
import ReportInputPage from './pages/ReportPages/ReportInputPage/ReportInputPage'
import ClientListPage from './pages/ClientListPage/ClientListPage'
import ClientPage from './pages/ClientPage/ClientPage'
import ClientDetailPage from './pages/ClientPage/ClientDetailPage'

import UserAddPage from './pages/UserAddPage'
// import './App.css'

function App() {

  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Routes>

        {/* SideMenuなし */}
        <Route path="" element={<LoginPage/>} />

        {/* SideMenuあり */}
        <Route element={<MainLayout isOpen={isOpen} setIsOpen={setIsOpen} />}>
          <Route path="/calendar" element={<CalendarPage isOpen={isOpen}/>} />
          <Route path="/reservationadd" element={<ReservationDetailPage />} />
          <Route path="/reservationdetail" element={<ReservationDetailPage />} />
          <Route path="/reportlayout" element={<ReportLayoutPage />} />
          <Route path="/clientlist" element={<ClientListPage />} />
          <Route path="/clientpage" element={<ClientPage />} />
          <Route path="/clientdetailpagenew" element={<ClientDetailPage />} />
          <Route path="/clientdetailpageadd" element={<ClientDetailPage />} />
          <Route path="/reportinput" element={<ReportInputPage />} />
          
          {/* 後で変更するかも */}
          
          <Route path="/useradd" element={<UserAddPage/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
