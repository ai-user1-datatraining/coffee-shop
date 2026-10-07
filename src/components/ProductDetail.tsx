import { useState } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (quantity: number) => void;
}

export default function ProductDetail({ product, onBack, onAddToCart }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-stone-600 hover:text-amber-800 mb-6 transition-colors group"
      >
        <svg
          className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回商品列表
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 sm:h-96 lg:h-[500px] object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-amber-800 shadow">
              {product.category}
            </span>
            <span className="px-3 py-1.5 bg-amber-900/80 backdrop-blur-sm rounded-full text-sm text-amber-50">
              {product.roastLevel}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="mb-4">
            <p className="text-sm text-amber-600 font-medium mb-1">{product.nameEn}</p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-800 mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-stone-200'}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-stone-500">{product.rating} 分</span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-amber-800">NT${product.price}</span>
              <span className="text-stone-400">/ 227g</span>
            </div>
            <p className="text-xs text-stone-500 mt-1">含稅，免運費（滿 NT$1,000 免運）</p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-bold text-stone-700 mb-2">商品介紹</h3>
            <p className="text-stone-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-100">
              <p className="text-xs text-stone-400 mb-1">產地</p>
              <p className="font-medium text-stone-700">{product.origin}</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-100">
              <p className="text-xs text-stone-400 mb-1">烘焙程度</p>
              <p className="font-medium text-stone-700">{product.roastLevel}</p>
            </div>
          </div>

          {/* Flavor Profile */}
          <div className="mb-6">
            <h3 className="font-bold text-stone-700 mb-3">風味描述</h3>
            <div className="flex flex-wrap gap-2">
              {product.flavor.map((f) => (
                <span
                  key={f}
                  className="px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800 rounded-full text-sm font-medium border border-amber-200"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="mt-auto pt-6 border-t border-amber-100">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-stone-600 font-medium">數量</span>
              <div className="flex items-center border border-amber-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-amber-50 text-stone-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="px-4 py-2 text-stone-800 font-medium min-w-[3rem] text-center border-x border-amber-200">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-amber-50 text-stone-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <span className="text-sm text-stone-400">
                小計：NT${(product.price * quantity).toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => onAddToCart(quantity)}
              className="w-full py-4 bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-900 hover:to-stone-900 text-amber-50 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
