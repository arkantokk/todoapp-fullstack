import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TodoService } from '../../services/todoService';


export const fetchTodos = createAsyncThunk(
    'todos/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await TodoService.fetchTodos();
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'Помилка');
        }
    }
);

export const addTodo = createAsyncThunk(
    'todos/add',
    async (text, { rejectWithValue }) => {
        try {
            const response = await TodoService.createTodo(text);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'Не вдалося додати');
        }
    }
);

// Thunk для видалення
export const deleteTodo = createAsyncThunk(
    'todos/delete',
    async (id, { rejectWithValue }) => {
        try {
            const response = await TodoService.deleteTodo(id);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'Не вдалося видалити');
        }
    }
);

export const toggleTodoStatus = createAsyncThunk(
    'todos/update',
    async ({ id, completed }, { rejectWithValue }) => {
        try {
            const response = await TodoService.updateTodo(id, { completed });
            return response.data
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || "cant update")
        }
    }
)
const initialState = {
    items: [],
    isLoading: false,
    error: null
};

// 3. Створюємо сам Слайс
const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // Тут поки порожньо, бо в нас тільки асинхронні дії
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;

            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;


            })
            .addCase(addTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload);
            })

            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = state.items.filter(todo => todo._id !== action.payload.id)

            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(toggleTodoStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = state.items.map(todo =>
                    todo._id === action.payload._id ? action.payload : todo
                );
            });
    },
});

export default todoSlice.reducer;