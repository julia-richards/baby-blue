'use client'

import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'

export default function Thanks() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    updateWindowSize()
    window.addEventListener('resize', updateWindowSize)
    return () => window.removeEventListener('resize', updateWindowSize)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex items-center justify-center overflow-hidden">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          colors={['#2196f3', '#90caf9', '#1976d2', '#bbdefb', '#ffffff']}
        />
      )}
      
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float-balloon ${20 + Math.random() * 10}s linear infinite`,
            animationDelay: `${-Math.random() * 20}s`,
          }}
        >
          <div className="text-6xl transform rotate-12" style={{ color: '#2196f3' }}>🎈</div>
        </div>
      ))}
      
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center z-10 max-w-md">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Thank You!</h1>
        <p className="text-xl text-gray-700 mb-6">
          We're thrilled you'll be joining us to celebrate our little boy!
        </p>
        <a href="https://my.babylist.com/sophie-blue" className="text-lg text-blue-500">
          Check out our registry 
        </a>
      </div>

      <style jsx>{`
        @keyframes float-balloon {
          0% {
            transform: translateY(100vh) translateX(-10vw);
          }
          100% {
            transform: translateY(-20vh) translateX(10vw);
          }
        }
      `}</style>
    </div>
  )
}