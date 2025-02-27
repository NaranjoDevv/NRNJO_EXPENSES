"use client";

import ExpenseForm from './components/ExpenseForm';
import TransactionList from './components/TransactionList';

export default function Home() {
  return (
    <div className="min-h-screen bg-black py-4 sm:py-8">
      <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto">
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 font-helvetica uppercase tracking-tighter">NRNJO EXPENSE</h1>
          <p className="text-gray-400 font-helvetica text-lg sm:text-xl tracking-widest uppercase">TRACK YOUR WEALTH</p>
        </header>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <div className="bg-[#1a1a1a] border-2 border-white p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 lg:mb-8 font-helvetica uppercase tracking-tight">NEW ENTRY</h2>
            <ExpenseForm />
          </div>

          <TransactionList />
        </div>
      </div>
    </div>
  );
}
