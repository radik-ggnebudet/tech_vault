import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import useStore from '../store/useStore'
import './ProductCard.css'

function ProductCard({ product, viewMode = 'grid' }) {
  const navigate = useNavigate()
  const { addToCart, toggleFavorite, favorites, user } = useStore()
  const isFavorite = favorites.some(item => item.id === product.id)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (!user) {
      toast.error('Войдите в систему для добавления товаров')
      navigate('/auth')
      return
    }
    addToCart(product)
    toast.success('Добавлено в корзину')
  }

  const handleToggleFavorite = (e) => {
    e.stopPropagation()
    if (!user) {
      toast.error('Войдите в систему')
      navigate('/auth')
      return
    }
    toggleFavorite(product)
  }

  return (
    <motion.article 
      className="product-card-new"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Верхняя часть с изображением */}
      <div className="card-image-section">
        <div className="image-holder">
          <img src={product.image} alt={product.name} />
        </div>
        
        <button 
          className={`fav-button ${isFavorite ? 'active' : ''}`}
          onClick={handleToggleFavorite}
        >
          <FiHeart />
        </button>

        {product.id % 2 === 0 && (
          <span className="discount-tag">-20%</span>
        )}
      </div>

      {/* Нижняя часть с информацией */}
      <div className="card-content">
        <div className="product-meta">
          <span className="brand">Apple</span>
          <div className="rating">
            <span className="stars">★★★★★</span>
            <span className="score">{product.rating}</span>
          </div>
        </div>

        <h3 className="product-title">{product.name}</h3>

        <div className="price-section">
          <div className="price-group">
            {product.id % 2 === 0 && (
              <span className="old-price">{Math.floor(product.price * 1.2).toLocaleString()} ₽</span>
            )}
            <span className="price">{product.price.toLocaleString()} ₽</span>
          </div>
          
          <button 
            className="cart-button"
            onClick={handleAddToCart}
          >
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default ProductCard
