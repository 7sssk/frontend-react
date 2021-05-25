// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      accent_gold: string;
      accent_gold_80: string;
      accent_gold_40: string;
      primary_90: string;
      primary_20: string;
      accent_white: string;
      accent_red: string;
      accent_blue: string;
      accent_blue_80: string;
      accent_blue_40: string;
      secondary_48: string;
      secondary_34: string;
    };
  }
}