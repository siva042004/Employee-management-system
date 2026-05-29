import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService, employeeService, departmentService } from '../services/api';

// Auth Slice
export const login = createAsyncThunk('auth/login', async (creds, { rejectWithValue }) => {
  try {
    const res = await authService.login(creds);
    localStorage.setItem('token', res.data.token);
    return res.data;
  } catch (e) { return rejectWithValue(e.response?.data?.message || 'Login failed'); }
});

const token = localStorage.getItem('token');
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: token || null, loading: false, error: null },
  reducers: {
    logout(state) { state.token = null; state.user = null; localStorage.removeItem('token'); },
    clearError(state) { state.error = null; }
  },
  extraReducers: b => b
    .addCase(login.pending, s => { s.loading = true; s.error = null; })
    .addCase(login.fulfilled, (s, a) => { s.loading = false; s.token = a.payload.token; s.user = a.payload.user; })
    .addCase(login.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
});

// Employee Slice
export const fetchEmployees = createAsyncThunk('employees/fetch', async (params) => {
  const res = await employeeService.getAll(params);
  return res.data;
});
export const createEmployee = createAsyncThunk('employees/create', async (data) => {
  const res = await employeeService.create(data);
  return res.data;
});
export const updateEmployee = createAsyncThunk('employees/update', async ({ id, data }) => {
  const res = await employeeService.update(id, data);
  return res.data;
});
export const deleteEmployee = createAsyncThunk('employees/delete', async (id) => {
  await employeeService.delete(id);
  return id;
});

const employeeSlice = createSlice({
  name: 'employees',
  initialState: { list: [], total: 0, loading: false, page: 0, size: 10 },
  reducers: {},
  extraReducers: b => b
    .addCase(fetchEmployees.pending, s => { s.loading = true; })
    .addCase(fetchEmployees.fulfilled, (s, a) => {
      s.loading = false;
      s.list = a.payload.content || a.payload;
      s.total = a.payload.totalElements || a.payload.length;
    })
    .addCase(deleteEmployee.fulfilled, (s, a) => {
      s.list = s.list.filter(e => e.id !== a.payload);
    })
});

// Department Slice
export const fetchDepartments = createAsyncThunk('departments/fetch', async () => {
  const res = await departmentService.getAll();
  return res.data;
});
export const createDepartment = createAsyncThunk('departments/create', async (data) => {
  const res = await departmentService.create(data);
  return res.data;
});
export const deleteDepartment = createAsyncThunk('departments/delete', async (id) => {
  await departmentService.delete(id);
  return id;
});

const departmentSlice = createSlice({
  name: 'departments',
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: b => b
    .addCase(fetchDepartments.fulfilled, (s, a) => { s.list = a.payload; })
    .addCase(createDepartment.fulfilled, (s, a) => { s.list.push(a.payload); })
    .addCase(deleteDepartment.fulfilled, (s, a) => { s.list = s.list.filter(d => d.id !== a.payload); })
});

export const { logout, clearError } = authSlice.actions;

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    employees: employeeSlice.reducer,
    departments: departmentSlice.reducer,
  }
});
