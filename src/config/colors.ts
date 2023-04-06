import confirmacaoEntrega from "~/pages/forms/confirmacaoEntrega"

const color = {
    financeiro: {
        pendente: {background: "#f28538"},
        cancelada: {background: "#d62013"},
        emitida: {background: "#38f269"},
        retornou: {background: "#d851f0"},
        boletoAberto: {background: "#eb8c34"},
        aguardadoDeposito: {background: "#cc34eb"}
    },
    expedicao: {
        pendente: {background: "#38f269"},
        clienteRetirou: {background: "#38f269"},
        aguardandoCliente: {background: "#f28538"},
        notaFiscalSendoEnviada: {background: "#cc34eb"},
    },
    expedicao2: {
        pendente: {background: "#38f269"},
        clienteRetirou: {background: "#38f269"},
        aguardandoCliente: {background: "#f28538"},
        aguardandoTransportadora: {background: "#d851f0"},
        notaFiscalSendoEnviada: {background: "#cc34eb"}
    },
    logistica: {
        pendente: {background: "#38f269"},
        aguardandoRota: {background: "#f28538"},
        aguardandoVendedor: {background: "#d851f0"},
        notaFiscalSendoEnviada: {background: "#cc34eb"},
        emTransito: {background: "#38f269"},
        cancelada: {background: "#d62013"},
    },
    confirmacaoEntrega: {
        sim: {background: "#38f269"},
        nao: {background: "#d62013"},

    },
    canhoto: {
        sim: {background: "#38f269"},
        nao: {background: "#d62013"}
    }
}

export default color