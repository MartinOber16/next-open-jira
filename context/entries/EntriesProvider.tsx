import { FC, PropsWithChildren, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';

export interface EntriesState {
	entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
	entries: [
		{
			_id: uuidv4(),
			description: 'Pendiente: Descripcion de prueba 1',
			status: 'pending',
			createdAt: Date.now(),
		},
		{
			_id: uuidv4(),
			description: 'En-Progreso: Descripcion de prueba 2',
			status: 'in-progress',
			createdAt: Date.now() - 1000000,
		},
		{
			_id: uuidv4(),
			description: 'Terminadas: Descripcion de prueba 3',
			status: 'finished',
			createdAt: Date.now() - 100000,
		},
	],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

	const addNewEntry = (description: string) => {
		const newEntry: Entry = {
			_id: uuidv4(),
			description,
			createdAt: Date.now(),
			status: 'pending',
		};

		dispatch({ type: '[Entry] - Add-Entry', payload: newEntry });
	};

	const updateEntry = (entry: Entry) => {
		dispatch({ type: '[Entry] - Updated-Entry', payload: entry });
	};

	return (
		<EntriesContext.Provider
			value={{
				...state,
				// methods
				addNewEntry,
				updateEntry,
			}}>
			{children}
		</EntriesContext.Provider>
	);
};
