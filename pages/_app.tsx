import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {},
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default MyApp;
