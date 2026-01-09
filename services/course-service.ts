import { Course } from "@/lib/types";

const API_URL = 'https://690da16aa6d92d83e8525a6e.mockapi.io/api/v1/course';

export async function getCourses(): Promise<Course[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
}
