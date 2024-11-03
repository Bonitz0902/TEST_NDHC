import React, { useState } from 'react';
import { Table, Button, Form, InputNumber, Input, Popconfirm } from 'antd';
import * as XLSX from 'xlsx';
import dataSourceStatic from '../components/dataSource';
import ManualAddModal from '../components/manualAddModal';
import FileUpload from '../utility/fileUpload';
import { QRCodeSVG } from 'qrcode.react';
import Typography from 'antd/es/typography/Typography';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TempTable = () => {
  const columns = [
    {
      title: 'QR Code',
      dataIndex: 'quickResponseCode',
      key: 'qrCode',
      editable: false,
      render: (text, record) => (
        <QRCodeSVG
          value={`${record.fundCode}-${record.dateAcquired}-${record.propertyNo}`}
          size={128}
        />
      ),
    },
    {
      title: 'EXECUTIVE / LEGISLATIVE',
      dataIndex: 'executiveLegislative',
      key: 'executiveLegislative',
      editable: true,
    },
    {
      title: 'FUND CODE',
      dataIndex: 'fundCode',
      key: 'fundCode',
      editable: true,
    },
    {
      title: 'DATE ACQUIRED',
      dataIndex: 'dateAcquired',
      key: 'dateAcquired',
      editable: true,
    },
    {
      title: 'ARTICLE',
      dataIndex: 'article',
      key: 'article',
      editable: true,
    },
    {
      title: 'DESCRIPTION',
      dataIndex: 'description',
      key: 'description',
      editable: true,
    },
    {
      title: 'PROPERTY NO',
      dataIndex: 'propertyNo',
      key: 'propertyNo',
      editable: true,
    },
    {
      title: 'UNIT VALUE',
      dataIndex: 'unitValue',
      key: 'unitValue',
      editable: true,
    },
    {
      title: 'ON HAND PER CARD (QTY)',
      dataIndex: 'onHandPerCard',
      key: 'onHandPerCard',
      editable: true,
    },
    {
      title: 'NAME OF AGENCY',
      dataIndex: 'agencyName',
      key: 'agencyName',
      editable: true,
    },
    {
      title: 'NAME OF ACCOUNTABLE OFFICER',
      dataIndex: 'accountableOfficerName',
      key: 'accountableOfficerName',
      editable: true,
    },
    {
      title: 'DESIGNATION',
      dataIndex: 'designation',
      key: 'designation',
      editable: true,
    },
    {
      title: 'DISPOSE/TRANSFER (QTY)',
      dataIndex: 'disposeOrTransfer',
      key: 'disposeOrTransfer',
      editable: true,
    },
    {
      title: 'REMARKS',
      dataIndex: 'remarks',
      key: 'remarks',
      editable: true,
    },
    {
      title: 'ACTIONS',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, values) => {
        const editable = isEditing(values);
        return editable ? (
          <>
            <Typography.Link onClick={() => saveEdit(values.key)}>Save</Typography.Link>
            <Popconfirm title="Are you sure you want to cancel?" onConfirm={cancelEdit}>
              <a>Cancel</a>
            </Popconfirm>
          </>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => editRecord(values)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const [dataSource, setDataSource] = useState(dataSourceStatic);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState('');
  const [rowData, setRowdata] = useState(dataSource);
  const [form] = Form.useForm();

  const isEditing = (record) => record && record.key === editingKey;

  const editRecord = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancelEdit = () => {
    setEditingKey('');
  };

  const saveEdit = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleAddRecord = (values) => {
    const newRecord = {
      key: (dataSource.length + 1).toString(),
      ...values,
    };
    setDataSource([...dataSource, newRecord]);
    setIsAddModalVisible(false);
    form.resetFields();
  };

  const handleFileUpload = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const binaryStr = e.target.result;
        const workBook = XLSX.read(binaryStr, { type: 'binary' });
        const sheet = workBook.Sheets['Sheet1'];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setDataSource((prevData) => [...prevData, ...jsonData]);
      } catch (error) {
        console.error('Error reading the Excel file:', error);
      }
    };
    reader.readAsBinaryString(file);
    return false;
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'unitValue' || col.dataIndex === 'onHandPerCard' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <ManualAddModal
        isVisible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onSubmit={handleAddRecord}
      />
      <Form form={form} component={false}>
        <Table
          components={{
            body: { cell: EditableCell },
          }}
          dataSource={dataSource}
          columns={mergedColumns}
        />
      </Form>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
        <FileUpload onFileUpload={handleFileUpload} setDataSource={setDataSource} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
        <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
          Manual Add
        </Button>
      </div>
    </div>
  );
};

export default TempTable;
