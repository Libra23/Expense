import React from 'react';
import {Button, ButtonToolbar, Table} from 'react-bootstrap'

const ReceiptTable = (props) => {
    console.log('Call ReceiptTable');
    console.log(props);

    const TableHeader =() => {
        const item = props.header.map((head, index)=>{
            if(head=="Date"){
                return(<th key={index} width="10%">{head}</th>);
            }
            return(
                <th key={index}>{head}</th>
            );
        });
        return(
            <tr>
                {item}
                <th width="10%">
                    Menu
                </th>
            </tr>
        );
    };

    const tableBody = props.list.map((receipt, index0)=>{
        const item = props.header.map((head, index1)=>{
            return(
                <td key={index1}>{receipt[head]}</td>
            );
        });
        return(
            <tr key={index0}>
                {item}
                <td>
                    <Button id={index0} onClick={props.onClick}>Edit</Button>
                </td>
            </tr>
        );
    });

    return(
        <Table bordered hover　width="100%">
            <thead>
                <TableHeader/>
            </thead>
            <tbody>
                {tableBody}
            </tbody>
        </Table>
    );
}

export default ReceiptTable;