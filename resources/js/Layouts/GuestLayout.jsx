import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#F5F0FF] via-white to-[#EDE6FF] px-4 overflow-hidden">
            {children}
        </div>
    );
}
