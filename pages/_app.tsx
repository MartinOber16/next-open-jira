import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { UIProvider } from '@/context/ui';
import { EntriesProvider } from '@/context/entries';
import { darkTheme, lightTheme } from '@/themes';
import '@/styles/globals.css';

function App({ Component, pageProps }: AppProps) {
	return (
		<SnackbarProvider maxSnack={3}>
			<EntriesProvider>
				<UIProvider>
					<ThemeProvider theme={darkTheme}>
						<CssBaseline />
						<Component {...pageProps} />
					</ThemeProvider>
				</UIProvider>
			</EntriesProvider>
		</SnackbarProvider>
	);
}

export default App;
