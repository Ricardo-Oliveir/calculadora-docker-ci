// Importa as funções que queremos testar do nosso script principal
const { validarNota, calcularMedia, determinarSituacao } = require('../script.js');

// --- Testes para a função validarNota ---
describe('validarNota', () => {
    // Teste 1: Deve retornar true para notas válidas (entre 0 e 10)
    test('deve retornar true para notas entre 0 e 10', () => {
        expect(validarNota(0)).toBe(true);
        expect(validarNota(5)).toBe(true);
        expect(validarNota(10)).toBe(true);
        expect(validarNota(7.5)).toBe(true);
    });

    // Teste 2: Deve retornar false para notas menores que 0
    test('deve retornar false para notas menores que 0', () => {
        expect(validarNota(-1)).toBe(false);
        expect(validarNota(-0.1)).toBe(false);
    });

    // Teste 3: Deve retornar false para notas maiores que 10
    test('deve retornar false para notas maiores que 10', () => {
        expect(validarNota(11)).toBe(false);
        expect(validarNota(10.1)).toBe(false);
    });

    // Teste 4: Deve retornar false para valores não numéricos
    test('deve retornar false para valores não numéricos', () => {
        expect(validarNota("abc")).toBe(false);
        expect(validarNota(null)).toBe(false);
        expect(validarNota(undefined)).toBe(false);
        expect(validarNota(true)).toBe(false);
    });
});

// --- Testes para a função calcularMedia ---
describe('calcularMedia', () => {
    // Teste 1: Deve calcular a média corretamente para notas inteiras
    test('deve calcular a média corretamente para notas inteiras', () => {
        expect(calcularMedia(5, 5)).toBe(5);
        expect(calcularMedia(0, 10)).toBe(5);
        expect(calcularMedia(7, 8)).toBe(7.5);
    });

    // Teste 2: Deve calcular a média corretamente para notas decimais
    test('deve calcular a média corretamente para notas decimais', () => {
        expect(calcularMedia(7.5, 8.5)).toBe(8);
        expect(calcularMedia(6.3, 7.7)).toBe(7);
    });

    // Teste 3: Deve calcular a média corretamente para zero
    test('deve calcular a média corretamente com zero', () => {
        expect(calcularMedia(0, 0)).toBe(0);
    });
});

// --- Testes para a função determinarSituacao ---
describe('determinarSituacao', () => {
    // Teste 1: Deve retornar "Aprovado" para média 7 ou superior
    test('deve retornar "Aprovado" para média 7 ou superior', () => {
        expect(determinarSituacao(7)).toBe("Aprovado");
        expect(determinarSituacao(8.5)).toBe("Aprovado");
        expect(determinarSituacao(10)).toBe("Aprovado");
    });

    // Teste 2: Deve retornar "Recuperação" para média entre 5 e menor que 7
    test('deve retornar "Recuperação" para média entre 5 e menor que 7', () => {
        expect(determinarSituacao(5)).toBe("Recuperação");
        expect(determinarSituacao(6.9)).toBe("Recuperação");
        expect(determinarSituacao(5.01)).toBe("Recuperação");
    });

    // Teste 3: Deve retornar "Reprovado" para média menor que 5
    test('deve retornar "Reprovado" para média menor que 5', () => {
        expect(determinarSituacao(4.99)).toBe("Reprovado");
        expect(determinarSituacao(0)).toBe("Reprovado");
        expect(determinarSituacao(-1)).toBe("Reprovado"); // Embora validarNota cuide disso, é bom testar
    });
});