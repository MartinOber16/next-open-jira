import { db } from '@/database';
import { Entry, IEntry } from '@/models';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { message: string } | IEntry;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { id } = req.query;

	if (!mongoose.isValidObjectId(id)) {
		return res.status(400).json({ message: 'El id no es válido ' + id });
	}

	switch (req.method) {
		case 'PUT':
			return updateEntry(req, res);

		case 'GET':
			return getEntryById(req, res);

		case 'DELETE':
			return deleteEntryById(req, res);

		default:
			return res.status(400).json({ message: 'El método no existe' });
	}
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { id } = req.query;

	await db.connect();

	const entryToUpdate = await Entry.findById(id);

	if (!entryToUpdate) {
		await db.disconnect();
		return res
			.status(400)
			.json({ message: 'No hay entrada con ese ID: ' + id });
	}

	const {
		description = entryToUpdate.description,
		status = entryToUpdate.status,
	} = req.body;

	try {
		const updatedEntry = await Entry.findByIdAndUpdate(
			id,
			{ description, status },
			{ runValidators: true, new: true }
		);
		// entryToUpdate.description = description;
		// entryToUpdate.status = status;
		// await entryToUpdate.save();
		await db.disconnect();

		return res.status(200).json(updatedEntry!);
	} catch (error: any) {
		console.log(error);
		await db.disconnect();

		return res.status(400).json({ message: error.errors.status.message });
	}
};

const getEntryById = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const { id } = req.query;

	await db.connect();
	const entryDB = await Entry.findById(id);
	await db.disconnect();

	if (!entryDB) {
		return res.status(400).json({ message: 'No existe entrada para ID ' + id });
	}

	return res.status(200).json(entryDB);
};

const deleteEntryById = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const { id } = req.query;

	await db.connect();
	const entryDB = await Entry.findByIdAndDelete(id);
	await db.disconnect();

	if (!entryDB) {
		return res.status(400).json({ message: 'No existe entrada para ID ' + id });
	}

	return res.status(200).json(entryDB);
};
