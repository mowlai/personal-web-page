---
title: Offline Policy Evaluation Before You Touch the Plant
description: You cannot A/B test a water treatment plant. Here is how to decide whether an RL policy is worth deploying using only logged data from the incumbent controller.
date: 2026-06-15
category: Tutorial
tags: [Reinforcement Learning, Offline RL, Evaluation, Control]
draft: false
---

The standard reinforcement learning story assumes you can let the policy act and
see what happens. In industrial control you usually cannot. A bad backwash
schedule on an ultrafiltration skid does not produce a slightly lower reward —
it fouls membranes, and the feedback arrives days later attached to a
maintenance bill.

So the deployment gate has to be answerable offline: **given only logs from the
controller currently running, is the new policy better?**

This post walks through the three estimators I actually use, in increasing order
of how much they assume.

## The setup

You have logged trajectories from a behavior policy `b` — usually a rule-based
controller. You have a candidate policy `p`. You want an estimate of `V(p)`, the
expected return of the candidate, without running it.

The catch is that your logs only contain actions `b` chose. Whenever `p` would
have done something different, you have no observation of what would have
followed.

## 1. Importance sampling: honest but noisy

The direct approach reweights logged returns by how much more likely the
candidate was to take the actions that were actually taken:

```python
def ordinary_is(trajectories, p_probs, b_probs, gamma=0.99):
    """Ordinary importance sampling estimate of V(p) from logged data."""
    estimates = []
    for traj, pp, bp in zip(trajectories, p_probs, b_probs):
        weight = 1.0
        ret = 0.0
        for t, (_, _, reward) in enumerate(traj):
            weight *= pp[t] / bp[t]
            ret += (gamma ** t) * reward
        estimates.append(weight * ret)
    return sum(estimates) / len(estimates)
```

This is unbiased. It is also close to useless on long horizons, because the
weight is a product over timesteps: a 200-step episode with even mild policy
disagreement drives most weights toward zero and lets one surviving trajectory
dominate the mean.

Two fixes are mandatory in practice:

- **Weighted (self-normalized) IS** — divide by the sum of weights rather than
  the count. Introduces bias, cuts variance enormously.
- **Per-decision IS** — apply the weight at each timestep only to the reward at
  that step, not the whole return.

A useful diagnostic is the **effective sample size**: if `(Σw)² / Σw²` is 12 on a
dataset of 4,000 trajectories, your estimate rests on twelve of them and you
should not believe it.

## 2. Fitted Q evaluation: lower variance, model risk

FQE fits a Q-function for the *candidate* policy by iterated regression on the
logged data, then reads off the value at the initial states.

Variance drops sharply and horizon length stops being fatal. What you buy is
model bias: FQE extrapolates into state-action regions the behavior policy never
visited, and it does so with no signal that it is doing it. If your candidate is
interesting precisely because it acts differently, that is exactly where the
estimate is weakest.

Always report the **state-action coverage** alongside the FQE number.

## 3. Doubly robust: the default

DR combines the two — use the FQE model as a baseline, and use importance
sampling on the residual:

The estimate is consistent if *either* the importance weights are correct *or*
the Q-model is correct. In practice it lands between the two estimators with
meaningfully lower variance than IS alone, and it degrades more gracefully than
either.

Use the **self-normalized** variant. Plain DR inherits IS's weight explosion.

## What I actually gate on

A single point estimate is not a deployment decision. The gate is:

1. **Doubly robust estimate with a bootstrap confidence interval**, over
   trajectory-level resampling.
2. **Effective sample size above a threshold.** Below it, the comparison is not
   supported by the data regardless of what the mean says.
3. **Constraint violation count under the candidate**, estimated separately.
   This is not folded into the reward. A policy that improves net production
   while violating an operating limit is not a better policy, it is a different
   problem.
4. **The lower CI bound beats the incumbent**, not the mean. Deploying on a
   point estimate that happens to be favorable is how you learn about variance
   the expensive way.

## The part nobody mentions

Your logged behavior policy is usually deterministic. Rule-based controllers do
not sample — they fire when a threshold is crossed. That makes `b(a|s)` either 1
or 0, importance weights degenerate, and every method above ill-posed.

The realistic options are to **estimate a stochastic behavior policy** by fitting
a classifier to the logged actions and treating its predictions as `b`, which
introduces its own error but keeps the machinery working, or to **deliberately
inject exploration** into the incumbent controller for a logging period — small
randomized perturbations within safe bounds. The second is better data and a
harder conversation with whoever owns the plant.

Have that conversation early. Retrofitting exploration into a dataset you have
already collected is not possible, and it is the difference between an
evaluation you can defend and a number you hope is right.
