interface SeedData {
	entries: SeedEntry[];
}

interface SeedEntry {
	description: string;
	status: string;
	createdAt: number;
}

export const seedData: SeedData = {
	entries: [
		{
			description: 'Pendiente: Descripcion de prueba 1',
			status: 'pending',
			createdAt: Date.now(),
		},
		{
			description: 'En-Progreso: Descripcion de prueba 2',
			status: 'in-progress',
			createdAt: Date.now() - 1000000,
		},
		{
			description: 'Terminadas: Descripcion de prueba 3',
			status: 'finished',
			createdAt: Date.now() - 100000,
		},
	],
};
