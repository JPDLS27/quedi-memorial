/* Resultados do questionário (25 respostas), transcritos do PDF de branding.
   tipo "barras": múltipla escolha | tipo "escala": notas de 1 a 10 */
const QUESTIONARIO = [
  {
    grupo: 'Perfil e hábitos gerais',
    perguntas: [
      { q: 'Qual é a sua faixa etária?', tipo: 'barras', r: [
        ['Até 12 anos', 0, 0], ['13 a 17 anos', 1, 4], ['18 a 25 anos', 21, 84], ['26 a 35 anos', 1, 4], ['36 a 50 anos', 1, 4], ['Mais de 50 anos', 1, 4] ] },
      { q: 'Você costuma perder ou esquecer objetos pessoais fora de casa?', tipo: 'barras', r: [
        ['Quase todos os dias', 2, 8], ['Pelo menos uma vez por semana', 3, 12], ['Algumas vezes ao mês', 3, 12], ['Raramente', 17, 68] ] },
      { q: 'Em uma escala de 1 a 10, com que frequência você costuma perder ou esquecer objetos no dia a dia?', tipo: 'escala', r: [1, 8, 5, 2, 1, 1, 2, 3, 1, 1] },
      { q: 'Quais destes objetos você já perdeu ou mais esquece?', tipo: 'barras', multi: true, r: [
        ['Guarda-chuva', 16, 64], ['Garrafa de água', 10, 40], ['Peças de roupa', 10, 40], ['Fones de ouvido', 9, 36], ['Carteira, documentos ou cartões', 7, 28], ['Carregador de celular', 5, 20], ['Chaves', 5, 20], ['Óculos', 3, 12], ['Joias', 1, 4] ] },
      { q: 'Em quais locais você costuma esquecer ou perder esses objetos?', tipo: 'barras', multi: true, r: [
        ['Escola ou faculdade', 19, 76], ['Trabalho', 14, 56], ['Transporte público', 6, 24], ['Bares, restaurantes ou baladas', 2, 8], ['Shoppings ou lojas', 2, 8], ['Na rua ou em praças e parques', 2, 8], ['Academia', 1, 4], ['Até em casa mesmo', 1, 4] ] }
    ]
  },
  {
    grupo: 'A experiência de perder algo',
    perguntas: [
      { q: 'Qual é o seu nível de frustração ou estresse ao perceber que perdeu um item importante (seja financeiro ou sentimental)?', tipo: 'escala', r: [0, 0, 3, 0, 3, 1, 2, 4, 5, 7] },
      { q: 'O quanto você costuma se dedicar (refazer trajetos, perguntar em estabelecimentos, postar em redes sociais) para tentar recuperar algo que perdeu?', tipo: 'escala', r: [0, 0, 1, 1, 3, 6, 6, 4, 1, 3] },
      { q: 'Você já encontrou algo que perdeu nos Achados e Perdidos físicos de algum local?', tipo: 'barras', r: [
        ['Sim', 11, 44], ['Algumas vezes', 6, 24], ['Nunca', 8, 32] ] },
      { q: 'Quão úteis e eficientes você considera os setores de "Achados e Perdidos" físicos de shoppings, estações ou faculdades hoje em dia?', tipo: 'escala', r: [0, 0, 2, 1, 6, 2, 6, 2, 2, 4] },
      { q: 'O quão você concorda com a frase "Os setores de Achados e Perdidos só funcionam para coisas de baixo valor, mas não para coisas valiosas"?', tipo: 'escala', r: [2, 0, 5, 3, 4, 1, 0, 5, 2, 3] },
      { q: 'O quanto você acredita e confia que outras pessoas tentariam devolver um item seu caso o encontrassem?', tipo: 'escala', r: [2, 3, 3, 2, 5, 7, 2, 1, 0, 0] },
      { q: 'Você pagaria uma pequena recompensa se isso garantisse a recuperação do seu objeto?', tipo: 'barras', r: [
        ['Talvez, depende do valor', 15, 60], ['Não, acredito que a devolução deveria ser gratuita', 6, 24], ['Sim, com certeza', 3, 12], ['Depende do item', 1, 4] ] }
    ]
  },
  {
    grupo: 'Quando você encontra algo que não é seu',
    perguntas: [
      { q: 'Se você encontrar um objeto de valor na rua, qual a probabilidade de tentar devolvê-lo ao dono?', tipo: 'escala', r: [0, 0, 0, 0, 1, 1, 2, 4, 5, 12] },
      { q: 'Você já conseguiu encontrar o dono de um objeto que achou perdido?', tipo: 'barras', r: [
        ['Algumas vezes', 17, 68], ['Sempre', 4, 16], ['Nunca', 4, 16] ] },
      { q: 'Quais fatores dificultam a devolução de um objeto encontrado por você?', tipo: 'barras', multi: true, r: [
        ['Dificuldade em localizar o dono', 23, 92], ['Desconfiança sobre a veracidade do dono', 9, 36], ['Falta de tempo', 5, 20], ['Preocupação com minha própria segurança', 2, 8], ['Processo de devolução burocrático', 0, 0] ] },
      { q: 'O que mais te motiva a tentar devolver um objeto que você encontrou na rua ou em um estabelecimento?', tipo: 'barras', multi: true, r: [
        ['Empatia (colocar-se no lugar da pessoa)', 20, 80], ['Senso de cidadania ou honestidade', 15, 60], ['Esperança de que façam o mesmo por mim no futuro', 12, 48], ['Facilidade do processo de devolução', 2, 8], ['Não tenho interesse em devolver', 0, 0] ] },
      { q: 'Você já usou alguma rede social ou site específico para tentar encontrar um objeto seu ou devolver o de alguém?', tipo: 'barras', r: [
        ['Não, nunca usei', 23, 92], ['Sim, mas não tive sucesso', 2, 8], ['Sim, e consegui recuperar ou devolver', 0, 0] ] }
    ]
  },
  {
    grupo: 'Procurar, encontrar e agradecer',
    perguntas: [
      { q: 'Na sua percepção, qual a probabilidade de um objeto nunca ser devolvido ao dono simplesmente por ser muito caro ou atrativo?', tipo: 'escala', r: [0, 0, 1, 0, 1, 0, 4, 6, 6, 7] },
      { q: 'Na sua opinião, qual seria a melhor forma de incentivar alguém a devolver um objeto de alto valor?', tipo: 'barras', r: [
        ['Oferecer uma recompensa em dinheiro', 13, 52], ['Garantir um jeito de devolver o item anonimamente, sem burocracia ou constrangimento', 11, 44], ['Oferecer algo em troca', 1, 4] ] },
      { q: 'Se você perdesse algo muito importante, qual seria o seu nível de disposição para oferecer uma recompensa a quem o encontrasse?', tipo: 'escala', r: [0, 0, 0, 1, 1, 1, 2, 8, 4, 8] },
      { q: 'Na sua visão, o quanto o oferecimento de uma recompensa (financeira ou de outras formas) realmente influencia a decisão de uma pessoa desconhecida de devolver um item?', tipo: 'escala', r: [0, 0, 1, 0, 1, 0, 4, 6, 6, 7] }
    ]
  }
];
