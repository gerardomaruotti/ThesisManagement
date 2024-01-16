import React from 'react'
import { Color } from '../constants/colors.js'
import { Popover } from 'react-bootstrap'
import PropTypes from 'prop-types'

const MyPopover = ({ request }) => {
    return (
        <>
            {!request.notes ? (
                <Popover.Body>No note left by supervisor</Popover.Body>
            ) : (
                <>
                    <Popover.Header as='h3' style={{ color: Color.primary }}>
                        Changes requested by the supervisor
                    </Popover.Header>
                    <Popover.Body>{request.notes}</Popover.Body>
                </>
            )

            }
        </>
    )
}

MyPopover.propTypes = {
    request: PropTypes.object.isRequired,
}
export default MyPopover