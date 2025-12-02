import React from 'react';
import { ShoppingCart, Menu, Search, Store, LayoutGrid, Heart, User, Bell, LogOut } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  cartCount: number;
  favoritesCount: number;
  isLoggedIn: boolean;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onSearch: (query: string) => void;
  onToggleLogin: () => void;
  onResetFilters: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  favoritesCount,
  isLoggedIn,
  currentView, 
  onNavigate, 
  onSearch,
  onToggleLogin,
  onResetFilters
}) => {
  
  const handleCatalogClick = () => {
    onNavigate(ViewState.HOME);
    onResetFilters();
  };

  const handleUtilityClick = (name: string) => {
    alert(`Раздел "${name}" находится в разработке.`);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <button onClick={() => handleUtilityClick('О платформе')} className="hover:text-white cursor-pointer transition-colors">О платформе</button>
            <button onClick={() => handleUtilityClick('Гарантии')} className="hover:text-white cursor-pointer transition-colors">Гарантии</button>
            <button onClick={() => handleUtilityClick('Помощь')} className="hover:text-white cursor-pointer transition-colors">Помощь</button>
          </div>
          <div className="flex space-x-6">
            <span className="hover:text-white cursor-pointer transition-colors">8 (800) 555-35-35</span>
            <span className="hover:text-white cursor-pointer transition-colors">support@fractional.market</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center gap-8">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={handleCatalogClick}>
              <div className="bg-indigo-600 p-2.5 rounded-xl mr-3 shadow-lg shadow-indigo-200 group-hover:bg-indigo-700 transition-colors">
                <LayoutGrid className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-slate-900 leading-none">PartMarket</span>
                <span className="text-xs text-slate-500 font-medium tracking-wide mt-0.5">MARTEKPLACE</span>
              </div>
            </div>

            {/* Catalog Button & Search */}
            <div className="flex-1 max-w-2xl flex items-center gap-4">
               <button 
                onClick={handleCatalogClick}
                className="hidden md:flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
               >
                  <Menu className="h-5 w-5 mr-2" />
                  Каталог
               </button>
               <div className="flex-1 relative">
                <input
                  type="text"
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all text-sm"
                  placeholder="Найти актив для инвестиций..."
                  onChange={(e) => onSearch(e.target.value)}
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3.5 top-2.5" />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 sm:space-x-6">
              <button
                onClick={() => onNavigate(ViewState.VENDOR)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                    currentView === ViewState.VENDOR ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'
                }`}
              >
                <Store className="h-6 w-6 mb-1" />
                <span className="text-[10px] font-medium hidden sm:block">Продать</span>
              </button>

              <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

              <button 
                onClick={() => onNavigate(ViewState.FAVORITES)}
                className={`relative flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                  currentView === ViewState.FAVORITES ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <div className="relative">
                  <Heart className={`h-6 w-6 mb-1 ${currentView === ViewState.FAVORITES ? 'fill-current' : ''}`} />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-2 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold leading-none text-white transform bg-red-500 rounded-full border-2 border-white">
                      {favoritesCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium hidden sm:block">Избранное</span>
              </button>

              <button
                onClick={() => onNavigate(ViewState.CART)}
                className={`relative flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                  currentView === ViewState.CART ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'
                }`}
              >
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 mb-1" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-2 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold leading-none text-white transform bg-red-500 rounded-full border-2 border-white">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium hidden sm:block">Корзина</span>
              </button>
              
              <button 
                onClick={onToggleLogin}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                  isLoggedIn ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'
                }`}
              >
                 {isLoggedIn ? <LogOut className="h-6 w-6 mb-1" /> : <User className="h-6 w-6 mb-1" />}
                 <span className="text-[10px] font-medium hidden sm:block">
                   {isLoggedIn ? 'Выйти' : 'Войти'}
                 </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};