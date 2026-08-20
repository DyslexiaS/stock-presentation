---
tier: "Second-tier read — adjacent power interconnect"
role: "Board-to-board and power connectors into AI power shelves, sidecar BBU/CBU modules, and 48 V DC-DC — an architecture read, not an 800 V SKU"
---

## Who CviLux is

CviLux (TW:8103) is a Taiwan connector maker whose growth story is a mix shift into servers and networking, and inside that, into **AI Power**. Connectors are the core; cable assemblies are sold alongside them as a kit.

It is not on NVIDIA's published 800 VDC partner list. It is in this collection because the Q1 2026 call walked through the **side-power-rack** layer NVIDIA specified — Power Shelf, sidecar storage, DC-DC — without ever saying "800V".

## Business mix

Three groups, with connectors still doing the work:

- **Connectors** — about **70%** of sales.
- **Cable assemblies** — **25–30%**, sold as a companion solution rather than a separate story.
- **Electronic accessories** — under **5%**, mostly B2C consumer parts plus some motors and sensors.

By end market, **servers and networking** is the largest slice, and **AI Power** inside it is the engine. Notebooks remain a sizable, lower-margin line pressured by mainland Chinese competition. Industrial electronics is smaller but richer. Automotive is not a focus.

Manufacturing is being pulled toward a non-China footprint: four China plants (two in Dongguan, plus Suzhou and Chongqing) consolidating to three, and two Southeast Asian plants (Laos, Vietnam) becoming three with a new Thailand site. High-frequency work stays with Taiwan headquarters and Suzhou; notebook capacity is moving from Suzhou to Chongqing.

## Where it sits in the NVIDIA 800 VDC stack

On the **side-power rack / sidecar** layer — the retrofit NVIDIA describes as moving conversion and storage into a dedicated rack beside compute, without rebuilding the hall.

What CviLux actually discussed is that layer's **connector content**, at today's voltages:

- **Power Shelf.** As PSU wattage rises — management's example was **18.5 kW** — internal space tightens and more **board-to-board** connectors are needed to stack boards.
- **Sidecar.** Data centers are adding **BBU** (battery backup) and **CBU** (supercapacitor) modules for power stability; those modules are board-and-connector heavy.
- **DC-DC.** Inside the server, **48 V** is stepped down to the GPU's low voltage; CviLux has product in that stage.

That is a real architectural map. It is **not** an 800 V SKU, a dated HVDC design-win, or a claim to be on NVIDIA's list. The 18.5 kW shelf in this call is the current high-power AC/DC generation, not the **110 kW** HVDC shelf Lite-On has dated. Treat CviLux as a connector read on the side-power rack NVIDIA specified, still speaking **48 V**, not 800 VDC.
