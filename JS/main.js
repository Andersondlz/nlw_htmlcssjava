//Formatar data para Brasil

const formatador = (data) => {
    return{
        dia: {
            numerico: dayjs(data).format('DD'),
            semana:{
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd'),
            }
        },
        mes: dayjs(data).format('MMMM'),
        hora: dayjs(data).format('HH:mm')
     }
}


//objet

const atividade = {
    nome: "Almoço",
    data: new Date("2024-07-09 10:00"),
    finalizada: true
}

// lista array vetor

let atividades = [
    atividade,
    {
        nome: "Academia em Grupo",
        data: new Date("2024-07-10 12:00"),
        finalizada: false
    },
    {
        nome: "Estar na empresa LDO Turismo",
        data: new Date("2024-07-13 07:00"),
        finalizada: true
    },

]


const criarItemDeAtivdade = (atividade) => {
    let input = `<input onchange="concluirAtividade(event)" value="${atividade.data}" type="checkbox"`

    if (atividade.finalizada) {
        input = input + 'checked'
    }

    input = input + '>'
    // alert(input)

    const formatar = formatador(atividade.data);

    return `
        <div>
            ${input}
            <span>${atividade.nome}</span>
            <time>${formatar.dia.semana.longo}, dia ${formatar.dia.numerico} de ${formatar.mes} as ${formatar.hora}h</time>
        </div>
        `
}
//section.innerHTML = criarItemDeAtivdade(atividade)
//section.innerHTML = criarItemDeAtivdade(atividades[1])

const atualizarListaDeAtividades = () => {
    const section = document.querySelector('section')
    section.innerHTML = ''

    //verificar se a minha lista esta vazia

    if (atividades.length == 0) {
        section.innerHTML = `<p>Nenhuma atividade cadastradas</p>`
        return
    }


    for (let atividade of atividades) {
        section.innerHTML += criarItemDeAtivdade(atividade)
    }
}

atualizarListaDeAtividades()

const salvarAtividade = (event) => {
    event.preventDefault()  
    const dadosDoFormulario = new FormData(event.target)
    const nome = dadosDoFormulario.get('atividade')
    const dia = dadosDoFormulario.get('dia')
    const hora = dadosDoFormulario.get("hora")
    const data = `${dia} ${hora}`

    const novaAtividade = {
        nome,
        data,
        finalizada: false
    }

    const atividadeExiste = atividades.find((atividade) => {
        return atividade.data == novaAtividade.data
    })

    if(atividadeExiste){
        return alert("Atividade já tem hora programada")
    }

    atividades = [novaAtividade, ...atividades]
    atualizarListaDeAtividades()
}

const criarDiasSelecao = () =>{
    const dias = [
        "2024-07-19",
        "2024-07-30",
        "2024-09-20",
        "2024-10-01",
        "2024-11-02",
    ]
    let diasSelecao = ''

    for(let dia of dias){
        const formatar = formatador(dia)
        const diaFormatado = `${formatar.dia.numerico} de ${formatar.mes}`
        diasSelecao += `
        <option value="${dia}">${diaFormatado}</option>
        `
    }

    document.querySelector('select[name="dia"]').innerHTML = diasSelecao
}
criarDiasSelecao()  

const criarHorasSelecao = () =>{
    let horasDisponiveis = ''

    for(let i = 6; i < 23; i++){
        const hora = String(i).padStart(2, '0')
        horasDisponiveis += `<option values=${hora}:00>${hora}:00</option>`
        horasDisponiveis += `<option values=${hora}:30>${hora}:30</option>`
        
    }


    document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis
}
criarHorasSelecao()

const concluirAtividade = (event) =>{
    const input = event.target
    const dataDesteInput = input.value
    const atividade = atividades.find((atividade) =>{
        return atividade.data == dataDesteInput
    })

    if (!atividade){
        return
    }

    atividade.finalizada = !atividade.finalizada
}