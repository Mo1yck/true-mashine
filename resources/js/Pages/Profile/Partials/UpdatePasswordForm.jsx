import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdatePasswordForm({ className = '' }) {
    const { data, setData, put, errors, processing, recentlySuccessful, reset } =
        useForm({
            current_password: '',
            password: '',
            password_confirmation: '',
        });

    const submit = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="current_password" value="Текущий пароль" className="text-sm font-medium text-[#1A0033]" />
                    <TextInput
                        id="current_password"
                        type="password"
                        className="mt-1 block w-full rounded-xl border-gray-300 focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        autoComplete="current-password"
                    />
                    <InputError message={errors.current_password} className="mt-1" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Новый пароль" className="text-sm font-medium text-[#1A0033]" />
                    <TextInput
                        id="password"
                        type="password"
                        className="mt-1 block w-full rounded-xl border-gray-300 focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value="Подтверждение пароля" className="text-sm font-medium text-[#1A0033]" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        className="mt-1 block w-full rounded-xl border-gray-300 focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password_confirmation} className="mt-1" />
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-[#2D0094] hover:bg-[#5B2BD4] text-white px-6 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                    >
                        Сменить пароль
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600 font-medium">✅ Пароль обновлён.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}