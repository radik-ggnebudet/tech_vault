import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: <FiPhone />,
      title: 'Телефон',
      info: '+7 (999) 123-45-67',
      link: 'tel:+79991234567'
    },
    {
      icon: <FiMail />,
      title: 'Email',
      info: 'info@techvault.ru',
      link: 'mailto:info@techvault.ru'
    },
    {
      icon: <FiMapPin />,
      title: 'Адрес',
      info: 'Москва, ул. Примерная, 123',
      link: '#'
    }
  ]

  return (
    <motion.div 
      className="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        <motion.div 
          className="contact-header"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1>Свяжитесь с нами</h1>
          <p>Мы всегда рады помочь и ответить на ваши вопросы</p>
        </motion.div>

        <div className="contact-content">
          <motion.div 
            className="contact-info"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {contactInfo.map((item, index) => (
              <motion.a 
                key={index}
                href={item.link}
                className="info-card"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="info-icon">{item.icon}</div>
                <div className="info-content">
                  <h3>{item.title}</h3>
                  <p>{item.info}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.form 
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2>Отправить сообщение</h2>
            
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Сообщение"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <motion.button 
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiSend />
              Отправить
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.div>
  )
}

export default Contact
