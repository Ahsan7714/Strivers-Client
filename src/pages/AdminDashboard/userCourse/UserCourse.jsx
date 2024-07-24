import React, { useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, TextField, Select, MenuItem } from "@mui/material";
import AdminMobileNavbar from "../../../components/adminMobileNavbar/AdminMobileNavbar";

function UserCourse() {
  const [searchCourse, setSearchCourse] = useState("");
  const [filterPackage, setFilterPackage] = useState("");
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
      package: "Standard",
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

  const handleSearchCourseChange = (event) => {
    setSearchCourse(event.target.value);
  };

  const handleFilterPackageChange = (event) => {
    setFilterPackage(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    return (
      (searchCourse === "" || user.course.toLowerCase().includes(searchCourse.toLowerCase())) &&
      (filterPackage === "" || user.package === filterPackage)
    );
  });

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
      <div className="ml-[23%] w-[77%] pt-[3%]">
        <div className="w-[77%] mx-auto p-5">
          <h1 className="text-[30px] font-semibold py-3">Active Courses</h1>
          <div className="flex gap-4 mb-4">
            <TextField
              label="Search by Course"
              variant="outlined"
              value={searchCourse}
              onChange={handleSearchCourseChange}
              fullWidth
            />
            <Select
              value={filterPackage}
              onChange={handleFilterPackageChange}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">All </MenuItem>
              <MenuItem value="Standard">Standard</MenuItem>
              <MenuItem value="Premium">Premium</MenuItem>
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
                      <TableCell align="center" className="text-white text-lg">
                        Name
                      </TableCell>
                      <TableCell align="center" className="text-white text-lg">
                        Email
                      </TableCell>
                      <TableCell align="center" className="text-white text-lg">
                        Package
                      </TableCell>
                      <TableCell align="center" className="text-white text-lg">
                        Course
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.map((user, index) => (
                      <TableRow
                        key={user.id}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{user.name}</TableCell>
                        <TableCell align="center">{user.email}</TableCell>
                        <TableCell align="center">{user.package}</TableCell>
                        <TableCell align="center">{user.course}</TableCell>
                      </TableRow>
                    ))}
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
