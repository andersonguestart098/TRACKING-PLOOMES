-- CreateTable
CREATE TABLE "PassagemDados" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "notaFiscal" INTEGER,
    "expedicao" TEXT NOT NULL,
    "cliente" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Assinatura" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "notaFiscal" INTEGER NOT NULL,
    "responsavel" TEXT NOT NULL,
    "assinatura_img" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Financeiro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" INTEGER NOT NULL,
    "vendedor" TEXT NOT NULL,
    "orcamento" INTEGER NOT NULL,
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
    "precisaEncomendar" TEXT NOT NULL,
    "descreva" TEXT NOT NULL,
    "precisaRecuperar" TEXT NOT NULL,
    CONSTRAINT "Financeiro_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "PassagemDados" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Expedicao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" INTEGER NOT NULL,
    "responsavelNotaFiscal" TEXT NOT NULL,
    "statusNotaFiscal" TEXT NOT NULL,
    CONSTRAINT "Expedicao_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "PassagemDados" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Expedicao2" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" INTEGER NOT NULL,
    "responsavelNotaFiscal" TEXT NOT NULL,
    "statusNotaFiscal" TEXT NOT NULL,
    CONSTRAINT "Expedicao2_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "PassagemDados" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Logistica" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" INTEGER NOT NULL,
    "responsavelNotaFiscal" TEXT NOT NULL,
    "statusNotaFiscal" TEXT NOT NULL,
    CONSTRAINT "Logistica_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "PassagemDados" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Saida" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "notaFiscal" INTEGER NOT NULL,
    "codigoEntrega" INTEGER NOT NULL,
    "nomeConferente" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "motorista" TEXT NOT NULL,
    "cidadeDestino" TEXT NOT NULL,
    "hodometro" INTEGER NOT NULL,
    "images" TEXT,
    "obs" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ConfirmacaoEntrega" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "motorista" TEXT NOT NULL,
    "notaFiscal" INTEGER NOT NULL,
    "cidade" TEXT NOT NULL,
    "entregaConcluida" TEXT NOT NULL,
    "obs" TEXT NOT NULL,
    "images" TEXT
);

-- CreateTable
CREATE TABLE "Retorno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "notaFiscal" INTEGER NOT NULL,
    "placa" TEXT NOT NULL,
    "hodometro" INTEGER NOT NULL,
    "data" TEXT NOT NULL,
    "obs" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Canhoto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "notaFiscal" INTEGER NOT NULL,
    "motorista" TEXT NOT NULL,
    "statusCanhoto" TEXT NOT NULL,
    "responsavelCanhoto" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CanhotoRetirado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "notaFiscal" INTEGER NOT NULL,
    "responsavel" TEXT NOT NULL,
    "motivo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Teste" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "notaFiscal" INTEGER NOT NULL,
    "teste" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ocorrencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "descricao" TEXT NOT NULL,
    "gravidade" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "prioridade" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "causa" TEXT NOT NULL,
    "resolucao" TEXT NOT NULL,
    "gerouCusto" TEXT NOT NULL,
    "dataEncerramento" TEXT NOT NULL,
    "especifique" TEXT NOT NULL,
    "obs" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FeedBack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "nome" TEXT NOT NULL,
    "avalie" TEXT NOT NULL,
    "nota" TEXT NOT NULL,
    "pontos" TEXT NOT NULL,
    "gostaria" TEXT NOT NULL,
    "obs" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "setor" TEXT,
    "username" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "refreshToken" TEXT
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");
