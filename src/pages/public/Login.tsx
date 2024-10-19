// src/pages/Login.tsx
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aqui você adicionaria a lógica de autenticação real
    login({ name: "Usuário Teste" });
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Página de Login</h2>
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}

export default Login;
