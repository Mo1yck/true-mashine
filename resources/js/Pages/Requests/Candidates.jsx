import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Candidates({ auth, request, candidates }) {
    const canManage = auth.user.role === 'admin' || auth.user.role === 'manager';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold">
                    Кандидаты по запросу: {request.position}
                </h2>
            }
        >
            <Head title="Кандидаты по запросу" />

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

                            {candidates.length === 0 ? (
                                <p className="text-gray-500">Нет кандидатов по этому запросу</p>
                            ) : (
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-2">#</th>
                                            <th className="text-left p-2">Кандидат</th>
                                            <th className="text-left p-2">Навыков</th>
                                            <th className="text-left p-2">Покрытие</th>
                                            <th className="text-left p-2">Статус</th>
                                            <th className="text-left p-2">Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {candidates.map((candidate, index) => (
                                            <tr key={candidate.id} className="border-b">
                                                <td className="p-2">{index + 1}</td>
                                                <td className="p-2">
                                                    {candidate.name || `Кандидат #${candidate.id}`}
                                                </td>
                                                <td className="p-2">
                                                    {candidate.candidate_skills?.length || 0}
                                                </td>
                                                <td className="p-2">
                                                    <span className={`font-bold ${candidate.match_score >= 80 ? 'text-green-600' : candidate.match_score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                        {candidate.match_score ?? 0}%
                                                    </span>
                                                </td>
                                                <td className="p-2">
                                                    {candidate.status === 'matched' ? (
                                                        <span className="text-green-600">✅ Сверено</span>
                                                    ) : (
                                                        <span className="text-yellow-600">⏳ Не сверено</span>
                                                    )}
                                                </td>
                                                <td className="p-2">
                                                    <Link
                                                        href={`/candidates/${candidate.id}`}
                                                        className="text-blue-600"
                                                    >
                                                        Просмотр
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}