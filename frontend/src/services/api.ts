// src/services/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function apiFetch<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${BASE_URL}/${url}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json",
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao acessar API do GitHub");
  }

  return response.json();
}
