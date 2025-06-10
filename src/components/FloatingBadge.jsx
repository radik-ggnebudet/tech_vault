import { motion } from 'framer-motion'
import { FiTag } from 'react-icons/fi'
import './FloatingBadge.css'

function FloatingBadge() {
  return (
    <motion.div 
      className="floating-badge"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.05 }}
    >
      <FiTag />
      <span>Скидки до 30%</span>
    </motion.div>
  )
}

export default FloatingBadge
