---
tier: "Second-tier read — own HVDC disclosure"
role: "Design-in distributor of ADI 800 V hot-swap controllers into US cloud ODMs"
---

## Who Anstek is

Anstek (TW:3528) is a semiconductor component distributor, but not the catalogue kind. Its model is **design-in**: field application engineers work with customers on the circuit rather than fulfilling orders, and the FAE-to-sales headcount ratio is roughly **1:1**. Gross margin runs above 10%, which management contrasts with thinner consumer-electronics distribution.

## Business mix

The franchise lines are the story:

- **Analog Devices** — analog and power management, including the parts relevant to 800 V.
- **AMD (formerly Xilinx)** — FPGAs and SoCs, mostly embedded rather than data-center GPU.
- **ITE** — HDMI.
- **Bourns** and **SiMa.ai** — newer lines in passives/protection and edge AI silicon.

End markets are spread across industrial automation, data center and storage, automated test equipment, multimedia, industrial PCs, and defence and aerospace.

## Where it sits in the NVIDIA 800 VDC stack

One layer below the visible hardware. A rack cannot be hot-swapped safely at 800 V without a controller rated for it, and NVIDIA's design calls for hot-swap controllers with symmetric fusing so the same rack accepts either 800 V or ±400 V sources.

Anstek distributes **ADI's 800 V architecture parts, including hot-swap controllers**, and has said they are already shipping to the ODMs building for US cloud service providers. ADI itself is on NVIDIA's silicon partner list; Anstek is how that silicon reaches parts of the Taiwan-built supply chain.

Adjacent exposure comes from ADI battery-management ICs used in EV packs and in BBUs, the storage layer NVIDIA writes into the architecture.
