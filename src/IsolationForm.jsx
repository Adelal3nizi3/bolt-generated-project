import React, { useState } from 'react';
    import { ArrowLeftIcon } from '@heroicons/react/outline';
    import { useNavigate } from 'react-router-dom';

    function IsolationForm() {
      const [isolation, setIsolation] = useState({
        isIssuer: false,
        permitNumber: '',
        permitImage: null,
        date: new Date().toISOString().split('T')[0],
        isolationTime: '',
        restorationTime: '',
        isRestored: false,
        type: '',
        customType: '',
        reason: '',
        parties: '',
        closures: '',
        hasNotes: false,
        notes: '',
        workers: ''
      });

      const navigate = useNavigate();

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Isolation Data:', isolation);
        alert('تم إضافة العزل بنجاح');
      };

      return (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="mr-2">رجوع</span>
          </button>

          <h2 className="text-2xl font-bold mb-4">إضافة عزل جديد</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                هل أنت مصدر التصريح؟
                <input
                  type="checkbox"
                  checked={isolation.isIssuer}
                  onChange={(e) => setIsolation({ ...isolation, isIssuer: e.target.checked })}
                  className="ml-2"
                />
              </label>
            </div>

            {isolation.isIssuer && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">رقم التصريح:</label>
                  <input
                    type="text"
                    value={isolation.permitNumber}
                    onChange={(e) => setIsolation({ ...isolation, permitNumber: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">صورة التصريح:</label>
                  <input
                    type="file"
                    onChange={(e) => setIsolation({ ...isolation, permitImage: e.target.files[0] })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">التاريخ:</label>
              <input
                type="date"
                value={isolation.date}
                onChange={(e) => setIsolation({ ...isolation, date: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">وقت العزل:</label>
              <input
                type="time"
                value={isolation.isolationTime}
                onChange={(e) => setIsolation({ ...isolation, isolationTime: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                لم يتم الإعادة
                <input
                  type="checkbox"
                  checked={isolation.isRestored}
                  onChange={(e) => setIsolation({ ...isolation, isRestored: e.target.checked })}
                  className="ml-2"
                />
              </label>
            </div>

            {!isolation.isRestored && (
              <div>
                <label className="block text-sm font-medium text-gray-700">وقت الإعادة:</label>
                <input
                  type="time"
                  value={isolation.restorationTime}
                  onChange={(e) => setIsolation({ ...isolation, restorationTime: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">نوع العزل:</label>
              <select
                value={isolation.type}
                onChange={(e) => setIsolation({ ...isolation, type: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              >
                <option value="">اختر نوع العزل</option>
                <option value="مجدول">مجدول</option>
                <option value="طارئ">طارئ</option>
                <option value="صيانة">صيانة</option>
                <option value="اخر">أخر</option>
              </select>
            </div>

            {isolation.type === 'اخر' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">نوع العزل (مخصص):</label>
                <input
                  type="text"
                  value={isolation.customType}
                  onChange={(e) => setIsolation({ ...isolation, customType: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">سبب العزل:</label>
              <textarea
                value={isolation.reason}
                onChange={(e) => setIsolation({ ...isolation, reason: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">الأطراف:</label>
              <input
                type="text"
                value={isolation.parties}
                onChange={(e) => setIsolation({ ...isolation, parties: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">الإقفال:</label>
              <input
                type="text"
                value={isolation.closures}
                onChange={(e) => setIsolation({ ...isolation, closures: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                هل يوجد ملاحظات؟
                <input
                  type="checkbox"
                  checked={isolation.hasNotes}
                  onChange={(e) => setIsolation({ ...isolation, hasNotes: e.target.checked })}
                  className="ml-2"
                />
              </label>
            </div>

            {isolation.hasNotes && (
              <div>
                <label className="block text-sm font-medium text-gray-700">الملاحظات:</label>
                <textarea
                  value={isolation.notes}
                  onChange={(e) => setIsolation({ ...isolation, notes: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">القائمين بالعمل:</label>
              <input
                type="text"
                value={isolation.workers}
                onChange={(e) => setIsolation({ ...isolation, workers: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">إضافة العزل</button>
          </form>
        </div>
      );
    }

    export default IsolationForm;
