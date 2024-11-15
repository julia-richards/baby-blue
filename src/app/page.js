"use client";

import RsvpForm from "./rsvp/RsvpForm";

// import { useState, useEffect } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-stripes">
      <div className="bg-[#f7f3e9] p-8 rounded-lg shadow-lg text-center z-10 max-w-lg w-full">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-[#4A90E2]">Baby Shower RSVP</h1>
          <p className="text-xl text-[#4A90E2] mt-2">January 19th, 2025</p>
        </header>

        <div className="space-y-4">
          <RsvpForm />
        </div>
      </div>

      <style jsx>{`
        .bg-stripes {
          background-image: repeating-linear-gradient(
            to right,
            #c5e7f7,
            #c5e7f7 40px,
            #f7f3e9 40px,
            #f7f3e9 80px
          );
        }
      `}</style>
    </div>
  );
}
