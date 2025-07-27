document.getElementById("login-form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("password").value;

  const apiUrl = "https://pbhulouvwqdzkattzckp.supabase.co/functions/v1/smooth-endpoint";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiaHVsb3V2d3FkemthdHR6Y2twIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4Mzk2MTcsImV4cCI6MjA2NTQxNTYxN30.2RixRM5TD-RUUdve4EbJME0-lkjSyIe-GL0steal-yA";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ email, senha })
  });

  const data = await response.json();

  if (response.ok) {
    // Verifica se perfil_nome é Admin
    if (data.perfil_nome && data.perfil_nome.toLowerCase() === "admin") {
      // Login autorizado, redireciona ou carrega a página restrita
      localStorage.setItem("access_token", data.access_token);
    
      window.location.href = "apis/index.html"; 
    } else {
      document.getElementById("msg").textContent = "Acesso negado: apenas administradores podem acessar.";
    }
  } else {
    document.getElementById("msg").textContent = data.error || "Usuário ou senha inválidos.";
  }
});
