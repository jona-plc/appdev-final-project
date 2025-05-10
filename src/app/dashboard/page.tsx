'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
 
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then(setUsers);

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then(setPosts);

    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((res) => res.json())
      .then(setComments);
  }, []);

  const totalUsers = users.length;
  const totalPosts = posts.length;
  const totalComments = comments.length;

  const chartOptions = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: ['Users', 'Posts', 'Comments'],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
      },
    },
  };

  const chartSeries = [
    {
      name: 'Total Count',
      data: [totalUsers, totalPosts, totalComments],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center mt-20">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Total Users</h3>
            <div className="text-3xl font-bold text-blue-600">{totalUsers}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Total Posts</h3>
            <div className="text-3xl font-bold text-green-600">{totalPosts}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Total Comments</h3>
            <div className="text-3xl font-bold text-orange-600">{totalComments}</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <ApexCharts options={chartOptions} series={chartSeries} type="bar" height={350} />
        </div>
      </div>
    </div>
  );
}
