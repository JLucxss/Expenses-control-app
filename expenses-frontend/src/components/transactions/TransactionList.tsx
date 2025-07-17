import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
}

interface Transaction {
  id: number;
  value: number;
  description: string;
  date: string;
  type: string;
  category: Category;
}

interface TransactionListProps {
  onTransactionDeleted: () => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ onTransactionDeleted }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:3000/transactions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:3000/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onTransactionDeleted();
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Erro ao deletar transação.');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [onTransactionDeleted]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Minhas Transações</h3>
      {transactions.length === 0 ? (
        <p>Nenhuma transação cadastrada.</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id} className="flex justify-between items-center p-2 border rounded-md">
              <div>
                <p>{transaction.description} - {transaction.value.toFixed(2)} ({transaction.type})</p>
                <p className="text-sm text-gray-500">{transaction.date} - {transaction.category.name}</p>
              </div>
              <button onClick={() => handleDelete(transaction.id)}>
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
