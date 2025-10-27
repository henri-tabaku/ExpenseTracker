import api from "./api";

/**
 * Get all expenses
 * Optional: params = { category, startDate, endDate }
 */
export async function getExpenses(params = {}) {
 const email = localStorage.getItem("userEmail");
  if (!email) throw new Error("User email not found in localStorage");
  return await api.get(`expenses/${email}`);
}

/**
 * Add a new expense
 * expense = { title, amount, category, userEmail }
 */
export async function addExpense(expense) {
  console.log(expense)
   const email = localStorage.getItem("userEmail");
  if (!email) throw new Error("User email not found in localStorage");

  return await api.post("expenses", { ...expense, email });
}

/**
 * Delete an expense by id
 */
export async function deleteExpense(id) {
  const res = await api.delete(`/expenses/${id}`);
  return res.data;
}

/**
 * Update an expense by id
 * updates = { title?, amount?, category? }
 */
// export async function updateExpense(id, updates) {
//   const res = await api.put(`/expenses/${id}`, updates);
//   return res.data;
// }
