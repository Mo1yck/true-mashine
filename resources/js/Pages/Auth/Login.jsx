import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Вход" />

            <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#F5F0FF] via-white to-[#EDE6FF] px-4">
                <div className="w-full max-w-md">
                    {/* Логотип */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <img
                                src="/images/logo.png"
                                alt="TrueMachine"
                                className="w-20 h-20 object-contain"
                            />
                        </div>
                        <h1 className="text-3xl font-bold text-[#2D0094]">
                            TrueMachine
                        </h1>
                        <p className="text-[#6B5B7B] mt-1 text-sm">Войдите в свой аккаунт</p>
                    </div>

                    {/* Карточка */}
                    <div className="bg-white rounded-2xl shadow-xl shadow-purple-100/50 p-8 border border-purple-100">
                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <InputLabel htmlFor="email" value="Email" className="text-[#1A0033] font-medium" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full rounded-lg border-gray-300 focus:border-[#2D0094] focus:ring-[#2D0094]"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="example@company.ru"
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="password" value="Пароль" className="text-[#1A0033] font-medium" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full rounded-lg border-gray-300 focus:border-[#2D0094] focus:ring-[#2D0094]"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded border-gray-300 text-[#2D0094] focus:ring-[#2D0094]"
                                    />
                                    <span className="ml-2 text-sm text-[#6B5B7B]">Запомнить меня</span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-[#2D0094] hover:text-[#5B2BD4] font-medium hover:underline"
                                    >
                                        Забыли пароль?
                                    </Link>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3 bg-[#2D0094] hover:bg-[#5B2BD4] rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Вход...' : 'Войти'}
                            </button>
                        </form>
                    </div>

                    <div className="text-center mt-6 text-xs text-[#6B5B7B]">
                        © 2026 TrueMachine. Все права защищены.
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}