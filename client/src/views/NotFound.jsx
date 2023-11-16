import 'bootstrap/dist/css/bootstrap.min.css';

function NotFound() {
	return (
		<div className='d-flex justify-content-center align-items-center min-vh-100'>
			<div className='text-center'>
				<h1 className='display-1'>404</h1>
				<p className='lead'>Page Not Found</p>
			</div>
		</div>
	);
}

export default NotFound;
