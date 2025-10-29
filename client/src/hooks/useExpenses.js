import { useEffect, useState } from "react";
import * as expenseApi from "../services/expenseApi";

export function useExpenses(initial = []) {
  const [expenses, setExpenses] = useState(initial);

  useEffect(() => {
    let ignore = false;

    const fetchExpenses = async () => {
      try {
        const data = await expenseApi.getExpenses();
        if (!ignore) setExpenses(data);
      } catch (err) {
        console.error("Failed to load expenses:", err);
      }
    };

    fetchExpenses();
    return () => {
      ignore = true;
    };
  }, []);

  return [expenses, setExpenses];
}
