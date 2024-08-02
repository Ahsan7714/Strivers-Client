import React, { useState ,useEffect } from "react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Select, MenuItem, Button } from "@mui/material";
import AdminMobileNavbar from "../../../components/adminMobileNavbar/AdminMobileNavbar";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getApprovedTickets,clearState ,removeUser } from "../../../store/reducers/adminReducers";
import toast from "react-hot-toast";
import Loader from "../../../components/Spinner/Loader";

function UserCourse() {
  const dispatch = useDispatch();
  const { activeCourses, loading, error ,isUserRemoved} = useSelector((state) => state.admin);
  const [filterCourse, setFilterCourse] = useState("");
  const [filterPackage, setFilterPackage] = useState("");
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  useEffect(() => {
    dispatch(getApprovedTickets());
  }, [dispatch]);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isUserRemoved) {
      toast.success("User removed successfully!");
      dispatch(getApprovedTickets());
      dispatch(clearState());
    }
  }, [isUserRemoved, dispatch]);

  

  const handleFilterCourseChange = (event) => {
    setFilterCourse(event.target.value);
  };

  const handleFilterPackageChange = (event) => {
    setFilterPackage(event.target.value);
  };

  const handleDelete = (userId,packageId, courseId ) => {
    // console.log(userId, courseId, packageId);
    dispatch(removeUser({ userId,packageId ,courseId  }));
  };

  const filteredUsers = activeCourses.filter((user) => {
    return (
      (filterCourse === "" || user.courseId.title === filterCourse) &&
      (filterPackage === "" || user.packageId.packageName === filterPackage)
    );
  });

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
        <div className="lg:w-[77%] w-[115%] lg:mx-auto p-5">
          <h1 className="text-[30px] font-semibold py-3">Active Courses</h1>
          <div className="flex gap-4 mb-4">
            <Select
              value={filterCourse}
              onChange={handleFilterCourseChange}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">All Courses</MenuItem>
              <MenuItem value="Java">Java</MenuItem>
              <MenuItem value="Python">Python</MenuItem>
            </Select>
            <Select
              value={filterPackage}
              onChange={handleFilterPackageChange}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">All Packages</MenuItem>
              <MenuItem value="mocks">Standard Package</MenuItem>
              <MenuItem value="fullCourse">Premium Package</MenuItem>
            </Select>
          </div>
          <div>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow className="bg-gray-800">
                      <TableCell align="center" className="text-white text-lg">
                        S.No
                      </TableCell>
                      {/* <TableCell align="center" className="text-white text-lg">
                        Name
                      </TableCell> */}
                      <TableCell align="center" className="text-white text-lg">
                        Email
                      </TableCell>
                      <TableCell align="center" className="text-white text-lg">
                        Package
                      </TableCell>
                      <TableCell align="center" className="text-white text-lg">
                        Course
                      </TableCell>
                      <TableCell align="center" className="text-white text-lg">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers && filteredUsers.length > 0 ?  (filteredUsers.map((user, index) => (
                      <TableRow
                        key={user.id}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        {/* <TableCell align="center">{user.name}</TableCell> */}
                        <TableCell align="center">{user.email}</TableCell>
                        <TableCell align="center">{user.packageId.packageName}</TableCell>
                        <TableCell align="center">{user.courseId.title}</TableCell>
                        <TableCell align="center">
                          <RiDeleteBinLine
                            className="bg-red-500 text-white  p-1 cursor-pointer ml-8 rounded-md text-3xl"
                            onClick={() => handleDelete(user.createdBy.id , user.packageId.id , user.courseId.id)}
                          />
                        </TableCell>
                      </TableRow>
                    )) ) : (    <TableRow>
                      {" "}
                      <TableCell colSpan={4} align="center">
                        No Courses Available
                      </TableCell>{" "}
                    </TableRow>)}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCourse;
