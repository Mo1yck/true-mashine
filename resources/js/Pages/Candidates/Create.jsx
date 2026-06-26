import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ auth, requests }) {
    const { data, setData, post, processing, errors } = useForm({
        request_id: '',
        file: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/candidates');
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold">Загрузить резюме</h2>}
        >
            <Head title="Загрузить резюме" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-4 max-w-md">
                                <div>
                                    <label className="block font-medium">Запрос</label>
                                    <select
                                        value={data.request_id}
                                        onChange={(e) => setData('request_id', e.target.value)}
                                        className="w-full border rounded px-3 py-2"
                                    >
                                        <option value="">Выберите запрос</option>
                                        {requests.map((req) => (
                                            <option key={req.id} value={req.id}>
                                                {req.position} ({req.grade})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.request_id && <div className="text-red-500 text-sm">{errors.request_id}</div>}
                                </div>

                                <div>
                                    <label className="block font-medium">Файл резюме (PDF/DOCX)</label>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => setData('file', e.target.files[0])}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.file && <div className="text-red-500 text-sm">{errors.file}</div>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Загрузить и обработать
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}