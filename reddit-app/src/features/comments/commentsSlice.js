import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Reddit from '../../util/reddit/Reddit';

export const loadComments = createAsyncThunk('comments/loadComments', 
async (data) => { 
    const res = await Reddit.getComments(data);
    return res;
})
const commentsSlice = createSlice({
    name: 'comments',
    initialState: {data: {}, status: 'idle'},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadComments.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(loadComments.fulfilled, (state,action) => {
                state.status = 'idle';
                state.data = {};
                action.payload.map(ar => state.data[ar.id] = ar)
            })
    }    
})
export const selectComments = (state) => state.comments.data;
export const selectStatus = (state) => state.comments.status;
export default commentsSlice.reducer;