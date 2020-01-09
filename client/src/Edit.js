import React　from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';


const Edit = (props) => {
    console.log('Call Edit');
    console.log(props);
    return(
        <Form id={props.element['id']} onSubmit={props.onSubmit}>
            <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" defaultValue={props.element['Date']}/>
            </Form.Group>
            <Form.Group controlId="formContent">
                <Form.Label>Content</Form.Label>
                <Form.Control type="text" defaultValue={props.element['Content']}/>
            </Form.Group>
            <Form.Group controlId="formAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" defaultValue={props.element['Amount']}/>
            </Form.Group>
            <Form.Group controlId="formShop">
                <Form.Label>Shop</Form.Label>
                <Form.Control type="text" defaultValue={props.element['Shop']}/>
            </Form.Group>
            <Form.Group controlId="formFlow">
                <Form.Label>Flow</Form.Label>
                <Form.Control as="select" defaultValue={props.element['Flow']}>
                    <option>Outgo</option>
                    <option>Income</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formNecessity">
                <Form.Label>Necessity</Form.Label>
                <Form.Control as="select" defaultValue={props.element['Necessity']}>
                    <option>Necessary</option>
                    <option>Unnecessary</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formNote">
                <Form.Label>Note</Form.Label>
                <Form.Control type="text"  defaultValue={props.element['Note']}/>
            </Form.Group>
            <Form.Group as={Row}>
                <Col xs={{offset:8}}>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                    <Button variant="secondary" id={props.element['id']} onClick={props.onClick}>
                        Delete
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    );
}

export default Edit;