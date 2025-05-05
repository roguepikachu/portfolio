
import { Publication } from "@/types/publication";
import { loadPublications } from '@/utils/markdown-loader';

export const publications = loadPublications();

// Fallback data in case no markdown files are found
export const fallbackPublications: Publication[] = [
  {
    id: "machine-learning-models-optimization",
    title: "Optimization Techniques for Large-Scale Machine Learning Models",
    date: "2023-01-15",
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
    date: "2023-11-20",
    summary: "Exploring design patterns that enhance fault tolerance and reliability in distributed computing environments.",
    link: "https://example.com/publication2",
    tags: ["Distributed Systems", "Architecture", "Reliability"],
    featured: true,
    content: `
# Reliability Patterns in Distributed Systems Architecture

## Abstract
This paper examines reliability patterns in distributed systems architecture.
    `
  },
  {
    id: "blockchain-data-integrity",
    title: "Blockchain Solutions for Data Integrity in Healthcare",
    date: "2023-08-05",
    summary: "An analysis of blockchain implementation strategies to ensure data integrity in healthcare information systems.",
    link: "https://example.com/publication3",
    tags: ["Blockchain", "Healthcare", "Data Integrity"],
    featured: false,
    content: `
# Blockchain Solutions for Data Integrity in Healthcare

## Abstract
This paper analyzes blockchain implementation strategies for ensuring data integrity in healthcare information systems.
    `
  },
  {
    id: "quantum-computing-applications",
    title: "Practical Applications of Quantum Computing in Cryptography",
    date: "2023-06-12",
    summary: "Exploring the potential applications and implications of quantum computing in modern cryptographic systems.",
    link: "https://example.com/publication4",
    tags: ["Quantum Computing", "Cryptography", "Security"],
    featured: false,
    content: `
# Practical Applications of Quantum Computing in Cryptography

## Abstract
This paper explores potential applications and implications of quantum computing in modern cryptographic systems.
    `
  }
];

// If no markdown files are found, use the fallback data
if (publications.length === 0) {
  publications.push(...fallbackPublications);
}
