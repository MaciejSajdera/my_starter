type ApiResponse<T> = T;

export const api = {
  async get<T>(url: string): Promise<ApiResponse<T>> {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  },

  async post<T>(url: string, body: unknown): Promise<ApiResponse<T>> {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return data;
  },
};
