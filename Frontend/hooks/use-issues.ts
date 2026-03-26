'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api';

export interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  priority?: string;
  category?: string;
  location?: string;
  created_at?: string;
}

export const useIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔥 GET ALL ISSUES
  const fetchIssues = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8080/issues');
      const data = await res.json();

      setIssues(data);
  } catch (err) {
    setError("Failed to fetch issues");
  } finally {
    setIsLoading(false);
  }
}, []);

  // 🔥 CREATE ISSUE
  const createIssue = useCallback(async (data) => {
  setIsLoading(true);

  try {
    const res = await fetch("http://localhost:8080/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const newIssue = await res.json();

    setIssues((prev) => [newIssue, ...prev]);
    return newIssue;
  } catch (err) {
    setError("Failed to create issue");
  } finally {
    setIsLoading(false);
  }
}, []);

  // 🔥 UPDATE ISSUE
 const updateIssue = useCallback(async (id: string | number, data: any) => {
  setIsLoading(true);
  try {
    const res = await fetch(`http://localhost:8080/issues/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    await res.json(); // Wait for completion

    setIssues((prev) =>
      prev.map((issue) => (issue.id === id ? { ...issue, ...data } : issue))
    );

    return data;
  } catch (err) {
    setError("Failed to update issue");
    throw err;
  } finally {
    setIsLoading(false);
  }
}, []);



  // 🔥 DELETE ISSUE
  const deleteIssue = useCallback(async (id: string | number) => {
  setIsLoading(true);
  try {
    await fetch(`http://localhost:8080/issues/${id}`, {
      method: "DELETE",
    });

    setIssues((prev) => prev.filter((issue) => issue.id !== id));
  } catch (err) {
    setError("Failed to delete issue");
    throw err;
  } finally {
    setIsLoading(false);
  }
}, []);

  // 🔥 AUTO LOAD ON PAGE LOAD
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