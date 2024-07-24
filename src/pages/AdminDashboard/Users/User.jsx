import React, { useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar.jsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import "./User.css";
import AdminMobileNavbar from "../../../components/adminMobileNavbar/AdminMobileNavbar.jsx";

function User() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@gmail.com",
      package: "Strandard",
      course: "Python",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "janedoe@gmail.com",
      package: "Premium",
      course: "Java",
    },
    {
      id: 3,
      name: "John Smith",
      email: "johnsmith@gmail.com",
      package: "Premium",
      course: "Python",
    },
    {
      id: 4,
      name: "Smith Doe",
      email: "smithdoe@gmail.com",
      package: "Standard",
      course: "Java",
    },
  ];

  const openModal = (user) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalIsOpen(false);
  };

  return (
    <div className="flex font-outfit">
      {screenSize > 768 ? (
        <>
          <AdminSidebar />
        </>
      ) : (
        <>
          <AdminMobileNavbar />
        </>
      )}
      <div className="lg:ml-[23%] lg:w-[77%] pt-[3%]">
        <div className="lg:w-[77%]  w-full mx-auto p-5">
          <h1 className="text-[30px] font-semibold py-3">Active Users</h1>
          <div >
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow className="bg-gray-800">
                      <TableCell align="center" className="text-white text-lg">
                        S.No
                      </TableCell>
                      <TableCell align="center" className="text-white text-lg">
                        Name
                      </TableCell>
                      <TableCell align="center" className="text-white text-lg">
                        Email
                      </TableCell>
                      <TableCell align="center" className="text-white text-lg">
                        View
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user, index) => (
                      <TableRow
                        key={user.id}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{user.name}</TableCell>
                        <TableCell align="center">{user.email}</TableCell>
                        <TableCell align="center">
                          <button
                            className="bg-green-600 text-white px-2 py-1 rounded-md"
                            onClick={() => openModal(user)}
                          >
                            View
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </div>
      </div>
      {modalIsOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md lg:w-[500px] w-[90%] shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-[24px] font-semibold">
                <span className="text-[#427590]">{selectedUser.name}</span>
              </h2>
              <button onClick={closeModal}>
                <IoMdClose className="text-[30px]" />
              </button>
            </div>
            <p className="mt-4">
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p className="mt-4">
              <strong>Course:</strong> {selectedUser.course}
            </p>
            <p className="mt-4">
              <strong>Package:</strong> {selectedUser.package}
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="bg-red-600 text-white px-3 py-2 rounded-md"
                onClick={() => {
                  // handleDeletePending(selectedUser.id);
                  closeModal();
                }}
              >
                Delete
              </button>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
