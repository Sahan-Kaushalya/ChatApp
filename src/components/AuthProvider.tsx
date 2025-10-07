import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useMemo, useState } from "react";

type AuthContextType = {
    userId: string | null;
    isLoading: boolean;
    signUp: (id: string) => Promise<void>;
    signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const USER_ID_KEY = "userId"; // saved name on AsyncStorage

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                const storeId = await AsyncStorage.getItem(USER_ID_KEY);
                setUserId(storeId);
            } catch (error) {
                console.error("Error retrieving userId from storage:", error);
            }finally{
                setTimeout(() => {
                    setLoading(false);
                }, 4000);
            }
        })();
    }, []);

    const signUp = async (id: string) => {
        await AsyncStorage.setItem(USER_ID_KEY,id);
        setUserId(id);
    };

    const signOut = async () => {
        await AsyncStorage.removeItem(USER_ID_KEY);
        setUserId(null);
    };

    // when calling this hook, if any value inside the dependency array changes, 
    // the value will be recalculated.

    const value = useMemo(()=>({userId,isLoading,signUp,signOut}),[userId,isLoading]);
    return<AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

