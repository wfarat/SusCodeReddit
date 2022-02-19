import { configureStore } from '@reduxjs/toolkit';
import subredditsSlice from '../features/subreddits/subredditsSlice';
export const store = configureStore({
  reducer: {
    subreddits: subredditsSlice,
    
  },
});
