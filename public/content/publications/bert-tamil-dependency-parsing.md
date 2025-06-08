---
id: bert-tamil-dependency-parsing
title: BERT-Based Sequence Labelling Approach for Dependency Parsing in Tamil
date: 2022-07-21
summary: A BERT-embedding-based machine learning framework is presented in this work for dependency parsing in Tamil, addressing the challenges of class imbalance and free word order through contextual token representations and oversampling techniques.
link: https://aclanthology.org/2022.dravidianlangtech-1.1
tags: [BERT, Imbalanced Learning, Encoder, Low-Resource NLP, Dependency Parsing, Machine Learning]
featured: true
---

# BERT-Based Sequence Labelling Approach for Dependency Parsing in Tamil

## Overview

In this work, we present a BERT-based framework for dependency parsing in Tamil, a morphologically rich and free word order language. Our approach leverages contextual embeddings from multilingual BERT models, combined with classical machine learning classifiers, to predict dependency relations. To address the severe class imbalance in available Tamil treebanks, we apply synthetic oversampling techniques such as SMOTE and ADASYN.

The resulting system demonstrates competitive performance in both labeled and unlabeled attachment scores and offers a scalable methodology for other low-resource languages.

## Motivation

Dependency parsing plays a crucial role in syntactic analysis, enabling downstream tasks like semantic parsing, relation extraction, and machine translation. However, for low-resource languages such as Tamil, parsing is particularly challenging due to the lack of annotated corpora and tools. We aimed to evaluate whether contextual embeddings, specifically those pre-trained on Indic languages, could enhance syntactic parsing performance when paired with effective yet lightweight classifiers.

## Methodology

Our system comprises four core components:

### 1. Contextual Embedding Generation

We used the following pretrained transformer models:

* mBERT
* XLM-RoBERTa
* DistilBERT
* IndicBERT

Sentences were tokenized using the CoNLL-U format, and token-wise embeddings were generated. These embeddings retain contextual and syntactic information, which is especially useful for parsing Tamil’s flexible word order.

### 2. Dependency Label Classification

The token embeddings were used to train the following machine learning classifiers:

* Support Vector Machines (SVM)
* Decision Trees
* Random Forest
* Linear Regression (baseline)

Among these, the IndicBERT + SVM combination consistently outperformed others.

### 3. Addressing Class Imbalance via Oversampling

Tamil dependency relations are unevenly distributed, which causes models to perform poorly on rare classes. To mitigate this, we applied:

* **SMOTE (Synthetic Minority Oversampling Technique)**
* **ADASYN (Adaptive Synthetic Sampling)**

ADASYN proved particularly effective by adaptively generating synthetic samples for harder-to-learn classes, leading to improved class-wise precision and recall.

### 4. Integration with Transition-Based Parsing

The predicted dependency labels were then fed into **MaltParser**, a transition-based dependency parser. This parser constructs a syntactic tree using shift-reduce operations informed by the classifier’s predictions. The combination allowed us to generate high-quality dependency trees while retaining interpretability and modularity.

## Dataset

We worked with the **Tamil Universal Dependency Treebank (UDT)**, consisting of:

* 536 manually annotated sentences in CoNLL-U format
* 400 training and 120 testing samples
* 30+ unique dependency relation labels
* POS tags and morphological annotations

This dataset features complex syntactic structures such as relative clauses, case marking, and elision, making it an ideal testbed for our system.

## Results

Experiments showed that IndicBERT embeddings paired with an SVM classifier produced the most promising results. Key performance metrics included:

* **Label Accuracy (post-oversampling)**: 67.94%
* **Labeled Attachment Score (LAS)**: \~56%
* **Unlabeled Attachment Score (UAS)**: \~89%

Visualizations demonstrated improvements in parsing accuracy and syntactic structure quality after applying oversampling techniques.

## Key Takeaways

* Multilingual BERT models, particularly IndicBERT, significantly enhance dependency parsing for morphologically rich languages.
* Classical classifiers remain effective when supported by strong contextual embeddings.
* Oversampling algorithms like ADASYN can successfully address class imbalance and improve class-wise performance.
* Transition-based parsers can be augmented with modern embedding and classification techniques to yield competitive results for low-resource languages.

## Future Work

We plan to extend this methodology by:

* Adapting it to other Dravidian and Indic languages
* Exploring graph-based parsing architectures for enhanced accuracy
* Fine-tuning transformer models specifically for parsing tasks
* Incorporating self-training and semi-supervised learning with unlabeled data
* Conducting cross-lingual training using related language treebanks (e.g., Telugu, Malayalam)

## Conclusion

This study demonstrates that contextual embeddings combined with machine learning and data augmentation can significantly improve dependency parsing for low-resource languages like Tamil. Our approach not only matches performance benchmarks from mixed-language models but also sets a robust foundation for future work in building scalable NLP tools for underrepresented languages.

## Citation
If you use this work or build upon it, please cite:

Ayush Kumar et al., "BERT-Based Sequence Labelling Approach for Dependency Parsing in Tamil", Proceedings of the Second Workshop on Speech and Language Technologies for Dravidian Languages, ACL Anthology, May 2022. https://aclanthology.org/2022.dravidianlangtech-1.1