import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth, requests }) {
    const [fileName, setFileName] = useState('');
    const { data, setData, post, processing, errors } = useForm({
        request_id: '',
        file: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/candidates');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            setData('file', file);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-[#2D0094]">Загрузить резюме</h2>}
        >
            <Head title="Загрузить резюме" />

            <div className="py-8">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Выбор запроса */}
                            <div>
                                <label className="block text-sm font-medium text-[#1A0033] mb-1">
                                    Запрос <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.request_id}
                                    onChange={(e) => setData('request_id', e.target.value)}
                                    className="w-full rounded-xl border-gray-300 px-4 py-2.5 focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                                >
                                    <option value="">Выберите запрос</option>
                                    {requests.map((req) => (
                                        <option key={req.id} value={req.id}>
                                            {req.position} {req.grade ? `(${req.grade})` : ''}
                                        </option>
                                    ))}
                                </select>
                                {errors.request_id && <div className="text-red-500 text-sm mt-1">{errors.request_id}</div>}
                            </div>

                            {/* Загрузка файла */}
                            <div>
                                <label className="block text-sm font-medium text-[#1A0033] mb-1">
                                    Файл резюме <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                                                data.file
                                                    ? 'border-green-400 bg-green-50'
                                                    : 'border-gray-300 hover:border-[#2D0094] hover:bg-purple-50/30'
                                            }`}
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg
                                                    className={`w-8 h-8 mb-2 ${
                                                        data.file ? 'text-green-500' : 'text-gray-400'
                                                    }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                    />
                                                </svg>
                                                <p className="text-sm text-gray-500">
                                                    {data.file ? (
                                                        <span className="font-medium text-green-600">
                                                            ✅ {fileName}
                                                        </span>
                                                    ) : (
                                                        <>
                                                            <span className="font-medium">Нажмите для загрузки</span>
                                                            <br />
                                                            <span className="text-xs">PDF, DOCX (до 15 МБ)</span>
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </div>
                                </div>
                                {errors.file && <div className="text-red-500 text-sm mt-1">{errors.file}</div>}
                            </div>

                            {/* Подсказка */}
                            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                <div className="flex items-start gap-3">
                                    <span className="text-blue-500 text-lg">💡</span>
                                    <div>
                                        <p className="text-sm text-blue-800 font-medium">Поддерживаемые форматы</p>
                                        <p className="text-sm text-blue-600">
                                            PDF и DOCX. Система автоматически распознает навыки и технологии из резюме.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Кнопки */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                <Link
                                    href="/candidates"
                                    className="px-5 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                    Отмена
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing || !data.request_id || !data.file}
                                    className="bg-[#2D0094] hover:bg-[#5B2BD4] text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Загрузка...' : 'Загрузить и обработать'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}