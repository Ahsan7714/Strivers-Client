import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseurl from "../baseurl";

const initialState = {
  loading: false,
  error: "",
  courses : [],
  isCourseCreated: false,
  isPackageCreated: false,
  tickets : [],
  isTicketUpdated: false,
  activeCourses : [],
  isUserRemoved : false,
  isRequestDeleted : false,
  isContentPosted: false,
  isContentDeleted: false
};

// get all courses
export const getAllCourses = createAsyncThunk(
  "admin/getAllCourses",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/api/courses`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// post a new course
export const postCourse = createAsyncThunk(
  "admin/postCourse",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.post(`${baseurl}/api/courses`, payload, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// create a new package
export const postPackage = createAsyncThunk(
  "admin/postPackage",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.post(`${baseurl}/api/packages`, payload, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// get all tickets
export const getAllTickets = createAsyncThunk(
  "/api/tickets",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/api/tickets`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// update a ticket status by id
export const updateTicketStatus = createAsyncThunk(
  "/api/tickets/update",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.put(`${baseurl}/api/tickets/${payload.id}`, payload, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// get all aproved tickets 
export const getApprovedTickets = createAsyncThunk(
  "/api/active-users",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/api/active-users`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Delete a course by admin for a user and delete the ticket of that course 
export const removeUser = createAsyncThunk(
  "admin/removeUser",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { userId,packageId, courseId,  } = payload;
      const { data } = await axios.delete(`${baseurl}/api/active-users`, {
        data: { userId,packageId ,courseId,  },
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Delete a course request by admin
export const deleteRequest = createAsyncThunk(
  "admin/deleteRequest",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.delete(`${baseurl}/api/tickets/${payload}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// post a new content
export const postContent = createAsyncThunk(
  "admin/postContent",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.post(`${baseurl}/api/content`, payload, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// delete a content
export const deleteContent = createAsyncThunk(
  "admin/deleteContent",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.delete(`${baseurl}/api/content/${payload}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const adminReducer = createSlice({
  name: "adminReducer",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.error = "";
      state.loading = false;
      state.courses = [];
      state.isCourseCreated = false;
      state.isPackageCreated = false;
      state.tickets = [];
      state.isTicketUpdated = false
      state.activeCourses = [];
      state.activeCourses = [];
      state.isUserRemoved = false;
      state.isRequestDeleted = false;
      state.isContentPosted = false;
      state.isContentDeleted = false;
    },
  },
  extraReducers: (builder) => {
   
    // get all courses
    builder.addCase(getAllCourses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    });
    builder.addCase(getAllCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // post a new course
    builder.addCase(postCourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.isCourseCreated = true;
    });
    builder.addCase(postCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload
    }
    );
    // create a new package
    builder.addCase(postPackage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postPackage.fulfilled, (state, action) => {
      state.loading = false;
      state.isPackageCreated = true;
    });
    builder.addCase(postPackage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // get all tickets
    builder.addCase(getAllTickets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllTickets.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets = action.payload;
    });
    builder.addCase(getAllTickets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload
    }
    );
    // update a ticket status by id
    builder.addCase(updateTicketStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTicketStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.isTicketUpdated = true;
    });
    builder.addCase(updateTicketStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // get all aproved tickets
    builder.addCase(getApprovedTickets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getApprovedTickets.fulfilled, (state, action) => {
      state.loading = false;
      state.activeCourses = action.payload;
    });
    builder.addCase(getApprovedTickets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
    );
    // remove a user from a course
    builder.addCase(removeUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isUserRemoved = true;
    });
    builder.addCase(removeUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
    );
    // delete a course request
    builder.addCase(deleteRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.isRequestDeleted = true;
    });
    builder.addCase(deleteRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
    );
    // post a new content
    builder.addCase(postContent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postContent.fulfilled, (state, action) => {
      state.loading = false;
      state.isContentPosted = true;
    });
    builder.addCase(postContent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
    );
    // delete a content
    builder.addCase(deleteContent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteContent.fulfilled, (state, action) => {
      state.loading = false;
      state.isContentDeleted = true;
    });
    builder.addCase(deleteContent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
    );
  },
});

export default adminReducer.reducer;
export const { clearState } = adminReducer.actions;