---
id: bert-tamil-dependency-parsing
title: BERT-Based Sequence Labelling Approach for Dependency Parsing in Tamil
date: 2022-05-26
summary: A BERT-embedding-based machine learning framework is presented in this work for dependency parsing in Tamil, addressing the challenges of class imbalance and free word order through contextual token representations and oversampling techniques.
link: https://aclanthology.org/2022.dravidianlangtech-1.1
tags: [BERT, Imbalanced Learning, Encoder, Low-resource NLP, Dependency Parsing, Machine Learning]
---

# BERT-Based Sequence Labelling Approach for Dependency Parsing in Tamil

## Abstract

A novel BERT-based method targets dependency parsing in Tamil, leveraging its complex morphology and flexible word order. By leveraging contextual embeddings from pretrained multilingual BERT variants and combining them with classical machine learning algorithms, the authors achieve improved parsing performance. A key focus is addressing severe class imbalance in dependency relation labels using synthetic oversampling methods like SMOTE and ADASYN. The final model delivers competitive labeled and unlabeled attachment scores while offering a scalable framework adaptable to other low-resource languages.

## Introduction

Dependency parsing plays a critical role in understanding grammatical structure in natural language. For languages like Tamil, which exhibit high morphological richness and allow flexible word ordering, traditional parsers underperform due to a lack of annotated resources and tools. This work addresses this gap by designing a hybrid system that combines BERT-based embeddings with classical machine learning classifiers to predict syntactic dependencies. The system is further enhanced through data-level interventions to counter class imbalances common in low-resource treebanks.

## Methodology

The proposed system operates in three core stages:

### 1. Embedding Generation

Multilingual pretrained BERT models were employed to generate contextual token embeddings from Tamil sentences. The models used include:

- mBERT
- XLM-RoBERTa
- DistilBERT
- IndicBERT

Each sentence is tokenized using the CoNLL-U standard, and embeddings are generated for every token. These embeddings capture deep semantic and syntactic cues, crucial for distinguishing dependency relations in free word order scenarios.

### 2. Classification of Dependency Labels

Once embeddings are obtained, the next step involves training machine learning models to classify dependency labels for each word. Four types of classifiers are tested:

- Support Vector Machines (SVM)
- Decision Trees
- Random Forest
- Linear Regression (as a baseline)

The classifier takes a token’s embedding as input and predicts its corresponding dependency relation tag.

### 3. Oversampling for Class Balance

The dataset used is significantly imbalanced, with a few dependency relations dominating the distribution. This negatively impacts model performance on rare labels. To resolve this, the following oversampling algorithms were used:

- **SMOTE (Synthetic Minority Oversampling Technique)**: Generates synthetic samples for minority classes by interpolating between existing samples.
- **ADASYN (Adaptive Synthetic Sampling)**: Focuses more on generating synthetic samples for classes that are harder to learn, adjusting the number of new samples per class based on difficulty.

The oversampled datasets led to improved class-wise precision and recall, particularly for rare dependency labels, without sacrificing overall accuracy.

### 4. Integration with Transition-Based Parser

Predicted dependency labels were used as input for **MaltParser**, a transition-based dependency parser. The parser constructs a dependency tree using shift-reduce operations and a classifier-driven decision mechanism. The parser state includes a stack, a buffer, and a growing set of dependency arcs. Parsing decisions (shift, reduce, left-arc, right-arc) are made based on the current configuration and previous transitions.

## Dataset

The experiments were conducted using the **Tamil Universal Dependency Treebank (UDT)**. The dataset contains approximately 536 manually annotated sentences in CoNLL-U format. Of these, 400 were used for training and the rest for testing. Tamil UDT includes POS tags, morphological features, and 30+ unique dependency labels. The treebank includes syntactic constructs such as relative clauses, case marking, and elision, making it a suitable testbed for robust dependency parsing.

## Experimental Setup and Results

Experiments showed that using contextual embeddings from IndicBERT in combination with a Support Vector Machine yielded the best results. Initially, models exhibited poor class-wise performance due to label imbalance. After applying oversampling techniques like ADASYN, the model not only achieved higher accuracy for rare labels but also improved overall parser performance. Parsing metrics used include:

- **Label Accuracy**: The percentage of correctly predicted dependency labels.
- **Label Attachment Score (LAS)**: Measures the percentage of words that are assigned both the correct head and dependency label.
- **Unlabeled Attachment Score (UAS)**: Measures the percentage of words attached to the correct head, regardless of the label.

The best model (IndicBERT + SVM + ADASYN) achieved an LAS of approximately 56% and UAS around 89%, which are competitive results for a low-resource language parser without mixed-language training.

## Visualizations

- Dependency label distribution graphs highlight extreme imbalance in training data.
- Precision-recall curves before and after oversampling show noticeable gains in classification consistency.
- Sample parsed trees before and after applying ADASYN demonstrate the improved syntactic quality of outputs.

## Key Takeaways

- Pretrained multilingual BERT models significantly enhance dependency parsing for morphologically complex languages.
- Classical machine learning classifiers, when paired with high-quality embeddings, remain competitive for structured NLP tasks.
- Oversampling techniques like ADASYN can effectively mitigate the impact of class imbalance in low-resource NLP pipelines.
- The transition-based parsing framework remains a practical choice when augmented with modern embedding techniques.

## Conclusion

This study demonstrates that a machine learning pipeline using BERT-based contextual embeddings and oversampling strategies can greatly enhance dependency parsing for Tamil. IndicBERT emerged as the most effective embedding model due to its training on Indian languages. The integration with a traditional transition-based parser like MaltParser yields robust syntactic structures that can support downstream NLP applications.

## Future Work

- Extend the methodology to other Dravidian and low-resource Indic languages.
- Explore the use of end-to-end transformer-based models fine-tuned directly for parsing tasks.
- Incorporate graph-based parsing architectures for potentially higher accuracy.
- Apply semi-supervised learning and self-training to exploit unlabelled data.
- Evaluate cross-lingual training using treebanks from related languages like Telugu and Malayalam.

