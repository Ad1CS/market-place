import React, { useState, useMemo, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { VendorDashboard } from './components/VendorDashboard';
import { Product, ViewState, CartItem } from './types';
import { LayoutGrid, Filter, ChevronRight, TrendingUp, Shield, Users, Heart } from 'lucide-react';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Коммерческое помещение в ЦАО, Москва',
    description: 'Готовый арендный бизнес с якорным арендатором (сетевой ритейл). Высокая доходность 12% годовых. Расположение в историческом центре с высоким трафиком.',
    category: 'Недвижимость',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    totalPrice: 15000000,
    totalShares: 1000,
    availableShares: 450,
    sharePrice: 15000,
    sellerName: 'InvestGroup',
    rating: 4.8,
    badge: 'Хит'
  },
  {
    id: '2',
    title: 'Коллекционный Porsche 911 (1974)',
    description: 'Винтажный автомобиль в идеальном состоянии. Экспертная оценка подтверждает рост стоимости на 15% ежегодно. Хранится в специализированном климатическом боксе.',
    category: 'Транспорт',
    imageUrl: 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=1200',
    totalPrice: 8500000,
    totalShares: 100,
    availableShares: 22,
    sharePrice: 85000,
    sellerName: 'ClassicCars',
    rating: 5.0,
    badge: 'Редкость'
  },
  {
    id: '3',
    title: 'Серверный кластер H100 для ИИ',
    description: 'Высокопроизводительная вычислительная мощность. Контракты с IT-компаниями на аренду уже подписаны. Окупаемость 18 месяцев.',
    category: 'Техника',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=1200',
    totalPrice: 4000000,
    totalShares: 50,
    availableShares: 48,
    sharePrice: 80000,
    sellerName: 'TechInvest',
    rating: 4.5,
    badge: 'Новинка'
  },
  {
    id: '4',
    title: 'Картина "Утро в сосновом лесу"',
    description: 'Оригинал современного художника, оммаж Шишкину. Перспективный актив для арт-рынка. Участвует в международных выставках.',
    category: 'Искусство',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb39279c71?auto=format&fit=crop&q=80&w=1200',
    totalPrice: 500000,
    totalShares: 200,
    availableShares: 150,
    sharePrice: 2500,
    sellerName: 'ArtDealer',
    rating: 4.9
  }
];

const CATEGORIES = ['Все', 'Недвижимость', 'Транспорт', 'Техника', 'Искусство', 'Бизнес'];

type SortOption = 'popular' | 'price_asc' | 'price_desc';

export default function App() {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [sortOption, setSortOption] = useState<SortOption>('popular');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const catalogRef = useRef<HTMLDivElement>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView(ViewState.PRODUCT_DETAIL);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantityShares: item.quantityShares + quantity }
            : item
        );
      }
      return [...prev, { product, quantityShares: quantity }];
    });
    setProducts(prev => prev.map(p => 
      p.id === product.id ? { ...p, availableShares: p.availableShares - quantity } : p
    ));
    setView(ViewState.HOME);
    window.scrollTo(0, 0);
  };

  const handleRemoveFromCart = (productId: string) => {
    const item = cart.find(i => i.product.id === productId);
    if(item) {
        setProducts(prev => prev.map(p => 
            p.id === productId ? { ...p, availableShares: p.availableShares + item.quantityShares } : p
        ));
    }
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      alert('Пожалуйста, войдите в систему для совершения покупки.');
      // Ideally show auth modal
      setIsLoggedIn(true);
      return;
    }
    alert('Спасибо за покупку! Права собственности успешно зарегистрированы.');
    setCart([]);
    setView(ViewState.HOME);
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    setView(ViewState.HOME);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(id)) {
        newFavs.delete(id);
      } else {
        newFavs.add(id);
      }
      return newFavs;
    });
  };

  const toggleLogin = () => {
    setIsLoggedIn(prev => !prev);
    if (!isLoggedIn) {
        alert('Вы успешно вошли в систему!');
    } else {
        alert('Вы вышли из системы.');
    }
  };

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Все' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sorting logic
    if (sortOption === 'price_asc') {
      result.sort((a, b) => a.sharePrice - b.sharePrice);
    } else if (sortOption === 'price_desc') {
      result.sort((a, b) => b.sharePrice - a.sharePrice);
    } else {
      // Default / Popular (mock: assuming rating or just original order)
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortOption]);

  const favoriteProducts = products.filter(p => favorites.has(p.id));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantityShares, 0)} 
        favoritesCount={favorites.size}
        isLoggedIn={isLoggedIn}
        currentView={view}
        onNavigate={(v) => {
          setView(v);
          window.scrollTo(0,0);
        }}
        onSearch={setSearchQuery}
        onToggleLogin={toggleLogin}
        onResetFilters={() => {
          setSelectedCategory('Все');
          setSearchQuery('');
        }}
      />

      <main className="flex-grow">
        {view === ViewState.HOME && (
          <div>
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-800 text-white">
                <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                            Инвестируйте в активы,<br/> которые раньше были недоступны
                        </h1>
                        <p className="text-indigo-200 text-lg mb-8 max-w-lg">
                            PartMarket позволяет покупать доли в недвижимости, бизнесе и предметах роскоши от 1 000 рублей.
                        </p>
                        <div className="flex space-x-4">
                            <button 
                                onClick={scrollToCatalog}
                                className="bg-white text-indigo-900 px-8 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors"
                            >
                                Начать инвестировать
                            </button>
                            <button onClick={() => alert('Информационный раздел в разработке')} className="border border-indigo-400 text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
                                Как это работает
                            </button>
                        </div>
                    </div>
                    <div className="hidden lg:grid grid-cols-2 gap-4 opacity-90">
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                            <TrendingUp className="h-8 w-8 text-green-400 mb-3" />
                            <div className="font-bold text-xl">15-30%</div>
                            <div className="text-sm text-indigo-200">Средняя доходность</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 translate-y-8">
                            <Shield className="h-8 w-8 text-blue-400 mb-3" />
                            <div className="font-bold text-xl">Защита</div>
                            <div className="text-sm text-indigo-200">Смарт-контракты</div>
                        </div>
                         <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                            <Users className="h-8 w-8 text-purple-400 mb-3" />
                            <div className="font-bold text-xl">50k+</div>
                            <div className="text-sm text-indigo-200">Инвесторов</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 translate-y-8">
                            <LayoutGrid className="h-8 w-8 text-orange-400 mb-3" />
                            <div className="font-bold text-xl">1000+</div>
                            <div className="text-sm text-indigo-200">Активных лотов</div>
                        </div>
                    </div>
                </div>
            </div>

            <div ref={catalogRef} className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                
                {/* Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-gray-200 pb-6">
                   <div className="flex items-center space-x-2 overflow-x-auto pb-4 md:pb-0 w-full md:w-auto scrollbar-hide">
                     {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                                selectedCategory === cat 
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                        >
                            {cat}
                        </button>
                     ))}
                   </div>
                   
                   <div className="flex items-center text-sm text-gray-500 mt-4 md:mt-0 ml-auto">
                        <span className="mr-2">Сортировка:</span>
                        <select 
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value as SortOption)}
                            className="bg-transparent border-none font-semibold text-gray-900 focus:ring-0 cursor-pointer focus:outline-none"
                        >
                            <option value="popular">По популярности</option>
                            <option value="price_asc">По цене (возр.)</option>
                            <option value="price_desc">По цене (убыв.)</option>
                        </select>
                   </div>
                </div>

                {/* Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                        <LayoutGrid className="h-16 w-16 text-gray-200 mx-auto mb-4"/>
                        <h3 className="text-lg font-medium text-gray-900">Товары не найдены</h3>
                        <p className="text-gray-500 max-w-md mx-auto mt-2">Попробуйте изменить категорию или поисковый запрос</p>
                        <button onClick={() => {setSearchQuery(''); setSelectedCategory('Все')}} className="mt-4 text-indigo-600 font-medium hover:underline">Сбросить фильтры</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard 
                        key={product.id} 
                        product={product} 
                        onClick={handleProductClick} 
                        />
                    ))}
                    </div>
                )}
            </div>
          </div>
        )}

        {view === ViewState.FAVORITES && (
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex items-center gap-3 mb-8">
                    <Heart className="h-8 w-8 text-red-500 fill-current" />
                    <h1 className="text-3xl font-bold text-gray-900">Избранное</h1>
                </div>
                
                {favoriteProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                        <Heart className="h-16 w-16 text-gray-200 mx-auto mb-4"/>
                        <h3 className="text-lg font-medium text-gray-900">Список избранного пуст</h3>
                        <p className="text-gray-500 max-w-md mx-auto mt-2">Добавляйте интересующие вас активы, чтобы следить за изменением цен.</p>
                        <button onClick={() => setView(ViewState.HOME)} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                            Перейти в каталог
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {favoriteProducts.map(product => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                onClick={handleProductClick} 
                            />
                        ))}
                    </div>
                )}
            </div>
        )}

        {view === ViewState.PRODUCT_DETAIL && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            isFavorite={favorites.has(selectedProduct.id)}
            onBack={() => setView(ViewState.HOME)}
            onAddToCart={handleAddToCart}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {view === ViewState.CART && (
          <Cart 
            items={cart} 
            onRemove={handleRemoveFromCart}
            onCheckout={handleCheckout}
          />
        )}

        {view === ViewState.VENDOR && (
          <VendorDashboard onAddProduct={handleAddProduct} />
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-16 mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
                <div className="flex items-center text-white mb-6">
                    <LayoutGrid className="h-6 w-6 mr-2 text-indigo-500" />
                    <span className="font-bold text-xl">PartMarket</span>
                </div>
                <p className="text-sm mb-6 leading-relaxed">
                    Первая в России платформа для коллективных инвестиций в реальные активы через токенизацию прав собственности.
                </p>
                <div className="text-sm text-slate-500">
                    © 2024 PartMarket Inc.
                </div>
            </div>
            
            <div>
                <h4 className="text-white font-bold mb-6">Покупателям</h4>
                <ul className="space-y-3 text-sm">
                    <li onClick={() => {setView(ViewState.HOME); scrollToCatalog();}} className="hover:text-white cursor-pointer">Каталог активов</li>
                    <li onClick={() => alert('Раздел в разработке')} className="hover:text-white cursor-pointer">Как купить долю</li>
                    <li onClick={() => alert('Раздел в разработке')} className="hover:text-white cursor-pointer">Вторичный рынок</li>
                    <li onClick={() => alert('Раздел в разработке')} className="hover:text-white cursor-pointer">Безопасность</li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6">Продавцам</h4>
                <ul className="space-y-3 text-sm">
                    <li onClick={() => setView(ViewState.VENDOR)} className="hover:text-white cursor-pointer">Добавить лот</li>
                    <li onClick={() => alert('Раздел в разработке')} className="hover:text-white cursor-pointer">Тарифы размещения</li>
                    <li onClick={() => alert('Раздел в разработке')} className="hover:text-white cursor-pointer">Агентская программа</li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6">Контакты</h4>
                <ul className="space-y-3 text-sm">
                    <li>Москва, Пресненская наб., 12</li>
                    <li>support@fractional.market</li>
                    <li className="text-white font-bold text-lg mt-2">8 (800) 555-35-35</li>
                </ul>
            </div>
        </div>
      </footer>
    </div>
  );
}