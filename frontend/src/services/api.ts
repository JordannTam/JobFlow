import { API_URL } from '../constants';
import type { JobApplication, CreateApplicationInput, UpdateApplicationInput } from '../types';

/**
 * API service for job application CRUD operations.
 *
 * All functions return Promises and handle JSON parsing.
 * Errors are thrown on non-2xx responses.
 */
export const api = {
  /**
   * Fetches all job applications.
   */
  getApplications: async (): Promise<JobApplication[]> => {
    const res = await fetch(`${API_URL}/applications`);
    if (!res.ok) {
      throw new Error(`Error fetching applications: ${res.statusText}`);
    }
    const data = await res.json();
    return data.applications;
  },

  /**
   * Creates a new job application.
   */
  createApplication: async (data: CreateApplicationInput): Promise<{ message: string }> => {
    const res = await fetch(`${API_URL}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Error creating application: ${res.statusText}`);
    }
    return res.json();
  },

  /**
   * Updates an existing job application.
   */
  updateApplication: async (id: string, data: UpdateApplicationInput): Promise<{ message: string }> => {
    const res = await fetch(`${API_URL}/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Error updating application: ${res.statusText}`);
    }
    return res.json();
  },

  /**
   * Deletes a job application.
   */
  deleteApplication: async (id: string): Promise<{ message: string }> => {
    const res = await fetch(`${API_URL}/applications/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`Error deleting application: ${res.statusText}`);
    }
    return res.json();
  },
};
