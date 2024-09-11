import React, { useState } from 'react';
import { useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";

interface CodeEditorProps {
  initialCode?: string;
  onSave: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialCode = '', onSave }) => {
  const [code, setCode] = useState(initialCode);
  const convex = useConvex();

  const handleSave = async () => {
    try {
      await convex.mutation(api.codeSnippets.create, { code });
      onSave(code);
    } catch (error) {
      console.error("Failed to save code:", error);
    }
  };

  return (
    <div className="w-full">
      <textarea
        className="w-full h-64 p-2 border border-gray-300 rounded-md font-mono"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        title="Code Editor"
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={handleSave}
      >
        Save Code
      </button>
    </div>
  );
};

export default CodeEditor;