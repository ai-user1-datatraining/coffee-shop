import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  total: number;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export default function Cart({
  items,
  total,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  onContinueShopping,
}: CartProps) {
  const shipping = total >= 1000 ? 0 : 80;
  const finalTotal = total + shipping;

  if (items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-stone-800 mb-2">購物車是空的</h2>
          <p className="text-stone-500 mb-8">快去挑選您喜愛的咖啡吧！</p>
          <button
            onClick={onContinueShopping}
            className="px-8 py-3 bg-amber-800 hover:bg-amber-900 text-amber-50 rounded-xl font-medium transition-colors shadow-md"
          >
            瀏覽商品
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={onContinueShopping}
          className="flex items-center gap-2 text-stone-600 hover:text-amber-800 transition-colors group"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-800">購物車</h1>
        <span className="text-sm text-stone-400">({items.length} 項商品)</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 p-4 bg-white rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-stone-800 text-sm sm:text-base truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-stone-400">{item.product.nameEn}</p>
                    <p className="text-xs text-stone-500 mt-1">
                      {item.product.roastLevel} · {item.product.origin}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(item.product.id)}
                    className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-amber-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="px-2.5 py-1.5 hover:bg-amber-50 text-stone-600 transition-colors text-sm"
                    >
                      −
                    </button>
                    <span className="px-3 py-1.5 text-stone-800 font-medium text-sm border-x border-amber-200 min-w-[2.5rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="px-2.5 py-1.5 hover:bg-amber-50 text-stone-600 transition-colors text-sm"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold text-amber-800">
                    NT${(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-amber-100 shadow-sm p-6 sticky top-24">
            <h3 className="font-bold text-stone-800 text-lg mb-4">訂單摘要</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>商品小計</span>
                <span>NT${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>運費</span>
                <span>{shipping === 0 ? '免運費' : `NT$${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">
                  再消費 NT${(1000 - total).toLocaleString()} 即可免運費
                </p>
              )}
              <div className="border-t border-amber-100 pt-3 flex justify-between items-baseline">
                <span className="font-bold text-stone-800">總計</span>
                <span className="text-xl font-bold text-amber-800">
                  NT${finalTotal.toLocaleString()}
                </span>
              </div>
            </div>
            <button
              onClick={onCheckout}
              className="w-full mt-6 py-3.5 bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-900 hover:to-stone-900 text-amber-50 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
            >
              前往結帳
            </button>
            <button
              onClick={onContinueShopping}
              className="w-full mt-3 py-3 border border-amber-200 text-amber-800 rounded-xl font-medium hover:bg-amber-50 transition-colors"
            >
              繼續購物
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
