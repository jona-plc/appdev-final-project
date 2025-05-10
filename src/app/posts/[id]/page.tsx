'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!id) return;

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(setPost);

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then(res => res.json())
      .then(setComments);
  }, [id]);

  if (!post) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="mb-4">{post.body}</p>

      <h2 className="text-xl font-semibold mt-6">Comments</h2>
      <ul className="space-y-2 mt-2">
        {comments.map((comment: any) => (
          <li key={comment.id} className="border p-2 rounded">
            <p className="font-medium">{comment.name}</p>
            <p className="text-sm">{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
