'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const UserMap = dynamic(() => import('../../components/UserMap'), { ssr: false });

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
};

export default function UserProfile() {
  const params = useParams();
  const id = params?.id as string;

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      const data = await res.json();
      setUser(data);
    };

    fetchUser();
  }, [id]);

  if (!user) return <div className="p-8">Loading...</div>;

  const lat = parseFloat(user.address.geo.lat);
  const lng = parseFloat(user.address.geo.lng);

  if (isNaN(lat) || isNaN(lng)) {
    return <div className="p-8 text-red-500">Invalid location data.</div>;
  }

  const fullAddress = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6">
        <h1 className="text-4xl font-bold text-gray-900 text-center">{user.name}</h1>
        <div className="space-y-4 text-lg text-gray-700">
          <p><span className="font-semibold">Username:</span> {user.username}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Phone:</span> {user.phone}</p>
          <p><span className="font-semibold">Website:</span> {user.website}</p>
          <p><span className="font-semibold">Address:</span> {fullAddress}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Location</h2>
          <div className="h-[400px] w-full rounded-lg overflow-hidden">
            <UserMap 
              lat={lat} 
              lng={lng} 
              name={user.name} 
              address={fullAddress} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
