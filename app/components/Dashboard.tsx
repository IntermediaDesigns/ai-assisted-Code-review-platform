import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function Dashboard() {
  const { user } = useUser();
  const codeSnippets = useQuery(api.codeSnippets.list);

  if (!user) {
    return <div>Please sign in to view your dashboard.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Your Code Snippets</h1>
      {codeSnippets?.map((snippet) => (
        <div key={snippet._id} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">Code Snippet</h2>
          <pre className="bg-gray-100 p-2 rounded">{snippet.code.slice(0, 100)}...</pre>
          <Link href={`/review/${snippet._id}`} className="text-blue-500 hover:underline">
            View Full Review
          </Link>
        </div>
      ))}
    </div>
  );
}