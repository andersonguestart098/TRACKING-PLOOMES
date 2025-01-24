import confirmacaoEntrega from "~/pages/forms/confirmacaoEntrega"

const color = {
    financeiro: {
        pendente: {background: "#f2c335"},
        cancelada: {background: "#f76159"},
        emitida: {background: "#38f269"},
        retornou: {background: "#d851f0"},
        boletoAberto: {background: "#ed87ed"},
        aguardadoDeposito: {background: "#5256bf"},
        emAnalise: {background: "#b7d9f7"},
        medio: {background: "#fc8403"}
    },
    expedicao: {
        pendente: {background: "#f2c335"},
        clienteRetirou: {background: "#38f269"},
        aguardandoCliente: {background: "#f2c335"},
        notaFiscalSendoEnviada: {background: "#cc34eb"},
        naoDefinido: {background: "#f2c335"},
        emSeparacao: {background: "#b7d9f7"},
        cancelada: {background: "#f76159"}
    },
    expedicao2: {
        pendente: {background: "#f2c335"},
        clienteRetirou: {background: "#38f269"},
        aguardandoCliente: {background: "#f2c335"},
        aguardandoTransportadora: {background: "#d851f0"},
        notaFiscalSendoEnviada: {background: "#cc34eb"},
        naoDefinido: {background: "#f2c335"},
        emSeparacao: {background: "#b7d9f7"},
        cancelada: {background: "#f76159"}
    },
    logistica: {
        pendente: {background: "#f2c335"},
        aguardandoRota: {background: "#d851f0"},
        aguardandoVendedor: {background: "#5256bf"},
        notaFiscalSendoEnviada: {background: "#cc34eb"},
        emTransito: {background: "#38f269"},
        cancelada: {background: "#f76159"},
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
    },

    ocorrencia: {
        baixo: {background: "#b7d9f7"},
        medio: {background: "#f2c335"},
        alto: {background: "#f76159"}
    },

    feedback: {
        zero: {background: "#f7615"},
        um: {background: "#f24418"},
        dois: {background: "#f75f39"},
        tres: {background: "#f09307"},
        quatro: {background: "#f2a838"},
        cinco: {background: "#eded55"},
        seis: {background: "#ebeb2f"},
        sete: {background: "#a3e653"},
        oito: {background: "#8fe627"},
        nove: {background: "#74c712"},
        dez: {background: "#81eb05"}
    }
}

export default color