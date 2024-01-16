import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';

const RequestTitleInCard = ({ request }) => {
    const navigate = useNavigate();
    return (
        <Button
            className='title'
            variant='link'
            onClick={() => navigate('/requests/' + request.id)}
            style={{
                fontWeight: 'medium',
                fontSize: 18,
                height: 60,
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: '2',
                overflow: 'hidden',
                cursor: 'pointer',
            }}
        >
            {request.title}
        </Button>
    )
}

RequestTitleInCard.propTypes = {
    request: PropTypes.object.isRequired
}
export default RequestTitleInCard