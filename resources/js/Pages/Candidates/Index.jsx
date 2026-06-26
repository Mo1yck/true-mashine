import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, candidates }) {
    const deleteCandidate = (id) => {
        if (confirm('Удалить кандидата? Это действие необратимо.')) {
            router.delete(`/candidates/${id}`);
        }
    };

    const canManage = auth.user.role === 'admin' || auth.user.role === 'manager';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold">Кандидаты</h2>}
        >
            <Head title="Кандидаты" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {canManage && (
                                <Link
                                    href="/candidates/create"
                                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded mb-4"
                                >
                                    + Загрузить резюме
                                </Link>
                            )}

                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-2">ID</th>
                                        <th className="text-left p-2">Запрос</th>
                                        <th className="text-left p-2">Файл</th>
                                        <th className="text-left p-2">Навыков</th>
                                        <th className="text-left p-2">Статус</th>
                                        <th className="text-left p-2">Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {candidates.map((candidate) => (
                                        <tr key={candidate.id} className="border-b">
                                            <td className="p-2">{candidate.id}</td>
                                            <td className="p-2">{candidate.request?.position || '-'}</td>
                                            <td className="p-2">{candidate.file_path}</td>
                                            <td className="p-2">{candidate.skills?.length || 0}</td>
                                            <td className="p-2">{candidate.status}</td>
                                            <td className="p-2">
                                                <Link
                                                    href={`/candidates/${candidate.id}`}
                                                    className="text-blue-600 mr-2"
                                                >
                                                    Просмотр
                                                </Link>

                                                {auth.user.role === 'admin' && (
                                                    <button
                                                        onClick={() => deleteCandidate(candidate.id)}
                                                        className="text-red-600 hover:underline"
                                                    >
                                                        Удалить
                                                    </button>
                                                )}
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