import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import FeaturedProducts from '../components/FeaturedProducts'
import Categories from '../components/Categories'
import Newsletter from '../components/Newsletter'
import './Home.css'

function Home() {
  return (
    <motion.div 
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <Categories />
      <FeaturedProducts />
      
      <section className="features-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Почему выбирают нас
          </motion.h2>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="feature-card"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </motion.div>
  )
}

const features = [
  {
    icon: '🚀',
    title: 'Быстрая доставка',
    description: 'Доставка по всей России за 1-3 дня'
  },
  {
    icon: '💎',
    title: 'Премиум качество',
    description: 'Только оригинальная техника от официальных поставщиков'
  },
  {
    icon: '🛡️',
    title: 'Гарантия',
    description: 'Расширенная гарантия на все товары до 3 лет'
  },
  {
    icon: '💰',
    title: 'Лучшие цены',
    description: 'Гарантируем самые выгодные цены на рынке'
  }
]

export default Home
