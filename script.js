document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('leadForm');
  const messageDiv = document.getElementById('message');

// Credenciais do Supabase
  const SUPABASE_URL = 'https://vdaznijejyohhtstqgzx.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkYXpuaWplanlvaGh0c3RxZ3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNTQyMjQsImV4cCI6MjA2ODkzMDIyNH0.lE8gS4ncUk3UTIGMcNtDEk4lp-Pg-5nvZfdu4wrq0t8';

  form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Evitar o envio padrão do formulário

      const name = document.getElementById('nome').value;
      const dd = document.getElementById('dd').value;
      const phoneNumber = document.getElementById('telefone').value;
      const fullPhoneNumber = `(${dd}) ${phoneNumber}`; // Formatar número de telefone

// Limpar mensagens anteriores
      messageDiv.textContent = '';
      messageDiv.className = 'message';

      try {
          const response = await fetch(`${SUPABASE_URL}/rest/v1/Leads`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'apikey': SUPABASE_ANON_KEY,
                  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                  'Prefer': 'return=minimal' // Não precisamos do registro criado de volta
              },
              body: JSON.stringify({
                  nome: name,
                  telefone: fullPhoneNumber
              })
          });

          if (response.ok) {
              messageDiv.textContent = 'Lead cadastrado com sucesso!';
              messageDiv.classList.add('success');
              form.reset(); // Clear the form
          } else {
              const errorData = await response.json();
              console.error('Erro ao cadastrar lead:', errorData);
              messageDiv.textContent = `Erro ao cadastrar lead: ${errorData.message || 'Erro desconhecido'}`;
              messageDiv.classList.add('error');
          }
      } catch (error) {
          console.error('Erro na requisição:', error);
          messageDiv.textContent = `Erro na requisição: ${error.message}`;
          messageDiv.classList.add('error');
      }
  });
});