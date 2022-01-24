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
            title: 'Time',
            dataIndex: 'dateTime',
            className: 'column-date',
            width: 80,
            align: 'left',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: 60,
            align: 'left',
            ellipsis: true,
        },
        {
            title: 'Basic',
            dataIndex: 'basic',
            width: 60,
            align: 'left',
            ellipsis: true,
        },
        {
            title: 'Allocation',
            dataIndex: 'Amount',
            width: 60,
            align: 'left',
            ellipsis: true,
        },
        {
            title: 'Bouns',
            dataIndex: 'bouns',
            width: 60,
            align: 'left',
            ellipsis: true,
        }
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