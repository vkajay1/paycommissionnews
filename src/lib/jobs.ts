// Latest government job postings. Add a new entry to the TOP of `jobs`
// whenever a fresh recruitment notification is published.
import type { Block } from "./articles";

export type Job = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  /** Recruiting body, e.g. "Staff Selection Commission (SSC)". */
  organization: string;
  /** Post / cadre name, e.g. "Multi Tasking Staff (MTS)". */
  postName: string;
  vacancies?: string;
  qualification?: string;
  ageLimit?: string;
  payScale?: string;
  location?: string;
  applicationFee?: string;
  /** ISO dates */
  applyStart?: string;
  applyEnd?: string;
  /** Official notification / apply link. */
  applyUrl?: string;
  category: string;
  date: string; // ISO published
  updated: string; // ISO updated
  readMinutes: number;
  hero: string; // gradient classes
  image?: string;
  imageAlt?: string;
  lang?: "en" | "hi";
  excerpt: string;
  body: Block[];
  faq: { q: string; a: string }[];
};

export const jobs: Job[] = [];

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}
