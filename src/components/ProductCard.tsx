import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onAddToCart: () => void;
}

export default function ProductCard({ product, onClick, onAddToCart }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-amber-100 transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div
        className="relative h-52 overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-amber-800 shadow-sm">
            {product.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-amber-900/80 backdrop-blur-sm rounded-full text-xs text-amber-50">
            {product.roastLevel}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3
              className="font-bold text-stone-800 group-hover:text-amber-800 transition-colors cursor-pointer"
              onClick={onClick}
            >
              {product.name}
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">{product.nameEn}</p>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-xs font-medium text-stone-500">{product.rating}</span>
          </div>
        </div>

        {/* Flavor Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.flavor.slice(0, 3).map((f) => (
            <span
              key={f}
              className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md text-xs border border-amber-100"
            >
              {f}
            </span>
          ))}
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-amber-50">
          <div>
            <span className="text-xl font-bold text-amber-800">NT${product.price}</span>
            <span className="text-xs text-stone-400 ml-1">/ 227g</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-800 hover:bg-amber-900 text-amber-50 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            加入
          </button>
        </div>
      </div>
    </div>
  );
}
