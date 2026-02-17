import { calculateBudgetStatus } from './budgetCalculator';
import { generateExpenseReport } from './expenseTracker';
import "./style.css";

// Usar "as HTMLInputElement" para que TS sepa que tienen la propiedad .value;

const inputTotalExpenses = document.getElementById('totalExpenses') as HTMLInputElement;
const inputBudget = document.getElementById('budget') as HTMLInputElement;
const btnBudget = document.getElementById('btnBudget') as HTMLButtonElement;
const budgetResult = document.getElementById('budgetResult') as HTMLElement;

const inputDailyExpenses = document.getElementById('dailyExpenses') as HTMLInputElement;
const inputDailyBudget = document.getElementById('dailyBudget') as HTMLInputElement;
const btnTracker = document.getElementById('btnTracker') as HTMLButtonElement;
const trackerResult = document.getElementById('trackerResult') as HTMLElement;

btnBudget.addEventListener('click', () => {
    const expenses = parseFloat(inputTotalExpenses.value);
    const budget = parseFloat(inputBudget.value);

    const result = calculateBudgetStatus(expenses, budget);
    budgetResult.innerText = `Resultado: ${result}`;
});

// --- Lógica para el Rastreador de Gastos (Con Gestión de Errores) ---
btnTracker.addEventListener('click', () => {
    try {
        // Convertimos el string "50, 20, 100" en un array [50, 20, 100]
        const expensesArray = inputDailyExpenses.value.split(',').map(num => parseFloat(num.trim()));
        const dailyBudget = parseFloat(inputDailyBudget.value);

        // Validación de entrada (Consejo del ejercicio)
        if (expensesArray.some(isNaN)) {
            throw new Error("Los gastos contienen valores no numéricos o el campo está vacío");
        }

        const report = generateExpenseReport(expensesArray, dailyBudget);

        // Pintamos el informe en el HTML
        trackerResult.innerHTML = `
            <div style="border: 1px solid #ccc; padding: 10px; margin-top: 10px;">
                <p><strong>Días de viaje:</strong> ${report.travelDays}</p>
                <p><strong>Promedio diario:</strong> ${report.averageDailyExpense.toFixed(2)}€</p>
                <p><strong>Valoración:</strong> ${report.feedback} (Rating: ${report.rating})</p>
            </div>
        `;

    } catch (error) {
        if (error instanceof Error) {
            alert(`⚠️ Error: ${error.message}`);
        }
    }
});