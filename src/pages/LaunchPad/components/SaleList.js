import { useState, useEffect } from "react";
import { Table } from "antd";
import { AcyModal } from "@/components/Acy";
const WhileList = props => {
    const {editFun}=props;
    // Add 
    const Add=props=>{
        return <AcyModal>

        </AcyModal>
    }
    // Edit
    const Edit=props=>{
        return <AcyModal>
            
        </AcyModal>
    }
    // Delete
    const Delete=props=>{
        
    }
    const transferTableHeader = [
        {
            title: 'Date Time(UTC)',
            dataIndex: 'dateTime',
            className: 'column-date',
            width: 80,
            align: 'left',
        },
        {
            title: 'Participants',
            dataIndex: 'participant',
            width: 60,
            align: 'left',
            ellipsis: true,
        },
        {
            title: 'USDT',
            dataIndex: 'quantity',
            width: 60,
            align: 'left',
            ellipsis: true,
        },
        {
            title: 'Token',
            dataIndex: 'Amount',
            width: 60,
            align: 'left',
            ellipsis: true,
        },
    ];
    const {dataSource}=props;
    return <Table
        id="transferTable"
        columns={transferTableHeader}
        dataSource={dataSource}
        pagination={false}
        scroll={{ y: 400 }}
    />;
}
export default WhileList;