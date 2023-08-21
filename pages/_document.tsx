import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap'
				/>
				<link rel='shortcut icon' href='/favicon.ico' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
