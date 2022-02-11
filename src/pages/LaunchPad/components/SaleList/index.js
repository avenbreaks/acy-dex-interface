import { useState, useEffect } from "react";
import { Table, Form, Modal, Row, Col, Input, message } from "antd";
import Media from 'react-media';
// Edit 
const Edit = Form.create()(props => {
  const { form, visible, onCancel, onSubmit } = props;
  const { getFieldDecorator } = form;
  const onHandSubmit = () => {
    form.validateFields((err, fieldsValue) => {
      debugger
      if (err) return;
      // form.resetFields();
      onSubmit(fieldsValue);
    });
  }
  return <Modal title="Add" onOk={onHandSubmit} onCancel={onCancel} width={800} visible={visible}>
    <Form layout="inline">
      <Form.Item label="合同名称">
        {getFieldDecorator('contractName')(
          <Input placeholder="请输入合同名称" />
        )}
      </Form.Item>
    </Form>
  </Modal>
});

const SaleList = props => {
  const [addVisiable, setAddVisiable] = useState(false);
  const { editFun, dataSource } = props;

  // 删除
  const Delete = props => {
    // 删除的操作
  }
  const columnsData = [
    {
      title: 'Date Time(UTC)',
      dataIndex: 'dateTime',
      className: 'column-date',
    },
    {
      title: 'Participants',
      dataIndex: 'participant',
      ellipsis: true,
    },
    {
      title: 'USDT',
      dataIndex: 'quantity',
      ellipsis: true,
    },
    {
      title: 'Token',
      dataIndex: 'Amount',
      ellipsis: true,
    }
  ];
  // 移动版本
  const columnsDataMobile = [
    {
      title: 'Date Time(UTC)',
      dataIndex: 'dateTime',
      className: 'column-date',
    },
    {
      title: 'Token',
      dataIndex: 'Amount',
      ellipsis: true,
    }
  ];
  // 编辑功能
  const columnsManager = [
    {
      title: 'Action',
      width: 120,
      render: () => <>
        <a onClick={() => setAddVisiable(true)}>Edit</a>&nbsp;&nbsp;
        <a onClick={() => message.success('Successful')}>Delete</a>
      </>
    }];
  // 修改
  const onSubmitEdit = (value) => {
    // 这里填写请求数据方法
  }
  return <Media queries={{
    big: "(min-width: 700px)"
  }}>
    {matches => <>
      <Table
        id="transferTable"
        columns={editFun && [...(matches.big && columnsData || columnsDataMobile), ...columnsManager] || (matches.big && columnsData || columnsDataMobile)}
        dataSource={dataSource}
        pagination={false}
      />
      <Edit visible={addVisiable} onCancel={() => setAddVisiable(false)} onSubmit={onSubmitEdit} />
    </>}
  </Media>
}
export default SaleList;