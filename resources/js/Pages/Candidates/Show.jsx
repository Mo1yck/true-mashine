import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Show({ auth, candidate }) {
    const runMatch = () => {
        if (confirm('Запустить сверку этого кандидата?')) {
            router.post(`/candidates/${candidate.id}/match`);
        }
    };

    const assessment = candidate.assessment;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold">Кандидат #{candidate.id}</h2>}
        >
            <Head title="Кандидат" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="space-y-4">
                                {/* Запрос */}
                                <div>
                                    <h3 className="font-bold">Запрос</h3>
                                    <p>{candidate.request?.position || 'Не указан'}</p>
                                </div>

                                {/* Файл */}
                                <div>
                                    <h3 className="font-bold">Файл</h3>
                                    <p>{candidate.file_path}</p>
                                </div>

                                {/* Навыки */}
                                <div>
                                    <h3 className="font-bold">Найденные навыки</h3>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {candidate.candidate_skills?.length > 0 ? (
                                            candidate.candidate_skills.map((skill) => (
                                                <span key={skill.id} className="bg-blue-100 px-3 py-1 rounded">
                                                    {skill.technology?.name || 'Неизвестно'}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-500">Навыки не найдены</span>
                                        )}
                                    </div>
                                </div>

                                {/* Кнопка сверки */}
                                <div>
                                    <button
                                        onClick={runMatch}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        🚀 Запустить сверку
                                    </button>
                                </div>

                                {/* Результаты сверки */}
                                {assessment && (
                                    <div className="mt-4 p-4 border rounded bg-gray-50">
                                        <h3 className="font-bold text-lg mb-2">Результат сверки</h3>
                                        
                                        <div className="grid grid-cols-3 gap-4 mb-4">
                                            <div className="bg-white p-3 rounded shadow">
                                                <p className="text-sm text-gray-500">Общий %</p>
                                                <p className="text-2xl font-bold text-blue-600">
                                                    {assessment.total_score ?? 0}%
                                                </p>
                                            </div>
                                            <div className="bg-white p-3 rounded shadow">
                                                <p className="text-sm text-gray-500">Must have</p>
                                                <p className="text-2xl font-bold text-orange-600">
                                                    {assessment.must_have_score ?? 0}%
                                                </p>
                                            </div>
                                            <div className="bg-white p-3 rounded shadow">
                                                <p className="text-sm text-gray-500">Nice to have</p>
                                                <p className="text-2xl font-bold text-green-600">
                                                    {assessment.nice_to_have_score ?? 0}%
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mb-2">
                                            {assessment.is_fully_matched ? (
                                                <p className="text-green-600 font-semibold">
                                                    ✅ Все обязательные требования закрыты
                                                </p>
                                            ) : (
                                                <p className="text-red-600 font-semibold">
                                                    ❌ Есть не закрытые обязательные требования
                                                </p>
                                            )}
                                        </div>

                                        {/* Закрытые требования */}
                                        {assessment.matched_requirements?.length > 0 && (
                                            <div className="mb-2">
                                                <p className="font-semibold text-green-700">✅ Закрытые требования:</p>
                                                <ul className="list-disc list-inside">
                                                    {assessment.matched_requirements.map((req, idx) => (
                                                        <li key={idx}>
                                                            {req.technology_name} ({req.type}) — вес {req.weight}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Отсутствующие требования */}
                                        {assessment.missing_requirements?.length > 0 && (
                                            <div>
                                                <p className="font-semibold text-red-700">❌ Отсутствующие требования:</p>
                                                <ul className="list-disc list-inside">
                                                    {assessment.missing_requirements.map((req, idx) => (
                                                        <li key={idx}>
                                                            {req.technology_name} ({req.type}) — вес {req.weight}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Распознанный текст */}
                                <div>
                                    <h3 className="font-bold">Распознанный текст</h3>
                                    <div className="bg-gray-100 p-4 rounded max-h-96 overflow-y-auto">
                                        <pre className="whitespace-pre-wrap">{candidate.extracted_text || 'Текст не распознан'}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}