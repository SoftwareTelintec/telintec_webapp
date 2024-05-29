import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#modal-root');

interface CustomModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	onConfirm: () => void;
	message: string;
}

export default function CustomModal({
	isOpen,
	onRequestClose,
	onConfirm,
	message,
}: CustomModalProps) {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="Confirm Modal"
			className="modal"
			overlayClassName="overlay"
		>
			<div className="modal-content">
				<h2>Confirmación</h2>
				<p>{message}</p>
				<div className="modal-actions">
					<button onClick={onConfirm} className="confirm-button">
						Confirmar
					</button>
					<button onClick={onRequestClose} className="cancel-button">
						Cancelar
					</button>
				</div>
			</div>
		</Modal>
	);
}
