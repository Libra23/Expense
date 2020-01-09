import React　from 'react';
import {Button, ButtonGroup, Modal, Nav, Navbar, Container,Row, Col} from 'react-bootstrap';

import Edit from './Edit'
import ReceiptTable from './ReceiptTable'

function App() {

    const onCreate = (e) => {
        console.log('Call create');
        var receipt={};
        receipt['id'] = 0;
        receipt['Date'] = e.target.formDate.value;
        var date= new Date(receipt['Date']);
        receipt['Year'] = date.getFullYear();
        receipt['Month'] = date.getMonth() + 1;
        receipt['Day'] = date.getDate();
        receipt['Content'] = e.target.formContent.value;
        receipt['Amount'] = e.target.formAmount.value;
        receipt['Shop'] = e.target.formShop.value;
        receipt['Flow'] = e.target.formFlow.value;
        receipt['Necessity'] = e.target.formNecessity.value;
        receipt['Note'] = e.target.formNote.value;

        console.log(receipt);
        fetch('http://localhost:3000/api/receipts', {
            method: 'POST',
            headers : { "Content-type" : "application/json; charset=utf-8" },
            body: JSON.stringify(receipt)
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            setReceiptList(json);
        })
        .catch(error => console.error('Error:', error))
    }

    const onRead = (e) => {
        console.log('Call read');
        fetch('http://localhost:3000/api/receipts', {
            method: 'GET',
            headers : { "Content-type" : "application/json; charset=utf-8" },
            body: JSON.stringify(requsetBody)
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            setReceiptList(json);
        })
        .catch(error => console.error('Error:', error))
    }

    const onUpdate = (e) => {
        console.log('Call update');
        var id = e.target.id;
        var receipt = {};
        receipt['Date'] = e.target.formDate.value;
        var date= new Date(receipt['Date']);
        receipt['Year'] = date.getFullYear();
        receipt['Month'] = date.getMonth() + 1;
        receipt['Day'] = date.getDate();
        receipt['Content'] = e.target.formContent.value;
        receipt['Amount'] = e.target.formAmount.value;
        receipt['Shop'] = e.target.formShop.value;
        receipt['Flow'] = e.target.formFlow.value;
        receipt['Necessity'] = e.target.formNecessity.value;
        receipt['Note'] = e.target.formNote.value;
        console.log(receipt);
        fetch('http://localhost:3000/api/receipts/'+id, {
            method: 'PUT',
            headers : { "Content-type" : "application/json; charset=utf-8" },
            body: JSON.stringify(receipt)
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            setReceiptList(json);
        })
        .catch(error => console.error('Error:', error))
    }

    const onDelete = (e) => {
        console.log('Call delete');
        e.preventDefault();
        var id = e.target.id;
        fetch('http://localhost:3000/api/receipts/'+id, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            setReceiptList(json);
        })
        .catch(error => console.error('Error:', error))
    }
    
    const onHide = (e) => {
        console.log("Call hide");
        setShow(false);
    }

    const onClickRefresh = (e) => {
        e.preventDefault();

        onRead(e);
    }

    const onClickBack = (e) => {
        e.preventDefault();
        var month_back = month - 1;
        if(month_back < 1) {
            month_back = 12;
            setYear(year - 1);
        }
        var body = {"filter": "Month", "Year": year, "Month": month};
        setRequestBody(body);
        setMonth(month_back);
    }

    const onClickNext = (e) => {
        e.preventDefault();
        var month_next = month + 1;
        if(month_next > 12) {
            month_next = 1;
            setYear(year + 1);
        }
        var body = {"filter": "month", "year": year, "month": month};
        setRequestBody(body);
        setMonth(month_next);
    }

    const onClickEdit = (e) => {
        console.log("Call edit");
        e.preventDefault();
        var index = e.target.id;
        setFocusReceipt(receiptList[index]);
        setShow(true);
    }

    const onClickAdd = (e) => {
        console.log("Call add");
        e.preventDefault();
        var receipt={};
        var date= new Date();
        var year =  date.getFullYear();
        var month =  date.getMonth() + 1;
        var day = date.getDate();
        receipt['id'] = 0;
        receipt['Date'] = year + '-' + month + '-' + day;
        receipt['Content'] = "";
        receipt['Amount'] = "";
        receipt['Shop'] = "";
        receipt['Note'] = "";
        setFocusReceipt(receipt);
        setShow(true);
    }

    const onClickSave = (e) => {
        console.log("Call save");
        e.preventDefault();
        onHide();
        console.log(e.target.id);
        if(e.target.id==0) {
            onCreate(e);
        }else{
            onUpdate(e);
        }
    }

    const onClickDelete = (e) => {
        console.log("Call delete");
        e.preventDefault();
        onHide();
        console.log(e.target.id);
        if(e.target.id==0) {
        }else{
            onDelete(e);
        }
    }
    
    var today = new Date();
    const [show, setShow] = React.useState(false);
    const [receiptList, setReceiptList] = React.useState([]);
    const [year, setYear] = React.useState(today.getFullYear());
    const [month, setMonth] = React.useState(today.getMonth()+1);
    const [focusReceipt, setFocusReceipt] = React.useState({});
    const [requsetBody, setRequestBody] = React.useState({});
    const receiptHeader = ["Day", "Content", "Amount", "Shop", "Category"];

    console.log('Render');
    return(
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                    Receipt App
                </Navbar.Brand>
                <ButtonGroup>
                    <Button size="sm" variant="light" onClick={onClickBack}>&lt;</Button>
                    <Button size="sm" variant="light" onClick={onClickNext}>&gt;</Button>
                </ButtonGroup>
                <Navbar.Text>
                    {year}/{month}
                </Navbar.Text>
                <Navbar.Collapse className="justify-content-end">
                <ButtonGroup>
                    <Button variant="primary" onClick={onClickAdd}>Add</Button>
                    <Button variant="secondary" onClick={onClickRefresh}>Refresh</Button>
                </ButtonGroup>
                </Navbar.Collapse>
            </Navbar>

            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Edit element={focusReceipt} onSubmit={onClickSave} onClick={onClickDelete}/>
                </Modal.Body>
            </Modal>
            <ReceiptTable
            onClick={onClickEdit}
            header={receiptHeader} 
            list={receiptList.filter((e) => {return e.Month==month})}/>
        </div>
    );
}

export default App;