import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import useStore from '../store/useStore'
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, addToCart, toggleFavorite, favorites, user } = useStore()
  
  const product = products.find(p => p.id === parseInt(id))
  const isFavorite = favorites.some(item => item.id === product?.id)

  if (!product) {
    return (
      <div className="not-found">
        <h2>Товар не найден</h2>
        <button onClick={() => navigate('/products')}>Вернуться к каталогу</button>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Войдите в систему для добавления товаров в корзину')
      navigate('/auth')
      return
    }
    addToCart(product)
    toast.success('Товар добавлен в корзину')
  }

  const handleToggleFavorite = () => {
    if (!user) {
      toast.error('Войдите в систему для добавления в избранное')
      navigate('/auth')
      return
    }
    toggleFavorite(product)
    toast.success(isFavorite ? 'Удалено из избранного' : 'Добавлено в избранное')
  }

  return (
    <motion.div 
      className="product-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        <div className="product-detail-grid">
          <motion.div 
            className="product-images"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="main-image">
              <img src={product.image} alt={product.name} />
            </div>
          </motion.div>

          <motion.div 
            className="product-info"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FiStar 
                    key={i} 
                    className={i < Math.floor(product.rating) ? 'filled' : ''}
                  />
                ))}
              </div>
              <span>{product.rating}</span>
              <span>({product.reviews} отзывов)</span>
            </div>

            <div className="product-price">
              <span className="current-price">
                {new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                  minimumFractionDigits: 0
                }).format(product.price)}
              </span>
            </div>

            <div className="product-description">
              <h3>Описание</h3>
              <p>
                Премиальное устройство с передовыми технологиями и элегантным дизайном. 
                Идеальное сочетание производительности и стиля для самых требовательных пользователей.
              </p>
            </div>

            <div className="product-actions">
              <motion.button 
                className="add-to-cart-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
              >
                <FiShoppingCart />
                Добавить в корзину
              </motion.button>

              <motion.button 
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleFavorite}
              >
                <FiHeart />
              </motion.button>
            </div>

            <div className="product-features">
              <h3>Характеристики</h3>
              <ul>
                <li>Гарантия: 2 года</li>
                <li>Доставка: 1-3 дня</li>
                <li>Оригинальная продукция</li>
                <li>Бесплатная настройка</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductDetail
