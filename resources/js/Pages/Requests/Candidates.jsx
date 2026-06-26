import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Candidates({ auth, request, candidates }) {
    const canManage = auth.user.role === 'admin' || auth.user.role === 'manager';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-[#2D0094]">
                    Кандидаты по запросу: {request.position}
                </h2>
            }
        >
            <Head title="Кандидаты по запросу" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Верхняя панель */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">
                                Всего: {candidates.length}
                            </span>
                            <Link
                                href="/requests"
                                className="text-sm text-[#2D0094] hover:text-[#5B2BD4] font-medium transition-colors"
                            >
                                ← Назад
                            </Link>
                        </div>

                        {canManage && (
                            <Link
                                href="/candidates/create"
                                className="inline-flex items-center gap-2 bg-[#2D0094] hover:bg-[#5B2BD4] text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg shadow-purple-200 transition-all duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Загрузить резюме
                            </Link>
                        )}
                    </div>

                    {/* Карточки кандидатов */}
                    {candidates.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                            <div className="text-6xl mb-4">📭</div>
                            <h3 className="text-xl font-medium text-gray-700">Нет кандидатов</h3>
                            <p className="text-gray-400 mt-1">Загрузите резюме по этому запросу</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {candidates.map((candidate, index) => {
                                const score = candidate.match_score ?? 0;
                                const scoreColor = score >= 80 ? 'text-green-600 bg-green-50 border-green-200' :
                                                   score >= 50 ? 'text-yellow-600 bg-yellow-50 border-yellow-200' :
                                                   'text-red-600 bg-red-50 border-red-200';

                                return (
                                    <div
                                        key={candidate.id}
                                        className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-200 overflow-hidden group"
                                    >
                                        {/* Шапка */}
                                        <div className="p-5 pb-3 border-b border-gray-50">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-bold text-[#1A0033] truncate">
                                                        {candidate.name || `Кандидат #${candidate.id}`}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-sm text-gray-500">
                                                            🧠 {candidate.candidate_skills?.length || 0} навыков
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className={`text-lg font-bold px-3 py-1 rounded-xl border ${scoreColor}`}>
                                                    {score}%
                                                </div>
                                            </div>
                                        </div>

                                        {/* Тело */}
                                        <div className="px-5 py-3 bg-gray-50/50">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">
                                                    #{index + 1} по порядку
                                                </span>
                                                <span className={`text-sm font-medium ${
                                                    candidate.status === 'matched'
                                                        ? 'text-green-600'
                                                        : 'text-yellow-600'
                                                }`}>
                                                    {candidate.status === 'matched' ? '✅ Сверено' : '⏳ Не сверено'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Действия */}
                                        <div className="px-5 py-3 bg-white border-t border-gray-50">
                                            <Link
                                                href={`/candidates/${candidate.id}`}
                                                className="w-full inline-flex justify-center items-center gap-2 bg-[#2D0094] hover:bg-[#5B2BD4] text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                Просмотр
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}