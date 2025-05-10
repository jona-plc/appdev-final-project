import Link from 'next/link';

type User = {
  id: number;
  name: string;
  username: string;
};

export default async function UsersPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users: User[] = await res.json();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Adjusted margin-top to push the title down */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 mt-20">User List</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <li 
            key={user.id} 
            className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <h2 className="text-xl font-semibold text-gray-700">{user.name}</h2>
            <p className="text-gray-500 text-md mb-4">@{user.username}</p>
            <Link 
              href={`/users/${user.id}`} 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View Profile
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
