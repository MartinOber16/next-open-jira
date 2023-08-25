import { UIContext } from '@/context/ui';
import { Entry } from '@/interfaces';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material';
import { DragEvent, FC, useContext } from 'react';

interface Props {
	entry: Entry;
}

const EntryCard: FC<Props> = ({ entry }) => {
	const { startDragging, endDragging } = useContext(UIContext);

	const onDragStart = (event: DragEvent) => {
		// console.log(event);
		event.dataTransfer.setData('text', entry._id);
		startDragging();
	};

	const onDragEnd = (event: DragEvent) => {
		endDragging();
	};

	return (
		<Card
			sx={{ marginBottom: 1 }}
			draggable
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}>
			<CardActionArea>
				<CardContent>
					<Typography sx={{ whiteSpace: 'pre-line' }}>
						{entry.description}
					</Typography>
				</CardContent>
				<CardActions
					sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
					<Typography variant='body2'>hace 30 mínutos</Typography>
				</CardActions>
			</CardActionArea>
		</Card>
	);
};

export default EntryCard;
