import React, { useState } from "react";

const SyncPloomes = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Função para disparar a sincronização
  async function triggerSync() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/syncFinanceiro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stageId: "12345" }), // Substitua pelo StageId correto
      });

      const result = await response.json();
      setData(result);
      console.log("Sincronização:", result);
    } catch (error) {
      console.error("Erro ao sincronizar os dados:", error);
      setError("Erro ao sincronizar os dados.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Sincronizar Dados do Ploomes</h1>
      <button onClick={triggerSync} disabled={loading}>
        {loading ? "Sincronizando..." : "Iniciar Sincronização"}
      </button>

      {/* Exibe os dados sincronizados */}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}

      {/* Exibe o erro, se houver */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SyncPloomes;
