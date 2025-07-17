import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface SummaryData {
  income: number;
  expense: number;
  balance: number;
  transactionsByCategory: { [key: string]: number };
}

interface SummaryDisplayProps {
  type: 'weekly' | 'monthly';
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ type }) => {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:3000/summaries/${type}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSummary(response.data);
      } catch (err) {
        console.error(`Error fetching ${type} summary:`, err);
        setError(`Erro ao carregar resumo ${type === 'weekly' ? 'semanal' : 'mensal'}.`);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [type]);

  if (loading) {
    return <p>Carregando resumo {type === 'weekly' ? 'semanal' : 'mensal'}...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!summary) {
    return <p>Nenhum resumo disponível para o período {type === 'weekly' ? 'semanal' : 'mensal'}.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Resumo {type === 'weekly' ? 'Semanal' : 'Mensal'}</h3>
      <p>Receita: R$ {summary.income.toFixed(2)}</p>
      <p>Despesa: R$ {summary.expense.toFixed(2)}</p>
      <p>Saldo: R$ {summary.balance.toFixed(2)}</p>

      <h4 className="text-lg font-semibold mt-4">Despesas por Categoria:</h4>
      {Object.keys(summary.transactionsByCategory).length === 0 ? (
        <p>Nenhuma despesa por categoria neste período.</p>
      ) : (
        <ul>
          {Object.entries(summary.transactionsByCategory).map(([categoryName, amount]) => (
            <li key={categoryName}>{categoryName}: R$ {amount.toFixed(2)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SummaryDisplay;
