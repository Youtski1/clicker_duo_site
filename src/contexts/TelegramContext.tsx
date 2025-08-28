'use client'; 

import { useState, useEffect, createContext, useContext } from 'react';


interface User {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  allows_write_to_pm?: boolean;
};

interface ThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
};

interface TelegramData {
  user: User | undefined | null;
  themeParams: ThemeParams | undefined;
  isReady: boolean;
  isAvailable: boolean;
  initData: string;
};

const TelegramDataContext = createContext<TelegramData>({
  user: null,
  themeParams: undefined,
  isReady: false,
  isAvailable: true,
  initData: ""
});


interface Props {
  children: React.ReactNode;
}

export const TelegramDataProvider: React.FC<Props> = ({ children }) => {
  
  const [telegramData, setTelegramData] = useState<TelegramData>({
    user: null,
    themeParams: undefined,
    isReady: false,
    isAvailable: true,
    initData: ""
  });

    useEffect(() => {
      const checkTelegram = () => {
          if (window.Telegram && window.Telegram.WebApp) {
              const tg = window.Telegram.WebApp;
              const user = tg.initDataUnsafe?.user;
              const initData = tg.initData;
              const themeParams = tg.themeParams;

              console.log('Telegram Web App Initialized (Client)');
              console.log('User:', user);
              console.log('Theme Params:', themeParams);
              console.log('Init data:', initData);

              setTelegramData({ user, themeParams, isReady: true, isAvailable: true, initData: initData });

          } else {
              console.warn('Telegram Web Apps API not available (Client). Trying again...');
      
              setTimeout(checkTelegram, 500); 
            }
          };

      checkTelegram(); 
    }, []);

  return (
    <TelegramDataContext.Provider value={telegramData}>
      {telegramData.isAvailable? (children): null}
    </TelegramDataContext.Provider>
  );
};

export const useTelegramContext = () =>  useContext(TelegramDataContext)
