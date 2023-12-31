import { Entry } from '@/interfaces';
import { createContext } from 'react';

export interface ContextProps {
	entries: Entry[];
	// Methods
	addNewEntry: (description: string) => void;
	updateEntry: (entry: Entry, showSnackbar?: boolean) => void;
	deleteEntry: (entry: Entry, showSnackbar?: boolean) => void;
}

export const EntriesContext = createContext({} as ContextProps);
