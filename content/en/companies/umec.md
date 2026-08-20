---
tier: "Second-tier read — own HVDC disclosure"
role: "Switch-side PSU house developing 800V HBDC for 8kW+ networking power — not entering compute Power Rack"
---

## Who UMEC is

UMEC — Universal Microelectronics (TW:2413) — was founded in Taichung in 1984 and still runs three lines: magnetic components, **switch power supplies**, and information and communications products built around millimetre-wave radar. Plants sit in Taichung, Shenzhen, Longyan and Hanoi.

It is not on NVIDIA's list and is not trying to be. Management was explicit: it will **not enter compute-server power or Power Rack**. The 800V work is on the **switch** side of the hall, under the company's own label **HBDC** (high-voltage DC) — they did not say HVDC.

## Business mix

Nine-month 2025 shares:

- **Power supplies ~45%.** Networking **switch** PSUs since the early years, designed and tested against the customer's system because noise and power quality move packet efficiency. Distinct from compute-server PSUs. Wattage has climbed from 2 kW toward 4–5 kW; 4 kW-class product is already developed. Accton is the main named customer: once the sub-150 W supplier, and since around 2020 in the high-watt chain up to **1,200 W**, with next-generation HBDC under joint development.
- **ICP ~45%.** Started in marine electronics (fish-finders). After absorbing a team from Taiwan's Chung-Shan Institute of Science and Technology, millimetre-wave capability — antenna through firmware — is in-house. The growth piece is automotive — an exclusive **Tier 2** seat on Hyundai/Kia's sentinel camera-radar module, with US attach rates above 90%. Drone power modules, chargers and mmWave sensors are the next adjacency.
- **Magnetics ~10%.** Transformers and related parts, still mostly networking; the founding line.

## Where it sits in the NVIDIA 800 VDC stack

Not in the compute rack.

UMEC's 800V claim is **switch-side HBDC** at **800 V**, aimed at **8,000 W and above**, where current-driven heat makes a low-voltage CRPS brick the wrong answer. The CRPS roadmap management gave is 3 kW now, **5.5 kW in 2026**, **8 kW in late 2026 or 2027**, with customer sketches at 13 / 16 / 33 kW. Above about **5 kW**, HBDC is described as required.

A switch hall may later use a Power Rack-like feed, and after HBDC the voltage class starts to look like the compute hall's. I/O layout, cooling and transmission-efficiency specs still differ. Delta and Lite-On also sell switch PSUs; UMEC's stated edge is forty years of joint debug with the switch OEM, not a compute-rack qualification.

**Space-grade** DC-DC modules and filters, developed with TASA (Taiwan's national space agency), are a separate long-dated line. The chairman's personal view is that commercialisation comes when Taiwan system houses enter **"space data centers."** That is colour, not a date, and it is not an NVIDIA 800V print.

## Strategy

A new chairman, Ou Jen-chieh, is running an operating overhaul: tighter tests on investments, a leaner organisation, electronic requisition and expense systems with real-time audit, and an employee stock-ownership trust. Short-cycle growth is Hyundai/Kia radar; medium-cycle is drones (small revenue in 2026, more after 2027) and HBDC switch power; space power is inventory until a Taiwan system customer exists.
