const API_BASE_URL = 'https://civictrack-backend-5ij4.onrender.com';

export interface Issue {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  updatedAt: string;
}

export interface CreateIssuePayload {
  title: string;
  description: string;
  location: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface UpdateIssuePayload extends Partial<CreateIssuePayload> {
  status?: 'open' | 'in_progress' | 'resolved' | 'closed';
}

class APIClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${this.baseUrl}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API error: ${response.statusText}`);
  }

  return response.json();
}

  // Issues endpoints
  async getIssues(): Promise<Issue[]> {
    return this.request<Issue[]>('/issues');
  }

  async getIssue(id: string): Promise<Issue> {
    return this.request<Issue>(`/issues/${id}`);
  }

  async createIssue(payload: CreateIssuePayload): Promise<Issue> {
    return this.request<Issue>('/issues', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async updateIssue(id: string, payload: UpdateIssuePayload): Promise<Issue> {
    return this.request<Issue>(`/issues/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  }

  async deleteIssue(id: string): Promise<void> {
    return this.request<void>(`/issues/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new APIClient();
