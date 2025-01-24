import registerPloomesWebhook from "src/hooks/registerWebhook";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      await registerPloomesWebhook();
      res.status(200).json({ message: "Webhook registrado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao registrar o webhook", error });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
