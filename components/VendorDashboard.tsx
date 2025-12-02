import React, { useState } from 'react';
import { Product } from '../types';
import { generateProductDescription } from '../services/geminiService';
import { Wand2, Plus, Loader2, Image as ImageIcon, DollarSign, Package, FileText } from 'lucide-react';

interface VendorDashboardProps {
  onAddProduct: (product: Product) => void;
}

export const VendorDashboard: React.FC<VendorDashboardProps> = ({ onAddProduct }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Недвижимость',
    totalPrice: 1000000,
    totalShares: 100,
    imageUrl: 'https://picsum.photos/800/600',
    description: '',
    badge: ''
  });

  const handleGenerateDescription = async () => {
    if (!formData.title) return;
    
    setLoading(true);
    const desc = await generateProductDescription(formData.title, formData.category);
    setFormData(prev => ({ ...prev, description: desc }));
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description || 'Описание отсутствует',
      category: formData.category,
      imageUrl: formData.imageUrl,
      totalPrice: Number(formData.totalPrice),
      totalShares: Number(formData.totalShares),
      availableShares: Number(formData.totalShares), 
      sharePrice: Number(formData.totalPrice) / Number(formData.totalShares),
      sellerName: 'Текущий Пользователь',
      rating: 5.0,
      badge: formData.badge
    };
    onAddProduct(newProduct);
    setFormData({
        title: '',
        category: 'Недвижимость',
        totalPrice: 1000000,
        totalShares: 100,
        imageUrl: 'https://picsum.photos/800/600',
        description: '',
        badge: ''
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Кабинет продавца</h1>
          <p className="text-gray-500 mt-2">Управление лотами и создание новых инвестиционных предложений</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
            {/* Basic Details Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                    <Package className="h-5 w-5 text-indigo-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Основная информация</h2>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Название актива</label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            placeholder="Например: Апартаменты в Сочи, ЖК Морской"
                            value={formData.title}
                            onChange={e => setFormData({...formData, title: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                            <select
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                                value={formData.category}
                                onChange={e => setFormData({...formData, category: e.target.value})}
                            >
                                <option>Недвижимость</option>
                                <option>Транспорт</option>
                                <option>Искусство</option>
                                <option>Бизнес</option>
                                <option>Техника</option>
                            </select>
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">Маркетинговая метка</label>
                             <select
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                                value={formData.badge}
                                onChange={e => setFormData({...formData, badge: e.target.value})}
                             >
                                <option value="">Без метки</option>
                                <option value="Хит">Хит продаж</option>
                                <option value="Новинка">Новинка</option>
                                <option value="Высокий доход">Высокий доход</option>
                             </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-indigo-600" />
                        <h2 className="text-lg font-semibold text-gray-900">Описание</h2>
                    </div>
                    <button
                        type="button"
                        onClick={handleGenerateDescription}
                        disabled={loading || !formData.title}
                        className="flex items-center text-sm text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="h-3 w-3 mr-1 animate-spin"/> : <Wand2 className="h-3 w-3 mr-1"/>}
                        AI Помощник
                    </button>
                </div>
                <textarea
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-48 resize-none"
                    placeholder="Подробное описание инвестиционной привлекательности..."
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                />
            </div>
        </div>

        {/* Right Column - Financials & Media */}
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                    <DollarSign className="h-5 w-5 text-indigo-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Финансы</h2>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Полная стоимость (₽)</label>
                        <input
                            required
                            type="number"
                            min="1000"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            value={formData.totalPrice}
                            onChange={e => setFormData({...formData, totalPrice: Number(e.target.value)})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Количество долей</label>
                        <input
                            required
                            type="number"
                            min="2"
                            max="10000"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            value={formData.totalShares}
                            onChange={e => setFormData({...formData, totalShares: Number(e.target.value)})}
                        />
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mt-4">
                        <div className="text-sm text-gray-500 mb-1">Стоимость одной доли</div>
                        <div className="text-2xl font-bold text-indigo-600">
                            {(Number(formData.totalPrice) / Number(formData.totalShares)).toLocaleString('ru-RU')} ₽
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                    <ImageIcon className="h-5 w-5 text-indigo-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Медиа</h2>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL изображения</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        value={formData.imageUrl}
                        onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                    />
                    {formData.imageUrl && (
                        <div className="mt-3 rounded-lg overflow-hidden h-32 w-full border border-gray-200">
                            <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center"
            >
                <Plus className="h-5 w-5 mr-2" />
                Опубликовать лот
            </button>
        </div>

      </form>
    </div>
  );
};