import { describe, it, expect } from 'vitest';
import { calculateBudgetStatus } from '../budgetCalculator';
import { generateExpenseReport } from '../expenseTracker';

describe('Funcionalidad: Calculadora de estado de presupuesto', () => {
    it('Los gastos son menos del 80% del presupuesto', () => {
        expect(calculateBudgetStatus(700, 1000)).toBe('Under budget');
    });
    it('Los gastos son entre el 80% y el 100% del presupuesto', () => {
        expect(calculateBudgetStatus(850, 1000)).toBe('On budget');
    });
    it('Los gastos superan el presupuesto', () => {
        expect(calculateBudgetStatus(1200, 1000)).toBe('Over budget');
    });
    it('Los gastos son negativos', () => {
        expect(() => calculateBudgetStatus(-850, 1000)).toThrow('Numbers should be a positive value.');
    });
});

describe('Funcionalidad: Generación de informe de gastos', () => {
    it('Generar un informe correcto de gastos', () => {
        const report = generateExpenseReport([50, 0, 120, 85], 100);
        expect(report.travelDays).toBe(4);
        expect(report.expenseDays).toBe(3);
        expect(report.dailyBudget).toBe(100);
        expect(report.averageDailyExpense).toBe(63.75);
        expect(report.rating).toBe(3);
        expect(report.feedback).toBe("¡Excelente gestión!");
    });
    it('Debe lanzar un error si hay valores no numéricos', () => {
        const invalidExpenses = [50, NaN, 120] as number[];
        expect(() => generateExpenseReport(invalidExpenses, 100)).toThrow("Los gastos contienen valores no numéricos.");
    });
    it('debe dar rating 2 si está ligeramente por encima (ajustado)', () => {
        const report = generateExpenseReport([100, 110, 120, 110], 100);
        expect(report.rating).toBe(2);
        expect(report.feedback).toBe("Correcto, pero ajustado");
    });

    it('debe dar rating 1 si está muy por encima', () => {
        const report = generateExpenseReport([150, 140, 130, 140], 100);
        expect(report.rating).toBe(1);
        expect(report.feedback).toBe("Puede mejorar");
    });

})
    

