import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useLoading } from '../LoadingContext.jsx';
import Loading from '../components/Loading.jsx';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import API from '../API.jsx';

function Settings(props) {
    const { loading, setLoading } = useLoading();
    const { virtualClock, setVirtualClock, dateVirtualClock, setDateVirtualClock } = props;

    useEffect(() => {
        if (dateVirtualClock == null) {
            setVirtualClock(false);
        }
    }, []);

    const handleSwitchChange = (event) => {
        if (event.target.checked == false) {
            setDateVirtualClock(null);
            API.resetVirtualClock(props.accessToken)
                .then(() => {
                    props.setDirty(true);
                })
                .catch((err) => {
                    props.handleError(err);
                });

        }
        setVirtualClock(event.target.checked);
    }

    const handleDateVirtualClock = (event) => {
        setDateVirtualClock(event.target.value);
        API.setVirtualClock(props.accessToken, event.target.value)
            .then((res) => {
                props.handleSuccess(`Date set to ${event.target.value}`);
                props.setDirty(true);
            })
            .catch((err) => {
                props.handleError(err);
            });
    }


    return loading ? (
        <Loading />
    ) : (
        <Container>
            <Row style={{ marginTop: 25 }}>
                <Col>
                    <div style={{ fontSize: 30, fontWeight: 'bold' }}>Settings</div>
                </Col>
            </Row>
            <Card style={{ padding: 20, marginTop: 25 }} className='custom-card'>
                <Row>
                    <Col>
                        <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                            Virtual Clock
                            <Form.Check
                                type="switch"
                                id="true"
                                style={{ float: 'right', }}
                                checked={virtualClock}
                                onChange={handleSwitchChange}
                            />
                        </div>
                    </Col>
                </Row>
                {virtualClock && (
                    <div >
                        <hr />
                        <Row>
                            <Col md={4}>
                                <Form.Control
                                    type='date'
                                    value={dateVirtualClock ? dateVirtualClock : ''}
                                    min={dayjs().add(1, 'day').format('YYYY-MM-DD')}
                                    onChange={handleDateVirtualClock}
                                    inline='true'
                                />
                            </Col>
                            {/* <Col>
                                <Button style={{ marginLeft: 10 }} variant='primary' onClick={() => { }}>Apply</Button>
                            </Col> */}
                        </Row>
                    </div>
                )}
            </Card>
        </Container >
    );
}

export default Settings;
