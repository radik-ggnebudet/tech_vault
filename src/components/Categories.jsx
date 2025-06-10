import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useStore from '../store/useStore'
import './Categories.css'

function Categories() {
  const navigate = useNavigate()
  const { setSelectedCategory } = useStore()

  const categories = [
    { id: 'smartphones', name: 'Смартфоны', icon: '📱' },
    { id: 'laptops', name: 'Ноутбуки', icon: '💻' },
    { id: 'tablets', name: 'Планшеты', icon: '📱' },
    { id: 'audio', name: 'Аудио', icon: '🎧' },
    { id: 'wearables', name: 'Часы', icon: '⌚' },
    { id: 'gaming', name: 'Игры', icon: '🎮' }
  ]

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId)
    navigate('/products')
  }

  return (
    <section className="categories">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          Категории товаров
        </motion.h2>

        <div className="categories-grid">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="category-card"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="category-icon">{category.icon}</div>
              <h3>{category.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
