import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    batchesList: [],
    batchStudents: [],
    batchDetails: [],
    hostelsList: [],
    hostelDetails: [],
    loading: false,
    subloading: false,
    error: null,
    response: null,
    getresponse: null,
};

const batchSlice = createSlice({
    name: 'batch',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSubDetailsRequest: (state) => {
            state.subloading = true;
        },
        getSuccess: (state, action) => {
            state.batchesList = action.payload;
            state.loading = false;
            state.error = null;
            state.getresponse = null;
        },
        getStudentsSuccess: (state, action) => {
            state.batchStudents = action.payload;
            state.loading = false;
            state.error = null;
            state.getresponse = null;
        },
        getHostelsSuccess: (state, action) => {
            state.hostelsList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.hostelsList = [];
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getFailedTwo: (state, action) => {
            state.batchesList = [];
            state.batchStudents = [];
            state.getresponse = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        detailsSuccess: (state, action) => {
            state.batchDetails = action.payload;
            state.loading = false;
            state.error = null;
        },
        getSubDetailsSuccess: (state, action) => {
            state.hostelDetails = action.payload;
            state.subloading = false;
            state.error = null;
        },
        resetHostels: (state) => {
            state.hostelsList = [];
            state.batchesList = [];
        },
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    getStudentsSuccess,
    getHostelsSuccess,
    detailsSuccess,
    getFailedTwo,
    resetHostels,
    getSubDetailsSuccess,
    getSubDetailsRequest
} = batchSlice.actions;

export const batchReducer = batchSlice.reducer;