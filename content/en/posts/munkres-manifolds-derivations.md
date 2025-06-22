+++
date = '2025-06-22T00:41:15+08:00'
draft = false
title = 'Munkres Manifolds Derivations'
math = true
katex = true
+++
Let \\( M \\) be a topological space. Following Munkres, we define \\( M \\) to be a \\( k \\)-dimensional manifold **without boundary** if:

1. \\( M \\) is Hausdorff,
2. \\( M \\) is second-countable,
3. For every \\( p \\in M \\), there exists an open neighborhood \\( U \\subset M \\) and a homeomorphism:

$$
\\varphi : U \\to V \\subset \\mathbb{{R}}^k
$$

where \\( V \\) is open in \\( \\mathbb{{R}}^k \\).

This definition deliberately excludes models such as the closed half-space:

$$
\\mathbb{{H}}^k = {{ x \\in \\mathbb{{R}}^k \\mid x_k \\geq 0 }}
$$

which are only permitted in the broader framework of manifolds *with* boundary.

---

## 1. Why Half-Spaces Are Excluded

Suppose, for contradiction, that there exists \\( p \\in M \\) with a neighborhood \\( U \\) and a homeomorphism:

$$
\\varphi : U \\to V \\subset \\mathbb{{H}}^k
$$

such that \\( \\varphi(p) \\in \\partial \\mathbb{{H}}^k = {{ x \\in \\mathbb{{R}}^k \\mid x_k = 0 }} \\).

Then \\( \\varphi(p) \\) has no open neighborhood in \\( \\mathbb{{R}}^k \\), since every open set in \\( \\mathbb{{R}}^k \\) containing \\( \\varphi(p) \\) intersects the boundary \\( \\partial \\mathbb{{H}}^k \\), which is closed and has empty interior.

Therefore, \\( \\varphi(p) \\) cannot lie in any open subset of \\( \\mathbb{{R}}^k \\), contradicting the definition of a boundaryless manifold.

---

## 2. Coordinate Transition Consistency

Let \\( (U, \\varphi) \\), \\( (U', \\psi) \\) be charts around a point \\( p \\in M \\). The transition map:

$$
\\psi \\circ \\varphi^{{-1}} : \\varphi(U \\cap U') \\to \\psi(U \\cap U')
$$

must be a homeomorphism between open subsets of \\( \\mathbb{{R}}^k \\). This fails if one chart lands in \\( \\mathbb{{H}}^k \\), as \\( \\varphi(U) \\cap \\partial \\mathbb{{H}}^k \\) is not open in \\( \\mathbb{{R}}^k \\).

---

## 3. Boundary Point Characterization

Suppose a space \\( M \\) is locally modeled on \\( \\mathbb{{H}}^k \\). Define:

$$
\\partial M := {{ p \\in M \\mid \\varphi(p) \\in \\partial \\mathbb{{H}}^k }}
$$

Then \\( \\partial M \\) consists of all boundary points. However, in Munkres' framework, such charts are disallowed. Hence \\( \\partial M = \\varnothing \\), and \\( M \\) consists solely of interior points.

---

## 4. Examples and Implications

- The open unit ball \\( B^k = {{ x \\in \\mathbb{{R}}^k \\mid \\lVert x \\rVert < 1 }} \\) is a \\( k \\)-manifold without boundary.
- The closed ball \\( \\overline{{B}}^k = {{ x \\in \\mathbb{{R}}^k \\mid \\lVert x \\rVert \\leq 1 }} \\) is a \\( k \\)-manifold with boundary.
- The boundary \\( \\partial \\overline{{B}}^k = S^{{k-1}} \\) requires half-space charts and thus falls outside Munkres' definition.

---

## Conclusion

Munkres' definition of a \\( k \\)-manifold without boundary ensures full local openness in \\( \\mathbb{{R}}^k \\), prohibiting edge cases from entering the theory. This clean separation facilitates rigorous differential topology, particularly in setting up smooth structures.
"""


