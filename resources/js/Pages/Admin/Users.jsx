import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Users({ auth, users }) {
    const [search, setSearch] = useState('');

    const deleteUser = (id) => {
        if (confirm('Удалить пользователя?')) {
            router.delete(`/admin/users/${id}`);
        }
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role?.toLowerCase().includes(search.toLowerCase())
    );

    const roleColors = {
        admin: 'bg-purple-100 text-purple-700',
        manager: 'bg-blue-100 text-blue-700',
        director: 'bg-green-100 text-green-700',
    };

    const roleLabels = {
        admin: 'Администратор',
        manager: 'Менеджер',
        director: 'Руководитель',
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-[#2D0094]">Пользователи</h2>}
        >
            <Head title="Пользователи" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Верхняя панель */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Поиск по имени, email, роли..."
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
                                Найдено: {filteredUsers.length}
                            </span>
                        </div>

                        <Link
                            href="/admin/users/create"
                            className="inline-flex items-center gap-2 bg-[#2D0094] hover:bg-[#5B2BD4] text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-200 transition-all duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Создать пользователя
                        </Link>
                    </div>

                    {/* Карточки пользователей */}
                    {filteredUsers.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                            <div className="text-6xl mb-4">👤</div>
                            <h3 className="text-xl font-medium text-gray-700">Нет пользователей</h3>
                            <p className="text-gray-400 mt-1">Создайте первого пользователя</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {filteredUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-200 overflow-hidden group"
                                >
                                    <div className="p-5 pb-3 border-b border-gray-50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#2D0094] flex items-center justify-center text-white font-bold text-sm">
                                                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-[#1A0033] truncate">
                                                        {user.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${roleColors[user.role] || 'bg-gray-100 text-gray-700'}`}>
                                                {roleLabels[user.role] || user.role}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="px-5 py-3 bg-white border-t border-gray-50 flex items-center justify-between gap-2">
                                        <Link
                                            href={`/admin/users/${user.id}/edit`}
                                            className="flex-1 inline-flex justify-center items-center gap-2 bg-[#2D0094] hover:bg-[#5B2BD4] text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                            Редактировать
                                        </Link>

                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            disabled={user.role === 'admin'}
                                            className={`p-2 rounded-xl transition-colors ${
                                                user.role === 'admin'
                                                    ? 'text-gray-300 cursor-not-allowed'
                                                    : 'text-red-500 hover:text-red-700 hover:bg-red-50'
                                            }`}
                                            title={user.role === 'admin' ? 'Нельзя удалить админа' : 'Удалить'}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
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