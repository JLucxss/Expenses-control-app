import React, { useState } from "react";

interface RegisterFormProps {
    onRegister: (username: string, password: string) => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onRegister(username, password)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="username">Usuário</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="password">Senha</label>
                <input 
                    id="password"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
            </div>

            <button type="submit" className="w-full">Registrar</button>
        </form>
    )
}

export default RegisterForm