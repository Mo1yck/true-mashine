import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, requests }) {
    const canManage = auth.user.role === 'admin' || auth.user.role === 'manager';
    const [search, setSearch] = useState('');

    const deleteRequest = (id) => {
        if (confirm('Удалить запрос? Это действие необратимо.')) {
            router.delete(`/requests/${id}`);
        }
    };

    const filteredRequests = requests.filter((req) =>
        req.position.toLowerCase().includes(search.toLowerCase()) ||
        req.grade?.toLowerCase().includes(search.toLowerCase()) ||
        req.location?.toLowerCase().includes(search.toLowerCase())
    );

    const statusColors = {
        draft: 'bg-gray-100 text-gray-700',
        active: 'bg-green-100 text-green-700',
        closed: 'bg-red-100 text-red-700',
    };

    const statusLabels = {
        draft: 'Черновик',
        active: 'Активен',
        closed: 'Закрыт',
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-[#2D0094]">Запросы</h2>}
        >
            <Head title="Запросы" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Верхняя панель */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            {/* Поиск */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Поиск по должности, грейду, локации..."
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
                                Найдено: {filteredRequests.length}
                            </span>
                        </div>

                        {canManage && (
                            <Link
                                href="/requests/create"
                                className="inline-flex items-center gap-2 bg-[#2D0094] hover:bg-[#5B2BD4] text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-200 transition-all duration-200"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Создать запрос
                            </Link>
                        )}
                    </div>

                    {/* Карточки запросов */}
                    {filteredRequests.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📋</div>
                            <h3 className="text-xl font-medium text-gray-700">Нет запросов</h3>
                            <p className="text-gray-400 mt-1">Создайте первый запрос, чтобы начать работу</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {filteredRequests.map((req) => (
                                <div
                                    key={req.id}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-200 overflow-hidden group"
                                >
                                    {/* Шапка карточки */}
                                    <div className="p-5 pb-3 border-b border-gray-50">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-bold text-[#1A0033] truncate">
                                                    {req.position}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                    {req.grade && (
                                                        <span className="text-sm text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                                                            {req.grade}
                                                        </span>
                                                    )}
                                                    {req.location && (
                                                        <span className="text-sm text-gray-400">
                                                            📍 {req.location}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[req.status]}`}>
                                                {statusLabels[req.status]}
                                            </span>
                                        </div>
                                        {req.description && (
                                            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                                {req.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Тело карточки */}
                                    <div className="px-5 py-3 bg-gray-50/50">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-4">
                                                <span className="text-gray-500">
                                                    📌 {req.requirements?.length || 0} требований
                                                </span>
                                                <span className="text-gray-400">•</span>
                                                <span className="text-gray-500">
                                                     {req.created_by?.name || '—'}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-400">
                                                {new Date(req.created_at).toLocaleDateString('ru-RU')}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Действия */}
                                    <div className="px-5 py-3 bg-white border-t border-gray-50">
    <div className="flex flex-wrap items-center justify-center gap-1.5">
        <Link
            href={`/requests/${req.id}`}
            className="text-sm text-[#2D0094] hover:text-[#5B2BD4] font-medium px-3 py-1.5 rounded-lg hover:bg-purple-50 transition-colors"
        >
            Просмотр
        </Link>

        {canManage && (
            <>
                <Link
                    href={`/requests/${req.id}/edit`}
                    className="text-sm text-gray-600 hover:text-[#2D0094] px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    Редактировать
                </Link>
                <button
                    onClick={() => deleteRequest(req.id)}
                    className="text-sm text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                >
                    Удалить
                </button>
            </>
        )}

        <Link
            href={`/requests/${req.id}/candidates`}
            className="text-sm text-purple-600 hover:text-purple-800 font-medium px-3 py-1.5 rounded-lg hover:bg-purple-50 transition-colors"
        >
            👥 Кандидаты
        </Link>
    </div>
</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}