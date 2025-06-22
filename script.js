function validarNota(nota) {
    return typeof nota === 'number' && nota >= 0 && nota <= 10;
}

function calcularMedia(nota1, nota2) {
    return (nota1 + nota2) / 2;
}

function determinarSituacao(media) {
    if (media >= 7) {
        return "Aprovado";
    } else if (media >= 5) {
        return "Recuperação";
    } else {
        return "Reprovado";
    }
}

function handleSubmit(event) {
    event.preventDefault();

    const nomeAlunoInput = document.getElementById('nomeAluno');
    const nota1Input = document.getElementById('nota1');
    const nota2Input = document.getElementById('nota2');
    const resultadoDiv = document.getElementById('resultado');

    const nomeAluno = nomeAlunoInput.value;
    const nota1 = parseFloat(nota1Input.value);
    const nota2 = parseFloat(nota2Input.value);

    if (!validarNota(nota1) || !validarNota(nota2)) {
        resultadoDiv.innerHTML = '<p style="color: red;">Por favor, insira notas válidas entre 0 e 10.</p>';
        return;
    }

    const media = calcularMedia(nota1, nota2);
    const situacao = determinarSituacao(media);

    resultadoDiv.innerHTML = `
        <p><strong>Aluno:</strong> ${nomeAluno}</p>
        <p><strong>Nota 1:</strong> ${nota1}</p>
        <p><strong>Nota 2:</strong> ${nota2}</p>
        <p><strong>Média:</strong> ${media.toFixed(2)}</p>
        <p><strong>Situação:</strong> <span style="font-weight: bold; color: ${situacao === 'Aprovado' ? 'green' : situacao === 'Recuperação' ? 'orange' : 'red'};">${situacao}</span></p>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const notaForm = document.getElementById('notaForm');
    if (notaForm) {
        notaForm.addEventListener('submit', handleSubmit);
    }
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validarNota,
        calcularMedia,
        determinarSituacao
    };
}

document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const botoes = document.querySelectorAll('.botoes button');
    let valorAtual = '';
    let operador = '';
    let valorAnterior = '';
    let resultadoMostrado = false;

    function atualizarDisplay(valor) {
        display.value = valor;
    }

    botoes.forEach(botao => {
        botao.addEventListener('click', function() {
            const valor = this.textContent;

            if (valor === 'C') {
                valorAtual = '';
                operador = '';
                valorAnterior = '';
                atualizarDisplay('');
                resultadoMostrado = false;
                return;
            }

            if (valor === '=') {
                if (valorAnterior && operador && valorAtual) {
                    let resultado;
                    try {
                        resultado = eval(valorAnterior + operador + valorAtual);
                    } catch {
                        resultado = 'Erro';
                    }
                    atualizarDisplay(resultado);
                    valorAtual = resultado.toString();
                    operador = '';
                    valorAnterior = '';
                    resultadoMostrado = true;
                }
                return;
            }

            if (['+', '-', '*', '/'].includes(valor)) {
                if (valorAtual) {
                    if (valorAnterior && operador) {
                        // Se já tem operação pendente, resolve antes
                        let resultado;
                        try {
                            resultado = eval(valorAnterior + operador + valorAtual);
                        } catch {
                            resultado = 'Erro';
                        }
                        valorAnterior = resultado.toString();
                        atualizarDisplay(valorAnterior + valor);
                    } else {
                        valorAnterior = valorAtual;
                        atualizarDisplay(valorAtual + valor);
                    }
                    operador = valor;
                    valorAtual = '';
                } else if (valorAnterior && operador) {
                    operador = valor;
                    atualizarDisplay(valorAnterior + operador);
                }
                return;
            }

            // Se resultado foi mostrado, iniciar novo cálculo
            if (resultadoMostrado) {
                valorAtual = '';
                operador = '';
                valorAnterior = '';
                resultadoMostrado = false;
            }

            // Adiciona número ou ponto
            if (valor === '.' && valorAtual.includes('.')) return;
            valorAtual += valor;
            atualizarDisplay((valorAnterior ? valorAnterior + operador : '') + valorAtual);
        });
    });
});