---
title: "NVIDIA 800V HVDC — Taiwan Supply Chain"
description: "English earnings memos from Taiwan-listed suppliers exposed to NVIDIA's 800V HVDC architecture for AI data centers — power racks, leadframes, fans, connectors, and circuit protection."
---

NVIDIA is rebuilding data-center power around **800 VDC** so that megawatt-class AI racks do not drown in copper. Taiwan builds much of that hardware. This hub collects English briefings of those companies' earnings calls — not slide dumps, and not Chinese transcripts.

## What NVIDIA actually specified

From NVIDIA's own whitepaper, *800 VDC Architecture for Next-Generation AI Infrastructure*, and its 800 VDC product page:

- Target is **1 MW+ IT racks starting 2027**, aligned with the **Kyber** rack that holds **576 Rubin Ultra GPUs**.
- 800 VDC pushes **157% more power through the same copper** than 415 VAC, removing roughly 200 kg of busbar per rack.
- Grid medium voltage (13.8–35 kV AC) is converted to 800 VDC by **MV rectifiers or solid-state transformers**, up to 7.5 MVA per unit at 98.5%+ efficiency.
- Inside the node, a **64:1 LLC converter with a matrix transformer** steps 800 V straight to 12 V next to the GPU — one stage instead of 400 V → 50 V → 12 V, worth about 1% efficiency and 26% less board area.
- Because GPU load swings between roughly 30% and 100% within milliseconds, **energy storage is part of the architecture**, not an accessory: electrolytic capacitors below 100 ms, mixed solutions to 10 s, batteries beyond that, plus facility BESS at the interconnect.
- Safety is specified: **touch-safe connectors, mechanical interlocks, fuses on both the high and low side** of the DC/DC, and reinforced isolation so ±400 V equipment can still feed the rack.

The rollout is explicitly phased: an MGX-compatible **side power rack** for retrofits in 2H 2026, a **row power center** at up to 2 MW per row in 2027, then a native **DC power block** for new builds.

## Who NVIDIA named

NVIDIA's published ecosystem list includes four Taiwan-linked names:

| Slot | Taiwan names on NVIDIA's list |
|---|---|
| Power system components | **Delta (2308)**, **LITEON (2301)**, **BizLink (3665)** |
| Silicon | **Richtek** (a MediaTek subsidiary, no separate listing) |

Everyone else in this hub is a second- or third-tier read: real Taiwan-listed suppliers with their own 800V/HVDC disclosure on an earnings call, but not on NVIDIA's official roster. That distinction matters, and each memo says where the company sits.

A separate rail also exists: the **OCP ±400 V** path (ORV3, Mount Diablo). NVIDIA chose single-ended 800 V instead, because two-pole breakers already exist while ±400 V needs three-pole gear. Some Taiwan names sell into both; memos tagged here will say which.

## How to read this collection

Each memo is an English briefing of a Taiwan earnings call. Figures are as stated by management. The Chinese transcript and Chinese memo stay off the site; this page is the public article.

Start with **Lite-On (2301)**, the one company here that is both on NVIDIA's list and has a dated 800V Power Rack timeline. Use **Chang Wah (6548)** for how 800V already shows up in leadframe mix and ASP. Use **Voltronic (6409)** and **Chenming (3013)** for UPS and chassis names still earlier in the cycle.
