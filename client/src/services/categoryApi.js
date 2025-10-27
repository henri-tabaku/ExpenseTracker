// src/services/categoryApi.js
import api from "./api";

/**
 * Get all categories for the current user
 */
export async function getCategories() {
  const email = localStorage.getItem("userEmail");
  if (!email) throw new Error("User email not found in localStorage");
  return await api.get(`categories/${email}`); // backend expects /:email
}

/**
 * Add a new category
 * category = { name }
 */
export async function addCategory(category) {
  const email = localStorage.getItem("userEmail");
  if (!email) throw new Error("User email not found in localStorage");

  return await api.post("categories", { ...category, email });
}

/**
 * Delete a category by id
 */
export async function deleteCategory(id) {
  return await api.delete(`categories/${id}`);
}
