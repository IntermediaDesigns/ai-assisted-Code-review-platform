import React, { useState } from 'react';
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import Spinner from "../components/ui/Spinner";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface AIAnalysisProps {
  code: string;
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ code }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const analyzeCode = useMutation(api.reviews.analyzeCode);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeCode({ code });
      setAnalysis(result);
    } catch (error) {
      console.error("Failed to analyze code:", error);
      setError("An error occurred during analysis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-md disabled:bg-green-300"
        onClick={handleAnalyze}
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : "Analyze Code"}
      </button>
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {analysis && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold">AI Analysis:</h3>
          <pre className="mt-2 whitespace-pre-wrap">{analysis}</pre>
        </div>
      )}
    </div>
  );
};

export default AIAnalysis;