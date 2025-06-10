import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      // User state
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null, cart: [], favorites: [] }),

      // Cart state
      cart: [],
      addToCart: (product) => {
        const cart = get().cart
        const existing = cart.find(item => item.id === product.id)
        
        if (existing) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] })
        }
      },
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.id !== productId) })
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId)
        } else {
          set({
            cart: get().cart.map(item =>
              item.id === productId ? { ...item, quantity } : item
            )
          })
        }
      },
      clearCart: () => set({ cart: [] }),

      // Favorites state
      favorites: [],
      toggleFavorite: (product) => {
        const favorites = get().favorites
        const isFavorite = favorites.some(item => item.id === product.id)
        
        if (isFavorite) {
          set({ favorites: favorites.filter(item => item.id !== product.id) })
        } else {
          set({ favorites: [...favorites, product] })
        }
      },

      // Theme state
      theme: 'dark',
      toggleTheme: () => set({ theme: get().theme === 'dark' ? 'neon' : 'dark' }),

      // Products
      products: [
        { 
          id: 1, 
          name: 'iPhone 15 Pro Max', 
          price: 129990, 
          category: 'smartphones', 
          image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop', 
          rating: 4.8, 
          reviews: 234 
        },
        { 
          id: 2, 
          name: 'MacBook Pro 16"', 
          price: 249990, 
          category: 'laptops', 
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop', 
          rating: 4.9, 
          reviews: 189 
        },
        { 
          id: 3, 
          name: 'iPad Pro 12.9"', 
          price: 99990, 
          category: 'tablets', 
          image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop', 
          rating: 4.7, 
          reviews: 156 
        },
        { 
          id: 4, 
          name: 'AirPods Pro 2', 
          price: 24990, 
          category: 'audio', 
          image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop', 
          rating: 4.6, 
          reviews: 445 
        },
        { 
          id: 5, 
          name: 'Apple Watch Ultra', 
          price: 79990, 
          category: 'wearables', 
          image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop', 
          rating: 4.8, 
          reviews: 123 
        },
        { 
          id: 6, 
          name: 'PlayStation 5', 
          price: 59990, 
          category: 'gaming', 
          image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop', 
          rating: 4.9, 
          reviews: 567 
        },
        { 
          id: 7, 
          name: 'Samsung Galaxy S24 Ultra', 
          price: 119990, 
          category: 'smartphones', 
          image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop', 
          rating: 4.7, 
          reviews: 298 
        },
        { 
          id: 8, 
          name: 'Sony WH-1000XM5', 
          price: 29990, 
          category: 'audio', 
          image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop', 
          rating: 4.8, 
          reviews: 334 
        },
      ],

      // Filters
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      selectedCategory: 'all',
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      priceRange: [0, 300000],
      setPriceRange: (range) => set({ priceRange: range }),
    }),
    {
      name: 'techvault-storage',
    }
  )
)

export default useStore
