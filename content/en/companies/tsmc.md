---
tier: "Process owner — TSMC in-house CoWoS brand"
role: "Foundry plus CoWoS / InFO / SoIC advanced packaging; the only listed name that owns the CoWoS process"
---

## Who TSMC is

Taiwan Semiconductor Manufacturing Company (TW:2330, NYSE:TSM) is the world's largest dedicated foundry. **CoWoS** — Chip-on-Wafer-on-Substrate — is TSMC's 2.5D platform, in volume since 2012, and the package under almost every leading AI GPU. The process page is at TSMC 3DFabric; the quarterly earnings call is where capacity, CapEx and competing backends (EMIB-T, glass) get dated.

TSMC is **not** on NVIDIA's published 800 VDC component list. It belongs on this collection because the GPU that 800 V feeds is a CoWoS part, and because the July 2026 call is the official word on how tight that backend still is.

## Business mix

TSMC reports wafer revenue by node and by platform, not a standalone CoWoS sales line.

- **HPC** — **66%** of Q2 2026 revenue, +20% sequentially. AI accelerators, CPUs for agentic AI, and networking silicon sit here.
- **Smartphone** — **22%**.
- **IoT / automotive / DCE** — **5% / 4% / 1%**.
- **Nodes:** N2 was **3%** of wafer revenue in Q2 2026; N3 **30%**, N5 **33%**, N7 **11%**. Advanced (7 nm and below) **77%**.

Advanced packaging, testing, mask-making and others share one CapEx bucket of **10–20%** of the 2026 capital budget. Management will not split CoWoS out of that bucket.

## Where it sits in the NVIDIA 800 VDC stack

One layer **under** the GPU rail. 800 VDC is a rack-power architecture. CoWoS is how the GPU and HBM are physically integrated before that rack is bolted together. The July 2026 call never named 800 V, HVDC or Kyber.

What the call did date on the package:

- The **majority is still CoWoS**. A glass-substrate / glass-core alternative is in a pilot announced "a few quarters ago" and needs **about another one year** before it can go into production with a customer.
- The Technology Symposium size roadmap is **14× reticle** CoWoS. That is larger AI packaging, not a 2026 mix figure.
- Backend capacity is in **shortage**, "the gap is bigger," and it **limits customer growth**. Intel EMIB-T is welcomed as overflow that still lets TSMC frontend wafers get packaged.
- Testers are also short. That is why packaging CapEx stays bundled with test and mask-making.

Arizona: an additional **US$100bn** (cumulative **US$265bn**) for several more 2 nm-and-below logic fabs **and** advanced-packaging fabs — "additional four or more fabs," frontend and backend. Taiwan: **13** leading-edge and advanced-packaging fabs over the next several years. COUPE (TSMC's silicon-photonics / CPO platform) has **started production** and is expected to become "fairly important" over the next few years.

## Coverage note

One note, Q2 2026 (16 July 2026). Dual-tagged on the [CoWoS hub](/en/topics/cowos). Later 2026 events without a completed dump in this archive are not back-filled here.
