interface ExpenseReport {
    travelDays: number;
    expenseDays: number;
    dailyBudget: number;
    averageDailyExpense: number;
    isUnderBudget: boolean;
    rating: 1 | 2 | 3;
    feedback: string;
}

export const generateExpenseReport = (dailyExpenses: number[], dailyBudget: number): ExpenseReport => {
    if (dailyExpenses.some(expense => expense < 0)) {
        throw new Error("Los gastos no pueden ser negativos.");
    }
    if (dailyExpenses.some(isNaN)) {
        throw new Error("Los gastos contienen valores no numéricos.");
    }
    const travelDays = dailyExpenses.length;
    const expenseDays = dailyExpenses.filter(expenses => expenses > 0).length;
    const totalSpent = dailyExpenses.reduce((acc, crr) => acc + crr, 0);
    const averageDailyExpense = travelDays > 0 ? totalSpent / travelDays : 0;
    const isUnderBudget = averageDailyExpense <= dailyBudget;

    let rating: 1 | 2 | 3;
    let feedback: string;

    if (averageDailyExpense <= dailyBudget) {
        rating = 3;
        feedback = "¡Excelente gestión!";
    } else if (averageDailyExpense <= dailyBudget * 1.2) {
        rating = 2;
        feedback = "Correcto, pero ajustado";
    } else {
        rating = 1;
        feedback = "Puede mejorar";
    }

    return {
        travelDays,
        expenseDays,
        dailyBudget,
        averageDailyExpense,
        isUnderBudget,
        rating,
        feedback
    };
}
/*
console.log(generateExpenseReport([50, 0, 120, 85], 100));
*/
/* Retorna:
{
travelDays: 4,
expenseDays: 3,
dailyBudget: 100,
averageDailyExpense: 63.75,
underBudget: true,
rating: 3,
feedback: "¡Excelente gestión!"
}
*/

try {
    console.log(generateExpenseReport([50, 0, 120, 85], 100));
} catch (error) {
    if (error instanceof Error) console.error(error.message);
}