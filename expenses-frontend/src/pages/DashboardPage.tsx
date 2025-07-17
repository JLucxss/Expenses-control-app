import React, { useState } from 'react';
import CategoryForm from '../components/categories/CategoryForm';
import CategoryList from '../components/categories/CategoryList';
import TransactionForm from '../components/transactions/TransactionForm';
import TransactionList from '../components/transactions/TransactionList';
import SummaryDisplay from '../components/summaries/summaryDisplay';


const DashboardPage: React.FC = () => {
  const [refreshCategories, setRefreshCategories] = useState(false);
  const [refreshTransactions, setRefreshTransactions] = useState(false);
  const [showSummaries, setShowSummaries] = useState(false)

  const handleCategoryChange = () => {
    setRefreshCategories(prev => !prev);
  };

  const handleTransactionChange = () => {
    setRefreshTransactions(prev => !prev);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard de Gastos</h1>

      <div className="flex justify-center mb-6 space-x-4">
        <button onClick={() => setShowSummaries(false)}>
          Gerenciar Transações e Categorias
        </button>
        <button onClick={() => setShowSummaries(true)}>
          Ver Resumos
        </button>
      </div>

      {!showSummaries ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Categorias</h2>
          <CategoryForm onCategoryAdded={handleCategoryChange} />
          <div className="mt-6">
            <CategoryList onCategoryDeleted={handleCategoryChange} key={refreshCategories ? 'refresh' : 'no-refresh'} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Transações</h2>
          <TransactionForm onTransactionAdded={handleTransactionChange} />
          <div className="mt-6">
            <TransactionList onTransactionDeleted={handleTransactionChange} key={refreshTransactions ? 'refresh' : 'no-refresh'} />
          </div>
        </div>
      </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <SummaryDisplay type="weekly" />
          <SummaryDisplay type="monthly" />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;