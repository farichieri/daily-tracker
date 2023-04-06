import { List, ListGroup } from "@/global/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface ListSlice {
  lists: ListGroup;
  listSelected: List;
  listEdit: List;
  isLoadingData: boolean;
  filterSelected: string;
}

// Define the initial state using that type
const initialState: ListSlice = {
  lists: {},
  listSelected: {
    is_archived: false,
    is_default: false,
    is_favorite: false,
    is_private: false,
    labels: [],
    list_id: "",
    list_name: "",
    members: [],
  },
  listEdit: {
    is_archived: false,
    is_default: false,
    is_favorite: false,
    is_private: false,
    labels: [],
    list_id: "",
    list_name: "",
    members: [],
  },
  isLoadingData: false,
  filterSelected: "all",
};

export const listsSlice = createSlice({
  name: "list",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLists: (state, action: PayloadAction<ListGroup>) => {
      state.lists = { ...state.lists, ...action.payload };
    },
    setListEdit: (state, action: PayloadAction<string>) => {
      state.listEdit = state.lists[action.payload];
    },
    setTasksFilter: (state, action: PayloadAction<string>) => {
      state.filterSelected = action.payload;
    },
  },
});

export const { setLists, setListEdit, setTasksFilter } = listsSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectList = (state: RootState) => state.list;
export const selectLists = (state: RootState) => state.list.lists;
export const selectListEdit = (state: RootState) => state.list.listEdit;
export const selectIsLoadingData = (state: RootState) =>
  state.list.isLoadingData;

export default listsSlice.reducer;
