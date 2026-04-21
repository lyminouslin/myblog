+++
date = '2025-06-22T00:41:15+08:00'
draft = false
title = 'Munkres 流形定义中的边界排除'
math = true
katex = true
author = "Kevin Y. Lin"
categories = ["拓扑", "数学"]
tags = ["流形", "Munkres", "拓扑"]
summary = "一篇推导式短笔记：为什么 Munkres 对无边界流形的定义会排除半空间坐标图。"
translationKey = "munkres-manifolds-derivations"
+++

设 \(M\) 是一个拓扑空间。按照 Munkres 的定义，\(M\) 是一个 **无边界** 的 \(k\) 维流形，需要满足：

1. \(M\) 是 Hausdorff 空间；
2. \(M\) 满足第二可数性；
3. 对每个 \(p \in M\)，存在开邻域 \(U \subset M\) 以及同胚

$$
\varphi: U \to V \subset \mathbb{R}^k,
$$

其中 \(V\) 必须是 \(\mathbb{R}^k\) 中的开集。

这个条件有意排除了闭半空间

$$
\mathbb{H}^k=\{x\in\mathbb{R}^k\mid x_k\ge 0\}
$$

这样的局部模型。半空间只会出现在“有边界流形”的框架里。

---

## 为什么半空间不被允许

若某个坐标图把点 \(p\) 映到 \(\partial \mathbb{H}^k\)，也就是 \(x_k=0\) 的边界超平面，那么这个像点在 \(\mathbb{R}^k\) 中没有完全落在半空间内部的开邻域。

这与无边界流形的要求冲突：坐标图的像必须是 \(\mathbb{R}^k\) 中的开集，而不是只在半空间的相对拓扑中开。

---

## 坐标变换的稳定性

若 \((U,\varphi)\) 和 \((U',\psi)\) 是两个坐标图，那么转移映射

$$
\psi\circ\varphi^{-1}:\varphi(U\cap U')\to\psi(U\cap U')
$$

应该是在 \(\mathbb{R}^k\) 的开子集之间定义的同胚。若某个图落在半空间边界上，这个“开子集之间”的结构就会被破坏。

---

## 结论

Munkres 的定义把无边界流形的局部模型固定为 \(\mathbb{R}^k\) 的开集。这样做牺牲了一些边界例子，但换来了非常干净的理论环境：每个点都是真正的内点，坐标变换也始终发生在欧氏空间的开集之间。

