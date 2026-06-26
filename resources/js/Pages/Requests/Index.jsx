import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, requests }) {
    const statusColors = {
        draft: 'bg-gray-200',
        active: 'bg-green-200',
        closed: 'bg-red-200',
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold">Запросы</h2>}
        >
            <Head title="Запросы" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <Link
                                href="/requests/create"
                                className="inline-block bg-blue-500 text-white px-4 py-2 rounded mb-4"
                            >
                                + Создать запрос
                            </Link>

                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-2">ID</th>
                                        <th className="text-left p-2">Должность</th>
                                        <th className="text-left p-2">Грейд</th>
                                        <th className="text-left p-2">Локация</th>
                                        <th className="text-left p-2">Статус</th>
                                        <th className="text-left p-2">Требований</th>
                                        <th className="text-left p-2">Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((req) => (
                                        <tr key={req.id} className="border-b">
                                            <td className="p-2">{req.id}</td>
                                            <td className="p-2">{req.position}</td>
                                            <td className="p-2">{req.grade || '-'}</td>
                                            <td className="p-2">{req.location || '-'}</td>
                                            <td className="p-2">
                                                <span className={`px-2 py-1 rounded text-sm ${statusColors[req.status]}`}>
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className="p-2">{req.requirements?.length || 0}</td>
                                            <td className="p-2">
                                                <Link href={`/requests/${req.id}`} className="text-blue-600 mr-2">
                                                    Просмотр
                                                </Link>
                                                <Link href={`/requests/${req.id}/edit`} className="text-green-600 mr-2">
                                                    Редактировать
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}