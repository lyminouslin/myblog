+++
title = "Paper Summary: Quantum-limit Chern Topological Magnetism in TbMn₆Sn₆"
date = "2025-07-08T01:05:55+08:00"
draft = false
math = true
katex = true
author = "Kevin Y. Lin"
categories = ["Paper Summary"]
+++

**Author**: *Kevin Y. Lin*  
**Affiliation**: Freshman, Southern University of Science and Technology (SUSTech), Shenzhen, Guangdong, China  
**Date**: July 8, 2025

---

## Background

In Kagome materials with strong spin-orbit coupling and out-of-plane magnetization, spin-polarized Dirac fermions are theoretically possible, analogous to the Haldane model. However, ideal quantum materials are lacking, posing experimental challenges.

---

## Key Findings / Evidence of Quantum-limit Chern Magnet

### 1. Spin-polarized Dirac Cones with Landau Quantization

1. **Zero-field STM peak shifts linearly with magnetic field** due to the Zeeman effect:

   $$
   \Delta E = \pm \tfrac{1}{2} g \mu_B B
   $$

   → Indicates **spin-polarized electronic states**.

2. **STM \( dI/dV \) maps** under high magnetic fields show **discrete Landau quantization**, revealing:

   - Clear Dirac dispersion
   - Characteristic \( E_n \) vs. \( B \) dependence

3. **ARPES measurements** confirm Dirac fermions in the Brillouin Zone.

---

### 2. Chern Gap

1. **Landau fan** observed in high-bias STM measurements at varying magnetic fields shows **two parallel straight lines**, revealing a **finite Chern gap**.

2. **Landau-level fitting formula**:

   $$
   E_n(B) = \pm \sqrt{\left(\frac{\Delta}{2}\right)^2 + 2 e \hbar v_F^2 |n| B} - \frac{1}{2}g \mu_B B
   $$

3. **Fitted parameters** from experimental data:

   $$
   \Delta = 34 \pm 2\,\mathrm{meV}, \quad
   E_D = 130\,\mathrm{meV}, \quad
   v_F = 4.2 \times 10^5\,\mathrm{m/s}
   $$

---

### 3. Bulk-Boundary Correspondence and Dissipationless Edge States

- **STM \( dI/dV \) mapping (Fig. 4a)** shows **localized in-gap edge states** at step edges (interfaces between Kagome layers).

- These **topological edge states** arise due to the bulk Chern gap:

   $$
   n_{\text{edge}} = C
   $$

   where \( C \) is the **Chern number**.

- **Low QPI peaks** observed in Fourier-transformed STM maps (Fig. 4b) indicate **dissipationless propagation** of edge modes.

---

### 4. Quantum Limit

1. **Low carrier concentration**:  
   Fermi level is very close to the Dirac point → extremely low carrier density and symmetric electron-hole excitations [PRX 2024].

2. **Discrete and sparse Landau levels** are clearly resolved in STM (Fig. 2b), confirming the system is in the **quantum limit**.

---

### 5. Anomalous Hall Effect (AHE)

- AHE arises due to intrinsic **Berry curvature**. Empirical relation:

   $$
   \rho_{xy}^{\mathrm{AHE}} = \alpha \rho_{xx} + \beta \rho_{xx}^2 + \gamma \rho_{xy}^2
   $$

- Experimental data show strong quadratic dependence → confirms **intrinsic mechanism**.

- **Theoretical Chern conductivity from Berry curvature**:

   $$
   \sigma_{xy} = -\frac{e^2}{h} \frac{1}{N} \sum_{n} \int_{\mathrm{BZ}} \frac{d^2k}{(2\pi)^2} f_n(\mathbf{k}) \Omega_n(\mathbf{k})
   $$

- Substituting experimental values:

   - \( \Delta \approx 34\,\mathrm{meV} \)
   - \( E_D \approx 130\,\mathrm{meV} \)

  yields:

   $$
   \sigma_{xy}^{\mathrm{Berry}} = 0.13\, \frac{e^2}{h}
   $$

  → Consistent with experimentally measured:

   $$
   0.14\, \frac{e^2}{h}
   $$

---

## Research Significance

- Provides **first experimental evidence** of a **quantum-limit Chern topological magnet**.

- Establishes a complete framework connecting:

   - Bulk Dirac fermions  
   - Finite Chern gap  
   - Topological edge states  
   - Berry curvature transport

- Paves the way for **future quantum material designs** and **topological electronics**.

---

## References

- **PRX 14, 011047 (2024)**  
  [https://doi.org/10.1103/PhysRevX.14.011047](https://doi.org/10.1103/PhysRevX.14.011047)

- **Yin, J.-X., Ma, W., Cochran, T. A., et al.** (2020).  
  *Quantum-limit Chern topological magnetism in TbMn₆Sn₆*.  
  **Nature**, 583, 533–536.  
  [https://doi.org/10.1038/s41586-020-2482-7](https://doi.org/10.1038/s41586-020-2482-7)

---

## Optional: Download Full PDF Report

👉 [Click here to download the full PDF version](/files/Summary_of_Quantum_limit_Chern_topological_magnetism_in_TbMn6Sn6.pdf)

