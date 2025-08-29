
interface Telegram {
    WebApp: {
      initData: string;
      initDataUnsafe: {
        user?: {
          id: number;
          first_name: string;
          last_name?: string;
          username?: string;
          language_code?: string;
          is_premium?: boolean;
          allows_write_to_pm?: boolean;
        };

      };
      themeParams: {
        bg_color?: string;
        text_color?: string;
        hint_color?: string;
        link_color?: string;
        button_color?: string;
        button_text_color?: string;
        secondary_bg_color?: string;
      };
      MainButton: {
        text: string;
        onClick: (callback: () => void) => void;
        show: () => void;
        hide: () => void;

      };
      BackButton: {
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
      };
  
      HapticFeedback: {
        impact: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
        notification: (type: 'error' | 'success' | 'warning') => void;
        vibrate: (duration: number | number[]) => void;
      }
  
      showPopup: (options: {
          title?: string;
          message: string;
          buttons?: {
              id?: string;
              type?: 'default' | 'destructive' | 'cancel';
              text: string;
          }[];
      }) => void;
  
      showConfirm: (options: {
          title?: string;
          message: string;
      }) => void;
  
      sendData: (data: string) => void;
  

    };
  }
  
  interface Window {
    Telegram?: Telegram;
  }
  