import { Error, InputField, Label } from '@components/Form/FormControl';
import { useFieldArray } from 'react-hook-form';
import { MdDeleteOutline } from 'react-icons/md';
import IngredientItem from './IngredientItem';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Button from '@components/UI/Button';
import Tippy from '@tippyjs/react';

function IngredientGroup({ control, register, name, error }) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: name,
	});
	return (
		<div className="flex flex-col gap-2">
			{fields.map((field, index) => (
				<div
					key={field.id}
					className="flex flex-col gap-2"
				>
					<div className="flex gap-2 ">
						<div className="w-full">
							<InputField
								label="Heading"
								info={{
									content: (
										<span>
											Put your heading of ingredient
											group, example: sauce, toppings,
											main ingredient, optional ingredient
										</span>
									),
									placement: 'right',
								}}
								name={`${name}.${index}.heading`}
								type="text"
								register={register}
								rules={{ required: 'Enter heading' }}
								placeholder="Heading of ingredient group."
								error={error?.[index]?.heading}
							/>
						</div>
						<button
							type="button"
							onClick={() => remove(index)}
							className="h-10"
						>
							<IoIosCloseCircleOutline />
						</button>
					</div>
					<IngredientItem
						register={register}
						control={control}
						name={`${name}.${index}.items`}
						error={error?.[index]?.items}
					/>
				</div>
			))}
			<Button
				type="button"
				className="tag w-44"
				onClick={() => append({ heading: null })}
			>
				+ Add Heading
			</Button>
		</div>
	);
}

export default IngredientGroup;
