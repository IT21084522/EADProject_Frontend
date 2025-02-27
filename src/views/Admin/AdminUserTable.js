import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import AddUser from "./AddUser"; // Import the AddUser component

function UserTables() {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false); // State to handle modal visibility

  const navigate = useNavigate();

  // Fetch the user data from the backend API
  useEffect(() => {
    fetch("http://127.0.0.1:15240/api/user/getAllUsers")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  // Toggle modal visibility
  const toggleModal = () => setModal(!modal);

  // Filter only customers
  const filteredUsers = users.filter((user) => user.role === "Customer");

  // Function to handle approve/reject actions
  // Function to approve a user
  const handleApprove = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:15240/api/user/admin/approve-user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log(`User with ID ${id} approved successfully`);
        // Optionally update the UI or refresh the user list after approval
        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, userStatus: "Approved" } : user
        );
        setUsers(updatedUsers);
      } else {
        console.error("Failed to approve the user.");
      }
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  // Function to reject a user
  const handleReject = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:15240/api/user/admin/reject-user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log(`User with ID ${id} rejected successfully`);
        // Optionally update the UI or refresh the user list after rejection
        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, userStatus: "Rejected" } : user
        );
        setUsers(updatedUsers);
      } else {
        console.error("Failed to reject the user.");
      }
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <CardTitle tag="h4">Customer Details</CardTitle>
              {/* +Add Users Button */}
              <Button color="primary" onClick={toggleModal}>
                + Add User
              </Button>
            </CardHeader>
            <CardBody>
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>#</th>
                    <th>Email Address</th>
                    <th>Account Approval Status</th>
                    <th>Account Active Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td>{String(index + 1).padStart(3, "0")}</td>{" "}
                      {/* Auto-incrementing ID with padding */}
                      <td>{user.email}</td>
                      <td>{user.userStatus}</td>
                      <td>{user.isActive ? "Active" : "Inactive"}</td>
                      <td>
                        <Button
                          color="success"
                          size="sm"
                          onClick={() => handleApprove(user.id)}
                        >
                          Approve
                        </Button>{" "}
                        <Button
                          color="danger"
                          size="sm"
                          onClick={() => handleReject(user.id)}
                        >
                          Reject
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Modal for adding a user */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}></ModalHeader>
        <AddUser /> {/* AddUser form inside the modal */}
      </Modal>
    </div>
  );
}

export default UserTables;
