import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import ModalPrimary from '@components/UI/Modal/ModalPrimary';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from './FormControl';

function ConfirmDelete({ handleDelete, showConfirm, handleCloseConfirm }) {
	const {
		handleSubmit,
		formState: { isSubmitting },
	} = useForm();

	return (
		<ModalPrimary
			show={showConfirm}
			handleCloseModal={handleCloseConfirm}
			disabled={isSubmitting}
		>
			<div className="px-3 pt-4 flex flex-col gap-2">
				<h3>Are you sure to delete?</h3>
				<Form onSubmit={handleSubmit(handleDelete)}>
					<Button
						type="button"
						className={`underline`}
						onClick={handleCloseConfirm}
						disabled={isSubmitting}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						className="verify"
					>
						{isSubmitting ? <Loader type="submitting" /> : null}
						Delete
					</Button>
				</Form>
			</div>
		</ModalPrimary>
	);
}

export default ConfirmDelete;
