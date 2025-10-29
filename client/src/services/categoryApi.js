import api from "./api";

export async function getCategories() {
  const email = localStorage.getItem("userEmail");
  if (!email) throw new Error("User email not found in localStorage");
  const res = await api.get(`categories/${email}`); // response body (e.g. { ok: true, data: [...] })
  return res.data;
}

export async function addCategory(category) {
  const email = localStorage.getItem("userEmail");
  if (!email) throw new Error("User email not found in localStorage");

  const res = await api.post("categories", { ...category, email });
  return res.data;
}

export async function deleteCategory(id) {
  const res = await api.delete(`categories/${id}`);
  return res.data;
}
