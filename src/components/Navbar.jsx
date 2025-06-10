import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiUser, FiHeart, FiSearch, FiMenu, FiX } from 'react-icons/fi'
import useStore from '../store/useStore'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const { user, cart, favorites, logout } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <Link to="/" className="logo">
          <motion.span 
            className="logo-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Tech<span className="accent">Vault</span>
          </motion.span>
        </Link>

        <div className={`nav-menu ${mobileMenu ? 'active' : ''}`}>
          <Link to="/" className="nav-link">Главная</Link>
          <Link to="/products" className="nav-link">Каталог</Link>
          <Link to="/about" className="nav-link">О нас</Link>
          <Link to="/contact" className="nav-link">Контакты</Link>
        </div>

        <div className="nav-actions">
          <motion.button 
            className="icon-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <FiSearch />
          </motion.button>

          <motion.button 
            className="icon-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/profile')}
          >
            <FiHeart />
            {favorites.length > 0 && (
              <span className="badge">{favorites.length}</span>
            )}
          </motion.button>

          <motion.button 
            className="icon-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/cart')}
          >
            <FiShoppingCart />
            {cartItemsCount > 0 && (
              <motion.span 
                className="badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={cartItemsCount}
              >
                {cartItemsCount}
              </motion.span>
            )}
          </motion.button>

          {user ? (
            <div className="user-menu">
              <motion.button 
                className="user-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/profile')}
              >
                <FiUser />
                <span>{user.username}</span>
              </motion.button>
            </div>
          ) : (
            <motion.button 
              className="auth-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/auth')}
            >
              Войти
            </motion.button>
          )}

          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <motion.div 
        className={`search-bar ${searchOpen ? 'active' : ''}`}
        initial={false}
        animate={{ height: searchOpen ? 'auto' : 0 }}
      >
        <input 
          type="text" 
          placeholder="Поиск товаров..."
          className="search-input"
        />
      </motion.div>
    </motion.nav>
  )
}

export default Navbar
