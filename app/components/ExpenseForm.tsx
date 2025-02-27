"use client";

import React, { useState, useContext } from 'react';
import ExpenseContext from '../context/ExpenseContext';

const ExpenseForm = () => {
  const { dispatch } = useContext(ExpenseContext);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'expense' | 'income'>('expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newExpense = {
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount),
      type
    };

    dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="DESCRIPTION"
          className="w-full px-4 py-3 bg-transparent border-2 border-white text-white placeholder-gray-500 font-helvetica uppercase tracking-wider focus:outline-none focus:border-gray-400 transition-colors"
          required
        />
        <div className="flex gap-4 flex-col sm:flex-row">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="AMOUNT"
            step="0.01"
            min="0"
            className="w-full sm:w-[40%] px-4 py-3 bg-transparent border-2 border-white text-white placeholder-gray-500 font-helvetica uppercase tracking-wider focus:outline-none focus:border-gray-400 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            required
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'expense' | 'income')}
            className="w-full sm:w-[60%] px-4 py-3 bg-transparent border-2 border-white text-white font-helvetica uppercase tracking-wider focus:outline-none focus:border-gray-400 transition-colors"
          >
            <option value="expense" className="bg-black">EXPENSE</option>
            <option value="income" className="bg-black">INCOME</option>
          </select>
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full py-4 bg-white text-black font-bold font-helvetica uppercase tracking-wider hover:bg-gray-200 hover:text-white transition-colors relative overflow-hidden group"
      >
        <span className="relative z-10">ADD {type === 'expense' ? 'EXPENSE' : 'INCOME'}</span>
        <div className="absolute inset-0 bg-black transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
      </button>
    </form>
  );
};

export default ExpenseForm;
