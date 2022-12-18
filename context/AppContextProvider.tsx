import { FC, createContext, ReactNode, Dispatch, SetStateAction, useState } from 'react';

interface ProviderProps {
    children: ReactNode;
}

interface AppContext {
    notifs: string[];
    setNotifs: Dispatch<SetStateAction<string[]>>;
};

export const AppCtx = createContext<AppContext | null>(null);

const AppContextProvider: FC<ProviderProps> = ({ children }) => {
    const [notifs, setNotifs] = useState<string[]>([]);
    
    return (
        <AppCtx.Provider value={{ notifs, setNotifs }}>
            {children}
        </AppCtx.Provider>
    );
};

export default AppContextProvider;