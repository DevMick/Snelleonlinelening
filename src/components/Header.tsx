import React from 'react';
import { Select } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from '../assets/images/Logo.jpeg';

const Header: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-16 md:h-20 w-auto" />
        </div>
        
        <div className="flex items-center gap-2">
          <GlobalOutlined className="text-gray-600" />
          <Select
            value={language}
            onChange={setLanguage}
            className="w-32"
            options={[
              { value: 'nl', label: 'Nederlands' },
              { value: 'fr', label: 'Français' },
            ]}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
