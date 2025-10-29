import { useEffect, useState } from "react";
import * as categoryApi from "../services/categoryApi";

export function useCategories(initial = []) {
  const [categories, setCategories] = useState(initial);

  useEffect(() => {
    let ignore = false;

    const fetchCategories = async () => {
      try {
        const data = await categoryApi.getCategories();
        if (!ignore) setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };

    fetchCategories();
    return () => {
      ignore = true;
    };
  }, []);

  return [categories, setCategories];
}
