import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  BriefcaseIcon, 
  BoltIcon, 
  ShieldCheckIcon, 
  DevicePhoneMobileIcon 
} from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-800 text-white mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">
              {t.footer.contact}
            </h3>
            <p className="text-gray-300">
              {t.bio.description}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">
              Links
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  {t.footer.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  {t.footer.terms}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">
              {t.bio.features.title}
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center gap-2">
                <BriefcaseIcon className="w-5 h-5 text-orange-400" />
                {t.bio.features.business}
              </li>
              <li className="flex items-center gap-2">
                <BoltIcon className="w-5 h-5 text-orange-400" />
                {t.bio.features.speed}
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5 text-orange-400" />
                {t.bio.features.security}
              </li>
              <li className="flex items-center gap-2">
                <DevicePhoneMobileIcon className="w-5 h-5 text-orange-400" />
                {t.bio.features.access}
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
