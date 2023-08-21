import { NextPage } from 'next';
import { Typography } from '@mui/material';
import { Layout } from '@/components/layouts';

const HomePage: NextPage = () => {
	return (
		<Layout title='HOLA MUNDO'>
			<Typography variant='h1' color='primary'>
				Hola Mundo
			</Typography>
		</Layout>
	);
};

export default HomePage;
