import '@/styles/globals.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import { darkTheme, lightTheme } from '@/themes';
import { UIProvider } from '@/context/ui';

function App({ Component, pageProps }: AppProps) {
	return (
		<UIProvider>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</UIProvider>
	);
}

export default App;
