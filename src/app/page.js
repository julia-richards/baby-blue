'use client'

import RsvpForm from "./rsvp/RsvpForm"

// import { useState, useEffect } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"



export default function Home() {

  return (
    <>
      <style>{
        `.bg-stripes {
          background-image: repeating-linear-gradient(
            to right,
            #C5E7F7,
            #C5E7F7 40px,
            #F7F3E9 40px,
            #F7F3E9 80px
          );`
        }
        </style>
    
    <div className="min-h-screen bg-stripes flex flex-col items-center justify-center p-4">
      <div className="rounded-lg p-8 max-w-md w-full" style={{background: '#F7F3E9'}}>
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">Baby Shower RSVP</h1>
          <p className="text-xl text-blue-500 mt-2">Coming Soon!</p>
        </header>

        <div className="space-y-4">
          <RsvpForm />
        </div>
      </div>
    </div>
    </>
  )
}