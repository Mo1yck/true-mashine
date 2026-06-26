import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';

export default function Show({ auth, candidate }) {
    const runMatch = () => {
        if (confirm('Запустить сверку этого кандидата?')) {
            router.post(`/candidates/${candidate.id}/match`);
        }
    };

    const deleteCandidate = () => {
        if (confirm('Удалить кандидата? Это действие необратимо.')) {
            router.delete(`/candidates/${candidate.id}`);
        }
    };

    const assessment = candidate.assessment;
    const isDirectorOrAdmin = auth.user.role === 'director' || auth.user.role === 'admin';
    const isAdmin = auth.user.role === 'admin';
    const canManage = auth.user.role === 'admin' || auth.user.role === 'manager';

    const score = assessment?.total_score ?? 0;
    const scoreColor = score >= 80 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-[#2D0094]">Кандидат #{candidate.id}</h2>}
        >
            <Head title="Кандидат" />

            <div className="py-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                        {/* Шапка */}
                        <div className="bg-gradient-to-r from-[#2D0094] to-[#5B2BD4] px-6 py-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-xl font-bold text-white">
                                        Кандидат #{candidate.id}
                                    </h1>
                                    <p className="text-white/80 text-sm mt-1">
                                        Запрос: {candidate.request?.position || 'Не указан'}
                                    </p>
                                </div>
                                {assessment && (
                                    <div className="text-right">
                                        <div className={`text-3xl font-bold text-white ${scoreColor}`}>
                                            {score}%
                                        </div>
                                        <div className="text-white/70 text-xs">Покрытие</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Тело */}
                        <div className="p-6 space-y-6">
                            {/* Информация о файле */}
                            <div className="flex items-center gap-4 text-sm text-gray-500 bg-gray-50 rounded-xl px-4 py-3">
                                <span>📄</span>
                                <span className="font-medium text-gray-700">Файл:</span>
                                <span>{candidate.file_path?.split('/').pop()}</span>
                                <span className="text-gray-300">|</span>
                                <span>Статус: <span className="font-medium text-[#2D0094]">{candidate.status}</span></span>
                            </div>

                            {/* Навыки */}
                            <div>
                                <h3 className="text-sm font-semibold text-[#1A0033] uppercase tracking-wider mb-3">
                                    🧠 Найденные навыки
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {candidate.candidate_skills?.length > 0 ? (
                                        candidate.candidate_skills.map((skill) => (
                                            <span
                                                key={skill.id}
                                                className="bg-purple-100 text-[#2D0094] px-3 py-1.5 rounded-xl text-sm font-medium"
                                            >
                                                {skill.technology?.name || 'Неизвестно'}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400">Навыки не найдены</span>
                                    )}
                                </div>
                            </div>

                            {/* Кнопки действий */}
                            <div className="flex flex-wrap gap-3 pt-2">
                                {canManage && (
                                    <button
                                        onClick={runMatch}
                                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
                                    >
                                        🚀 Запустить сверку
                                    </button>
                                )}

                                {isDirectorOrAdmin && (
                                    <button
                                        onClick={() => window.location.href = `/report/candidate/${candidate.id}`}
                                        className="inline-flex items-center gap-2 bg-[#2D0094] hover:bg-[#5B2BD4] text-white px-5 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
                                    >
                                        📄 Скачать отчёт PDF
                                    </button>
                                )}

                                {isAdmin && (
                                    <button
                                        onClick={deleteCandidate}
                                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
                                    >
                                        🗑️ Удалить кандидата
                                    </button>
                                )}
                            </div>

                            {/* Результаты сверки */}
                            {assessment && (
                                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                    <h3 className="font-bold text-[#1A0033] text-lg mb-3">📊 Результат сверки</h3>

                                    <div className="grid grid-cols-3 gap-3 mb-4">
                                        <div className="bg-white p-3 rounded-xl shadow-sm text-center">
                                            <p className="text-xs text-gray-500 uppercase">Общий %</p>
                                            <p className="text-2xl font-bold text-blue-600">
                                                {assessment.total_score ?? 0}%
                                            </p>
                                        </div>
                                        <div className="bg-white p-3 rounded-xl shadow-sm text-center">
                                            <p className="text-xs text-gray-500 uppercase">Must have</p>
                                            <p className="text-2xl font-bold text-orange-600">
                                                {assessment.must_have_score ?? 0}%
                                            </p>
                                        </div>
                                        <div className="bg-white p-3 rounded-xl shadow-sm text-center">
                                            <p className="text-xs text-gray-500 uppercase">Nice to have</p>
                                            <p className="text-2xl font-bold text-green-600">
                                                {assessment.nice_to_have_score ?? 0}%
                                            </p>
                                        </div>
                                    </div>

                                    <div className={`text-sm font-semibold mb-3 ${assessment.is_fully_matched ? 'text-green-600' : 'text-red-600'}`}>
                                        {assessment.is_fully_matched
                                            ? '✅ Все обязательные требования закрыты'
                                            : '❌ Есть не закрытые обязательные требования'}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="font-semibold text-green-700 mb-1">✅ Закрытые:</p>
                                            {assessment.matched_requirements?.length > 0 ? (
                                                <ul className="list-disc list-inside text-gray-600 space-y-0.5">
                                                    {assessment.matched_requirements.map((req, idx) => (
                                                        <li key={idx}>
                                                            {req.technology_name} ({req.type}) — вес {req.weight}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-gray-400">—</p>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-red-700 mb-1">❌ Отсутствующие:</p>
                                            {assessment.missing_requirements?.length > 0 ? (
                                                <ul className="list-disc list-inside text-gray-600 space-y-0.5">
                                                    {assessment.missing_requirements.map((req, idx) => (
                                                        <li key={idx}>
                                                            {req.technology_name} ({req.type}) — вес {req.weight}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-gray-400">—</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Распознанный текст */}
                            <div>
                                <h3 className="text-sm font-semibold text-[#1A0033] uppercase tracking-wider mb-2">
                                    📄 Распознанный текст
                                </h3>
                                <div className="bg-gray-50 rounded-xl p-4 max-h-64 overflow-y-auto border border-gray-100">
                                    <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans">
                                        {candidate.extracted_text || 'Текст не распознан'}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}