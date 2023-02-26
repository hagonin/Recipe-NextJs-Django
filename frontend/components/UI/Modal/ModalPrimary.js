import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { GrClose } from 'react-icons/gr';
import Modal from '.';

function ModalPrimary({ show, handleCloseModal, children }) {
	return (
		<Modal
			show={show}
			handleClose={handleCloseModal}
		>
			<Transition.Child
				as={Fragment}
				enter="transition duration-200"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave=" transition"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="absolute text-center z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-md shadow-lg">
					<button
						className="absolute top-4 right-4 md:text-3xl text-4xl"
						onClick={handleCloseModal}
					>
						<GrClose />
					</button>
					{children}
				</div>
			</Transition.Child>
		</Modal>
	);
}

export default ModalPrimary;
