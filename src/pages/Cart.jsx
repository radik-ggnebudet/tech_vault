import { motion } from 'framer-motion'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import useStore from '../store/useStore'
import './Cart.css'

function Cart() {
  const navigate = useNavigate()
  const { cart, removeFromCart, updateQuantity, clearCart, user } = useStore()

  if (!user) {
    return (
      <motion.div 
        className="cart-empty"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2>Войдите в систему</h2>
        <p>Для просмотра корзины необходимо авторизоваться</p>
        <button onClick={() => navigate('/auth')}>Войти</button>
      </motion.div>
    )
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    toast.success('Заказ успешно оформлен!')
    clearCart()
    navigate('/')
  }

  if (cart.length === 0) {
    return (
      <motion.div 
        className="cart-empty"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2>Корзина пуста</h2>
        <p>Добавьте товары для оформления заказа</p>
        <button onClick={() => navigate('/products')}>Перейти к покупкам</button>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="cart-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        <h1 className="page-title">Корзина</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item, index) => (
              <motion.div 
                key={item.id}
                className="cart-item"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">
                    {new Intl.NumberFormat('ru-RU', {
                      style: 'currency',
                      currency: 'RUB',
                      minimumFractionDigits: 0
                    }).format(item.price)}
                  </p>
                </div>

                <div className="item-quantity">
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <FiMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <FiPlus />
                  </button>
                </div>

                <div className="item-total">
                  {new Intl.NumberFormat('ru-RU', {
                    style: 'currency',
                    currency: 'RUB',
                    minimumFractionDigits: 0
                  }).format(item.price * item.quantity)}
                </div>

                <button 
                  className="remove-btn"
                  onClick={() => {
                    removeFromCart(item.id)
                    toast.success('Товар удален из корзины')
                  }}
                >
                  <FiTrash2 />
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="cart-summary"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3>Итого</h3>
            <div className="summary-row">
              <span>Товары ({cart.length})</span>
              <span>
                {new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                  minimumFractionDigits: 0
                }).format(total)}
              </span>
            </div>
            <div className="summary-row">
              <span>Доставка</span>
              <span>Бесплатно</span>
            </div>
            <div className="summary-total">
              <span>К оплате</span>
              <span>
                {new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                  minimumFractionDigits: 0
                }).format(total)}
              </span>
            </div>
            <motion.button 
              className="checkout-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCheckout}
            >
              Оформить заказ
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default Cart
