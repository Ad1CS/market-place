import React from 'react';
import { CartItem } from '../types';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onRemove: (productId: string) => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({ items, onRemove, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + (item.product.sharePrice * item.quantityShares), 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-indigo-50 p-8 rounded-full mb-6">
            <ShoppingBag className="h-16 w-16 text-indigo-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Ваша корзина пуста</h2>
        <p className="text-gray-500 mt-3 max-w-sm text-center">Вы еще не добавили ни одного актива. Перейдите в каталог, чтобы найти выгодные предложения.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Оформление сделки</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-semibold text-gray-900">Состав портфеля ({items.length})</h3>
                </div>
                <ul className="divide-y divide-gray-100">
                {items.map((item) => (
                    <li key={item.product.id} className="p-6 flex flex-col sm:flex-row items-center sm:justify-between hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
                        <img 
                            src={item.product.imageUrl} 
                            alt={item.product.title} 
                            className="h-24 w-32 object-cover rounded-xl border border-gray-200 mr-6"
                        />
                        <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{item.product.title}</h3>
                        <p className="text-sm text-gray-500 bg-gray-100 inline-block px-2 py-0.5 rounded">{item.product.category}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between w-full sm:w-auto space-x-12">
                        <div className="text-center">
                            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Количество</p>
                            <div className="font-semibold text-gray-900 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200">
                                {item.quantityShares} шт.
                            </div>
                        </div>
                        <div className="text-right w-32">
                            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Стоимость</p>
                            <p className="font-bold text-xl text-indigo-600">
                                {(item.product.sharePrice * item.quantityShares).toLocaleString('ru-RU')} ₽
                            </p>
                        </div>
                        <button 
                        onClick={() => onRemove(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                        title="Удалить"
                        >
                        <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                    </li>
                ))}
                </ul>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                 <ShieldCheck className="h-5 w-5 text-blue-600 mt-0.5" />
                 <div>
                    <h4 className="font-semibold text-blue-900 text-sm">Безопасная сделка</h4>
                    <p className="text-blue-700 text-sm mt-1">Все средства холдируются на эскроу-счете до момента регистрации прав собственности в реестре.</p>
                 </div>
            </div>
        </div>

        <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Итого</h3>
                
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                        <span>Стоимость активов</span>
                        <span>{total.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Комиссия за сделку</span>
                        <span className="text-green-600">Бесплатно</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Регистрационный сбор</span>
                        <span>0 ₽</span>
                    </div>
                    <div className="h-px bg-gray-200 my-2"></div>
                    <div className="flex justify-between items-end">
                        <span className="text-lg font-bold text-gray-900">К оплате</span>
                        <span className="text-2xl font-bold text-indigo-600">{total.toLocaleString('ru-RU')} ₽</span>
                    </div>
                </div>

                <button
                    onClick={onCheckout}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center group"
                >
                    Перейти к оплате
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-xs text-center text-gray-400 mt-4">
                    Нажимая кнопку, вы соглашаетесь с условиями публичной оферты
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};