import React, { useState, useEffect } from 'react';
    import { ArrowLeftIcon } from '@heroicons/react/outline';
    import { useNavigate } from 'react-router-dom';

    function RecordsPage() {
      const [records, setRecords] = useState([]);
      const [selectedRecord, setSelectedRecord] = useState(null);
      const [editMode, setEditMode] = useState(false);
      const navigate = useNavigate();

      useEffect(() => {
        const savedRecords = JSON.parse(localStorage.getItem('records') || '[]');
        setRecords(savedRecords);
      }, []);

      const saveRecords = (updatedRecords) => {
        localStorage.setItem('records', JSON.stringify(updatedRecords));
        setRecords(updatedRecords);
      };

      const handleEdit = (record) => {
        setSelectedRecord(record);
        setEditMode(true);
      };

      const handleDelete = (id) => {
        const updatedRecords = records.filter(record => record.id !== id);
        saveRecords(updatedRecords);
      };

      const handleExport = () => {
        const dataStr = JSON.stringify(records, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'records.json';
        link.click();
      };

      const handleSave = (updatedRecord) => {
        const updatedRecords = records.map(record =>
          record.id === updatedRecord.id ? updatedRecord : record
        );
        saveRecords(updatedRecords);
        setEditMode(false);
        setSelectedRecord(null);
      };

      return (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="mr-2">رجوع</span>
          </button>

          <h2 className="text-2xl font-bold mb-4">سجلات العزل وتشغيل المحولات</h2>

          <button onClick={handleExport} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4">
            تصدير السجلات
          </button>

          <div className="space-y-4">
            {records.map((record) => (
              <div key={record.id} className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold">{record.type === 'عزل' ? 'عزل' : 'تشغيل محول'}</h3>
                <p className="text-gray-700"><strong>التاريخ:</strong> {record.date}</p>
                <p className="text-gray-700"><strong>السبب:</strong> {record.reason}</p>
                <p className="text-gray-700"><strong>القائمين بالعمل:</strong> {record.workers}</p>

                <div className="mt-2 space-x-2">
                  <button onClick={() => handleEdit(record)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">تعديل</button>
                  <button onClick={() => handleDelete(record.id)} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">حذف</button>
                </div>
              </div>
            ))}
          </div>

          {editMode && selectedRecord && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
                <h3 className="text-xl font-bold mb-4">تعديل السجل</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSave(selectedRecord);
                }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">التاريخ:</label>
                    <input
                      type="date"
                      value={selectedRecord.date}
                      onChange={(e) => setSelectedRecord({ ...selectedRecord, date: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">السبب:</label>
                    <textarea
                      value={selectedRecord.reason}
                      onChange={(e) => setSelectedRecord({ ...selectedRecord, reason: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">القائمين بالعمل:</label>
                    <input
                      type="text"
                      value={selectedRecord.workers}
                      onChange={(e) => setSelectedRecord({ ...selectedRecord, workers: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    />
                  </div>

                  <div className="flex space-x-2">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">حفظ التعديلات</button>
                    <button type="button" onClick={() => setEditMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">إلغاء</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      );
    }

    export default RecordsPage;
