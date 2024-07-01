import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#modal-root');

interface CustomModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	onConfirm: () => void;
	message: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
	isOpen,
	onRequestClose,
	onConfirm,
	message,
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="Confirm Modal"
			className="bg-white py-12 px-6 rounded-md w-[40rem] h-[20rem] flex items-center justify-center"
			overlayClassName="overlay"
		>
			<div className="flex flex-col justify-around w-full h-full gap-6">
				<h2 className="text-lg font-semibold">Mensaje de confirmación</h2>
				<p className="text-base">{message}</p>
				<div className="flex flex-row justify-between items-center">
					<button
						onClick={onConfirm}
						className="bg-green-500 hover:bg-green-800 text-white py-2 px-6 rounded-md font-medium w-[15rem] h-[3.75rem] cursor-pointer border-none"
					>
						Confirmar
					</button>
					<button
						onClick={onRequestClose}
						className="bg-red-500 hover:bg-red-900 text-white py-2 px-6 rounded-md font-medium w-[15rem] h-[3.75rem] cursor-pointer border-none"
					>
						Cancelar
					</button>
				</div>
			</div>
		</Modal>
	);
};

export { CustomModal };
