import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Hero.css'

function Hero() {
  const navigate = useNavigate()
  const [textIndex, setTextIndex] = useState(0)
  const texts = ['будущего', 'инноваций', 'возможностей']

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero">
      <div className="hero-content">
        <motion.div 
          className="hero-text"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            Технологии{' '}
            <motion.span 
              key={textIndex}
              className="gradient-text animated-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {texts[textIndex]}
            </motion.span>
            <br />уже сегодня
          </h1>
          <p className="hero-subtitle">
            Откройте для себя мир инновационных устройств
          </p>
          <div className="hero-buttons">
            <motion.button 
              className="cta-btn primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
            >
              <span className="btn-text">Исследовать каталог</span>
              <span className="btn-shine"></span>
            </motion.button>
            <motion.button 
              className="cta-btn secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/about')}
            >
              Узнать больше
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          className="hero-3d"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Canvas camera={{ position: [0, 0, 10], fov: 25 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Sphere visible args={[1, 100, 200]} scale={2.5}>
              <MeshDistortMaterial
                color="#00d4ff"
                attach="material"
                distort={0.3}
                speed={1.5}
                roughness={0}
              />
            </Sphere>
            <OrbitControls enableZoom={false} autoRotate />
          </Canvas>
        </motion.div>
      </div>

      <div className="hero-stats">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            className="stat-item"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.h3
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
            >
              {stat.value}
            </motion.h3>
            <p>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

const stats = [
  { value: '50K+', label: 'Довольных клиентов' },
  { value: '1000+', label: 'Товаров в каталоге' },
  { value: '24/7', label: 'Поддержка' },
  { value: '100%', label: 'Оригинал' }
]

export default Hero
