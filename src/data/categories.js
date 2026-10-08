export const CATEGORIES = [
  { value: "women's clothing", label: 'Women', image: '/women-clothing.webp', tagline: 'Effortless everyday style' },
  { value: "men's clothing", label: 'Men', image: '/mens-clothing.webp', tagline: 'Sharp looks, all day comfort' },
  { value: 'jewelery', label: 'Jewelry', image: '/jewelery.webp', tagline: 'Details that make the outfit' },
  { value: 'electronics', label: 'Electronics', image: '/electronics.webp', tagline: 'Gear for work and play' }
]

export const getCategoryShopUrl = (category) => `/shop?category=${encodeURIComponent(category)}`
