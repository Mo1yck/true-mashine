import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function TechnologiesEdit({ auth, technology }) {
    const { data, setData, put, processing, errors } = useForm({
        name: technology.name || '',
        group: technology.group || '',
        synonyms: technology.synonyms || [],
    });

    const [synonymInput, setSynonymInput] = useState('');

    const addSynonym = () => {
        if (synonymInput.trim() && !data.synonyms.includes(synonymInput.trim())) {
            setData('synonyms', [...data.synonyms, synonymInput.trim()]);
            setSynonymInput('');
        }
    };

    const removeSynonym = (index) => {
        setData('synonyms', data.synonyms.filter((_, i) => i !== index));
    };

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/technologies/${technology.id}`);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-[#2D0094]">Редактировать технологию</h2>}
        >
            <Head title="Редактировать технологию" />

            <div className="py-8">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[#1A0033] mb-1">
                                    Название <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded-xl border-gray-300 px-4 py-2.5 focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                                    placeholder="Например: PHP, Laravel, Docker"
                                />
                                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#1A0033] mb-1">
                                    Группа
                                </label>
                                <input
                                    type="text"
                                    value={data.group}
                                    onChange={(e) => setData('group', e.target.value)}
                                    className="w-full rounded-xl border-gray-300 px-4 py-2.5 focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                                    placeholder="Например: Языки, Фреймворки, Базы данных, DevOps"
                                />
                                {errors.group && <div className="text-red-500 text-sm mt-1">{errors.group}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#1A0033] mb-1">
                                    Синонимы
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={synonymInput}
                                        onChange={(e) => setSynonymInput(e.target.value)}
                                        className="flex-1 rounded-xl border-gray-300 px-4 py-2.5 focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                                        placeholder="Например: postgres, pgsql"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addSynonym();
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={addSynonym}
                                        className="bg-[#2D0094] hover:bg-[#5B2BD4] text-white px-4 py-2.5 rounded-xl font-medium transition-colors"
                                    >
                                        +
                                    </button>
                                </div>

                                {data.synonyms.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {data.synonyms.map((syn, index) => (
                                            <span
                                                key={index}
                                                className="bg-purple-100 text-[#2D0094] px-3 py-1.5 rounded-xl text-sm font-medium flex items-center gap-1.5"
                                            >
                                                {syn}
                                                <button
                                                    type="button"
                                                    onClick={() => removeSynonym(index)}
                                                    className="text-red-500 hover:text-red-700 font-bold ml-1"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {errors.synonyms && <div className="text-red-500 text-sm mt-1">{errors.synonyms}</div>}
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                <Link
                                    href="/admin/technologies"
                                    className="px-5 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                    Отмена
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#2D0094] hover:bg-[#5B2BD4] text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Сохранение...' : 'Обновить'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}