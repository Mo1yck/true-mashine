import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function AuditLogs({ auth, logs }) {
    const [search, setSearch] = useState('');

    const getActionColor = (action) => {
        const colors = {
            created: 'text-green-600 bg-green-50 border-green-200',
            updated: 'text-blue-600 bg-blue-50 border-blue-200',
            deleted: 'text-red-600 bg-red-50 border-red-200',
            matched: 'text-purple-600 bg-purple-50 border-purple-200',
            viewed: 'text-gray-600 bg-gray-50 border-gray-200',
            downloaded: 'text-orange-600 bg-orange-50 border-orange-200',
        };
        return colors[action] || 'text-gray-600 bg-gray-50 border-gray-200';
    };

    const getActionLabel = (action) => {
        const labels = {
            created: 'Создал',
            updated: 'Обновил',
            deleted: 'Удалил',
            matched: 'Сверил',
            viewed: 'Просмотрел',
            downloaded: 'Скачал',
        };
        return labels[action] || action;
    };

    const getEntityLabel = (type) => {
        const labels = {
            'App\\Models\\User': '👤 Пользователь',
            'App\\Models\\Request': '📋 Запрос',
            'App\\Models\\Candidate': '🧑‍💻 Кандидат',
            'App\\Models\\Technology': '⚙️ Технология',
            'App\\Models\\Assessment': '📊 Оценка',
        };
        return labels[type] || type;
    };

    const filteredLogs = logs.data.filter((log) =>
        log.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        log.action?.toLowerCase().includes(search.toLowerCase()) ||
        log.entity_type?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-[#2D0094]">📜 Журнал аудита</h2>}
        >
            <Head title="Журнал аудита" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Поиск */}
                    <div className="mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Поиск по пользователю, действию, сущности..."
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
                        <span className="text-sm text-gray-500 mt-2 block">
                            Найдено: {filteredLogs.length}
                        </span>
                    </div>

                    {/* Таблица */}
                    {filteredLogs.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                            <div className="text-6xl mb-4">📭</div>
                            <h3 className="text-xl font-medium text-gray-700">Нет записей</h3>
                            <p className="text-gray-400 mt-1">Журнал аудита пуст</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Время</th>
                                            <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Пользователь</th>
                                            <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Действие</th>
                                            <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Сущность</th>
                                            <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">IP</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredLogs.map((log) => (
                                            <tr key={log.id} className="hover:bg-purple-50/30 transition-colors">
                                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap">
                                                    {new Date(log.created_at).toLocaleString('ru-RU')}
                                                </td>
                                                <td className="p-3 text-sm font-medium text-[#1A0033]">
                                                    {log.user?.name || 'Система'}
                                                </td>
                                                <td className="p-3">
                                                    <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getActionColor(log.action)}`}>
                                                        {getActionLabel(log.action)}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-sm text-gray-600">
                                                    {getEntityLabel(log.entity_type)}
                                                </td>
                                                <td className="p-3 text-sm text-gray-500">
                                                    {log.entity_id || '-'}
                                                </td>
                                                <td className="p-3 text-sm text-gray-500 font-mono">
                                                    {log.ip_address || '-'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Пагинация */}
                            {logs.links && (
                                <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/50">
                                    <div className="flex items-center justify-between gap-2 text-sm">
                                        <span className="text-gray-500">
                                            Всего: {logs.total || logs.data?.length || 0} записей
                                        </span>
                                        <div className="flex gap-1">
                                            {logs.links.map((link, index) => (
                                                <span
                                                    key={index}
                                                    dangerouslySetInnerHTML={{ __html: link.html }}
                                                    className="[&>a]:px-3 [&>a]:py-1 [&>a]:rounded-lg [&>a]:text-sm [&>a]:transition-colors [&>a]:hover:bg-purple-100 [&>a.active]:bg-[#2D0094] [&>a.active]:text-white"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}