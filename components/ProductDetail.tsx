import React, { useState } from 'react';
import { Product } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle, FileText, BarChart3, Info, Share2, Heart, Download } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  isFavorite: boolean;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleFavorite: (id: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  isFavorite,
  onBack, 
  onAddToCart,
  onToggleFavorite
}) => {
  const [sharesToBuy, setSharesToBuy] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'financials' | 'docs'>('desc');

  const availablePercentage = (product.availableShares / product.totalShares) * 100;
  const soldPercentage = 100 - availablePercentage;

  const data = [
    { name: 'Выкуплено', value: soldPercentage, color: '#e2e8f0' },
    { name: 'Доступно', value: availablePercentage, color: '#4f46e5' },
  ];

  const handleIncrement = () => {
    if (sharesToBuy < product.availableShares) setSharesToBuy(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (sharesToBuy > 1) setSharesToBuy(prev => prev - 1);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Ссылка на товар скопирована в буфер обмена!');
  };

  const handleDownload = (docName: string) => {
    alert(`Началась загрузка документа: "${docName}"`);
  };

  const totalPrice = sharesToBuy * product.sharePrice;
  const percentageToBuy = (sharesToBuy / product.totalShares) * 100;

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
        {/* Breadcrumb / Back */}
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <button 
                    onClick={onBack}
                    className="flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Назад к списку предложений
                </button>
            </div>
        </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8">
            {/* Gallery / Image */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
               <div className="relative h-[400px] w-full bg-gray-100">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 flex space-x-2">
                     <button 
                        onClick={handleShare}
                        className="p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white text-gray-600 transition-colors shadow-sm"
                        title="Поделиться"
                     >
                        <Share2 className="h-5 w-5" />
                     </button>
                     <button 
                        onClick={() => onToggleFavorite(product.id)}
                        className={`p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-colors shadow-sm ${isFavorite ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
                        title={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
                     >
                        <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                     </button>
                  </div>
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded shadow-md">
                        {product.badge}
                    </div>
                  )}
               </div>
               
               {/* Quick Stats Bar */}
               <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100">
                  <div className="p-4 text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Рейтинг</p>
                    <p className="text-lg font-bold text-gray-900">{product.rating} / 5.0</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Участников</p>
                    <p className="text-lg font-bold text-gray-900">124</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Категория</p>
                    <p className="text-lg font-bold text-indigo-600">{product.category}</p>
                  </div>
               </div>
            </div>

            {/* Tabs & Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200">
                   <div className="flex px-6 space-x-8 overflow-x-auto">
                      <button 
                        onClick={() => setActiveTab('desc')}
                        className={`py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'desc' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                      >
                         <div className="flex items-center"><Info className="h-4 w-4 mr-2" />Описание</div>
                      </button>
                      <button 
                        onClick={() => setActiveTab('financials')}
                        className={`py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'financials' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                      >
                         <div className="flex items-center"><BarChart3 className="h-4 w-4 mr-2" />Долевая структура</div>
                      </button>
                      <button 
                        onClick={() => setActiveTab('docs')}
                        className={`py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'docs' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                      >
                         <div className="flex items-center"><FileText className="h-4 w-4 mr-2" />Документы</div>
                      </button>
                   </div>
                </div>

                <div className="p-6 lg:p-8">
                   {activeTab === 'desc' && (
                     <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">{product.title}</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {product.description}
                        </p>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Преимущества актива</h3>
                        <ul className="list-disc pl-5 text-gray-600 space-y-2">
                            <li>Высокая ликвидность на вторичном рынке долей.</li>
                            <li>Юридическая чистота сделки гарантируется платформой.</li>
                            <li>Возможность пассивного дохода от аренды/использования.</li>
                            <li>Профессиональное управление активом.</li>
                        </ul>
                     </div>
                   )}

                   {activeTab === 'financials' && (
                     <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="h-64 w-64 flex-shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                                </Pie>
                                <RechartsTooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex-1 space-y-4">
                            <h3 className="text-lg font-semibold">Статус наполнения</h3>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Общая капитализация</span>
                                    <span className="font-bold text-gray-900">{product.totalPrice.toLocaleString('ru-RU')} ₽</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Всего выпущено долей</span>
                                    <span className="font-bold text-gray-900">{product.totalShares} шт.</span>
                                </div>
                                <div className="w-full h-px bg-gray-200 my-2"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-indigo-600 font-medium">Свободно к покупке</span>
                                    <span className="text-xl font-bold text-indigo-600">{product.availableShares} шт.</span>
                                </div>
                            </div>
                        </div>
                     </div>
                   )}

                   {activeTab === 'docs' && (
                       <div className="space-y-3">
                           {['Инвестиционный меморандум.pdf', 'Оценка стоимости актива.pdf', 'Договор коллективного владения.pdf'].map((doc, i) => (
                               <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors group">
                                   <div className="flex items-center text-gray-700">
                                       <FileText className="h-5 w-5 mr-3 text-indigo-500" />
                                       <span className="text-sm font-medium">{doc}</span>
                                   </div>
                                   <button 
                                    onClick={() => handleDownload(doc)}
                                    className="text-xs text-indigo-600 flex items-center opacity-0 group-hover:opacity-100 transition-opacity font-medium"
                                   >
                                     <Download className="w-3 h-3 mr-1" />
                                     Скачать
                                   </button>
                               </div>
                           ))}
                       </div>
                   )}
                </div>
            </div>
          </div>

          {/* Sidebar / Sticky Action Card */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-24">
                <div className="mb-6">
                   <div className="flex items-end justify-between mb-1">
                      <p className="text-sm text-gray-500">Текущая цена доли</p>
                      {product.availableShares < 10 && (
                          <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Осталось мало!</span>
                      )}
                   </div>
                   <div className="flex items-baseline gap-2">
                       <span className="text-3xl font-extrabold text-gray-900">{product.sharePrice.toLocaleString('ru-RU')}</span>
                       <span className="text-xl text-gray-500 font-medium">₽</span>
                   </div>
                </div>

                {/* Calculator */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6">
                   <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Количество долей</label>
                   
                   <div className="flex items-center mb-4">
                        <button 
                            onClick={handleDecrement}
                            className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-all shadow-sm active:scale-95"
                            disabled={sharesToBuy <= 1}
                        >-</button>
                        <div className="flex-1 text-center">
                            <input 
                                type="text" 
                                readOnly 
                                value={sharesToBuy}
                                className="w-full text-center bg-transparent text-xl font-bold text-gray-900 border-none focus:ring-0 p-0"
                            />
                        </div>
                        <button 
                            onClick={handleIncrement}
                            className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-all shadow-sm active:scale-95"
                            disabled={sharesToBuy >= product.availableShares}
                        >+</button>
                   </div>

                   <div className="flex justify-between items-center text-sm py-2 border-t border-gray-200 border-dashed">
                       <span className="text-gray-500">Доля во владении</span>
                       <span className="font-medium text-gray-900">{percentageToBuy.toFixed(2)}%</span>
                   </div>
                   <div className="flex justify-between items-center text-sm py-2 border-t border-gray-200 border-dashed">
                       <span className="text-gray-500">Комиссия платформы</span>
                       <span className="font-medium text-green-600">0 ₽</span>
                   </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-medium text-gray-700">Итого:</span>
                    <span className="text-2xl font-bold text-indigo-600">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>

                <button 
                   onClick={() => onAddToCart(product, sharesToBuy)}
                   className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl transition-all flex items-center justify-center mb-4 active:scale-[0.98]"
                >
                   <CheckCircle2 className="h-5 w-5 mr-2" />
                   Купить долю
                </button>

                <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-lg text-xs text-gray-600">
                    <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <p>Сделка защищена смарт-контрактом. Права собственности регистрируются мгновенно после оплаты.</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};