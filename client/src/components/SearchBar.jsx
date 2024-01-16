import React from 'react'
import { Row, Col, InputGroup, Form, Button } from 'react-bootstrap'
import { Color } from '../constants/colors.js'
import PropTypes from 'prop-types'

const SearchBar = ({ search, handleSearch }) => {
    return (
        <Row style={{ paddingTop: 25 }}>
            <Col lg={{ span: 4, offset: 4 }} md={12}>
                <InputGroup>
                    <Form.Control
                        placeholder='Search'
                        style={{ borderTopLeftRadius: 50, borderBottomLeftRadius: 50, borderColor: Color.primary }}
                        value={search}
                        onChange={handleSearch}
                    />
                    <Button variant='outline-primary' style={{ borderTopRightRadius: 50, borderBottomRightRadius: 50 }}>
                        <i className='bi bi-search'></i>
                    </Button>
                </InputGroup>
            </Col>
        </Row>
    )
}

SearchBar.propTypes = {
    search: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired
}
export default SearchBar