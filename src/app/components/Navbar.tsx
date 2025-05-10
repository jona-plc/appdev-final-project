'use client';
import Link from 'next/link';

export default function Navbar() {
  const linkClass = "hover:bg-blue-700 px-3 py-2 rounded transition-colors duration-200";

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center z-50">
      <div className="text-xl font-bold">AppDev Final Project</div>
      <div className="space-x-2">
        <Link href="/home" className={linkClass}>Home</Link>
        <Link href="/users" className={linkClass}>User</Link>
        <Link href="/posts" className={linkClass}>Posts & Comments</Link>
        <Link href="/dashboard" className={linkClass}>Dashboard</Link>
        <Link href="/register" className={linkClass}>Register</Link>
        <Link href="/login" className={linkClass}>Login</Link>
      </div>
    </nav>
  );
}
