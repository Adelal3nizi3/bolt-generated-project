import React, { useState } from 'react';
    import { ArrowLeftIcon } from '@heroicons/react/outline';
    import { useNavigate } from 'react-router-dom';

    function TransformerForm() {
      const [transformer, setTransformer] = useState({
        date: new Date().toISOString().split('T')[0],
        disconnectionTime: '',
        hasDisconnectionTime: false,
        operationTime: '',
        type: '',
        number: '',
        reason: '',
        hasFuseChange: false,
        fuseAmpere: '',
        fuseCount: '',
        hasNotes: false,
        notes: '',
        workers: ''
      });

      const navigate = useNavigate();

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Transformer Data:', transformer);
        alert('تم إضافة تشغيل المحول بنجاح');
      };

      return (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="mr-2">رجوع</span>
          </button>

          <h2 className="text-2xl font-bold mb-4">تشغيل محول</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">التاريخ:</label>
              <input
                type="date"
                value={transformer.date}
                onChange={(e) => setTransformer({ ...transformer, date: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                لا يوجد وقت محدد للفصل
                <input
                  type="checkbox"
                  checked={transformer.hasDisconnectionTime}
                  onChange={(e) => setTransformer({ ...transformer, hasDisconnectionTime: e.target.checked })}
                  className="ml-2"
                />
              </label>
            </div>

            {!transformer.hasDisconnectionTime && (
              <div>
                <label className="block text-sm font-medium text-gray-700">وقت الفصل:</label>
                <input
                  type="time"
                  value={transformer.disconnectionTime}
                  onChange={(e) => setTransformer({ ...transformer, disconnectionTime: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">وقت التشغيل:</label>
              <input
                type="time"
                value={transformer.operationTime}
                onChange={(e) => setTransformer({ ...transformer, operationTime: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">نوع المحول:</label>
              <select
                value={transformer.type}
                onChange={(e) => setTransformer({ ...transformer, type: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              >
                <option value="">اختر نوع المحول</option>
                <option value="هوائي">هوائي</option>
                <option value="أرضي">أرضي</option>
                <option value="أرضي من شبكة هوائية">أرضي من شبكة هوائية</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">رقم المحول:</label>
              <input
                type="text"
                value={transformer.number}
                onChange={(e) => setTransformer({ ...transformer, number: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">السبب:</label>
              <textarea
                value={transformer.reason}
                onChange={(e) => setTransformer({ ...transformer, reason: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                هل تم تغيير الفيوز؟
                <input
                  type="checkbox"
                  checked={transformer.hasFuseChange}
                  onChange={(e) => setTransformer({ ...transformer, hasFuseChange: e.target.checked })}
                  className="ml-2"
                />
              </label>
            </div>

            {transformer.hasFuseChange && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">الامبير:</label>
                  <input
                    type="text"
                    value={transformer.fuseAmpere}
                    onChange={(e) => setTransformer({ ...transformer, fuseAmpere: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">العدد:</label>
                  <input
                    type="number"
                    value={transformer.fuseCount}
                    onChange={(e) => setTransformer({ ...transformer, fuseCount: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                هل يوجد ملاحظات؟
                <input
                  type="checkbox"
                  checked={transformer.hasNotes}
                  onChange={(e) => setTransformer({ ...transformer, hasNotes: e.target.checked })}
                  className="ml-2"
                />
              </label>
            </div>

            {transformer.hasNotes && (
              <div>
                <label className="block text-sm font-medium text-gray-700">الملاحظات:</label>
                <textarea
                  value={transformer.notes}
                  onChange={(e) => setTransformer({ ...transformer, notes: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">القائمين بالعمل:</label>
              <input
                type="text"
                value={transformer.workers}
                onChange={(e) => setTransformer({ ...transformer, workers: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">إضافة تشغيل المحول</button>
          </form>
        </div>
      );
    }

    export default TransformerForm;
