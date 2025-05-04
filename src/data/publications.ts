
import { Publication } from "@/types/publication";
import { loadPublications } from '@/utils/markdown-loader';

export const publications = loadPublications();

// Fallback data in case no markdown files are found
export const fallbackPublications: Publication[] = [
  {
    id: "machine-learning-models-optimization",
    title: "Optimization Techniques for Large-Scale Machine Learning Models",
    date: "2025-01-15",
    summary: "A comprehensive survey of optimization methods for training deep neural networks with limited computational resources.",
    link: "https://example.com/publication1",
    tags: ["Machine Learning", "Optimization", "Research"],
    featured: true,
    content: `
# Optimization Techniques for Large-Scale Machine Learning Models

## Abstract
This paper presents a comprehensive survey of optimization techniques for training large-scale machine learning models with limited computational resources.
    `
  },
  {
    id: "distributed-systems-reliability",
    title: "Reliability Patterns in Distributed Systems Architecture",
    date: "2024-11-20",
    summary: "Exploring design patterns that enhance fault tolerance and reliability in distributed computing environments.",
    link: "https://example.com/publication2",
    tags: ["Distributed Systems", "Architecture", "Reliability"],
    featured: true,
    content: `
# Reliability Patterns in Distributed Systems Architecture

## Abstract
This paper examines reliability patterns in distributed systems architecture.
    `
  }
];

// If no markdown files are found, use the fallback data
if (publications.length === 0) {
  publications.push(...fallbackPublications);
}
