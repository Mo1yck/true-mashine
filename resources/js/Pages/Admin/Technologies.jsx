import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Technologies({ auth, technologies }) {
    const deleteTech = (id) => {
        if (confirm('Удалить технологию?')) {
            router.delete(`/admin/technologies/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold">Справочник технологий</h2>}
        >
            <Head title="Технологии" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <Link
                                href="/admin/technologies/create"
                                className="inline-block bg-blue-500 text-black px-4 py-2 rounded mb-4"
                            >
                                + Добавить технологию
                            </Link>

                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-2">ID</th>
                                        <th className="text-left p-2">Название</th>
                                        <th className="text-left p-2">Группа</th>
                                        <th className="text-left p-2">Синонимы</th>
                                        <th className="text-left p-2">Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {technologies.map((tech) => (
                                        <tr key={tech.id} className="border-b">
                                            <td className="p-2">{tech.id}</td>
                                            <td className="p-2">{tech.name}</td>
                                            <td className="p-2">{tech.group || '-'}</td>
                                            <td className="p-2">
                                                {tech.synonyms ? tech.synonyms.join(', ') : '-'}
                                            </td>
                                            <td className="p-2">
                                                <Link
                                                    href={`/admin/technologies/${tech.id}/edit`}
                                                    className="text-blue-600 mr-2"
                                                >
                                                    Редактировать
                                                </Link>
                                                <button
                                                    onClick={() => deleteTech(tech.id)}
                                                    className="text-red-600"
                                                >
                                                    Удалить
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}