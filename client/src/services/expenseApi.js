import api from "./api";

export async function getExpenses(params = {}) {
 const email = localStorage.getItem("userEmail");
  if (!email) throw new Error("User email not found in localStorage");
  const res = await api.get(`expenses/${email}`); // response body (e.g. { ok: true, data: [...] })
  return res.data;
}

export async function addExpense(expense) {
  console.log(expense)
   const email = localStorage.getItem("userEmail");
  if (!email) throw new Error("User email not found in localStorage");

  return await api.post("expenses", { ...expense, email });
}

export async function deleteExpense(id) {
  const res = await api.delete(`/expenses/${id}`);
  return res.data;
}