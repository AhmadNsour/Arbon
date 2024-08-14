import React, {createContext, ReactNode} from 'react';
import Config from 'react-native-config';

export const ConfigContext = createContext(Config);

interface ConfigProviderProps {
  children: ReactNode;
}

export const ConfigProvider = ({
  children,
}: ConfigProviderProps): React.JSX.Element => {
  return (
    <ConfigContext.Provider value={Config}>{children}</ConfigContext.Provider>
  );
};
