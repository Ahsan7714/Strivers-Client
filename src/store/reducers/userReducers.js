import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseurl from "../baseurl";

const initialState = {
  loading: false,
  error: "",
  isSignedUp: false,
  isSignedIn: false,
  allCourses : [],
  courses : [],
  course : {},
  isRequestSubmitted: false,
  tickets : [],
  user : null,
  isLoggedOut: false,
  isPasswordUpdated : false,
  content : {},
  isContactUsSubmitted: false,
};

// sign up
export const signUp = createAsyncThunk(
    "user/signUp",
    async (payload, { rejectWithValue, fulfillWithValue }) => {
      try {
        const { data } = await axios.post(`${baseurl}/api/users/signup`, payload, {
          withCredentials: true,
        });
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data.errors[0].message);
      }
    }
  );

//   sign in
export const signIn = createAsyncThunk(
    "user/signIn",
    async (payload, { rejectWithValue, fulfillWithValue }) => {
      try {
        const { data } = await axios.post(`${baseurl}/api/users/signin`, payload, {
          withCredentials: true,
        });
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data.errors[0].message);
      }
    }
  );
  // log out
export const logout = createAsyncThunk(
    "/api/users/signout",
    async (payload, { rejectWithValue, fulfillWithValue }) => {
      try {
        const { data } = await axios.post(`${baseurl}/api/users/signout`, {
          withCredentials: true,
        });
        document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  // get all courses
export const getAllCourses = createAsyncThunk(
    "user/getAllCourses",
    async (payload, { rejectWithValue, fulfillWithValue }) => {
      try {
        const { data } = await axios.get(`${baseurl}/api/courses`, {
          withCredentials: true,
        });
        console.log(data);
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  // get all courses of a user 
export const getCourses = createAsyncThunk(
    "user/getCourses",
    async (payload, { rejectWithValue, fulfillWithValue }) => {
      try {
        const { data } = await axios.get(`${baseurl}/api/courses/mine`, {
          withCredentials: true,
        });
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  // get a course by its id
export const getCourse = createAsyncThunk(
    "user/getCourse",
    async (payload, { rejectWithValue, fulfillWithValue }) => {
      try {
        const { data } = await axios.get(`${baseurl}/api/courses/${payload}`, {
          withCredentials: true,
        });
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  // request to buy a course
export const requestCourse = createAsyncThunk(
    "user/requestCourse",
    async (payload, { rejectWithValue, fulfillWithValue }) => {
      try {
        const { data } = await axios.post(`${baseurl}/api/tickets`, payload, {
          withCredentials: true,
        });
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  // get all tickets of a user 
export const getTickets = createAsyncThunk(
    "/api/mytickets",
    async (payload, { rejectWithValue, fulfillWithValue }) => {
      try {
        const { data } = await axios.get(`${baseurl}/api/mytickets`, {
          withCredentials: true,
        });
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  // load user
export const loadUser = createAsyncThunk(
    "/api/users/loaduser",
    async (payload, { rejectWithValue, fulfillWithValue }) => {
      try {
        const { data } = await axios.get(`${baseurl}/api/users/loaduser`, {
          withCredentials: true,
        });
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  // update password
export const updatePassword = createAsyncThunk(
    "/api/users/change-password",
    async (payload, { rejectWithValue, fulfillWithValue }) => {
      try {
        const { data } = await axios.post(`${baseurl}/api/users/change-password`, payload, {
          withCredentials: true,
        });
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  // get all content of a course according to pachage id and coures id
export const getContent = createAsyncThunk(
    "/api/content",
    async ({courseId,packageId}, { rejectWithValue, fulfillWithValue }) => {
      try {
        const { data } = await axios.get(`${baseurl}/api/content/${courseId}/${packageId}`, {

          withCredentials: true,
        });
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  // submit contact us form
export const contactUs = createAsyncThunk(
    "/api/contact-us",
    async (payload, { rejectWithValue, fulfillWithValue }) => {
      try {
        const { data } = await axios.post(`${baseurl}/api/contactus`, payload, {
          withCredentials: true,
        });
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const userReducer = createSlice({
  name: "userReducer",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.error = "";
      state.loading = false;
      state.isSignedUp = false;
      state.isSignedIn = false;
      state.allCourses = [];
      state.courses = [];
      state.course = {};
      state.isRequestSubmitted = false;
      state.tickets = [];
      state.user = null;
      state.isLoggedOut = false;
      state.isPasswordUpdated = false;
      state.content = {};
      state.isContactUsSubmitted = false;
    },
  },
  extraReducers: (builder) => {
    //sign up
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.isSignedUp = true;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // sign in
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      state.isSignedIn = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
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
      state.error = action.payload?.message;
    });
    // get courses
    builder.addCase(getCourses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.allCourses = action.payload;
    });
    builder.addCase(getCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });
    // get a course
    builder.addCase(getCourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.course = action.payload;
    });
    builder.addCase(getCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload
    }
    );
    // request course
    builder.addCase(requestCourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(requestCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.isRequestSubmitted = true;
    });
    builder.addCase(requestCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // get tickets
    builder.addCase(getTickets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTickets.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets = action.payload;
    });
    builder.addCase(getTickets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });
    // load user
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });
    // log out
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedOut = true;
      state.user = null;
      state.isSignedIn = false;
      state.isSignedUp = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;

    });
    // update password
    builder.addCase(updatePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.isPasswordUpdated = true;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });
    // get content
    builder.addCase(getContent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getContent.fulfilled, (state, action) => {
      state.loading = false;
      state.content = action.payload;
    });
    builder.addCase(getContent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });
    // submit contact us
    builder.addCase(contactUs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(contactUs.fulfilled, (state, action) => {
      state.loading = false;
      state.isContactUsSubmitted = true;
    });
    builder.addCase(contactUs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });

  },
});

export default userReducer.reducer;
export const { clearState } = userReducer.actions;