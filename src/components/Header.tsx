interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
  cartOpen: boolean;
}

export default function Header({ cartCount, onCartClick, onLogoClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-900 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-amber-50 text-lg">☕</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-stone-800 leading-tight">焙刻咖啡</h1>
              <p className="text-xs text-stone-400 -mt-0.5">Artisan Coffee</p>
            </div>
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={onLogoClick}
              className="text-stone-600 hover:text-amber-800 font-medium transition-colors"
            >
              精選咖啡
            </button>
            <span className="text-stone-400">|</span>
            <span className="text-stone-400 text-sm">新鮮烘焙</span>
            <span className="text-stone-400 text-sm">產地直送</span>
          </nav>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-all hover:shadow-md"
          >
            <svg
              className="w-5 h-5 text-amber-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
            <span className="text-sm font-medium text-amber-800 hidden sm:inline">購物車</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
