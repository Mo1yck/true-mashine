import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function UsersEdit({ auth, user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
        role: user.role || 'manager',
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

    const isAdmin = auth.user.role === 'admin';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold">Редактировать пользователя</h2>}
        >
            <Head title="Редактировать пользователя" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-4 max-w-md">
                                <div>
                                    <label className="block font-medium">Имя</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                                </div>

                                <div>
                                    <label className="block font-medium">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                                </div>

                                <div>
                                    <label className="block font-medium">Новый пароль (оставьте пустым)</label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                                </div>

                                <div>
                                    <label className="block font-medium">Подтверждение пароля</label>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>

                                {/* Роль видит только админ */}
                                {isAdmin && (
                                    <div>
                                        <label className="block font-medium">Роль</label>
                                        <select
                                            value={data.role}
                                            onChange={(e) => setData('role', e.target.value)}
                                            className="w-full border rounded px-3 py-2"
                                        >
                                            <option value="manager">Менеджер</option>
                                            <option value="director">Руководитель</option>
                                            <option value="admin">Администратор</option>
                                        </select>
                                        {errors.role && <div className="text-red-500 text-sm">{errors.role}</div>}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Сохранить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}