---
title: "SiC / GaN — Taiwan Power Semiconductors"
description: "What NVIDIA actually said about silicon carbide and gallium nitride in the 800 VDC architecture — device maturity, the EV 800 V precedent — and which Taiwan-listed epi, foundry, module and OSAT names sit one layer below the official silicon list. English earnings-call notes for Episil, Episil-Precision, Actron and GEM."
---

NVIDIA's 800 VDC architecture **needs wide-bandgap switches**. This hub does two things: it reads what NVIDIA has actually published about SiC and GaN, then maps the Taiwan-listed companies that grow, foundry, module or package those devices. Power racks and the water loop are separate topics — see the [NVIDIA 800 VDC hub](/en/topics/nvidia-800v) and the [liquid-cooling hub](/en/topics/liquid-cooling). Every company below has an English memo page with briefings of its earnings calls.

## Part 1 — What NVIDIA actually specified

Source: NVIDIA's whitepaper *800 VDC Architecture for Next-Generation AI Infrastructure* (Jared Huntington and Mike Tu), the 800 VDC product page, and the OCP work NVIDIA published with Google and Microsoft.

### The official sentence

The whitepaper's case for 800 VDC is copper, conversion stages and rack density. On materials it says one thing, twice: the architecture **benefits from the growing maturity of silicon carbide (SiC) and gallium nitride (GaN) power-conversion devices**, and from the EV industry's move to 800 V. That is a precondition, not a bill of materials.

NVIDIA did **not** publish a SiC-versus-GaN slot map. Third-party notes that put SiC only in the solid-state transformer and GaN only beside the GPU are industry practice, not an NVIDIA vendor assignment. Hold the official facts and leave the rest.

### Where the switches sit on the official stack

The conversion boxes on NVIDIA's diagram are where a SiC or GaN device would have to work:

```mermaid
flowchart LR
  grid["Grid 13.8-35 kV AC"] --> sst["MV rectifier or SST"]
  sst --> bus["800 VDC distribution"]
  bus --> llc["64:1 LLC beside the GPU"]
  llc --> gpu["12 V GPU rail"]
```

Specifics worth holding onto:

- **SST / MV rectifier.** Up to 7.5 MVA at 98.5%+ efficiency, taking 13.8–35 kV AC to 800 VDC. High voltage, high power. This is the slot the industry usually fills with SiC.
- **One conversion beside the GPU.** A 64:1 LLC with a matrix transformer takes 800 V straight to 12 V. High frequency, tight board area. This is the slot the industry usually discusses as GaN or a high-voltage silicon FET.
- **Kyber in 2027.** Full production lines up with the 1 MW+ rack. That date is why every Taiwan compound name on this page talks about 2027, not about 2026 revenue.

### Who NVIDIA named — and who it did not

The published silicon list is IDMs and GaN specialists: Infineon, onsemi, TI, Navitas, Innoscience, MPS, Power Integrations, Renesas, ROHM, ST, AOS, EPC, ADI, plus **Richtek** (a MediaTek subsidiary, no separate listing). **No Taiwan SiC or GaN foundry, epi house or module maker is on that list.**

Taiwan's official names on the 800 VDC page sit one layer up, in power-system components: Delta, Lite-On, BizLink, Lead Wealth. Those companies buy or design-in the switch. They are not the wafer.

## Part 2 — The Taiwan companies

Read the slot before the thesis. Growing an epi wafer is a different fact from running a foundry lot, and both are different from shipping an auto-grade module or assembling someone else's die.

### Epitaxy

Every SiC or GaN switch starts as a crystalline layer. The device maker is usually an IDM that will not name the end rack.

**[Episil-Precision (3016)](/en/episil-precision)** — silicon epitaxy is still about **90%** of sales; compound (GaN and SiC) is about **10%**. The 800V sentence is unusually plain: **GaN epitaxy is already in 800V HVDC systems**, at small-volume trial. Silicon MOS is in the AI supply chain; management does not know whether those parts sit on an 800V rail. SiC is opaque, because IDM customers will not say. 6-inch GaN turned profitable in Q1 2026. One note, Q1 2026.

### Device foundry

**[Episil Technologies (3707)](/en/episil)** — one of the few pure-play foundries with volume SiC, and an 8-inch SiC/GaN pilot of **1,500 wafers a month** going into **Vanguard** for trial in the first half of 2026. Compound was **41%** of H1 2025 sales, down from 49%, because **SiC was −33%** while **GaN was +11%** on AI servers. Management's demand chain is explicit: racks heading for **600 kW in 2027** → 800V HVDC → SiC and GaN. That is a thesis, not a design win. There is no named hyperscaler and no 800V wafer start. One note, H1 2025. The latest completed dump in this archive is older than the rest of the cohort.

### Power modules

**[Actron Technology (8255)](/en/actron)** — a 25-year auto diode house selling **650 V to 3300 V SiC modules** into industrial electronics. Custom HVDC modules for a **domestic customer are exclusive to Actron**, already in sampling and small volume. Management's own calendar: HVDC 800V in **2027–2030**, SST in **2031–2035**. 2026 industrial-module revenue is still tens of millions of NT dollars. The listed company is still a car-parts P&L. One note, Q1 2026.

### Power OSAT

**[GEM Services (6525)](/en/gem)** — turnkey MOSFET / IGBT / diode / module assembly in Shanghai and Hefei. Asked whether HVDC rack architecture changes power-device content, management said it follows customer drawings and **cannot readily judge the BOM**. The 2025 beat versus peers was **AI-server thermal packaging** — copper clip, top-side and dual-side cooling — not a dated HVDC programme. SiC modules are in customer development. Keep GEM as a packaging name with an unanswered 800V question. One note, FY 2025.

### Adjacent — on the 800V hub, not dual-tagged here

These names discuss SiC, GaN or the materials around them, but they are not compound-primary in this collection. Their notes stay on the [800V hub](/en/topics/nvidia-800v).

- **[Acme Electronics (8121)](/en/acme)** — ferrite cores already shipping into HVDC 800V PSUs; **N-type SiC powder** sampling for the same architecture. Materials, not a device.
- **[Chang Wah Technology (6548)](/en/chang-wah)** and **[Jih Lin Technology (5285)](/en/jih-lin)** — high-voltage leadframes and clip / top-side-cooling carriers. The package around the switch, not the switch.
- **[Lite-On (2301)](/en/liteon)** — showed 800V HVDC with SiC and GaN at Computex 2025. The dated product is a Power Rack, not a wafer.
- **[Hon Hai / Foxconn (2317)](/en/foxconn)** — in-house SiC, still on an **EV** clock: final validation targeted for 2026Q4. The 2026 calls never named 800 V.
- **[Polytronics (6642)](/en/polytronics)** — circuit protection plus a stated position in SiC power semiconductors. The 800V print on that call is PPTC at the AC front end.

**Not on this page yet.** GlobalWafers and other substrate names, Vanguard as a listed foundry host, and mainland-listed GaN IDMs are either not in this English collection or not Taiwan-listed with a usable recent dump. Missing a memo is not the same as missing a slot.

## How to read these memos

Each memo is an English briefing of one Taiwan earnings call. Figures are as stated by management and are not independently audited. The Chinese transcript and the Chinese memo behind each one stay off this site; the English article is the published work.

Where a company's most recent call in our archive is old, the memo says so rather than implying the position is current. Compound revenue shares are company-stated and are not comparable across issuers — Episil's "compound" and Episil-Precision's "compound epitaxy" are not the same P&L line, and Actron's industrial-module crumb is not a foundry wafer start.
