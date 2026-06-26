import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, request }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold">Запрос #{request.id}</h2>}
        >
            <Head title="Запрос" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-bold">Должность</h3>
                                    <p>{request.position}</p>
                                </div>
                                <div>
                                    <h3 className="font-bold">Грейд</h3>
                                    <p>{request.grade || '-'}</p>
                                </div>
                                <div>
                                    <h3 className="font-bold">Локация</h3>
                                    <p>{request.location || '-'}</p>
                                </div>
                                <div>
                                    <h3 className="font-bold">Статус</h3>
                                    <p>{request.status}</p>
                                </div>
                                <div>
                                    <h3 className="font-bold">Требования</h3>
                                    <ul>
                                        {request.requirements?.map((req) => (
                                            <li key={req.id}>
                                                {req.technology?.name || req.custom_text || 'Неизвестно'}
                                                ({req.type}) — вес {req.weight}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <Link href="/requests" className="text-blue-600">
                                        ← Назад к списку
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}