
"use client"

import React, { createContext, useReducer, ReactNode } from 'react';

type Expense = {
  id: string;
  description: string;
  amount: number;
  type: 'expense' | 'income';
};

type State = {
  expenses: Expense[];
};

type Action = 
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'DELETE_EXPENSE'; payload: string };

const initialState: State = {
  expenses: [],
};

const ExpenseContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({  
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'DELETE_EXPENSE':
      return { ...state, expenses: state.expenses.filter(expense => expense.id !== action.payload) };
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
