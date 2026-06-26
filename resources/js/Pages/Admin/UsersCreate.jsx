import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function UsersCreate({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'manager',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/users');
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-[#2D0094]">Создать пользователя</h2>}
        >
            <Head title="Создать пользователя" />

            <div className="py-8">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-[#1A0033] mb-1">
                                        Имя <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full rounded-xl border-gray-300 px-4 py-2.5 focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                                        placeholder="Иван Иванов"
                                    />
                                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#1A0033] mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full rounded-xl border-gray-300 px-4 py-2.5 focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                                        placeholder="user@company.ru"
                                    />
                                    {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#1A0033] mb-1">
                                        Пароль <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full rounded-xl border-gray-300 px-4 py-2.5 focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                                        placeholder="Минимум 8 символов"
                                    />
                                    {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#1A0033] mb-1">
                                        Подтверждение пароля <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="w-full rounded-xl border-gray-300 px-4 py-2.5 focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                                        placeholder="Повторите пароль"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#1A0033] mb-1">
                                    Роль <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="w-full rounded-xl border-gray-300 px-4 py-2.5 focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                                >
                                    <option value="manager">👤 Менеджер</option>
                                    <option value="director">👔 Руководитель</option>
                                    <option value="admin">🔑 Администратор</option>
                                </select>
                                {errors.role && <div className="text-red-500 text-sm mt-1">{errors.role}</div>}
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                <Link
                                    href="/admin/users"
                                    className="px-5 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                    Отмена
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#2D0094] hover:bg-[#5B2BD4] text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Создание...' : 'Создать пользователя'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}