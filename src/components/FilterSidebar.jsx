import { motion } from 'framer-motion'
import useStore from '../store/useStore'
import './FilterSidebar.css'

function FilterSidebar() {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    priceRange, 
    setPriceRange 
  } = useStore()

  const categories = [
    { value: 'all', label: 'Все категории' },
    { value: 'smartphones', label: 'Смартфоны' },
    { value: 'laptops', label: 'Ноутбуки' },
    { value: 'tablets', label: 'Планшеты' },
    { value: 'audio', label: 'Аудио' },
    { value: 'wearables', label: 'Носимые устройства' },
    { value: 'gaming', label: 'Игровые консоли' }
  ]

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange]
    newRange[index] = parseInt(value)
    setPriceRange(newRange)
  }

  return (
    <div className="filter-sidebar">
      <h3>Фильтры</h3>
      
      <div className="filter-section">
        <h4>Категории</h4>
        <div className="filter-options">
          {categories.map((category) => (
            <motion.label 
              key={category.value}
              className="filter-option"
              whileHover={{ x: 5 }}
            >
              <input
                type="radio"
                name="category"
                value={category.value}
                checked={selectedCategory === category.value}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />
              <span>{category.label}</span>
            </motion.label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Цена</h4>
        <div className="price-range">
          <div className="range-inputs">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(0, e.target.value)}
              placeholder="От"
            />
            <span>—</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
              placeholder="До"
            />
          </div>
          <div className="price-slider">
            <input
              type="range"
              min="0"
              max="300000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
              className="slider"
            />
          </div>
        </div>
      </div>

      <motion.button 
        className="reset-filters"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setSelectedCategory('all')
          setPriceRange([0, 300000])
        }}
      >
        Сбросить фильтры
      </motion.button>
    </div>
  )
}

export default FilterSidebar
