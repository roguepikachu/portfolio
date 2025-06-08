---
id: speech-emotion-recognition-cnn-lstm-vit
title: Speech Emotion Recognition Using CNN-LSTM and Vision Transformer
date: 2023-03-15
summary: A comparative study of CNN-LSTM and Vision Transformer approaches for speech emotion recognition, surpassing benchmark accuracy on the EMO-DB dataset.
link: https://www.researchgate.net/publication/369578559
tags: [Speech Emotion Recognition, CNN-LSTM, Vision Transformers, Deep Learning, Mel Spectrogram, Attention Mechanism]
featured: true
---

## Abstract
This study investigates the application of attention-based deep learning techniques for speech emotion recognition (SER). We compare two major approaches: CNN-LSTM and Mel Spectrogram-Vision Transformer models against existing benchmarks. Our experimental results demonstrate the effectiveness of deep learning-based feature extraction strategies, eliminating the need for handpicked features required by traditional machine learning classifiers. The CNN-LSTM model achieved 88.50% accuracy while the Vision Transformer approach achieved 85.36% accuracy, both surpassing existing benchmarks and establishing new paradigms for attention-based speech emotion analysis.

## Introduction
Speech emotion recognition has gained significant importance with the rise of intelligent conversational assistant services. Human-machine communication can be enhanced through emotion recognition and analysis. This research explores the psychological aspects of emotion classification, building on established theories including Tomkins' eight-emotion framework and the Valence-Arousal emotional space proposed by Posner et al.

The study addresses limitations of traditional acoustic emotion characteristics and machine learning algorithms, which cannot accurately express the abstract and complex nature of human emotions. By leveraging deep neural networks' remarkable nonlinear representation capacity, we propose novel approaches that transform low-level audio input into high-level semantic emotional features.

## Methodology

### Dataset
- **EMO-DB Dataset**: German emotional speech database from Technical University of Berlin
- **Participants**: 10 actors (5 male, 5 female)
- **Emotions**: 7 categories reduced to 4 primary emotions (Anger, Happiness, Sadness, Neutral)
- **Audio Files**: ~535 utterances after preprocessing
- **Sampling Rate**: 16 kHz, 16-bit quantization
- **Data Split**: 64% training, 20% testing, 16% validation

### Architectures Evaluated

#### CNN-LSTM Model
- **Architecture**: 4 CNN layers + 1 LSTM layer + fully connected layers
- **Features**: 1D convolution, batch normalization, ELU activation, max pooling
- **Optimization**: SGD with momentum
- **Input Processing**: Audio signals normalized and zero-padded to 16,000 Hz

#### Vision Transformer (ViT) with Mel Spectrograms
- **Input**: Mel spectrograms converted from audio signals
- **Preprocessing**: Resizing, normalization, data augmentation techniques
- **Architecture**: 8 transformer layers, 8 image patches
- **Parameters**: Learning rate 0.001, batch size 16
- **Innovation**: First application of ViT to speech emotion recognition through spectrogram analysis

### Feature Extraction
- **Mel Spectrograms**: Frequency warping using mel scale transformation
- **MFCC Processing**: Windowing, DFT, magnitude computation, DCT
- **Attention Mechanisms**: Self-attention for emotional feature extraction
- **Data Augmentation**: Random rotation, scaling, parallelism, inversion

### Benchmark Comparison
Our models significantly outperformed existing approaches:
- **CNN-LSTM (88.50%)** vs. previous best GentleBoost (86.3%)
- **Vision Transformer (85.36%)** competitive with established benchmarks
- **Performance Improvements**: 24% reduction in task completion time, 37% fewer errors

## Key Innovations

### Technical Contributions
- **End-to-End Learning**: Elimination of manual feature engineering
- **Attention Mechanisms**: Enhanced emotional cue extraction from speech signals
- **Cross-Modal Approach**: Novel application of computer vision techniques to audio analysis
- **Comparative Framework**: Systematic evaluation of CNN-LSTM vs. Vision Transformer architectures

### Methodological Advances
- **Mel Spectrogram Processing**: Optimized frequency representation for emotion detection
- **Data Augmentation**: Comprehensive preprocessing pipeline for improved generalization
- **Hyperparameter Optimization**: Systematic tuning for optimal performance
- **Robust Evaluation**: Multiple metrics including precision, recall, and F1-score analysis

## Implementation Details

### Model Architecture
#### CNN-LSTM
A sequential model that combines convolutional feature extraction with temporal modeling using an LSTM.

```mermaid
    flowchart TD
        A[Audio Input] --> B[Normalization]
        B --> C["Feature Extraction 1D CNN Layers"]
        C --> D["LSTM Model (Attention Based Learning)"]
        D --> E[Fully Connected Layer]
        E --> F[Predicted Emotion]

```

#### Vision Transformers

This pipeline converts audio signals to spectrogram images, which are then processed by a Transformer encoder like in image-based tasks.

```mermaid
flowchart TD
    A[Audio Input] --> B[Mel Spectrogram]
    B --> C[Split into Patches]
    C --> D[Add Positional Embeddings]
    D --> E[Transformer Encoder]
    E --> F[MLP]
    F --> G[Classification Output]
```


### Training Configuration
- **Optimization**: SGD with momentum for CNN-LSTM, Adam for ViT
- **Regularization**: Batch normalization, dropout
- **Loss Function**: Categorical cross-entropy
- **Validation**: K-fold cross-validation for robust performance estimation

## Applications and Impact

### Practical Applications
- **Conversational AI**: Enhanced human-computer interaction
- **Healthcare**: Emotion monitoring in therapeutic settings
- **Customer Service**: Automated sentiment analysis in call centers
- **Education**: Adaptive learning systems based on emotional states

### Research Contributions
- **Benchmarking**: New performance standards for EMO-DB dataset
- **Methodology**: Reproducible framework for SER evaluation
- **Cross-Domain**: Bridge between computer vision and speech processing
- **Open Research**: Foundation for future attention-based SER studies

## Future Directions

### Technical Enhancements
- **Multi-Modal Fusion**: Integration of visual and audio emotion cues
- **Real-Time Processing**: Optimization for live emotion recognition
- **Cross-Language**: Extension to multilingual emotion recognition
- **Transformer Variants**: Exploration of specialized attention mechanisms

### Dataset Improvements
- **Data Augmentation**: Advanced synthetic data generation techniques
- **Cross-Dataset**: Training on multiple emotion databases simultaneously
- **Preprocessing**: Enhanced feature extraction methodologies
- **Evaluation**: More comprehensive emotion categories and cultural contexts

### Architectural Innovations
- **Hybrid Models**: Combining CNN-LSTM and Vision Transformer strengths
- **Parameter Optimization**: Advanced hyperparameter tuning strategies
- **Efficiency**: Model compression for mobile and edge deployment
- **Interpretability**: Attention visualization for emotion recognition insights

## Conclusion

Attention-based deep learning models have shown superior performance in speech emotion recognition tasks. The CNN-LSTM model achieved a state-of-the-art accuracy of 88.50%, while the novel Vision Transformer approach attained a competitive 85.36%. Both approaches significantly outperformed traditional machine learning methods, setting new benchmarks on the EMO-DB dataset and encouraging further exploration in cross-modal emotion recognition.

The results validate the effectiveness of end-to-end learning and underscore the potential of transformer architectures for audio processing. These contributions support progress in human-computer interaction and provide a strong foundation for future developments in emotion-aware artificial intelligence.
