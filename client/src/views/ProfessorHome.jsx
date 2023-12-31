import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Container, Row, Col, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProposalCard from '../components/ProposalCard';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useLoading } from '../LoadingContext.jsx';
import Loading from '../components/Loading.jsx';
import PropTypes from 'prop-types';

function ProfessorHome({
	thesis,
	applications,
	handleError,
	handleSuccess,
	accessToken,
	dirty,
	setDirty,
	setCopiedProposal,
	setShowModal,
	setMsgModal,
}) {
	const navigate = useNavigate();
	const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
	const { loading } = useLoading();
	const [rapidFilter, setRapidFilter] = useState('active');
	const [filteredThesis, setFilteredThesis] = useState([]);

	useEffect(() => {
		if (rapidFilter === 'active') {
			setFilteredThesis(thesis.filter((thesis) => thesis.status == 1));
		} else {
			setFilteredThesis(thesis.filter((thesis) => thesis.status == 0));
		}
	}, [rapidFilter, thesis, applications, dirty]);

	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			loginWithRedirect();
		}
	}, [isAuthenticated, isLoading]);

	return loading ? (
		<Loading />
	) : (
		<>
			<div style={{ position: 'sticky', top: 0, zIndex: 2, backgroundColor: 'white', boxShadow: '0 4px 2px -2px rgba(0, 0, 0, 0.2)' }}>
				<Container>
					<Row style={{ paddingTop: 25, paddingBottom: 20 }}>
						<Col>
							<Nav variant='pills' activeKey={rapidFilter}>
								<Nav.Item>
									<Nav.Link eventKey='active' className='buttons-rapid-filter' onClick={() => setRapidFilter('active')}>
										Active
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey='archived' className='buttons-rapid-filter' onClick={() => setRapidFilter('archived')}>
										Archived
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
					</Row>
				</Container>
			</div>
			<Container>
				<Row style={{ marginBottom: 25 }}>
					{filteredThesis.length !== 0 ? (
						filteredThesis.map((thesis, index) => (
							<ProposalCard
								key={thesis.ID}
								isProfessor={1}
								thesis={thesis}
								setDirty={setDirty}
								handleError={handleError}
								handleSuccess={handleSuccess}
								accessToken={accessToken}
								isEditable={!applications.some((app) => app.id == thesis.ID && app.state == 1)}
								isArchived={thesis.status == 0}
								setCopiedProposal={setCopiedProposal}
								setGenericModal={setShowModal}
								setMsgModal={setMsgModal}
							/>
						))
					) : (
						<Col style={{ marginTop: 25 }}>
							<p>No thesis to display</p>
						</Col>
					)}
				</Row>
				<Button
					variant='primary'
					className='insert-proposal'
					style={{ borderRadius: 50 }}
					onClick={() => {
						navigate('/proposals/add');
					}}
				>
					<i className='bi bi-plus' style={{ fontSize: '1.5rem' }}></i>
				</Button>
			</Container>
		</>
	);
}
ProfessorHome.propTypes = {
	thesis: PropTypes.array.isRequired,
	applications: PropTypes.array.isRequired,
	handleError: PropTypes.func.isRequired,
	handleSuccess: PropTypes.func.isRequired,
	accessToken: PropTypes.string.isRequired,
	dirty: PropTypes.bool.isRequired,
	setDirty: PropTypes.func.isRequired,
	setCopiedProposal: PropTypes.func.isRequired,
	setShowModal: PropTypes.func.isRequired,
	setMsgModal: PropTypes.func.isRequired,
};

export default ProfessorHome;
