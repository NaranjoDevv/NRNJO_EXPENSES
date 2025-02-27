
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
  let newState: State;
  
  switch (action.type) {
    case 'ADD_EXPENSE':
      newState = { ...state, expenses: [...state.expenses, action.payload] };
      break;
    case 'DELETE_EXPENSE':
      newState = { ...state, expenses: state.expenses.filter(expense => expense.id !== action.payload) };
      break;
    default:
      return state;
  }

  // Save to localStorage after state updates
  if (typeof window !== 'undefined') {
    localStorage.setItem('expenses', JSON.stringify(newState.expenses));
  }

  return newState;
};

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      const parsedExpenses = JSON.parse(savedExpenses);
      parsedExpenses.forEach((expense: Expense) => {
        dispatch({ type: 'ADD_EXPENSE', payload: expense });
      });
    }
  }, []);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
