// src/pages/homepage/Homepage.tsx
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Homepage() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Accessibility PDF</h1>
      <p className="max-w-xl text-lg text-gray-700 mb-6">
        An AI-powered app that lets you upload your PDF, and convert it to accessible form.
      </p>
      <p className="max-w-xl text-gray-600 mb-8">
        Powered by advanced machine learning algorithms, our AI analyzes your pdf and tags it appropriately.
      </p>
      <Button onClick={() => navigate("/ai-pdf-tagger")}>Get Started</Button>
    </div>
  )
}