import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transactionData: []
}

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        loadTransactionArray: (state, action) => {
            const updatedData = action.payload.map(item => ({
                ...item,
                date: new Date(item.date).toLocaleDateString()
            }));
            state.transactionData = updatedData;
        },
        addNewTransaction: (state, action) => {
            state.transactionData.push(action.payload)
        },
        clearTransactions: (state) => {
            state.transactionData = []
        },
    }
})

export const { addNewTransaction, clearTransactions, loadTransactionArray } = transactionSlice.actions
export default transactionSlice.reducer