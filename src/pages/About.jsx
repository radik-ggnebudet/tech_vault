import { motion } from 'framer-motion'
import './About.css'

function About() {
  const features = [
    {
      title: 'Инновации',
      description: 'Мы первыми привозим самые передовые технологии',
      icon: '🚀'
    },
    {
      title: 'Качество',
      description: 'Только оригинальная продукция с гарантией',
      icon: '✨'
    },
    {
      title: 'Поддержка',
      description: 'Круглосуточная помощь наших экспертов',
      icon: '💬'
    },
    {
      title: 'Доставка',
      description: 'Быстрая и безопасная доставка по всей стране',
      icon: '📦'
    }
  ]

  return (
    <motion.div 
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        <motion.div 
          className="about-hero"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="about-title">О компании TechVault</h1>
          <p className="about-subtitle">
            Мы создаем будущее, делая передовые технологии доступными каждому
          </p>
        </motion.div>

        <div className="about-content">
          <motion.div 
            className="about-story"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Наша история</h2>
            <p>
              TechVault начал свой путь в 2020 году с простой идеи - сделать премиальную 
              технику доступной для каждого. Сегодня мы являемся одним из лидеров рынка, 
              предлагая широкий ассортимент устройств от ведущих мировых брендов.
            </p>
            <p>
              Наша миссия - не просто продавать технику, а помогать людям улучшать 
              качество жизни с помощью инновационных решений.
            </p>
          </motion.div>

          <div className="about-features">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="feature-card"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="about-numbers"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="number-item">
              <h3>50K+</h3>
              <p>Довольных клиентов</p>
            </div>
            <div className="number-item">
              <h3>1000+</h3>
              <p>Товаров в каталоге</p>
            </div>
            <div className="number-item">
              <h3>24/7</h3>
              <p>Поддержка клиентов</p>
            </div>
            <div className="number-item">
              <h3>3 года</h3>
              <p>На рынке</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default About
