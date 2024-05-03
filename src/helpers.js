export const wait = () => new Promise(response => 
    setTimeout(response, Math.random() * 1500))

const generateRandomColor = () => {
    const existingBudgetsLength = fetchData("budgets")?.length ?? 0
    return `${existingBudgetsLength * 34} 65% 50%`
}

export const fetchData = (key) => JSON.parse(localStorage.getItem(key));

export const createBudget = ({name, amount}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: parseInt(amount),
        color: generateRandomColor()
    }

    const existingBudgets = fetchData("budgets") ?? []

    return localStorage.setItem(
        'budgets',
        JSON.stringify([...existingBudgets, newItem])
    )
}

export const createExpense = ({name, amount, budgetId}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: parseInt(amount),
        budgetId: budgetId
    }

    const existingExpenses = fetchData("expenses") ?? []

    return localStorage.setItem(
        'expenses',
        JSON.stringify([...existingExpenses, newItem])
    )
}
// delete the expense from local storage
export const deleteItem = ({key, id}) => {
    const existingData = fetchData(key)
    if (id) {
        const newData = existingData.filter(item => item.id !== id)
        return localStorage.setItem(key, JSON.stringify(newData))
    }
    return localStorage.removeItem(key)
}

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? []
    const budgetSpent = expenses.reduce((acc, expense) => {
        if (expense.budgetId !== budgetId) return acc

        return acc += expense.amount
    }, 0)
    return budgetSpent
}

// formatting the currency 

export const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`
}
// formatting the percetage
export const formatPercentage  = (amount) => {
    return amount.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0
    })
}
// formatting the Date
export const formatDateToLocale = (epoch) => new Date(epoch).toLocaleDateString()

export const getAllMatchingItems = ({ category, key, value }) => {
    const data = fetchData(category) ?? []
    return data.filter(item => item[key] === value)
}