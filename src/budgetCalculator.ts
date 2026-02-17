type BudgetStatus = 'Under budget' | 'On budget' | 'Over budget';

export const calculateBudgetStatus = (totalExpenses: number, budget: number): BudgetStatus => {
    const percentage = (totalExpenses/budget) * 100;
    if ((totalExpenses < 0) || (budget < 0)) {
        throw new Error('Numbers should be a positive value.');
    }
    if (percentage < 80) {
        return 'Under budget';
    } else if (percentage <= 100) {
        return 'On budget';
    } else {
        return 'Over budget';
    }
}

console.log(calculateBudgetStatus(500, 1000)); // Under budget
console.log(calculateBudgetStatus(1000, 1000)); // On budget
console.log(calculateBudgetStatus(1500, 1000)); // Over budget