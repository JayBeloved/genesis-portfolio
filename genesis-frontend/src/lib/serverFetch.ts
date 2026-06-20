import { cookies } from 'next/headers';

export async function serverFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://api.johnjaylawal.local:8000/api';
  // Note: App Router's cookies() is synchronous-like in Next.js 14, but async in Next.js 15. We'll await it for Next.js 15 compatibility.
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');

  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Cookie': allCookies, // Forward the JWT to Django
      ...options.headers,
    },
  });

  const rawJson = await res.json();

  if (!res.ok || !rawJson.success) {
    throw new Error(rawJson.errors || 'API Operation Failed');
  }

  // Strip the envelope for Server Components
  return rawJson.data as T; 
}
