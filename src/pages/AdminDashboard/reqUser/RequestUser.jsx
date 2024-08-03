import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar.jsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import AdminMobileNavbar from "../../../components/adminMobileNavbar/AdminMobileNavbar.jsx";
import { useDispatch, useSelector  } from "react-redux";
import {
  getAllTickets,
  updateTicketStatus,
  clearState,
  deleteRequest
} from "../../../store/reducers/adminReducers.js";
import Loader from "../../../components/Spinner/Loader.jsx";
import toast from "react-hot-toast";

function RequestUser() {
  const dispatch = useDispatch();
  const { tickets, loading, error, isTicketUpdated,isRequestDeleted } = useSelector(
    (state) => state.admin
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(getAllTickets());
  }, [dispatch]);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalIsOpen(false);
  };
  useEffect(() => {
    if (isTicketUpdated) {
      toast.success("User approved successfully");
      dispatch(getAllTickets());
      dispatch(clearState());
    }
  }, [isTicketUpdated]);
  const handleApprove = (id) => {
    dispatch(updateTicketStatus({ id, status: "approve" }));
  };
  useEffect(() => {
    if (isRequestDeleted) {
      toast.success("Request deleted successfully");
      dispatch(getAllTickets());
      dispatch(clearState());
    } else if (error) {
      toast.error(error);
      dispatch(clearState());
    }
  }, [isRequestDeleted, error]);

  const handleDeletePending = (id) => {
    dispatch(deleteRequest(id));
  }
  if (loading) {
    return <Loader />;
  }

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
      <div className="lg:ml-[23%] w-[77%] pt-[3%]">
        <div className="lg:w-[77%] mx-auto p-5">
          <h1 className="text-[30px] font-semibold py-3">Course Requests</h1>
          <div>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow className="bg-gray-800">
                      <TableCell align="center" className="text-white text-lg">
                        S.No
                      </TableCell>
                      <TableCell align="center" className="text-white text-lg">
                        Email
                      </TableCell>
                      <TableCell align="center" className="text-white text-lg">
                        Package
                      </TableCell>
                      <TableCell align="center" className="text-white text-lg">
                        View
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tickets && tickets.length > 0 ? (
                      tickets.map((user, index) => (
                        <TableRow
                          key={user.id}
                          className={
                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
                          }
                        >
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">
                          
                          {user.paidThrough === "square" ? (
                            <a href={user.receiptLink}
                            className="underline text-blue-500" target="_blank" 
                            >Receipt Link</a>
                          ) : (
                            user.email
                          )}

                          
                          </TableCell>
                          <TableCell align="center">
                            {user.packageId.packageName}
                          </TableCell>
                          <TableCell align="center">
                            <button
                              className="bg-green-600 text-white px-2 py-1 rounded-md"
                              onClick={() => openModal(user)}
                            >
                              View
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        {" "}
                        <TableCell colSpan={4} align="center">
                          No pending Request
                        </TableCell>{" "}
                      </TableRow>
                    )}
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
              <strong>Course:</strong> {selectedUser.courseId.title}
            </p>
            <p className="mt-4">
              <strong>Package:</strong> {selectedUser.packageId.packageName}
            </p>
            <p className="mt-4">
              <strong>Mocks Purchased:</strong> {selectedUser.mocksPurchased}
            </p>
            {/* <p className="mt-4">
              <strong>Account Name:</strong> {selectedUser.accountName}
            </p> */}
            {/* <p className="mt-4">
              <strong>Account Number:</strong> {selectedUser.accNo}
            </p> */}
            <p className="mt-4">
              <strong>Price Paid:</strong> ${selectedUser.pricePaid}
            </p>
            <p className="mt-4 capitalize">
              <strong>Paid Through:</strong> {selectedUser.paidThrough}
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="bg-red-600 text-white px-3 py-2 rounded-md"
                onClick={() => {
                  handleDeletePending(selectedUser.id);
                  closeModal();
                }}
              >
                Delete
              </button>
              <button
                className="bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white px-3 py-2 rounded-md"
                onClick={() => {
                  handleApprove(selectedUser.id);
                  closeModal();
                }}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RequestUser;
