import confirmacaoEntrega from "~/pages/forms/confirmacaoEntrega"

const color = {
    financeiro: {
        pendente: {background: "#f2c335"},
        cancelada: {background: "#f76159"},
        emitida: {background: "#38f269"},
        retornou: {background: "#d851f0"},
        boletoAberto: {background: "#ed87ed"},
        aguardadoDeposito: {background: "#5256bf"}
    },
    expedicao: {
        pendente: {background: "#f2c335"},
        clienteRetirou: {background: "#38f269"},
        aguardandoCliente: {background: "#f2c335"},
        notaFiscalSendoEnviada: {background: "#cc34eb"},
        naoDefinido: {background: "#f2c335"},
        emSeparacao: {background: "#b7d9f7"}
    },
    expedicao2: {
        pendente: {background: "#f2c335"},
        clienteRetirou: {background: "#38f269"},
        aguardandoCliente: {background: "#f2c335"},
        aguardandoTransportadora: {background: "#d851f0"},
        notaFiscalSendoEnviada: {background: "#cc34eb"},
        naoDefinido: {background: "#f2c335"},
        emSeparacao: {background: "#b7d9f7"}
    },
    logistica: {
        pendente: {background: "#f2c335"},
        aguardandoRota: {background: "#d851f0"},
        aguardandoVendedor: {background: "#5256bf"},
        notaFiscalSendoEnviada: {background: "#cc34eb"},
        emTransito: {background: "#38f269"},
        cancelada: {background: "#d62013"},
        naoDefinido: {background: "#f2c335"},
        emSeparacao: {background: "#b7d9f7"},
        aDefinir: {background: "#f2c335"}
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