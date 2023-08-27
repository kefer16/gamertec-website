import { useEffect } from "react";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";

export interface IMultiSelectProps {
	code: string;
	name: string;
	selected: boolean;
}

interface Props {
	title: string;
	placeholder: string;
	options: IMultiSelectProps[];
	disabled: boolean;
	selectedOptions: IMultiSelectProps[];
	fuctionSelectedOptions: (options: IMultiSelectProps[]) => void;
}

export const MultiSelectPrimeUI = ({
	title,
	placeholder,
	options,
	disabled,
	selectedOptions,
	fuctionSelectedOptions,
}: Props) => {
	const obtenerData = async (
		options: IMultiSelectProps[],
		fuctionSelectedCities: (options: IMultiSelectProps[]) => void
	) => {
		fuctionSelectedCities([]);
		const array: IMultiSelectProps[] = [];

		if (options.length > 0) {
			options.forEach((element: IMultiSelectProps) => {
				if (element.selected) {
					array.push(element);
				}
			});
			if (array.length > 0) {
				fuctionSelectedCities([...array]);
			}
		}
	};

	useEffect(() => {
		obtenerData(options, fuctionSelectedOptions);
	}, [options, fuctionSelectedOptions]);

	const onChange = (e: MultiSelectChangeEvent) => {
		if (!disabled) {
			fuctionSelectedOptions(e.value);
		}
	};

	return (
		<div className="flex flex-column">
			<label htmlFor="locale-user" className="font-bold mb-1">
				{title}
			</label>

			<MultiSelect
				className="w-full"
				value={selectedOptions}
				onChange={(e: MultiSelectChangeEvent) => {
					onChange(e);
				}}
				dataKey={"name"}
				options={options}
				optionLabel="name"
				filter
				display="chip"
				removeIcon
				placeholder={placeholder}
			/>
		</div>
	);
};
