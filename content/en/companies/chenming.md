---
tier: "Second-tier read — own HVDC disclosure"
role: "Server chassis and racks, developing for both the OCP ±400 V and NVIDIA 0–800 V camps"
---

## Who Chenming is

Chenming (TW:3013) is an OEM/ODM manufacturer of server chassis and racks — the sheet metal, mechanical structure, and increasingly the liquid-cooling plumbing that an AI system is built into. AI server chassis are close to half of revenue, general servers most of the rest.

## Business mix

- **AI server chassis** — the largest line, including work associated with GB200 NVL72 systems and Chinese superpod deployments.
- **General server chassis** — the legacy volume business.
- **Liquid cooling** — the growth line: sidecars and in-rack CDUs, assembled at the Zhongli plant, with in-house manifolds, floating joints, and leak-free connections covered by Taiwan patents.
- **Off-the-shelf products** — the company dropped generic designs to focus on NVIDIA MGX platform boxes.

Manufacturing is being extended to Thailand, with the first phase built out for volume from 2026Q1.

## Where it sits in the NVIDIA 800 VDC stack

The physical envelope. Whatever bus voltage wins, someone has to build the cabinet, route the busbar, and keep the coolant from leaking into it — and 800 V changes the mechanical requirements for clearance, isolation, and connector placement.

Chenming is explicitly developing for **both camps**: the OCP **±400 V** architecture and NVIDIA's **0–800 V** single-ended rail. It has also built **power rack** samples with power-supply partners, covering the PSU and BBU that sit inside.

That dual-track position is honest about where the industry is. NVIDIA chose single-ended 800 V because two-pole breakers already exist, but OCP's ±400 V rail is real and shipping, and a chassis maker cannot afford to pick wrong.
