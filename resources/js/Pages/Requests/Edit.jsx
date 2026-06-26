import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, request, technologies }) {
    const { data, setData, put, processing, errors } = useForm({
        position: request.position || '',
        description: request.description || '',
        grade: request.grade || '',
        location: request.location || '',
        citizenship: request.citizenship || '',
        release_date: request.release_date || '',
        status: request.status || 'draft',
        requirements: request.requirements || [],
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/requests/${request.id}`);
    };

    const addRequirement = () => {
        setData('requirements', [
            ...data.requirements,
            { technology_id: '', custom_text: '', type: 'must_have', weight: 2 },
        ]);
    };

    const removeRequirement = (index) => {
        const newReqs = data.requirements.filter((_, i) => i !== index);
        setData('requirements', newReqs);
    };

    const updateRequirement = (index, field, value) => {
        const newReqs = [...data.requirements];
        newReqs[index][field] = value;
        setData('requirements', newReqs);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-[#2D0094]">Редактировать запрос #{request.id}</h2>}
        >
            <Head title="Редактировать запрос" />

            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Основные поля */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-[#1A0033] mb-1">
                                        Должность <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.position}
                                        onChange={(e) => setData('position', e.target.value)}
                                        className="w-full rounded-xl border-gray-300 px-4 py-2.5 focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                                        placeholder="PHP-разработчик"
                                    />
                                    {errors.position && <div className="text-red-500 text-sm mt-1">{errors.position}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#1A0033] mb-1">
                                        Грейд
                                    </label>
                                    <input
                                        type="text"
                                        value={data.grade}
                                        onChange={(e) => setData('grade', e.target.value)}
                                        className="w-full rounded-xl border-gray-300 px-4 py-2.5 focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                                        placeholder="Junior / Middle / Senior / Lead"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#1A0033] mb-1">
                                        Локация
                                    </label>
                                    <input
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        className="w-full rounded-xl border-gray-300 px-4 py-2.5 focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                                        placeholder="Москва, РФ"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#1A0033] mb-1">
                                        Гражданство
                                    </label>
                                    <input
                                        type="text"
                                        value={data.citizenship}
                                        onChange={(e) => setData('citizenship', e.target.value)}
                                        className="w-full rounded-xl border-gray-300 px-4 py-2.5 focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                                        placeholder="РФ"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#1A0033] mb-1">
                                        Дата выхода
                                    </label>
                                    <input
                                        type="date"
                                        value={data.release_date}
                                        onChange={(e) => setData('release_date', e.target.value)}
                                        className="w-full rounded-xl border-gray-300 px-4 py-2.5 focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#1A0033] mb-1">
                                        Статус
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="w-full rounded-xl border-gray-300 px-4 py-2.5 focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                                    >
                                        <option value="draft">Черновик</option>
                                        <option value="active">Активен</option>
                                        <option value="closed">Закрыт</option>
                                    </select>
                                </div>
                            </div>

                            {/* Описание */}
                            <div>
                                <label className="block text-sm font-medium text-[#1A0033] mb-1">
                                    Описание проекта
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="3"
                                    className="w-full rounded-xl border-gray-300 px-4 py-2.5 focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                                    placeholder="Краткое описание проекта..."
                                />
                            </div>

                            {/* Требования */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-md font-semibold text-[#1A0033]">Требования</h3>
                                    <button
                                        type="button"
                                        onClick={addRequirement}
                                        className="inline-flex items-center gap-1 text-sm text-[#2D0094] hover:text-[#5B2BD4] font-medium"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Добавить
                                    </button>
                                </div>

                                {data.requirements.map((req, index) => (
                                    <div key={index} className="bg-gray-50 rounded-xl p-4 mb-3 border border-gray-100">
                                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Тип</label>
                                                <select
                                                    value={req.type}
                                                    onChange={(e) => updateRequirement(index, 'type', e.target.value)}
                                                    className="w-full rounded-lg border-gray-200 px-3 py-1.5 text-sm focus:border-[#2D0094] focus:ring-[#2D0094]"
                                                >
                                                    <option value="must_have">🔥 Must have</option>
                                                    <option value="nice_to_have">💡 Nice to have</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Технология</label>
                                                <select
                                                    value={req.technology_id}
                                                    onChange={(e) => updateRequirement(index, 'technology_id', e.target.value)}
                                                    className="w-full rounded-lg border-gray-200 px-3 py-1.5 text-sm focus:border-[#2D0094] focus:ring-[#2D0094]"
                                                >
                                                    <option value="">Выберите...</option>
                                                    {technologies.map((tech) => (
                                                        <option key={tech.id} value={tech.id}>{tech.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Свой текст</label>
                                                <input
                                                    type="text"
                                                    value={req.custom_text || ''}
                                                    onChange={(e) => updateRequirement(index, 'custom_text', e.target.value)}
                                                    className="w-full rounded-lg border-gray-200 px-3 py-1.5 text-sm focus:border-[#2D0094] focus:ring-[#2D0094]"
                                                    placeholder="Если нет в списке"
                                                />
                                            </div>
                                            <div className="flex items-end gap-2">
                                                <div className="flex-1">
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Вес</label>
                                                    <input
                                                        type="number"
                                                        value={req.weight || 1}
                                                        onChange={(e) => updateRequirement(index, 'weight', parseInt(e.target.value))}
                                                        className="w-full rounded-lg border-gray-200 px-3 py-1.5 text-sm focus:border-[#2D0094] focus:ring-[#2D0094]"
                                                        min="1"
                                                        max="100"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeRequirement(index)}
                                                    className="text-red-400 hover:text-red-600 text-xl leading-none pb-1"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Кнопки */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                <Link
                                    href="/requests"
                                    className="px-5 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                    Отмена
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#2D0094] hover:bg-[#5B2BD4] text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-200 transition-all duration-200 disabled:opacity-50"
                                >
                                    {processing ? 'Сохранение...' : 'Сохранить'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}