---
tier: "Second-tier read — OCP ±400 V rail rather than NVIDIA 800 V"
role: "Optical modules plus OCP ORV3 power whips and busbars migrating from 54 V toward ±400 V"
---

## Who JPC is

JPC Connectivity (TW:6197) builds optical transceivers and copper interconnect for telecom and data centers. Its recent story is a shift from **spec-in** — getting designed into a customer's specification — to **spec-win**, meaning actually taking allocation.

## Business mix

- **Optical communication** — telecom transport products, data-center 400G and 800G modules, and a silicon photonics programme targeting 800G/1.6T with in-house patents. This is the larger opportunity and where R&D is concentrated.
- **Copper and power** — OCP **ORV3 AC whips** for high-current rack power, **busbars**, and memory connectors.
- **Optical passives** — MPO/MTP patch cords and a trident cable design that solved a tight-bend-radius problem to get into a US compute tray.

## Where it sits — and an important caveat

JPC is in this collection for its power interconnect, but on the **OCP rail rather than NVIDIA's**.

Its disclosed busbar work follows customers moving from **48 V/54 V toward ±400 V HVDC**, pursued through system-integrator hubs rather than named cloud accounts. NVIDIA deliberately chose **single-ended 800 V** over ±400 V, on the grounds that ±400 V needs three-pole breakers that are not widely available, while 800 V works with existing two-pole designs.

Both rails are real. NVIDIA's own rack accepts ±400 V sources through symmetric fusing, so OCP equipment is not stranded. But if you are screening specifically for NVIDIA 800 VDC exposure, JPC is an adjacent read, not a direct one.

The nearer-term commercial event is simpler: the ORV3 AC whip cleared UL certification and won a production order, with first revenue following in the next quarter.
