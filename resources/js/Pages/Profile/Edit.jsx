import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-[#2D0094]">👤 Профиль</h2>}
        >
            <Head title="Профиль" />

            <div className="py-0">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-2">
                    {/* Информация профиля */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white">
                            <h3 className="text-sm font-semibold text-[#1A0033] uppercase tracking-wider">
                                Информация профиля
                            </h3>
                            <p className="text-xs text-gray-500 mt-0.5">Обновите свои персональные данные</p>
                        </div>
                        <div className="p-6">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>
                    </div>

                    {/* Смена пароля */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
                            <h3 className="text-sm font-semibold text-[#1A0033] uppercase tracking-wider">
                                🔑 Смена пароля
                            </h3>
                            <p className="text-xs text-gray-500 mt-0.5">Обновите свой пароль для безопасности</p>
                        </div>
                        <div className="p-6">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}