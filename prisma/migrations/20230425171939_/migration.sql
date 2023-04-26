-- CreateTable
CREATE TABLE "PassagemDados" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notaFiscal" INTEGER,
    "expedicao" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,

    CONSTRAINT "PassagemDados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assinatura" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notaFiscal" INTEGER NOT NULL,
    "responsavel" TEXT NOT NULL,
    "assinatura_img" TEXT NOT NULL,

    CONSTRAINT "Assinatura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Financeiro" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
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

    CONSTRAINT "Financeiro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expedicao" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,
    "responsavelNotaFiscal" TEXT NOT NULL,
    "statusNotaFiscal" TEXT NOT NULL,

    CONSTRAINT "Expedicao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expedicao2" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,
    "responsavelNotaFiscal" TEXT NOT NULL,
    "statusNotaFiscal" TEXT NOT NULL,

    CONSTRAINT "Expedicao2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logistica" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,
    "responsavelNotaFiscal" TEXT NOT NULL,
    "statusNotaFiscal" TEXT NOT NULL,

    CONSTRAINT "Logistica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Saida" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notaFiscal" INTEGER NOT NULL,
    "codigoEntrega" INTEGER NOT NULL,
    "nomeConferente" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "motorista" TEXT NOT NULL,
    "cidadeDestino" TEXT NOT NULL,
    "hodometro" INTEGER NOT NULL,
    "obs" TEXT NOT NULL,

    CONSTRAINT "Saida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfirmacaoEntrega" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "motorista" TEXT NOT NULL,
    "notaFiscal" INTEGER NOT NULL,
    "cidade" TEXT NOT NULL,
    "entregaConcluida" TEXT NOT NULL,
    "obs" TEXT NOT NULL,

    CONSTRAINT "ConfirmacaoEntrega_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Retorno" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notaFiscal" INTEGER NOT NULL,
    "placa" TEXT NOT NULL,
    "hodometro" INTEGER NOT NULL,
    "data" TEXT NOT NULL,
    "obs" TEXT NOT NULL,

    CONSTRAINT "Retorno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Canhoto" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notaFiscal" INTEGER NOT NULL,
    "motorista" TEXT NOT NULL,
    "statusCanhoto" TEXT NOT NULL,
    "responsavelCanhoto" TEXT NOT NULL,

    CONSTRAINT "Canhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
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

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "setor" TEXT,
    "username" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
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

-- AddForeignKey
ALTER TABLE "Financeiro" ADD CONSTRAINT "Financeiro_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "PassagemDados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expedicao" ADD CONSTRAINT "Expedicao_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "PassagemDados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expedicao2" ADD CONSTRAINT "Expedicao2_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "PassagemDados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logistica" ADD CONSTRAINT "Logistica_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "PassagemDados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
