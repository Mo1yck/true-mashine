import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ auth, technologies }) {
    const [requirements, setRequirements] = useState([
        { technology_id: '', custom_text: '', type: 'must_have', weight: 2 },
    ]);

    const { data, setData, post, processing, errors } = useForm({
        position: '',
        description: '',
        grade: '',
        location: '',
        citizenship: '',
        release_date: '',
        status: 'draft',
        requirements: requirements,
    });

    const addRequirement = () => {
        setRequirements([
            ...requirements,
            { technology_id: '', custom_text: '', type: 'nice_to_have', weight: 1 },
        ]);
        setData('requirements', [...requirements, { technology_id: '', custom_text: '', type: 'nice_to_have', weight: 1 }]);
    };

    const removeRequirement = (index) => {
        const newReqs = requirements.filter((_, i) => i !== index);
        setRequirements(newReqs);
        setData('requirements', newReqs);
    };

    const updateRequirement = (index, field, value) => {
        const newReqs = [...requirements];
        newReqs[index][field] = value;
        setRequirements(newReqs);
        setData('requirements', newReqs);
    };

    const submit = (e) => {
        e.preventDefault();
        post('/requests');
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold">Создать запрос</h2>}
        >
            <Head title="Создать запрос" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-4">
                                {/* Основные поля */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-medium">Должность*</label>
                                        <input
                                            type="text"
                                            value={data.position}
                                            onChange={(e) => setData('position', e.target.value)}
                                            className="w-full border rounded px-3 py-2"
                                        />
                                        {errors.position && <div className="text-red-500 text-sm">{errors.position}</div>}
                                    </div>
                                    <div>
                                        <label className="block font-medium">Грейд</label>
                                        <input
                                            type="text"
                                            value={data.grade}
                                            onChange={(e) => setData('grade', e.target.value)}
                                            className="w-full border rounded px-3 py-2"
                                            placeholder="Junior, Middle, Senior, Lead"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium">Локация</label>
                                        <input
                                            type="text"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            className="w-full border rounded px-3 py-2"
                                            placeholder="Москва, РФ"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium">Гражданство</label>
                                        <input
                                            type="text"
                                            value={data.citizenship}
                                            onChange={(e) => setData('citizenship', e.target.value)}
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium">Дата выхода</label>
                                        <input
                                            type="date"
                                            value={data.release_date}
                                            onChange={(e) => setData('release_date', e.target.value)}
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium">Статус</label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full border rounded px-3 py-2"
                                        >
                                            <option value="draft">Черновик</option>
                                            <option value="active">Активен</option>
                                            <option value="closed">Закрыт</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-medium">Описание проекта</label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full border rounded px-3 py-2"
                                        rows="3"
                                    />
                                </div>

                                {/* Требования */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-bold">Требования</h3>
                                        <button
                                            type="button"
                                            onClick={addRequirement}
                                            className="bg-green-500 text-white px-3 py-1 rounded"
                                        >
                                            + Добавить требование
                                        </button>
                                    </div>

                                    {requirements.map((req, index) => (
                                        <div key={index} className="border p-4 mb-2 rounded">
                                            <div className="grid grid-cols-4 gap-4">
                                                <div>
                                                    <label className="block text-sm">Тип</label>
                                                    <select
                                                        value={req.type}
                                                        onChange={(e) => updateRequirement(index, 'type', e.target.value)}
                                                        className="w-full border rounded px-2 py-1"
                                                    >
                                                        <option value="must_have">Must have</option>
                                                        <option value="nice_to_have">Nice to have</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm">Технология</label>
                                                    <select
                                                        value={req.technology_id}
                                                        onChange={(e) => updateRequirement(index, 'technology_id', e.target.value)}
                                                        className="w-full border rounded px-2 py-1"
                                                    >
                                                        <option value="">Выберите...</option>
                                                        {technologies.map((tech) => (
                                                            <option key={tech.id} value={tech.id}>
                                                                {tech.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm">Свой текст</label>
                                                    <input
                                                        type="text"
                                                        value={req.custom_text}
                                                        onChange={(e) => updateRequirement(index, 'custom_text', e.target.value)}
                                                        className="w-full border rounded px-2 py-1"
                                                        placeholder="Если нет в списке"
                                                    />
                                                </div>
                                                <div className="flex items-end">
                                                    <div className="flex-1">
                                                        <label className="block text-sm">Вес</label>
                                                        <input
                                                            type="number"
                                                            value={req.weight}
                                                            onChange={(e) => updateRequirement(index, 'weight', parseInt(e.target.value))}
                                                            className="w-full border rounded px-2 py-1"
                                                            min="1"
                                                            max="100"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeRequirement(index)}
                                                        className="ml-2 text-red-500"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {errors.requirements && <div className="text-red-500 text-sm">{errors.requirements}</div>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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