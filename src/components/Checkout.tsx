import { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutProps {
  items: CartItem[];
  total: number;
  onComplete: () => void;
  onBack: () => void;
}

export default function Checkout({ items, total, onComplete, onBack }: CheckoutProps) {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'credit',
    note: '',
  });

  const shipping = total >= 1000 ? 0 : 80;
  const finalTotal = total + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    // Simulate processing
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  if (step === 'processing') {
    return (
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <div className="absolute inset-0 border-4 border-amber-200 rounded-full" />
            <div className="absolute inset-0 border-4 border-amber-700 rounded-full border-t-transparent animate-spin" />
          </div>
          <h2 className="text-xl font-bold text-stone-800 mb-2">處理中...</h2>
          <p className="text-stone-500">正在確認您的訂單，請稍候</p>
        </div>
      </main>
    );
  }

  if (step === 'success') {
    return (
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center bg-white rounded-2xl p-8 sm:p-12 border border-amber-100 shadow-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-3">訂單成立！</h2>
          <p className="text-stone-500 mb-2">感謝您的訂購</p>
          <p className="text-sm text-stone-400 mb-6">
            訂單編號：#{Math.random().toString(36).substring(2, 10).toUpperCase()}
          </p>
          <div className="bg-amber-50 rounded-xl p-4 mb-8 border border-amber-100">
            <p className="text-sm text-stone-600">
              我們已收到您的訂單，將盡快為您安排出貨。
              <br />
              確認信件已寄送至您的信箱。
            </p>
          </div>
          <button
            onClick={onComplete}
            className="px-8 py-3 bg-amber-800 hover:bg-amber-900 text-amber-50 rounded-xl font-medium transition-colors shadow-md"
          >
            返回首頁
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={onBack}
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
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-800">結帳</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl border border-amber-100 shadow-sm p-6">
              <h3 className="font-bold text-stone-800 text-lg mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                聯絡資訊
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">姓名 *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    placeholder="王小明"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">電話 *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    placeholder="0912-345-678"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">電子信箱 *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl border border-amber-100 shadow-sm p-6">
              <h3 className="font-bold text-stone-800 text-lg mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                配送地址
              </h3>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1.5">完整地址 *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="台北市大安區和平東路 123 號 5 樓"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-stone-600 mb-1.5">備註</label>
                <textarea
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none"
                  placeholder="如有特殊配送需求請在此說明"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl border border-amber-100 shadow-sm p-6">
              <h3 className="font-bold text-stone-800 text-lg mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                付款方式
              </h3>
              <div className="space-y-3">
                {[
                  { value: 'credit', label: '信用卡', icon: '💳' },
                  { value: 'atm', label: 'ATM 轉帳', icon: '🏦' },
                  { value: 'cod', label: '貨到付款', icon: '📦' },
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                      formData.paymentMethod === method.value
                        ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-200'
                        : 'border-stone-200 hover:border-amber-200 hover:bg-amber-50/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.value}
                      checked={formData.paymentMethod === method.value}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="sr-only"
                    />
                    <span className="text-xl">{method.icon}</span>
                    <span className="font-medium text-stone-700">{method.label}</span>
                    {formData.paymentMethod === method.value && (
                      <svg className="w-5 h-5 text-amber-600 ml-auto" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-900 hover:to-stone-900 text-amber-50 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              確認訂單 · NT${finalTotal.toLocaleString()}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-amber-100 shadow-sm p-6 sticky top-24">
            <h3 className="font-bold text-stone-800 text-lg mb-4">訂單內容</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-700 truncate">{item.product.name}</p>
                    <p className="text-xs text-stone-400">x{item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium text-stone-700 flex-shrink-0">
                    NT${(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-amber-100 mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>商品小計</span>
                <span>NT${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>運費</span>
                <span>{shipping === 0 ? '免運費' : `NT$${shipping}`}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-amber-50">
                <span className="font-bold text-stone-800">總計</span>
                <span className="text-lg font-bold text-amber-800">NT${finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
