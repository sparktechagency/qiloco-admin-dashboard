import React, { useState, useRef } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  Flex,
  Input,
  Table,
  Popover,
  Button,
  Modal,
  Form,
  ConfigProvider,
  message,
} from "antd";
import { MoreOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";

import ButtonEDU from "../../../components/common/ButtonEDU";

const AdminList = () => {
  // Initial data
  const initialData = [
    {
      key: 1,
      name: "Tom Hardy",
      email: "tom.hardy@gmail.com",
      role: "Admin",
      creationdate: "13 Feb 2020",
    },
    {
      key: 2,
      name: "Emma Stone",
      email: "emma.stone@example.com",
      role: "Admin",
      creationdate: "10 Jan 2021",
    },
    {
      key: 3,
      name: "Robert Downey",
      email: "rdj@avengers.com",
      role: "Admin",
      creationdate: "25 Dec 2019",
    },
  ];

  const [searchText, setSearchText] = useState("");
  const [admins, setAdmins] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const addFormRef = useRef(null);
  const editFormRef = useRef(null);

  // Search functionality
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = admins.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.email.toLowerCase().includes(value)
    );

    setFilteredData(filtered);
  };

  // Open Add Admin Modal
  const showAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Close Add Admin Modal
  const handleCancelAdd = () => {
    setIsAddModalOpen(false);
    addFormRef.current?.resetFields();
    message.info("Admin addition cancelled.");
  };

  const handleAddAdmin = (values) => {
    // Ensure characters after ".com" are removed
    const cleanEmail = values.email.replace(/\.com.*/i, ".com");

    const newAdmin = {
      key: admins.length + 1,
      ...values,
      email: cleanEmail, // Apply cleaned email
      creationdate: new Date().toLocaleDateString(),
    };

    const updatedAdmins = [...admins, newAdmin];
    setAdmins(updatedAdmins);
    setFilteredData(updatedAdmins);
    setIsAddModalOpen(false);
    addFormRef.current?.resetFields();

    message.success("Admin added successfully!");
  };

  // Open Edit Admin Modal
  const showEditModal = (record) => {
    setSelectedAdmin(record);
    setIsEditModalOpen(true);
    setTimeout(() => {
      editFormRef.current?.setFieldsValue(record);
    }, 0);
  };

  // Close Edit Admin Modal
  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    editFormRef.current?.resetFields();
    message.info("Admin edit cancelled.");
  };

  const handleEditAdmin = (values) => {
    // Ensure characters after ".com" are removed
    const cleanEmail = values.email.replace(/\.com.*/i, ".com");

    const updatedAdmins = admins.map((admin) =>
      admin.key === selectedAdmin.key
        ? { ...admin, ...values, email: cleanEmail }
        : admin
    );
    setAdmins(updatedAdmins);
    setFilteredData(updatedAdmins);
    setIsEditModalOpen(false);

    message.success("Admin updated successfully!");
  };

  // Open Delete Admin Modal
  const showDeleteModal = (record) => {
    setSelectedAdmin(record);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete Admin
  const handleConfirmDelete = () => {
    if (!selectedAdmin) return;
    const updatedAdmins = admins.filter(
      (admin) => admin.key !== selectedAdmin.key
    );
    setAdmins(updatedAdmins);
    setFilteredData(updatedAdmins);
    setIsDeleteModalOpen(false);

    message.success("Admin deleted successfully!");
  };

  return (
    <div className="w-[60%] bg-quilocoP rounded-lg shadow-lg p-5">
      <TableHead
        searchText={searchText}
        handleSearch={handleSearch}
        onAdd={showAddModal}
      />
      <TableBody
        filteredData={filteredData}
        onEdit={showEditModal}
        onDelete={showDeleteModal}
      />

      {/* Add Admin Modal */}
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "#353536",
              headerBg: "#353536",
              titleColor: "#ffffff",
              titleFontSize: 24,
            },
            Form: {
              labelFontSize: 16,
              labelColor: "#ffffff",
            },
          },
        }}
      >
        <Modal
          title="Add Admin"
          open={isAddModalOpen}
          onCancel={handleCancelAdd}
          footer={null}
        >
          <Form layout="vertical" ref={addFormRef} onFinish={handleAddAdmin}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter Name" }]}
            >
              <Input
                placeholder="Name"
                className="h-12 text-slate-50 hover:border-slate-300 focus:ring-0 focus:outline-none"
                style={{
                  backgroundColor: "black", // Ensures background stays black
                  color: "white",
                  border: "1px solid #555",
                }}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter Email" },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
                {
                  validator: (_, value) => {
                    // Ensure no characters after .com
                    if (value && value.includes(".com")) {
                      const emailAfterDot = value.split(".com")[1];
                      if (emailAfterDot && emailAfterDot.length > 0) {
                        return Promise.reject(
                          "No characters should be after .com"
                        );
                      }
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                placeholder="Email"
                className="h-12 text-slate-50 hover:border-slate-300 focus:ring-0 focus:outline-none"
                style={{
                  backgroundColor: "black", // Ensures background stays black
                  color: "white",
                  border: "1px solid #555",
                }}
              />
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please enter Role" }]}
            >
              <Input
                disabled={true}
                placeholder="Role"
                className="h-12 text-slate-50 hover:border-slate-300 focus:ring-0 focus:outline-none"
                style={{
                  backgroundColor: "black", // Ensures background stays black
                  color: "white",
                  border: "1px solid #555",
                }}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter Password" }]}
            >
              <Input.Password
                placeholder="**********"
                className="h-12 text-slate-50 hover:border-slate-300 focus:ring-0 focus:outline-none"
                style={{
                  backgroundColor: "black", // Ensures background stays black
                  color: "white",
                  border: "1px solid #555",
                }}
              />
            </Form.Item>
            <div className="flex justify-end gap-4 mt-4">
              <ButtonEDU actionType="cancel" onClick={handleCancelAdd} />
              <ButtonEDU
                actionType="save"
                onClick={() => addFormRef.current?.submit()}
              />
            </div>
          </Form>
        </Modal>
      </ConfigProvider>
      {/* Edit Admin Modal */}
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "#232323",
              headerBg: "#232323",
              titleColor: "#ffffff",
              titleFontSize: 24,
            },
            Form: {
              labelColor: "#efefef",
              labelFontSize: 16,
            },
            Select: {
              selectorBg: "black",
              activeOutlineColor: "grey",
              optionSelectedBg: "grey",
              multipleItemBorderColor: "grey",
              activeBorderColor: "grey",
              hoverBorderColor: "grey",
            },
          },
        }}
      >
        <Modal
          title="Edit Admin"
          open={isEditModalOpen}
          onCancel={handleCancelEdit}
          footer={null}
          height="none"
          className="z-50 "
          style={{ background: "#18191b" }}
        >
          <Form layout="vertical" ref={editFormRef} onFinish={handleEditAdmin}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter Name" }]}
            >
              <Input
                placeholder="Name"
                className="h-12 text-slate-50 hover:border-slate-300 focus:ring-0 focus:outline-none"
                style={{
                  backgroundColor: "black", // Ensures background stays black
                  color: "white",
                  border: "1px solid #555",
                }}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter Email" },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
                {
                  validator: (_, value) => {
                    // Ensure no characters after .com
                    if (value && value.includes(".com")) {
                      const emailAfterDot = value.split(".com")[1];
                      if (emailAfterDot && emailAfterDot.length > 0) {
                        return Promise.reject(
                          "No characters should be after .com"
                        );
                      }
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                placeholder="Email"
                className="h-12 text-slate-50 hover:border-slate-300 focus:ring-0 focus:outline-none"
                style={{
                  backgroundColor: "black", // Ensures background stays black
                  color: "white",
                  border: "1px solid #555",
                }}
              />
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please enter Role" }]}
            >
              <Input
                disabled={true}
                placeholder="Role"
                className="h-12 text-slate-50 hover:border-slate-300 focus:ring-0 focus:outline-none"
                style={{
                  backgroundColor: "black", // Ensures background stays black
                  color: "white",
                  border: "1px solid #555",
                }}
              />
            </Form.Item>

            <div className="flex justify-end gap-4 mt-4">
              <ButtonEDU actionType="cancel" onClick={handleCancelEdit} />
              <ButtonEDU
                actionType="save"
                onClick={() => editFormRef.current?.submit()}
              />
            </div>
          </Form>
        </Modal>

        {/* Delete Admin Modal */}
        <Modal
          title="Delete Admin"
          open={isDeleteModalOpen}
          onCancel={() => setIsDeleteModalOpen(false)}
          footer={null}
          centered
          className="z-50"
        >
          <DeleteAdmin
            name={selectedAdmin?.name}
            onConfirm={handleConfirmDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        </Modal>
      </ConfigProvider>
    </div>
  );
};
const TableHead = ({ searchText, handleSearch, onAdd }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <Input
        placeholder="Search admins..."
        value={searchText}
        onChange={handleSearch}
        className="w-1/3 h-10 text-white focus:ring-0 focus:outline-none"
        style={{
          backgroundColor: "#18191b", // Keeps it black even after blur
          color: "white",
          border: "1px solid #555",
        }}
      />
      <ButtonEDU actionType="add new" icon={<FaPlus />} onClick={onAdd}>
        Add Admin
      </ButtonEDU>
    </div>
  );
};
const TableBody = ({ filteredData, onEdit, onDelete }) => (
  <ConfigProvider
    theme={{
      components: {
        Table: {
          headerBg: "#575858",
          headerSplitColor: "none",
          headerColor: "white",
          borderColor: "#A3A3A3",
          colorBgContainer: "#3a3a3a",
          rowHoverBg: "#4a4a4a",
          colorText: "white",
        },
      },
    }}
  >
    <div className="custom-table">
      <Table
        rowKey={(record) => record.key}
        columns={columns(onEdit, onDelete)}
        dataSource={filteredData}
        pagination={false}
        className="mt-5"
      />
    </div>
  </ConfigProvider>
);

const DeleteAdmin = ({ name, onConfirm, onCancel }) => (
  <Flex
    vertical
    justify="space-between"
    className="w-full h-full mb-3 mt-3"
    gap={20}
  >
    <Flex align="center" justify="center" className="text-slate-50">
      Are you sure you want to delete{" "}
      <span className="font-bold ml-1">{name}</span>?
    </Flex>
    <div className="flex items-center justify-center gap-4">
      <ButtonEDU actionType="cancel" onClick={onCancel} />
      <ButtonEDU actionType="delete" onClick={onConfirm} />
    </div>
  </Flex>
);

const columns = (onEdit, onDelete) => [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Role", dataIndex: "role", key: "role" },
  {
    key: "action",
    render: (_, record) => (
      <Popover
        content={
          <div className="flex gap-3">
            <Button onClick={() => onEdit(record)}>
              <EditFilled />
            </Button>
            <Button onClick={() => onDelete(record)} danger>
              <DeleteFilled />
            </Button>
          </div>
        }
        trigger="hover"
      >
        <MoreOutlined />
      </Popover>
    ),
  },
];
export default AdminList;
