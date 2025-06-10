import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiPackage, FiHeart, FiLogOut } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import useStore from '../store/useStore'
import './Profile.css'

function Profile() {
  const navigate = useNavigate()
  const { user, logout, favorites, cart } = useStore()

  if (!user) {
    navigate('/auth')
    return null
  }

  const handleLogout = () => {
    logout()
    toast.success('Вы вышли из системы')
    navigate('/')
  }

  const stats = [
    { icon: <FiPackage />, label: 'Товаров в корзине', value: cart.length },
    { icon: <FiHeart />, label: 'В избранном', value: favorites.length }
  ]

  return (
    <motion.div 
      className="profile-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        <div className="profile-header">
          <motion.div 
            className="profile-avatar"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <FiUser />
          </motion.div>
          <h1>{user.username}</h1>
          <p>{user.email}</p>
        </div>

        <div className="profile-stats">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="stat-card"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="profile-section">
          <h2>Избранные товары</h2>
          {favorites.length === 0 ? (
            <p className="empty-message">Нет избранных товаров</p>
          ) : (
            <div className="favorites-grid">
              {favorites.map((product, index) => (
                <motion.div 
                  key={product.id}
                  className="favorite-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img src={product.image} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p>{new Intl.NumberFormat('ru-RU', {
                    style: 'currency',
                    currency: 'RUB',
                    minimumFractionDigits: 0
                  }).format(product.price)}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <motion.button 
          className="logout-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
        >
          <FiLogOut />
          Выйти из аккаунта
        </motion.button>
      </div>
    </motion.div>
  )
}

export default Profile
