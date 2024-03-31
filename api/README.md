PROJETO

POST /projeto {
    name: String
    client_name: String
    goal: String
    startDate: Date
    finalDate: Date
    price: Number
    team: String | Number
}

POST /membro {
    name: String
    address: String
    birthdate: Date
    gender: 'Masculino', 'Feminino'
    race: 'Branco', 'Preto', 'Pardo', 'Indígena', 'Amarelo'
    role: 'Analista', 'Desenvolvedor', 'DBA', 'Designer', 'QA', 'Delivery', 'PO'
}

POST /time {
    name: String
    projeto: Number | String
}