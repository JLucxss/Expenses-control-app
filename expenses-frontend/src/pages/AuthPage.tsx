import axios from "axios";
import React, { useState } from "react";
import RegisterForm from "../components/auth/RegisterForm";
import LoginForm from "../components/auth/LoginForm";

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [message, setMessage] = useState('')

    const handleLogin = async (username: string, password: string) => {
        try{
            const response = await axios.post('http://localhost:3000/auth/login', { username, password })
            localStorage.setItem('accessToken', response.data.access_token)
            setMessage('Login bem sucedido!')
            // direcionar para dashboard ou pagina principal
        } catch (error) {
            setMessage('Erro no login. Verifique suas credenciais')
            console.error('Login error:', error)
        }

    }

    const handleRegister = async (username: string, password: string) => {
        try{
            await axios.post('http://localhost:3000/auth/register', { username, password: password })
            setMessage('Registro bem sucedido! Agora você pode fazer login')
            setIsLogin(true)
        } catch (error) {
            setMessage('Erro no Registro. Tente novamente')
            console.error('Register error:', error)
        }

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isLogin ? 'Login' : 'Registrar'}
                </h2>
                {message && <p className="text-center mb-4 text-red-500">{message}</p>}
                {isLogin ? (
                    <LoginForm onLogin={handleLogin} />
                ) : (
                    <RegisterForm onRegister={handleRegister} />
                )}
                <p className="text-center mt-4">
                    {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{ ' ' }
                    <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500 hover:underline">
                    {isLogin ? 'Registre-se' : 'Faça login'}
                    </button>
                </p>
            </div>
        </div>
    )
}

export default AuthPage