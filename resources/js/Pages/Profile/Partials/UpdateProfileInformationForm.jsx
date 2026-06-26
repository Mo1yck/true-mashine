import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformationForm({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="name" value="Имя" className="text-sm font-medium text-[#1A0033]" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full rounded-xl border-gray-300 focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-1" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" className="text-sm font-medium text-[#1A0033]" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full rounded-xl border-gray-300 focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-1" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm text-gray-800">
                            Ваш email не подтверждён.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-1 text-[#2D0094] hover:text-[#5B2BD4] font-medium underline"
                            >
                                Отправить повторно
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                Ссылка для подтверждения отправлена.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-[#2D0094] hover:bg-[#5B2BD4] text-white px-6 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                    >
                        Сохранить
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600 font-medium">✅ Сохранено.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}