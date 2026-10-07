import { useState } from 'react';
import { Product, CartItem } from './types';
import { products, categories } from './data/products';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

type View = 'shop' | 'detail' | 'cart' | 'checkout';

export default function App() {
  const [view, setView] = useState<View>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.includes(searchQuery) ||
      product.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.flavor.some((f) => f.includes(searchQuery));
    const matchesCategory =
      selectedCategory === '全部' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setView('detail');
  };

  const handleCheckoutComplete = () => {
    setCart([]);
    setView('shop');
  };

  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      <Header
        cartCount={cartCount}
        onCartClick={() => setView('cart')}
        onLogoClick={() => setView('shop')}
        cartOpen={cartOpen}
      />

      {view === 'shop' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <section className="relative mb-12 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900 p-8 sm:p-12 lg:p-16">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&h=600&fit=crop')] bg-cover bg-center" />
            </div>
            <div className="relative z-10">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-50 mb-4">
                探索精品咖啡的世界
              </h1>
              <p className="text-amber-200 text-lg sm:text-xl max-w-2xl mb-6">
                嚴選全球優質產區咖啡豆，從農場到杯中，每一口都是對味覺的禮讚。
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-amber-50/10 backdrop-blur-sm rounded-full text-amber-100 text-sm border border-amber-50/20">
                  ☕ 新鮮烘焙
                </span>
                <span className="px-4 py-2 bg-amber-50/10 backdrop-blur-sm rounded-full text-amber-100 text-sm border border-amber-50/20">
                  🌍 產地直送
                </span>
                <span className="px-4 py-2 bg-amber-50/10 backdrop-blur-sm rounded-full text-amber-100 text-sm border border-amber-50/20">
                  ✨ 手工精選
                </span>
              </div>
            </div>
          </section>

          {/* Search & Filter */}
          <section className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative flex-1 w-full">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="搜尋咖啡名稱、產地或風味..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-amber-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-stone-700 placeholder-stone-400 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-amber-800 text-amber-50 shadow-md'
                      : 'bg-white text-stone-600 border border-amber-200 hover:bg-amber-100 hover:border-amber-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* Products Grid */}
          <section>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">☕</div>
                <p className="text-stone-500 text-lg">找不到符合條件的咖啡</p>
                <p className="text-stone-400 text-sm mt-2">試試其他搜尋關鍵字或分類</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => openProductDetail(product)}
                    onAddToCart={() => addToCart(product)}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      )}

      {view === 'detail' && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onBack={() => setView('shop')}
          onAddToCart={(qty) => {
            addToCart(selectedProduct, qty);
            setCartOpen(true);
            setTimeout(() => setCartOpen(false), 2000);
          }}
        />
      )}

      {view === 'cart' && (
        <Cart
          items={cart}
          total={cartTotal}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onCheckout={() => setView('checkout')}
          onContinueShopping={() => setView('shop')}
        />
      )}

      {view === 'checkout' && (
        <Checkout
          items={cart}
          total={cartTotal}
          onComplete={handleCheckoutComplete}
          onBack={() => setView('cart')}
        />
      )}

      {/* Cart notification */}
      {cartOpen && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-amber-800 text-amber-50 px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            已加入購物車
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-amber-100 font-bold text-lg mb-3">焙刻咖啡</h3>
              <p className="text-sm leading-relaxed">
                致力於將世界各地最優質的精品咖啡帶到您的杯中。每一款豆子都經過我們咖啡師的嚴格挑選與精心烘焙。
              </p>
            </div>
            <div>
              <h3 className="text-amber-100 font-bold text-lg mb-3">聯絡我們</h3>
              <ul className="space-y-2 text-sm">
                <li>📧 hello@beaker-coffee.com</li>
                <li>📞 (02) 2345-6789</li>
                <li>📍 台北市大安區和平東路 123 號</li>
              </ul>
            </div>
            <div>
              <h3 className="text-amber-100 font-bold text-lg mb-3">服務時間</h3>
              <ul className="space-y-2 text-sm">
                <li>週一至週五：09:00 - 18:00</li>
                <li>週六：10:00 - 16:00</li>
                <li>週日：休息</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 mt-8 pt-8 text-center text-sm">
            © 2026 焙刻咖啡 Artisan Coffee. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
