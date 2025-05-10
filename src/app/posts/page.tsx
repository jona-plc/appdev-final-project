'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
  body: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

export default function PostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(userData);
    setUser(user);

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => {
        const filteredPosts =
          user.email === 'admin@admin.com'
            ? data
            : data.filter((post: Post) => post.userId === user.id);

        setPosts(filteredPosts);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        setLoading(false);
      });
  }, [router]);

  const handleViewComments = async (postId: number) => {
    setSelectedPostId(postId);
    setModalOpen(true);

    if (!comments[postId]) {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      const data = await res.json();
      setComments(prev => ({
        ...prev,
        [postId]: data,
      }));
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPostId(null);
  };

  if (loading) return <div className="text-center mt-20">Loading posts...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-28 px-6">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        {user?.email === 'admin@admin.com' ? 'Admin Posts' : `${user?.name}'s Posts`}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <div key={post.id} className="bg-white border rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.body.slice(0, 120)}...</p>
            <div className="text-sm text-gray-600 mb-4">
              <span className="font-medium text-gray-800">Posted by: </span>{user?.name}
            </div>
            <button
              onClick={() => handleViewComments(post.id)}
              className="inline-block bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700 transition"
            >
              View Comments
            </button>
          </div>
        ))}
      </div>

      {modalOpen && selectedPostId !== null && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-2xl p-6 relative">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>
            
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {comments[selectedPostId]?.map(comment => (
                <div key={comment.id} className="bg-gray-50 border rounded-lg p-4">
                 
                  <div className="flex items-center mb-2">
                    <span className="font-medium text-gray-800">{comment.name}</span>
                    <span className="text-sm text-gray-500 ml-2">- Commenter</span>
                  </div>
                  <p className="text-sm text-gray-600">{comment.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
