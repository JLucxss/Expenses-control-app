import React, { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

interface CategoryListProps {
  onCategoryDeleted: () => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onCategoryDeleted }) => {
    const [categories, setCategories] = useState<Category[]>([])

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('accessToken')
            const response = await axios.get('http://localhost:3000/categories', { headers: { Authorization: `Bearer ${token}`,}, })
            setCategories(response.data)
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const token = localStorage.getItem('accessToken');
            await axios.delete(`http://localhost:3000/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            onCategoryDeleted();
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Erro ao deletar categoria.');
        }
    };

    useEffect(() => {
        fetchCategories()
    }, [onCategoryDeleted])

    return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Minhas Categorias</h3>
      {categories.length === 0 ? (
        <p>Nenhuma categoria cadastrada.</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="flex justify-between items-center p-2 border rounded-md">
              <span>{category.name}</span>
              <button onClick={() => handleDelete(category.id)}>
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryList