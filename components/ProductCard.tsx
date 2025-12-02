import React from 'react';
import { Product } from '../types';
import { ChevronRight, ShieldCheck, Flame } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const percentSold = ((product.totalShares - product.availableShares) / product.totalShares) * 100;
  
  return (
    <div 
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full relative"
      onClick={() => onClick(product)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.badge && (
            <div className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center">
                <Flame className="w-3 h-3 mr-1 fill-white" />
                {product.badge}
            </div>
        )}
        <div className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm border border-gray-200">
          {product.category}
        </div>
      </div>

      <div className="relative h-56 w-full overflow-hidden bg-gray-100">
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        <div className="absolute bottom-3 left-3 text-white flex items-center text-xs font-medium">
             <ShieldCheck className="w-4 h-4 mr-1 text-green-400" />
             Проверенный продавец
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
            {product.title}
        </h3>
        
        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-500">
            <div className="bg-gray-50 px-2 py-1.5 rounded border border-gray-100 text-center">
                Рейтинг {product.rating} ★
            </div>
            <div className="bg-gray-50 px-2 py-1.5 rounded border border-gray-100 text-center">
                 {product.totalShares} долей
            </div>
        </div>

        <div className="mt-auto space-y-4">
          {/* Progress Section */}
          <div className="bg-indigo-50/50 rounded-lg p-3 border border-indigo-100">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-medium text-indigo-900">Собрано средств</span>
              <span className="text-xs font-bold text-indigo-600">{Math.round(percentSold)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${percentSold}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1.5 text-[10px] text-gray-500">
                 <span>Осталось: {product.availableShares} долей</span>
                 <span>Всего: {product.totalShares}</span>
            </div>
          </div>

          <div className="flex justify-between items-end pt-2 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Цена за долю</p>
              <div className="flex items-baseline gap-1">
                 <p className="text-xl font-bold text-gray-900">{product.sharePrice.toLocaleString('ru-RU')}</p>
                 <span className="text-sm font-medium text-gray-400">₽</span>
              </div>
            </div>
            <button className="bg-gray-900 text-white p-2.5 rounded-xl hover:bg-indigo-600 transition-colors shadow-lg shadow-gray-200">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};