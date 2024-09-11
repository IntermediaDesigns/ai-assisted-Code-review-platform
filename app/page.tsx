'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs'
import CodeEditor from '@/app/components/CodeEditorProps'
import AIAnalysis from '@/app/components/AIAnalysis'

export default function Home () {
  const { user } = useUser()
  const [code, setCode] = React.useState('')

  if (!user) {
    return (
      <div>Please sign in to use the AI-Assisted Code Review Platform.</div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-4'>
        AI-Assisted Code Review Platform
      </h1>
      <CodeEditor initialCode={code} onSave={setCode} />
      <AIAnalysis code={code} />
    </div>
  )
}
