import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiUser } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import useStore from '../store/useStore'
import './Auth.css'

function Auth() {
  const navigate = useNavigate()
  const { setUser } = useStore()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (isLogin) {
      // Логин
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(u => 
        u.username === formData.username && 
        u.password === formData.password
      )
      
      if (user) {
        setUser({ username: user.username, email: user.email })
        toast.success('Добро пожаловать!')
        navigate('/')
      } else {
        toast.error('Неверный логин или пароль')
      }
    } else {
      // Регистрация
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      if (users.find(u => u.username === formData.username)) {
        toast.error('Пользователь с таким логином уже существует')
        return
      }
      
      users.push(formData)
      localStorage.setItem('users', JSON.stringify(users))
      toast.success('Регистрация успешна! Теперь войдите в систему')
      setIsLogin(true)
      setFormData({ username: '', email: '', password: '' })
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <motion.div 
      className="auth-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="auth-container">
        <motion.div 
          className="auth-card"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="auth-header">
            <h2>{isLogin ? 'Вход в систему' : 'Регистрация'}</h2>
            <p>{isLogin ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт'}</p>
          </div>

          <div className="auth-tabs">
            <button 
              className={`tab-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Вход
            </button>
            <button 
              className={`tab-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Регистрация
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <div className="input-icon">
                <FiUser />
              </div>
              <input
                type="text"
                name="username"
                placeholder="Логин"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {!isLogin && (
              <motion.div 
                className="form-group"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <div className="input-icon">
                  <FiMail />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </motion.div>
            )}

            <div className="form-group">
              <div className="input-icon">
                <FiLock />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <motion.button 
              type="submit" 
              className="auth-submit-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </motion.button>
          </form>

          <div className="auth-footer">
            <p>
              {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
              <button 
                className="link-btn"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Зарегистрироваться' : 'Войти'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Auth
