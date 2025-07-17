import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select'

interface Category {
  id: number;
  name: string;
}

interface TransactionFormProps {
  onTransactionAdded: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onTransactionAdded }) => {
    const [value, setValue] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [type, setType] = useState<string>('expense');
    const [categoryId, setCategoryId] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
        try {
          const token = localStorage.getItem('accessToken');
          const response = await axios.get('http://localhost:3000/categories', {
            headers: {
              Authorization: `Bearer ${token}`,
              },
            });
           setCategories(response.data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
        };
        fetchCategories()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
      const token = localStorage.getItem('accessToken');
      await axios.post(
        'http://localhost:3000/transactions',
        {
          value: parseFloat(value),
          description,
          date,
          type,
          categoryId: parseInt(categoryId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setValue('');
      setDescription('');
      setDate('');
      setCategoryId('');
      onTransactionAdded();
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Erro ao adicionar transação.');
    }
  };
    
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <label htmlFor="value">Valor</label>
        <input
          id="value"
          type="number"
          step="0.01"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Descrição</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="date">Data</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="type">Tipo</label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Receita</SelectItem>
            <SelectItem value="expense">Despesa</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="category">Categoria</label>
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

    



      <button type="submit" className="w-full">Adicionar Transação</button>


    </form>
  )
}

export default TransactionForm