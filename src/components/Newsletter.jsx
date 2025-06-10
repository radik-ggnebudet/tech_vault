import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import './Newsletter.css'

function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      toast.success('Спасибо за подписку! Проверьте вашу почту.')
      setEmail('')
    }
  }

  return (
    <section className="newsletter">
      <div className="container">
        <motion.div 
          className="newsletter-content"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="newsletter-text">
            <h2>Будьте в курсе новинок</h2>
            <p>Подпишитесь на рассылку и получайте эксклюзивные предложения</p>
          </div>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <FiMail className="input-icon" />
              <input
                type="email"
                placeholder="Введите ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Подписаться
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter
