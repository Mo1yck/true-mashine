import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Technologies({ auth, technologies }) {
    const [search, setSearch] = useState('');

    const deleteTech = (id) => {
        if (confirm('Удалить технологию?')) {
            router.delete(`/admin/technologies/${id}`);
        }
    };

    const filteredTechnologies = technologies.filter((tech) =>
        tech.name.toLowerCase().includes(search.toLowerCase()) ||
        tech.group?.toLowerCase().includes(search.toLowerCase()) ||
        tech.synonyms?.some(syn => syn.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-[#2D0094]">Справочник технологий</h2>}
        >
            <Head title="Технологии" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Верхняя панель */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Поиск по названию, группе, синонимам..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full sm:w-80 rounded-xl border-gray-300 bg-white/80 px-4 py-2.5 pl-10 text-sm shadow-sm backdrop-blur focus:border-[#2D0094] focus:ring-[#2D0094] transition-all"
                                />
                                <svg
                                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <span className="text-sm text-gray-500">
                                Найдено: {filteredTechnologies.length}
                            </span>
                        </div>

                        <Link
                            href="/admin/technologies/create"
                            className="inline-flex items-center gap-2 bg-[#2D0094] hover:bg-[#5B2BD4] text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-200 transition-all duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Добавить технологию
                        </Link>
                    </div>

                    {/* Таблица */}
                    {filteredTechnologies.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                            <div className="text-6xl mb-4">⚙️</div>
                            <h3 className="text-xl font-medium text-gray-700">Нет технологий</h3>
                            <p className="text-gray-400 mt-1">Добавьте первую технологию в справочник</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Название</th>
                                            <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Группа</th>
                                            <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Синонимы</th>
                                            <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredTechnologies.map((tech) => (
                                            <tr key={tech.id} className="hover:bg-purple-50/30 transition-colors">
                                                <td className="p-3 text-sm text-gray-500">{tech.id}</td>
                                                <td className="p-3 text-sm font-medium text-[#1A0033]">{tech.name}</td>
                                                <td className="p-3 text-sm text-gray-600">
                                                    {tech.group ? (
                                                        <span className="bg-gray-100 px-2.5 py-0.5 rounded-full text-xs">
                                                            {tech.group}
                                                        </span>
                                                    ) : '-'}
                                                </td>
                                                <td className="p-3 text-sm text-gray-500">
                                                    {tech.synonyms?.length > 0 ? (
                                                        <div className="flex flex-wrap gap-1">
                                                            {tech.synonyms.map((syn, idx) => (
                                                                <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">
                                                                    {syn}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    ) : '-'}
                                                </td>
                                                <td className="p-3">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={`/admin/technologies/${tech.id}/edit`}
                                                            className="text-sm text-[#2D0094] hover:text-[#5B2BD4] font-medium px-3 py-1.5 rounded-lg hover:bg-purple-50 transition-colors"
                                                        >
                                                            Редактировать
                                                        </Link>
                                                        <button
                                                            onClick={() => deleteTech(tech.id)}
                                                            className="text-sm text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                                        >
                                                            Удалить
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}