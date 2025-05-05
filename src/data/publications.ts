
import { Publication } from "@/types/publication";
import { loadPublications } from '@/utils/markdown-loader';

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
This paper presents a comprehensive survey of optimization techniques for training large-scale machine learning models with limited computational resources. We examine various methods including gradient compression, mixed-precision training, and distributed optimization algorithms.

## Introduction
As machine learning models continue to grow in size and complexity, the computational resources required to train them efficiently have become a significant challenge. This paper explores optimization techniques that can be employed to make the training process more efficient without sacrificing model performance.

## Methodology
We conducted experiments on a variety of model architectures, including convolutional neural networks (CNNs), transformer-based models, and recurrent neural networks (RNNs). For each architecture, we evaluated the impact of different optimization techniques on training time, memory usage, and model accuracy.

## Results
Our experiments show that combining gradient compression with mixed-precision training can reduce memory usage by up to 70% while maintaining model accuracy within 1% of the baseline. Furthermore, distributed optimization algorithms can reduce training time by a factor proportional to the number of compute nodes, with diminishing returns beyond 16 nodes.

## Conclusion
The techniques presented in this paper can significantly reduce the computational resources required to train large-scale machine learning models, making advanced AI more accessible to researchers and practitioners with limited resources.
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
This paper examines reliability patterns in distributed systems architecture, focusing on fault tolerance and recovery mechanisms. We present a catalog of design patterns that address common failure modes in distributed systems and provide guidance on when to apply each pattern.

## Introduction
Distributed systems are inherently complex and prone to various types of failures. This paper aims to provide a structured approach to designing reliable distributed systems by leveraging established design patterns.

## Reliability Patterns

### Circuit Breaker
The Circuit Breaker pattern prevents a cascade of failures by detecting when a service is unavailable and redirecting calls to fallback mechanisms. We demonstrate how this pattern can be implemented using modern microservices frameworks.

### Bulkhead
The Bulkhead pattern isolates components of an application into pools so that if one fails, the others will continue to function. We provide case studies of how this pattern has been successfully applied in large-scale systems.

### Retry with Exponential Backoff
This pattern handles transient failures by automatically retrying failed operations with progressively longer wait times between retries. We discuss optimal backoff strategies and their impact on system performance.

## Case Studies
We present three case studies of large-scale distributed systems that have successfully implemented these reliability patterns:

1. A global e-commerce platform handling millions of transactions per day
2. A cloud-based financial services application with strict regulatory requirements
3. A content delivery network serving high-traffic media websites

## Conclusion
The reliability patterns discussed in this paper provide effective solutions to common problems in distributed systems. By applying these patterns appropriately, system architects can build robust distributed systems that can withstand various types of failures.
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
This paper analyzes blockchain implementation strategies for ensuring data integrity in healthcare information systems. We evaluate different consensus mechanisms and their suitability for healthcare applications, considering factors such as performance, privacy, and regulatory compliance.

## Introduction
Healthcare information systems manage critical patient data that must be protected from unauthorized modification while remaining accessible to authorized healthcare providers. Blockchain technology offers promising solutions to these challenges through its inherent properties of immutability and distributed verification.

## Blockchain Architectures for Healthcare

### Permissioned vs. Permissionless Blockchains
We compare the suitability of permissioned and permissionless blockchain architectures for healthcare applications, considering factors such as scalability, privacy, and regulatory compliance.

### Consensus Mechanisms
We evaluate different consensus mechanisms, including Proof of Authority, Practical Byzantine Fault Tolerance, and Federated Byzantine Agreement, for their suitability in healthcare settings.

## Implementation Challenges

### HIPAA Compliance
We discuss how blockchain implementations can be designed to comply with the Health Insurance Portability and Accountability Act (HIPAA) and other healthcare regulations.

### Integration with Legacy Systems
We propose strategies for integrating blockchain solutions with existing healthcare information systems while minimizing disruption to clinical workflows.

## Case Studies
We present two case studies of blockchain implementations in healthcare:

1. A regional health information exchange using blockchain to ensure the integrity of shared patient records
2. A pharmaceutical supply chain using blockchain to track medication from manufacturer to patient

## Conclusion
Blockchain technology offers promising solutions for ensuring data integrity in healthcare information systems. However, successful implementation requires careful consideration of architectural choices, consensus mechanisms, and integration strategies.
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
This paper explores potential applications and implications of quantum computing in modern cryptographic systems. We examine both the threats posed by quantum computers to classical cryptography and the opportunities presented by quantum cryptographic techniques.

## Introduction
Quantum computing represents a paradigm shift in computational capability, with significant implications for cryptography. This paper aims to bridge the gap between theoretical quantum computing research and practical cryptographic applications.

## Quantum Threats to Classical Cryptography

### Shor's Algorithm
We analyze the implications of Shor's algorithm for public-key cryptosystems based on integer factorization and discrete logarithm problems, including RSA and elliptic curve cryptography.

### Grover's Algorithm
We assess the impact of Grover's algorithm on symmetric-key cryptography and hash functions, and discuss appropriate key length adjustments to maintain security in a post-quantum environment.

## Quantum-Resistant Cryptography

### Lattice-Based Cryptography
We evaluate lattice-based cryptographic schemes, such as NTRU and Ring-LWE, for their resistance to quantum attacks and their practicality for real-world applications.

### Hash-Based Signatures
We discuss the security and efficiency of hash-based signature schemes, such as XMSS and LMS, which rely only on the security of their underlying hash functions.

## Quantum Cryptography

### Quantum Key Distribution
We examine the principles of quantum key distribution protocols, such as BB84 and E91, and discuss their practical implementation challenges.

### Quantum Random Number Generation
We evaluate quantum random number generators and their applications in cryptographic systems requiring high-quality randomness.

## Conclusion
The advent of large-scale quantum computers will require significant changes to our cryptographic infrastructure. By understanding both the threats and opportunities presented by quantum computing, we can prepare for a smooth transition to a post-quantum cryptographic landscape.
    `
  }
];

// Load publications from markdown files
export const publications = loadPublications();

// If no markdown files are found, use the fallback data
if (publications.length === 0) {
  console.log('No markdown publications found, using fallback data');
  publications.push(...fallbackPublications);
}
