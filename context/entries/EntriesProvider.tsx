import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { entriesApi } from '@/apis';

export interface EntriesState {
	entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
	entries: [],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

	const addNewEntry = async (description: string) => {
		// const newEntry: Entry = {
		// 	_id: uuidv4(),
		// 	description,
		// 	createdAt: Date.now(),
		// 	status: 'pending',
		// };
		const { data } = await entriesApi.post<Entry>('/entries', { description });
		dispatch({ type: '[Entry] - Add-Entry', payload: data });
	};

	const updateEntry = async (entry: Entry) => {
		try {
			const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`, {
				description: entry.description,
				status: entry.status,
			});
			dispatch({ type: '[Entry] - Updated-Entry', payload: data });
		} catch (error) {
			console.log({ error });
		}
	};

	const refreshEntries = async () => {
		const { data } = await entriesApi.get<Entry[]>('/entries');
		dispatch({ type: '[Entry] - Refresh-Data', payload: data });
	};

	useEffect(() => {
		refreshEntries();
	}, []);

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
