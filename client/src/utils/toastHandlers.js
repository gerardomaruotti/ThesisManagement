import toast from 'react-hot-toast';

export function handleError(err) {
	let errorMessage = err;
	if (err instanceof Error) {
		errorMessage = err.message;
	}

	toast.error(errorMessage, {
		position: 'bottom-center',
		duration: 5000,
		style: {
			borderRadius: '10px',
			background: 'rgba(255, 0, 0, 0.9)',
			color: '#fff',
		},
	});
}

export function handleSuccess(msg) {
	let successMessage = msg;
	if (msg instanceof Error) {
		successMessage = msg.message;
	}

	toast.success(successMessage, {
		position: 'bottom-center',
		style: {
			borderRadius: '10px',
			background: 'rgba(40, 199, 111, 0.9)',
			color: '#fff',
		},
	});
}
