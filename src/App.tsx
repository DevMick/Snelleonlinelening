import React from 'react';
import { ConfigProvider } from 'antd';
import { LanguageProvider } from './contexts/LanguageContext';
import Footer from './components/Footer';
import LoanForm from './components/LoanForm';
import { useLanguage } from './contexts/LanguageContext';
import BioImage from './assets/images/image1.jpeg';
import Logo from './assets/images/Logo.png';
import { Select } from 'antd';
import { 
  BriefcaseIcon, 
  BoltIcon, 
  ShieldCheckIcon, 
  DevicePhoneMobileIcon,
  LanguageIcon 
} from '@heroicons/react/24/outline';
import './App.css';

const AppContent: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section avec Bio */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-8 pb-16">
          <div className="container mx-auto px-4">
            {/* Logo et sélecteur de langue en haut */}
            <div className="flex justify-between items-center mb-12">
              <img src={Logo} alt="Logo" className="h-16 md:h-24 w-auto hover:scale-105 transition-transform duration-300" />
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                <LanguageIcon className="w-5 h-5 text-orange-500" />
                <Select
                  value={language}
                  onChange={setLanguage}
                  className="w-32"
                  bordered={false}
                  options={[
                    { value: 'nl', label: 'Nederlands' },
                    { value: 'fr', label: 'Français' },
                  ]}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image - affichée en premier sur mobile, à droite sur desktop */}
              <div className="order-2 md:order-1 flex justify-center md:justify-end">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-blue-600 rounded-2xl blur-2xl opacity-20"></div>
                  <img 
                    src={BioImage} 
                    alt="Snelle Online Lening" 
                    className="relative rounded-2xl shadow-2xl w-auto max-w-full h-auto hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* Contenu texte - affiché en second sur mobile, à gauche sur desktop */}
              <div className="order-1 md:order-2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
                  {t.bio.title}
                </h1>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  {t.bio.description}
                </p>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  {t.bio.paragraph1}
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {t.bio.paragraph2}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-orange-500">
                    <BriefcaseIcon className="w-10 h-10 text-orange-500 mb-3" />
                    <h3 className="font-semibold text-gray-800 text-sm">{t.bio.features.business}</h3>
                  </div>
                  <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-red-600">
                    <BoltIcon className="w-10 h-10 text-red-600 mb-3" />
                    <h3 className="font-semibold text-gray-800 text-sm">{t.bio.features.speed}</h3>
                  </div>
                  <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-blue-600">
                    <ShieldCheckIcon className="w-10 h-10 text-blue-600 mb-3" />
                    <h3 className="font-semibold text-gray-800 text-sm">{t.bio.features.security}</h3>
                  </div>
                  <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-orange-500">
                    <DevicePhoneMobileIcon className="w-10 h-10 text-orange-500 mb-3" />
                    <h3 className="font-semibold text-gray-800 text-sm">{t.bio.features.access}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formulaire Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <LoanForm />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#F7941D',
          colorSuccess: '#0066CC',
          borderRadius: 8,
        },
      }}
    >
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ConfigProvider>
  );
}

export default App;
