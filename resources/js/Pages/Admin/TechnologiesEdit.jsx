import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

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
            header={<h2 className="text-xl font-semibold">Редактировать технологию</h2>}
        >
            <Head title="Редактировать технологию" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-4 max-w-md">
                                <div>
                                    <label className="block font-medium">Название*</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                                </div>

                                <div>
                                    <label className="block font-medium">Группа</label>
                                    <input
                                        type="text"
                                        value={data.group}
                                        onChange={(e) => setData('group', e.target.value)}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.group && <div className="text-red-500 text-sm">{errors.group}</div>}
                                </div>

                                <div>
                                    <label className="block font-medium">Синонимы</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={synonymInput}
                                            onChange={(e) => setSynonymInput(e.target.value)}
                                            className="flex-1 border rounded px-3 py-2"
                                            placeholder="например: postgres, pgsql"
                                        />
                                        <button
                                            type="button"
                                            onClick={addSynonym}
                                            className="bg-gray-200 px-4 py-2 rounded"
                                        >
                                            +
                                        </button>
                                    </div>
                                    {data.synonyms.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {data.synonyms.map((syn, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded flex items-center gap-1"
                                                >
                                                    {syn}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSynonym(index)}
                                                        className="text-red-500 font-bold"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {errors.synonyms && <div className="text-red-500 text-sm">{errors.synonyms}</div>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Обновить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}