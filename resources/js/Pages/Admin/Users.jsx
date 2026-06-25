import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Users({ auth, users }) {
    const deleteUser = (id) => {
        if (confirm('Удалить пользователя?')) {
            router.delete(`/admin/users/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold">Пользователи</h2>}
        >
            <Head title="Пользователи" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <Link
                                href="/admin/users/create"
                                className="inline-block bg-blue-500 text-black px-4 py-2 rounded mb-4"
                            >
                                + Создать пользователя
                            </Link>

                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-2">ID</th>
                                        <th className="text-left p-2">Имя</th>
                                        <th className="text-left p-2">Email</th>
                                        <th className="text-left p-2">Роль</th>
                                        <th className="text-left p-2">Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-b">
                                            <td className="p-2">{user.id}</td>
                                            <td className="p-2">{user.name}</td>
                                            <td className="p-2">{user.email}</td>
                                            <td className="p-2">{user.role}</td>
                                            <td className="p-2">
                                                <Link
                                                    href={`/admin/users/${user.id}/edit`}
                                                    className="text-blue-600 mr-2"
                                                >
                                                    Редактировать
                                                </Link>
                                                <button
                                                    onClick={() => deleteUser(user.id)}
                                                    className="text-red-600"
                                                    disabled={user.role === 'admin'}
                                                >
                                                    Удалить
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}