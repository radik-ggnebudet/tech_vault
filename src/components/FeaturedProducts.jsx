import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useStore from '../store/useStore'
import ProductCard from './ProductCard'
import './FeaturedProducts.css'

function FeaturedProducts() {
  const navigate = useNavigate()
  const { products } = useStore()
  const featuredProducts = products.slice(0, 4)

  return (
    <section className="featured-products">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Популярные товары</h2>
          <p className="section-subtitle">Самые востребованные устройства этого сезона</p>
        </motion.div>

        <div className="featured-grid">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="section-footer"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="view-all-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/products')}
          >
            Смотреть все товары
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProducts
