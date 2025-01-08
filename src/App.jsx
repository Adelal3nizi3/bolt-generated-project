import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { HomeIcon, DocumentAddIcon, LightningBoltIcon, DocumentTextIcon, CogIcon } from '@heroicons/react/outline';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import IsolationForm from './IsolationForm';
import TransformerForm from './TransformerForm';
import RecordsPage from './RecordsPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">إدارة مهام مشغل شبكة توزيع الكهرباء</Link>
            {isLoggedIn && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">مرحبًا، {userRole}</span>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="btn-danger"
                >
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        </nav>

        <main className="container mx-auto py-8">
          <Routes>
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <HomePage userRole={userRole} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isLoggedIn ? (
                  <DashboardPage userRole={userRole} setIsLoggedIn={setIsLoggedIn} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/isolation"
              element={
                isLoggedIn ? (
                  <IsolationForm />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/transformer"
              element={
                isLoggedIn ? (
                  <TransformerForm />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/records"
              element={
                isLoggedIn ? (
                  <RecordsPage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function HomePage({ userRole }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Link to="/dashboard" className="card">
        <CogIcon className="h-12 w-12 text-blue-600 mx-auto" />
        <h3 className="mt-4 text-xl font-semibold text-center">لوحة التحكم</h3>
        <p className="mt-2 text-gray-600 text-center">إدارة المعلومات الشخصية والمستخدمين</p>
      </Link>

      <Link to="/isolation" className="card">
        <DocumentAddIcon className="h-12 w-12 text-blue-600 mx-auto" />
        <h3 className="mt-4 text-xl font-semibold text-center">إضافة عزل</h3>
        <p className="mt-2 text-gray-600 text-center">إضافة عزل جديد وإدارة العزولات</p>
      </Link>

      <Link to="/transformer" className="card">
        <LightningBoltIcon className="h-12 w-12 text-blue-600 mx-auto" />
        <h3 className="mt-4 text-xl font-semibold text-center">تشغيل محول</h3>
        <p className="mt-2 text-gray-600 text-center">إضافة تشغيل محول وإدارة المحولات</p>
      </Link>

      <Link to="/records" className="card">
        <DocumentTextIcon className="h-12 w-12 text-blue-600 mx-auto" />
        <h3 className="mt-4 text-xl font-semibold text-center">السجلات</h3>
        <p className="mt-2 text-gray-600 text-center">عرض وتعديل وحذف السجلات</p>
      </Link>
    </div>
  );
}

export default App;
