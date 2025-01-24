import axios from "axios";

console.log("Iniciando registro do Webhook...");

try {
  const response = await axios.post(
    "https://api2.ploomes.com/Webhooks",
    {
      EntityId: 1, // Entidade (ex: 1 para clientes, 2 para negócios, etc.)
      ActionId: 2, // Ação (ex: 2 para atualização, 1 para criação, etc.)
      CallbackUrl: "https://seusistema.com.br/api/ploomesWebhook", // Substitua pela URL correta do seu sistema
      ValidationKey: "1234", // Uma chave inventada para validar a requisição
    },
    {
      headers: {
        "User-Key": process.env.PLOOMES_API_KEY, // Sua chave API do Ploomes
      },
    }
  );
  console.log("Webhook registrado com sucesso:", response.data);
} catch (error) {
  console.error("Erro ao registrar o webhook:", error);
}
