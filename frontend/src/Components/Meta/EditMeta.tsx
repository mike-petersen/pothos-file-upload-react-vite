import {Button, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import update from "immutability-helper";
import React, {useState} from "react";
import {Dictionary} from "../../lib/models/Dictionary";

type EditMetaProps = {
	meta?: Dictionary;
	setMeta: (meta: Dictionary) => void;
};

type Entry = {
	key: string;
	value: string;
};

export const EditMeta: React.FC<EditMetaProps> = (props) => {
	const [entry, setEntry] = useState<Entry>({key: '', value: ''});

	return (
		<>
			<h4 style={{textAlign: 'center'}}>Meta</h4>

			<Table>
				<TableHead>
					<TableRow>
						<TableCell component="th">
							Key
						</TableCell>
						<TableCell component="th">
							Value
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{Object.keys(props.meta ?? {}).map((key, idx) => {
						return (
							<TableRow key={idx}>
								<TableCell>{key}</TableCell>
								<TableCell>{props.meta![key]}</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>

			<TextField
				label="Key"
				value={entry.key}
				onChange={e => {
					const newData = update(entry, {
						key: {$set: e.target.value},
					});
					setEntry(newData);
				}}
			/>
			<TextField
				label="Value"
				value={entry.value}
				onChange={e => {
					const newData = update(entry, {
							value: {
								$set: e.target.value
							},
						})
					;
					setEntry(newData);
				}}
			/>
			<Button
				variant="contained"
				onClick={() => {
					const newData = update((props.meta ?? {}) as Dictionary, {
						[entry.key]: {$set: entry.value},
					});
					props.setMeta(newData);
				}}
			>
				Add
			</Button>
		</>
	);
};
