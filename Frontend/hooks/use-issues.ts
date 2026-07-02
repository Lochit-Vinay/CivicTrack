'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  priority?: string;
  category?: string;
  location?: string;
  state?: string;
  created_at?: string;
  image?: string;
}

export const useIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔥 GET ALL ISSUES
  const fetchIssues = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch('https://civictrack-backend-5ji4.onrender.com/issues', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch issues");
      }
      setIssues(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError("Failed to fetch issues");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // CREATE ISSUE
  const createIssue = useCallback(async (data: Partial<Issue>) => {
    setIsLoading(true);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("https://civictrack-backend-5ji4.onrender.com/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to create issue");
      }
      await fetchIssues();

      return result;
    } catch (err) {
      setError("Failed to create issue");
    } finally {
      setIsLoading(false);
    }
  }, [fetchIssues]);

  //  UPDATE ISSUE
  const updateIssue = useCallback(async (id: string | number, data: Partial<Issue>) => {
    setIsLoading(true);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`https://civictrack-backend-5ji4.onrender.com/issues/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to update issue");
      }

      setIssues((prev) =>
        Array.isArray(prev)
          ? prev.map((issue) =>
              issue.id === id ? { ...issue, ...data } : issue
            )
          : []
      );

      return data;
    } catch (err) {
      setError("Failed to update issue");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  //  DELETE ISSUE
  const deleteIssue = useCallback(async (id: string | number) => {
    setIsLoading(true);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`https://civictrack-backend-5ji4.onrender.com/issues/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to delete issue");
      }

      setIssues((prev) => prev.filter((issue) => issue.id !== id));
    } catch (err) {
      setError("Failed to delete issue");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  //  AUTO LOAD ON PAGE LOAD
  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  return {
    issues,
    isLoading,
    error,
    fetchIssues,
    createIssue,
    updateIssue,
    deleteIssue,
  };
};