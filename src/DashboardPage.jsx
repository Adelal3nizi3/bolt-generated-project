import React, { useState } from 'react';
    import { CogIcon, ArrowLeftIcon, UserAddIcon, UserRemoveIcon, LogoutIcon, DocumentDownloadIcon } from '@heroicons/react/outline';
    import { useNavigate } from 'react-router-dom';

    function DashboardPage({ userRole, setIsLoggedIn }) {
      const [userInfo, setUserInfo] = useState({
        name: 'محمد أحمد',
        employeeId: '12345',
        department: 'شبكة توزيع الكهرباء',
        jobTitle: 'مشغل شبكة',
        role: userRole
      });

      const [users, setUsers] = useState([
        { id: 1, name: 'محمد أحمد', role: 'مشغل', records: [] },
        { id: 2, name: 'علي محمود', role: 'مسؤول', records: [] }
      ]);

      const [editInfoMode, setEditInfoMode] = useState(false);
      const [editUserMode, setEditUserMode] = useState(false);
      const [selectedUser, setSelectedUser] = useState(null);
      const navigate = useNavigate();

      const handleSaveUserInfo = (updatedInfo) => {
        setUserInfo(updatedInfo);
        setEditInfoMode(false);
      };

      const handleSaveUser = (updatedUser) => {
        const updatedUsers = users.map(user =>
          user.id === updatedUser.id ? updatedUser : user
        );
        setUsers(updatedUsers);
        setEditUserMode(false);
        setSelectedUser(null);
      };

      const handleDeleteUser = (id) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
      };

      const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/login');
      };

      const handleExportUserRecords = (userId) => {
        const user = users.find(user => user.id === userId);
        const dataStr = JSON.stringify(user.records, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `user_${userId}_records.json`;
        link.click();
      };

      const handleExportAllRecords = () => {
        const allRecords = users.map(user => ({
          userId: user.id,
          records: user.records
        }));
        const dataStr = JSON.stringify(allRecords, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'all_users_records.json';
        link.click();
      };

      return (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="mr-2">رجوع</span>
          </button>

          <div className="flex items-center space-x-2 mb-4">
            <CogIcon className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold">لوحة التحكم</h2>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">المعلومات الشخصية</h3>
            {editInfoMode ? (
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveUserInfo(userInfo);
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">الاسم:</label>
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">الرقم الوظيفي:</label>
                  <input
                    type="text"
                    value={userInfo.employeeId}
                    onChange={(e) => setUserInfo({ ...userInfo, employeeId: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">القسم:</label>
                  <input
                    type="text"
                    value={userInfo.department}
                    onChange={(e) => setUserInfo({ ...userInfo, department: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">المسمى الوظيفي:</label>
                  <input
                    type="text"
                    value={userInfo.jobTitle}
                    onChange={(e) => setUserInfo({ ...userInfo, jobTitle: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">حفظ</button>
                  <button type="button" onClick={() => setEditInfoMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">إلغاء</button>
                </div>
              </form>
            ) : (
              <>
                <p className="text-gray-700"><strong>الاسم:</strong> {userInfo.name}</p>
                <p className="text-gray-700"><strong>الرقم الوظيفي:</strong> {userInfo.employeeId}</p>
                <p className="text-gray-700"><strong>القسم:</strong> {userInfo.department}</p>
                <p className="text-gray-700"><strong>المسمى الوظيفي:</strong> {userInfo.jobTitle}</p>
                <button onClick={() => setEditInfoMode(true)} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">تعديل المعلومات</button>
              </>
            )}
          </div>

          {userRole === 'مسؤول' && (
            <>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">إدارة المستخدمين</h3>
                <button
                  onClick={() => {
                    setSelectedUser({ id: Date.now(), name: '', role: '' });
                    setEditUserMode(true);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4"
                >
                  <UserAddIcon className="h-5 w-5 inline-block mr-2" />
                  إضافة مستخدم
                </button>

                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="p-4 border border-gray-200 rounded-lg">
                      <p className="text-gray-700"><strong>الاسم:</strong> {user.name}</p>
                      <p className="text-gray-700"><strong>الدور:</strong> {user.role}</p>
                      <div className="mt-2 space-x-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setEditUserMode(true);
                          }}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                          تعديل
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        >
                          <UserRemoveIcon className="h-5 w-5 inline-block mr-2" />
                          حذف
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {editUserMode && selectedUser && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
                      <h3 className="text-xl font-bold mb-4">{selectedUser.id ? 'تعديل مستخدم' : 'إضافة مستخدم'}</h3>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSaveUser(selectedUser);
                      }} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">الاسم:</label>
                          <input
                            type="text"
                            value={selectedUser.name}
                            onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">الدور:</label>
                          <select
                            value={selectedUser.role}
                            onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                          >
                            <option value="">اختر الدور</option>
                            <option value="مشغل">مشغل</option>
                            <option value="مسؤول">مسؤول</option>
                          </select>
                        </div>
                        <div className="flex space-x-2">
                          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">حفظ</button>
                          <button type="button" onClick={() => setEditUserMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">إلغاء</button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">سجلات المستخدمين</h3>
                <button
                  onClick={handleExportAllRecords}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4"
                >
                  <DocumentDownloadIcon className="h-5 w-5 inline-block mr-2" />
                  تصدير جميع السجلات
                </button>

                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="p-4 border border-gray-200 rounded-lg">
                      <p className="text-gray-700"><strong>الاسم:</strong> {user.name}</p>
                      <p className="text-gray-700"><strong>الدور:</strong> {user.role}</p>
                      <div className="mt-2 space-x-2">
                        <button
                          onClick={() => handleExportUserRecords(user.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                          <DocumentDownloadIcon className="h-5 w-5 inline-block mr-2" />
                          تصدير سجلات المستخدم
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
            <LogoutIcon className="h-5 w-5 inline-block mr-2" />
            تسجيل الخروج
          </button>
        </div>
      );
    }

    export default DashboardPage;
