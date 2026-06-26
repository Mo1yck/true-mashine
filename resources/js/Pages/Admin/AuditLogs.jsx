import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function AuditLogs({ auth, logs }) {
    const getActionColor = (action) => {
        const colors = {
            created: 'text-green-600',
            updated: 'text-blue-600',
            deleted: 'text-red-600',
            matched: 'text-purple-600',
            viewed: 'text-gray-600',
            downloaded: 'text-orange-600',
        };
        return colors[action] || 'text-gray-600';
    };

    const getEntityLabel = (type) => {
        const labels = {
            'App\\Models\\User': 'Пользователь',
            'App\\Models\\Request': 'Запрос',
            'App\\Models\\Candidate': 'Кандидат',
            'App\\Models\\Technology': 'Технология',
            'App\\Models\\Assessment': 'Оценка',
        };
        return labels[type] || type;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold">Журнал аудита</h2>}
        >
            <Head title="Журнал аудита" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-2">Время</th>
                                        <th className="text-left p-2">Пользователь</th>
                                        <th className="text-left p-2">Действие</th>
                                        <th className="text-left p-2">Сущность</th>
                                        <th className="text-left p-2">ID</th>
                                        <th className="text-left p-2">IP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.data.map((log) => (
                                        <tr key={log.id} className="border-b">
                                            <td className="p-2 text-sm">
                                                {new Date(log.created_at).toLocaleString('ru-RU')}
                                            </td>
                                            <td className="p-2">{log.user?.name || 'Система'}</td>
                                            <td className="p-2">
                                                <span className={`font-medium ${getActionColor(log.action)}`}>
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td className="p-2 text-sm">
                                                {getEntityLabel(log.entity_type)}
                                            </td>
                                            <td className="p-2">{log.entity_id || '-'}</td>
                                            <td className="p-2 text-sm">{log.ip_address || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {logs.links && (
                                <div className="mt-4">
                                    {logs.links.map((link, index) => (
                                        <span key={index} dangerouslySetInnerHTML={{ __html: link.html }} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}