---
title: Large-Scale Behavioral Modeling & LLM Decision Tools
context: IBM · Machine Learning & Data Science
summary: Built propensity models on more than 65M behavioral records, supported by statistical testing, feature ablation, and model benchmarking. Integrated predictions into an LLM-powered application for natural-language audience definition and model-driven decision support.
tagline: Large-scale propensity modeling integrated with LLM-powered decision tools.
period: "2026"
date: 2026-05-01
cover: /images/projects/llm-audience-builder.svg
coverAlt: Audience segmentation interface driven by natural language.
tags: [LLM, RAG, Function Calling, Propensity Modeling]
featured: true
order: 3
links: []
draft: false
---

Built during my PhD internship at **IBM**. Marketing teams had well-validated
propensity models available to them and mostly could not use them, because
turning "high-intent enterprise accounts that went quiet last quarter" into a
segment definition required someone who knew the schema.

## The two halves

**The statistical half.** Before any of the language tooling was worth building,
the underlying models had to be trustworthy. I ran multivariate and time-series
analysis over engagement data spanning **65M+ records**, benchmarked candidate
models against each other, applied bootstrap significance testing to the
differences, and refined through feature ablation and hyperparameter search.
Ablation mattered: several features that looked predictive were proxies for
recency and added nothing once recency was in the model.

**The language half.** An LLM layer translating plain-English audience
descriptions into executable segment definitions, built on iterative prompt
design, retrieval over the schema and metric catalog, and function calling
against the segmentation API. The model never writes queries freehand — it
selects and parameterizes known-good functions, so a malformed request fails
loudly instead of silently returning the wrong audience.

## What generalizes

The pattern worth keeping: **constrain the model to a verified action space.**
Function calling over a curated catalog turned an open-ended text-to-query
problem, which fails in ways nobody notices, into a bounded selection problem
that fails visibly.
