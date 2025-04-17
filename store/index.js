
import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "./localStorage";
import transactionReducer from './transactionSlice'

const persistedState = loadState()

export const store = configureStore({
    reducer: {
        transactions: transactionReducer // Creating a slice called transactions
    },
    preloadedState: persistedState
})

// Save state at each update
store.subscribe(() => {
    saveState({
        transactions: store.getState().transactions
    })
})

// store.getState() returns your entire Redux state
// store.getState().transactions gets just the transactions slice
// saveState(...) is a custom function saving to localStorage