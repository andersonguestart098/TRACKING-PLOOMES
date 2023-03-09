/*
  Warnings:

  - Added the required column `authorId` to the `Financeiro` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "PassagemDados" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "notaFiscal" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Financeiro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" TEXT NOT NULL,
    "vendedor" TEXT NOT NULL,
    "orcamento" INTEGER NOT NULL,
    "cliente" TEXT NOT NULL,
    "tipoFaturamento" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "formaPagamento" TEXT NOT NULL,
    "parcelas" TEXT NOT NULL,
    "vendaFrete" BOOLEAN NOT NULL,
    "retiraEntrega" TEXT NOT NULL,
    "freteConta" TEXT NOT NULL,
    "entregaCadastro" BOOLEAN NOT NULL,
    "localCobranca" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "observacaoFinanceiro" TEXT NOT NULL,
    "tipoFrete" TEXT NOT NULL,
    "valorFrete" TEXT NOT NULL,
    "dataEntrega" TEXT NOT NULL,
    "numeroNotaFiscal" INTEGER NOT NULL,
    "statusNotaFiscal" TEXT NOT NULL,
    "operadorNotaFiscal" TEXT NOT NULL,
    "expedicaoLog" TEXT NOT NULL,
    "responsavelNotaFiscal" TEXT NOT NULL,
    CONSTRAINT "Financeiro_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "PassagemDados" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Financeiro" ("cliente", "createdAt", "dataEntrega", "entregaCadastro", "expedicaoLog", "formaPagamento", "freteConta", "id", "localCobranca", "numeroNotaFiscal", "observacao", "observacaoFinanceiro", "operadorNotaFiscal", "orcamento", "parcelas", "responsavelNotaFiscal", "retiraEntrega", "statusNotaFiscal", "tipoFaturamento", "tipoFrete", "updatedAt", "valor", "valorFrete", "vendaFrete", "vendedor") SELECT "cliente", "createdAt", "dataEntrega", "entregaCadastro", "expedicaoLog", "formaPagamento", "freteConta", "id", "localCobranca", "numeroNotaFiscal", "observacao", "observacaoFinanceiro", "operadorNotaFiscal", "orcamento", "parcelas", "responsavelNotaFiscal", "retiraEntrega", "statusNotaFiscal", "tipoFaturamento", "tipoFrete", "updatedAt", "valor", "valorFrete", "vendaFrete", "vendedor" FROM "Financeiro";
DROP TABLE "Financeiro";
ALTER TABLE "new_Financeiro" RENAME TO "Financeiro";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
