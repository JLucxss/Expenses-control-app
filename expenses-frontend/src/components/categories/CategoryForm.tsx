import axios from "axios";
import React, { useState } from "react";

interface CategoryFormProps {
    onCategoryAdded: () => void
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onCategoryAdded }) => {
    const [name, setName] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try{
            const token = localStorage.getItem('accessToken')
            await axios.post(
                'http://localhost:3000/categories',
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            )
            setName('')
            onCategoryAdded()
        } catch (error) {
            console.error('Error adding category', error);
            alert('erro ao adicionar categoria')
        }
    } 

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="categoryName">Nome da Categoria</label>
                <input
                    id="categoryName" 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required    
                />
            </div>
            <button type="submit" className="w-full">Adicionar Categoria</button>
        </form>
    )
}

export default CategoryForm