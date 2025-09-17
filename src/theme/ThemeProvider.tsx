import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import { createContext, useEffect, useState } from "react";

export type ThemeOption = 'light' | 'dark' | 'system';

const THEME_KEY = "@app_color_scheme";

type ThemeContextType = {
    preference: ThemeOption;
    applied: 'light' | 'dark'; // use on runtime 
    setPreference: (themeOption: ThemeOption) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {

    const {getColorScheme, setColorScheme} = useColorScheme();
    const [getPreference, setPreferenceState] = useState<ThemeOption>('system');
    const [isReady, setReady] = useState(false);

    useEffect(() => {
        async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(THEME_KEY);
                if (savedTheme === 'light' || savedTheme === 'dark') {
                    setColorScheme(savedTheme);
                    setPreferenceState(savedTheme);
                }else{
                    setColorScheme('system');
                    setPreferenceState('system');
                }
            } catch (error) {
                console.error("Failed to load theme preference:", error);
            } finally {
                setReady(true);
            }
        };
    },[setColorScheme]);

}