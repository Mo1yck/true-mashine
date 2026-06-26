import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, request }) {
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
            header={<h2 className="text-xl font-semibold text-[#2D0094]">Запрос #{request.id}</h2>}
        >
            <Head title={`Запрос ${request.position}`} />

            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    {/* Карточка */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                        {/* Шапка */}
                        <div className="bg-gradient-to-r from-[#2D0094] to-[#5B2BD4] px-6 py-5">
                            <div className="flex items-center justify-between">
                                <h1 className="text-xl font-bold text-white">
                                    {request.position}
                                </h1>
                                <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[request.status]}`}>
                                    {statusLabels[request.status]}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-2 text-white/80 text-sm">
                                {request.grade && <span>🎯 {request.grade}</span>}
                                {request.location && <span>📍 {request.location}</span>}
                                {request.citizenship && <span>🛂 {request.citizenship}</span>}
                                {request.release_date && <span>📅 {new Date(request.release_date).toLocaleDateString('ru-RU')}</span>}
                            </div>
                        </div>

                        {/* Тело */}
                        <div className="p-6 space-y-6">
                            {/* Описание */}
                            {request.description && (
                                <div>
                                    <h3 className="text-sm font-semibold text-[#1A0033] uppercase tracking-wider mb-2">Описание проекта</h3>
                                    <p className="text-gray-600 leading-relaxed">{request.description}</p>
                                </div>
                            )}

                            {/* Требования */}
                            <div>
                                <h3 className="text-sm font-semibold text-[#1A0033] uppercase tracking-wider mb-3">Требования</h3>
                                {request.requirements?.length > 0 ? (
                                    <div className="space-y-2">
                                        {request.requirements.map((req) => {
                                            const isMust = req.type === 'must_have';
                                            return (
                                                <div
                                                    key={req.id}
                                                    className={`flex items-center justify-between p-3 rounded-xl border ${
                                                        isMust
                                                            ? 'border-red-100 bg-red-50/50'
                                                            : 'border-blue-100 bg-blue-50/50'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-lg">
                                                            {isMust ? '🔥' : '💡'}
                                                        </span>
                                                        <span className="font-medium text-[#1A0033]">
                                                            {req.technology?.name || req.custom_text || 'Неизвестно'}
                                                        </span>
                                                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                            isMust
                                                                ? 'bg-red-200 text-red-700'
                                                                : 'bg-blue-200 text-blue-700'
                                                        }`}>
                                                            {isMust ? 'Must have' : 'Nice to have'}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm text-gray-500">
                                                        Вес: {req.weight}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-gray-400">Требования не добавлены</p>
                                )}
                            </div>

                            {/* Информация о создателе */}
                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                                <span>Создал: {request.created_by?.name || '—'}</span>
                                <span>{new Date(request.created_at).toLocaleDateString('ru-RU')}</span>
                            </div>

                            {/* Кнопка назад */}
                            <div className="pt-2">
                                <Link
                                    href="/requests"
                                    className="inline-flex items-center gap-2 text-[#2D0094] hover:text-[#5B2BD4] font-medium transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Назад к списку
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}