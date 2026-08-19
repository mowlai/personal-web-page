---
title: Autonomous Water Treatment
summary: A reinforcement learning and agentic AI framework that runs ultrafiltration plants end to end, from raw telemetry to verified control setpoints.
period: 2023 — present
date: 2023-08-01
cover: /images/projects/autonomous-water-treatment.svg
coverAlt: Ultrafiltration skid instrumented for autonomous control.
tags: [Reinforcement Learning, Agentic AI, Time Series, Control]
featured: true
order: 1
links:
  - label: Project site
    href: https://wateresiliency.org
    icon: link
draft: false
---

My doctoral research, conducted under the U.S. Army Corps of Engineers, asks a
blunt question: can a water treatment plant run itself well enough to beat a
skilled human operator on net water production, without ever violating a safety
constraint?

The framework has three layers.

## 1. Perception — forecasting the plant

Ultrafiltration telemetry is non-stationary by nature: membranes foul, feed water
quality drifts seasonally, and cleaning events reset the system to a different
operating regime. A single global model averages across all of that and predicts
poorly at exactly the moments that matter.

The pipeline instead uses **late-fusion forecasters** over separate sensor
streams, with **regime decomposition** applied first to isolate distinct
historical operating states. Anomaly monitoring runs alongside on the operational
KPIs, so a forecast that is confidently wrong gets flagged rather than acted on.

## 2. Policy — reinforcement learning for control

Backwash and cleaning scheduling is the lever with the largest effect on net
water production, and it is conventionally handled by fixed rules. I train deep
RL policies over a plant simulator calibrated to real telemetry, with the reward
tied directly to net production and hard constraints encoded as terminal
penalties rather than soft costs.

Offline policy evaluation gates anything before it touches hardware. A policy
that cannot be shown to beat the incumbent rule-based schedule on historical
data does not get deployed.

## 3. Action — an agentic controller with guardrails

The top layer turns forecasts into setpoints. It is an agentic controller, but
the interesting engineering is in what sits between the model and the actuator:
a **constraint verification layer** that checks every proposed setpoint against
the plant's operating envelope and rejects, rather than clips, anything outside
it.

## Current direction

I am pretraining **water treatment foundation models** on multi-plant telemetry
and post-training them per site, so a new plant inherits a strong prior instead
of starting from a cold model with three months of data.
