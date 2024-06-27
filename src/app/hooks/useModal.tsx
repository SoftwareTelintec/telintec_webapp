import { useState } from 'react';

const useModal = () => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState('');
	const [confirmAction, setConfirmAction] = useState<() => void>(
		() => () => {}
	);

	const openModal = (message: string, action: () => void) => {
		setModalMessage(message);
		setConfirmAction(() => action);
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const handleConfirm = () => {
		confirmAction();
		closeModal();
	};

	return {
		modalIsOpen,
		modalMessage,
		openModal,
		closeModal,
		handleConfirm,
	};
};

export default useModal;
