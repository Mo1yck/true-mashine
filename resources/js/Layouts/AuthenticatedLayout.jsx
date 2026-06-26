import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Иконки для меню
    const menuItems = [
        { name: 'Запросы', href: '/requests', icon: '📋', active: 'requests.*' },
        { name: 'Кандидаты', href: '/candidates', icon: '👤', active: 'candidates.*' },
    ];

    const adminItems = [
        { name: 'Пользователи', href: '/admin/users', icon: '👥', active: 'admin.users.*' },
        { name: 'Технологии', href: '/admin/technologies', icon: '⚙️', active: 'admin.technologies.*' },
        { name: 'Журнал', href: '/admin/audit-logs', icon: '📜', active: 'admin.audit-logs.*' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Навбар */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        {/* Логотип */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center gap-2">
                                <img src="/images/logo.png" alt="TrueMachine" className="h-8 w-auto" />
                            </Link>
                        </div>

                        {/* Десктопное меню */}
                        <div className="hidden sm:flex items-center gap-1">
                            {menuItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    href={item.href}
                                    active={route().current(item.active)}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-[#2D0094] hover:bg-purple-50 transition-all"
                                >
                                    <span>{item.icon}</span>
                                    {item.name}
                                </NavLink>
                            ))}

                            {/* Админские пункты */}
                            {user.role === 'admin' && (
                                <>
                                    <span className="w-px h-6 bg-gray-200 mx-1" />
                                    {adminItems.map((item) => (
                                        <NavLink
                                            key={item.name}
                                            href={item.href}
                                            active={route().current(item.active)}
                                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-[#2D0094] hover:bg-purple-50 transition-all"
                                        >
                                            <span>{item.icon}</span>
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </>
                            )}

                            {/* Профиль */}
                            <span className="w-px h-6 bg-gray-200 mx-1" />
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center gap-2 rounded-full hover:bg-purple-50 px-2 py-1 transition-all">
                                            <div className="h-8 w-8 rounded-full bg-[#2D0094] flex items-center justify-center text-white text-sm font-bold">
                                                {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 hidden lg:block">
                                                {user.name}
                                            </span>
                                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            👤 Профиль
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            🚪 Выйти
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Мобильная кнопка */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Мобильное меню */}
                {showingNavigationDropdown && (
                    <div className="sm:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm">
                        <div className="space-y-1 px-4 pb-3 pt-2">
                            {menuItems.map((item) => (
                                <ResponsiveNavLink key={item.name} href={item.href} active={route().current(item.active)}>
                                    {item.icon} {item.name}
                                </ResponsiveNavLink>
                            ))}
                            {user.role === 'admin' && (
                                <>
                                    <div className="h-px bg-gray-200 my-2" />
                                    {adminItems.map((item) => (
                                        <ResponsiveNavLink key={item.name} href={item.href} active={route().current(item.active)}>
                                            {item.icon} {item.name}
                                        </ResponsiveNavLink>
                                    ))}
                                </>
                            )}
                            <div className="h-px bg-gray-200 my-2" />
                            <ResponsiveNavLink href={route('profile.edit')}>👤 Профиль</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                🚪 Выйти
                            </ResponsiveNavLink>
                        </div>
                    </div>
                )}
            </nav>

            {/* Шапка страницы */}
            {header && (
                <header className="bg-white border-b border-gray-100 shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Основной контент */}
            <main className="py-6">
                {children}
            </main>
        </div>
    );
}