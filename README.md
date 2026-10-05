<p align="center">
  <img src="./assets/hero.svg" width="100%" alt="Ki-Yeon Park — Machine Learning Researcher" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Representation_Learning-172554?style=flat-square" alt="Representation Learning" />
  <img src="https://img.shields.io/badge/Efficient_AI-1e3a8a?style=flat-square" alt="Efficient AI" />
  <img src="https://img.shields.io/badge/LLM_Applications-0f766e?style=flat-square" alt="LLM Applications" />
  <img src="https://img.shields.io/badge/Model_Compression-7c3aed?style=flat-square" alt="Model Compression" />
</p>

<p align="center">
  <a href="mailto:kiyeon9610@gmail.com">Email</a>
</p>

## Profile

I am a machine learning researcher focused on **representation learning** and
**efficient AI**. I build compact neural representations that retain useful
local and temporal structure, with applications in satellite-image retrieval
and low-bit model inference. I am currently extending that work into
production-style AI services: RAG and agent pipelines, model serving, and
drift-aware retraining.

- **M.S. in Computer Science**, Kookmin University
- First-author research on region-aware meteorological satellite retrieval
- Co-author research on 2-bit post-training quantization for LLMs (CIKM 2026)
- Research interests: image embeddings, self-supervised learning, model
  compression, and efficient inference

## Experience & Education

| Period | Organization | Role |
|---|---|---|
| **Jul 2026 – Dec 2026** | **SKALA 4th cohort** | Full-stack AI service training: Python, Java/Spring Boot, Vue.js, Docker, Kubernetes, MSA, LangChain/LangGraph, RAG, agents, MLflow-based serving and AIOps; team projects on event recommendation, agentic RAG evaluation, and drift-aware forecasting |
| Aug 2023 – Feb 2026 | **Data Mining Lab, Kookmin University** | Undergraduate researcher, then M.S. researcher; satellite-image retrieval and LLM quantization |
| Mar 2024 – Feb 2026 | **Kookmin University** | M.S. in Computer Science · GPA 4.39/4.50 |
| Mar 2016 – Feb 2024 | **Kookmin University** | B.A. in Political Science & Diplomacy and B.S. in Computer Science (double major) |

## Research

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>RaP-Weather: region-aware satellite retrieval</h3>
      <p><sub>FIRST AUTHOR · IEEE ACCESS, UNDER REVISION</sub></p>
      <p>
        A retrieval framework that encodes a full satellite image sequence once,
        preserves a compact patch grid, and reuses arbitrary subsets for
        regional queries without crop-and-re-encode overhead.
      </p>
      <p>
        <code>Vision Transformer</code>
        <code>LoRA</code>
        <code>InfoNCE</code>
        <code>Spatio-temporal learning</code>
      </p>
    </td>
    <td width="50%" valign="top">
      <h3>EPTQ: 2-bit LLM quantization</h3>
      <p><sub>CO-AUTHOR · CIKM 2026 (ACCEPTED)</sub></p>
      <p>
        A post-training quantization framework built on a Factored E8 lattice:
        a 4 KB codebook that stays in GPU L1 cache, Sinkhorn-based weight scale
        normalization, and per-matrix adaptive critical-weight preservation with
        zero bit overhead. FE8 quantizes up to 6.8x faster than QTIP and decodes
        faster than FP16 on Llama-2-7B and Llama-3-8B.
      </p>
      <p>
        <code>2-bit PTQ</code>
        <code>E8 lattice</code>
        <code>LLM inference</code>
        <code>Model compression</code>
      </p>
      <p><a href="https://github.com/kmudmlab/eptq">kmudmlab/eptq</a> · DOI 10.1145/3799682.3841056</p>
    </td>
  </tr>
</table>

## Engineering

| Project | What it demonstrates | Stack |
|---|---|---|
| **EventHub** (SKALA team project) | Event-platform MSA with five services and Kafka; personalized recommendation that stacks collaborative-filtering KNN with an MLP to cover cold start (Hit@10 0.396 → 0.600) | Java, Spring Boot, JPA, Kafka, MariaDB, Python |
| **KV-cache optimization review agent** (SKALA team project) | LangGraph pipeline of 10 agents that evaluates KV-cache optimization techniques from four perspectives; three RAG agents benchmarked across chunking, embeddings (bge-m3, e5, Qwen3-Embedding), and query rewriting | Python, LangGraph, LangChain, Vector DB, RAGAS |
| **TSA checkpoint forecasting** (SKALA mini project) | FastAPI serving with an MLflow deployment gate, RMSE drift detection, warm-start retraining, and rule-based safe mode; cut service RMSE by 72.7% versus a static model during the COVID-19 collapse | Python, FastAPI, MLflow, LSTM, XGBoost, Docker |
| [**Zhang et al.**](https://github.com/MargielaParis/zhang-et-al) | Research-topic reader that finds overlapping prior work by embedding search over 10,326 papers; requirements, UI flow, OpenAPI, and ERD design | Service design, OpenAPI, DBML |
| [**KBO Schedule API**](https://github.com/MargielaParis/Doosan-Schedule) | Automated collection and delivery of structured game schedules through a weekly GitHub Actions workflow and GitHub Pages | Python, JSON, GitHub Actions |
| [**Front-end Systems Lab**](https://github.com/MargielaParis/skala-front) | A responsive vanilla web portal with modular weather API integration and progressive HTML/CSS/JavaScript exercises | HTML, CSS, JavaScript, Open-Meteo |
| **Network security monitoring** | A four-person project combining graph-based features with deep learning for packet security monitoring | Python, PyTorch, PageRank, RWR |

## Toolkit

**Research**

Python · R · PyTorch · TensorFlow · NumPy · Pandas · scikit-learn ·
gradient boosting · Hugging Face · Transformers · Vision Transformers ·
LoRA / QLoRA · GNN · contrastive learning · temporal and spatio-temporal
forecasting · 2-bit PTQ · retrieval evaluation

**LLM & Agents**

LangChain · LangGraph · Agentic RAG · vector databases · RAGAS · MCP ·
Spring AI

**Engineering**

Java · Spring Boot · JPA · Kafka · FastAPI · MLflow · Docker · Docker
Compose · Kubernetes · MSA · Vue.js · HTML · CSS · JavaScript · TypeScript ·
SQL · Git · GitHub Actions · Linux · LaTeX

## Languages & Credentials

- **OPIc IH** — May 2026
- **TOEIC 915** — November 2023

<p align="center">
  <sub>Researching efficient representations from Seoul, South Korea.</sub>
</p>
