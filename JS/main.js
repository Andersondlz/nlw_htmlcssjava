//objet

const atividade = {
    nome: "Almoço",
    data: new Date("2024-07-09 10:00"),
    finalizada: true
}

// lista array vetor

const atividades = [
    atividade,
    {
        nome: "Academia em Grupo",
        data: new Date ("2024-07-10 12:00"),
        finalizada: false
    },
    {
        nome: "Estar na empresa LDO Turismo",
        data: new Date ("2024-07-13 07:00"),
        finalizada: true
    },

]


const criarItemDeAtivdade = (atividade) => {
    let input = '<input type="checkbox"'
    
    if (atividade.finalizada){
        input = input + 'checked'
    }

    input = input + '>'
    // alert(input)

    return `
        <div>
            ${input}
            <span>${atividade.nome}</span>
            <time>${atividade.data}</time>
        </div>
        ` 
}

const section = document.querySelector('section')
//section.innerHTML = criarItemDeAtivdade(atividade)
section.innerHTML = criarItemDeAtivdade(atividades[1])

for (let atividade of atividades){
    section.innerHTML += criarItemDeAtivdade(atividade)
}