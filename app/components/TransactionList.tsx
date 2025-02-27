"use client";

import { useContext } from 'react';
import ExpenseContext from '../context/ExpenseContext';

const formatCOP = (amount: number) => {
  const copFormat = new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);

  // Using fixed exchange rates for demonstration
  const usdAmount = amount * 0.00025; // Approximate COP to USD rate
  const eurAmount = amount * 0.00023; // Approximate COP to EUR rate

  const usdFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(usdAmount);

  const eurFormat = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(eurAmount);

  return {
    cop: copFormat + ' COP',
    usd: usdFormat,
    eur: eurFormat
  };
};

const TransactionList = () => {
  const { state, dispatch } = useContext(ExpenseContext);
  const totalExpenses = state.expenses.reduce((total, expense) => {
    return total + (expense.type === 'expense' ? -expense.amount : expense.amount);
  }, 0);

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
  };

  return (
    <div className="bg-[#1a1a1a] border-2 border-white p-4 sm:p-6 md:p-8 relative">
      <div className="flex justify-between items-center mb-8 border-b-2 border-white pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white font-helvetica tracking-tight relative inline-block">
          TRANSACTION LIST
          <span className="absolute -top-1 -right-1 text-xs text-white">™</span>
        </h2>
        <div className="text-right">
          <p className="text-xs sm:text-sm text-gray-400 font-helvetica uppercase tracking-wider">TOTAL BALANCE</p>
          <div className={`text-2xl sm:text-3xl font-bold font-helvetica ${totalExpenses >= 0 ? 'text-green-500' : 'text-red-500'} relative`}>
            {formatCOP(Math.abs(totalExpenses)).cop}
            <p className="text-sm text-gray-400 space-y-0.5 mt-1">
              {formatCOP(Math.abs(totalExpenses)).usd}
              <br />
              {formatCOP(Math.abs(totalExpenses)).eur}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {state.expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex justify-between items-center p-3 sm:p-4 bg-[#2a2a2a] border border-white group hover:bg-[#333333] transition-all duration-300 relative"
          >
            <div className="relative z-10">
              <p className="font-bold text-white font-helvetica uppercase tracking-tight">
                {expense.description}
                <span className="text-xs align-top text-gray-400">™</span>
              </p>
              <div>
                <p className={`text-sm font-helvetica ${expense.type === 'expense' ? 'text-red-500' : 'text-green-500'} tracking-wider`}>
                  {formatCOP(expense.amount).cop}
                </p>
                <div className="text-xs text-gray-400 space-y-0.5">
                  <p>{formatCOP(expense.amount).usd}</p>
                  <p>{formatCOP(expense.amount).eur}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleDelete(expense.id)}
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 px-2 sm:px-4 py-1 sm:py-2 bg-white text-black font-helvetica uppercase text-xs sm:text-sm tracking-wider hover:bg-red-500 hover:text-white relative overflow-hidden"
            >
              DELETE
              <div className="absolute inset-0 bg-black/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
          </div>
        ))}
        {state.expenses.length === 0 && (
          <p className="text-center text-gray-400 py-4 sm:py-6 font-helvetica uppercase tracking-wider text-sm sm:text-base border-2 border-dashed border-gray-600">
            NO TRANSACTIONS ADDED YET
          </p>
        )}
      </div>
    </div>
  );
};

export default TransactionList;