import { useEffect, useState } from 'react'
import './CursorGlow.css'

function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return (
    <div 
      className="cursor-glow"
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`
      }}
    />
  )
}

export default CursorGlow
