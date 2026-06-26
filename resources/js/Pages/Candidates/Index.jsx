import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, candidates }) {
    const [search, setSearch] = useState('');
    const canManage = auth.user.role === 'admin' || auth.user.role === 'manager';

    const deleteCandidate = (id) => {
        if (confirm('Удалить кандидата? Это действие необратимо.')) {
            router.delete(`/candidates/${id}`);
        }
    };

    const filteredCandidates = candidates.filter((candidate) =>
        candidate.request?.position?.toLowerCase().includes(search.toLowerCase()) ||
        candidate.file_path?.toLowerCase().includes(search.toLowerCase()) ||
        candidate.status?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-[#2D0094]">Кандидаты</h2>}
        >
            <Head title="Кандидаты" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Верхняя панель */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Поиск по запросу, файлу, статусу..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full sm:w-80 rounded-xl border-gray-300 bg-white/80 px-4 py-2.5 pl-10 text-sm shadow-sm backdrop-blur focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                                />
                                <svg
                                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <span className="text-sm text-gray-500">
                                Найдено: {filteredCandidates.length}
                            </span>
                        </div>

                        {canManage && (
                            <Link
                                href="/candidates/create"
                                className="inline-flex items-center gap-2 bg-[#2D0094] hover:bg-[#5B2BD4] text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-200 transition-all duration-200"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Загрузить резюме
                            </Link>
                        )}
                    </div>

                    {/* Карточки кандидатов */}
                    {filteredCandidates.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                            <div className="text-6xl mb-4">📭</div>
                            <h3 className="text-xl font-medium text-gray-700">Нет кандидатов</h3>
                            <p className="text-gray-400 mt-1">Загрузите первое резюме, чтобы начать работу</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {filteredCandidates.map((candidate) => {
                                const statusColor = candidate.status === 'matched'
                                    ? 'text-green-600 bg-green-50 border-green-200'
                                    : candidate.status === 'processed'
                                    ? 'text-blue-600 bg-blue-50 border-blue-200'
                                    : 'text-yellow-600 bg-yellow-50 border-yellow-200';

                                const statusLabel = candidate.status === 'matched'
                                    ? '✅ Сверено'
                                    : candidate.status === 'processed'
                                    ? '🔄 Обработано'
                                    : '⏳ Загружено';

                                return (
                                    <div
                                        key={candidate.id}
                                        className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-200 overflow-hidden group"
                                    >
                                        <div className="p-5 pb-3 border-b border-gray-50">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-bold text-[#1A0033] truncate">
                                                        {candidate.request?.position || 'Без запроса'}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                        <span className="text-sm text-gray-500">
                                                            📄 {candidate.file_path?.split('/').pop()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className={`text-xs font-medium px-3 py-1 rounded-full border ${statusColor}`}>
                                                    {statusLabel}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="px-5 py-3 bg-gray-50/50">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">
                                                    🧠 {candidate.skills?.length || 0} навыков
                                                </span>
                                                {candidate.match_score !== null && (
                                                    <span className={`font-bold ${candidate.match_score >= 80 ? 'text-green-600' : candidate.match_score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                        {candidate.match_score}%
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="px-5 py-3 bg-white border-t border-gray-50 flex items-center justify-between gap-2">
                                            <Link
                                                href={`/candidates/${candidate.id}`}
                                                className="flex-1 inline-flex justify-center items-center gap-2 bg-[#2D0094] hover:bg-[#5B2BD4] text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                Просмотр
                                            </Link>

                                            {auth.user.role === 'admin' && (
                                                <button
                                                    onClick={() => deleteCandidate(candidate.id)}
                                                    className="text-red-500 hover:text-red-700 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors"
                                                    title="Удалить"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            )}
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