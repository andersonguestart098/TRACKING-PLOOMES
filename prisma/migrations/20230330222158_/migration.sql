/*
  Warnings:

  - Added the required column `bandeiraCartao` to the `Financeiro` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Financeiro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" INTEGER NOT NULL,
    "vendedor" TEXT NOT NULL,
    "orcamento" INTEGER NOT NULL,
    "cliente" TEXT NOT NULL,
    "tipoFaturamento" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "formaPagamento" TEXT NOT NULL,
    "parcelas" TEXT NOT NULL,
    "vendaFrete" BOOLEAN NOT NULL,
    "bandeiraCartao" TEXT NOT NULL,
    "retiraEntrega" TEXT NOT NULL,
    "freteConta" TEXT NOT NULL,
    "entregaCadastro" BOOLEAN NOT NULL,
    "localCobranca" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "observacaoFinanceiro" TEXT NOT NULL,
    "tipoFrete" TEXT NOT NULL,
    "valorFrete" TEXT NOT NULL,
    "dataEntrega" TEXT NOT NULL,
    "statusNotaFiscal" TEXT NOT NULL,
    "operadorNotaFiscal" TEXT NOT NULL,
    "responsavelNotaFiscal" TEXT NOT NULL,
    CONSTRAINT "Financeiro_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "PassagemDados" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Financeiro" ("authorId", "cliente", "createdAt", "dataEntrega", "entregaCadastro", "formaPagamento", "freteConta", "id", "localCobranca", "observacao", "observacaoFinanceiro", "operadorNotaFiscal", "orcamento", "parcelas", "responsavelNotaFiscal", "retiraEntrega", "statusNotaFiscal", "tipoFaturamento", "tipoFrete", "updatedAt", "valor", "valorFrete", "vendaFrete", "vendedor") SELECT "authorId", "cliente", "createdAt", "dataEntrega", "entregaCadastro", "formaPagamento", "freteConta", "id", "localCobranca", "observacao", "observacaoFinanceiro", "operadorNotaFiscal", "orcamento", "parcelas", "responsavelNotaFiscal", "retiraEntrega", "statusNotaFiscal", "tipoFaturamento", "tipoFrete", "updatedAt", "valor", "valorFrete", "vendaFrete", "vendedor" FROM "Financeiro";
DROP TABLE "Financeiro";
ALTER TABLE "new_Financeiro" RENAME TO "Financeiro";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
