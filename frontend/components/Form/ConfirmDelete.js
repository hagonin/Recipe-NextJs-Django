import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import ModalPrimary from '@components/UI/Modal/ModalPrimary';
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
			<div className=" pt-4 flex flex-col gap-2">
				<h4>Are you sure you want to delete ?</h4>
				<Form
					onSubmit={handleSubmit(handleDelete)}
					className="!flex-row gap-2 mt-5 justify-center"
				>
					<Button
						type="button"
						className="cancle"
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
