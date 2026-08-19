---
title: Multimodal Spectral Drug Detection
summary: Deep learning models over spectral scans for a portable field detection device, hardened against sensor noise and distribution shift.
period: "2025"
date: 2025-05-01
cover: /images/projects/spectral-drug-detection.svg
coverAlt: Portable spectrometer used for field drug detection.
tags: [Multimodal, Deep Learning, Adversarial Evaluation, LoRA]
featured: true
order: 2
links: []
draft: false
---

Built at **Lightsense Technology** for a handheld drug detection instrument.
Laboratory accuracy is the easy half of this problem; the hard half is that the
device goes into the field, where the sensor is noisier, the operator is less
careful, and the compounds are cut with things the training set never saw.

## What I built

- **Multimodal models over spectral scans.** Benchmarked architectures fusing
  multiple excitation channels against single-channel baselines on target
  compound detection.
- **Adversarial evaluation protocols.** Rather than a random test split, I built
  evaluation suites that deliberately induce distribution shift and simulated
  sensor noise, so the reported number reflects field conditions rather than
  bench conditions.
- **UV-LED excitation optimization.** Used the predictive models in the loop to
  select excitation configurations, improving detection sensitivity on target
  compounds — a case where the model informs the hardware, not just the output.
- **A LoRA-adapted domain LLM** for spectrometry question answering, evaluated
  specifically on whether its answers stayed grounded in calibration and drift
  documentation rather than confidently improvising.

## Why the evaluation design mattered most

The adversarial protocol changed which model we shipped. The architecture with
the best clean-split accuracy was not the one that held up under simulated
sensor degradation, and picking on the clean number would have shipped a model
that looked good in the report and failed on arrival.
