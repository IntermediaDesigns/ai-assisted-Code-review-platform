import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import CodeEditor from '../../../components/CodeEditorProps';
import AIAnalysis from '../../../components/AIAnalysis';

export default function ReviewPage({ params }: { params: { id: string } }) {
  const { user } = useUser();
  const snippet = useQuery(api.codeSnippets.get, { id: params.id });

  if (!user) {
    return <div>Please sign in to view this review.</div>;
  }

  if (!snippet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Code Review</h1>
      <CodeEditor initialCode={snippet.code} onSave={() => {}} />
      <AIAnalysis code={snippet.code} />
    </div>
  );
}