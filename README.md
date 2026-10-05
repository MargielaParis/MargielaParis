<p align="center">
  <img src="./assets/hero.svg" width="100%" alt="Ki-Yeon Park — Machine Learning Researcher and AI Engineer" />
</p>

<p align="center">
  <a href="mailto:kiyeon9610@gmail.com"><img src="https://img.shields.io/badge/Email-kiyeon9610%40gmail.com-0f172a?style=flat-square&logo=gmail&logoColor=white" alt="Email" /></a>
  <a href="https://github.com/kmudmlab/eptq"><img src="https://img.shields.io/badge/EPTQ-CIKM_2026-7c3aed?style=flat-square&logo=github&logoColor=white" alt="EPTQ on GitHub" /></a>
  <img src="https://img.shields.io/badge/Seoul-South_Korea-0f766e?style=flat-square" alt="Seoul, South Korea" />
</p>

## Profile

Machine learning researcher turned AI engineer. I build **compact neural
representations** that keep local and temporal structure (satellite-image
retrieval, 2-bit LLM inference) and I am now shipping that work as
**production-style AI services**: RAG and agent pipelines, model serving, and
drift-aware retraining.

<table>
  <tr>
    <td width="50%" valign="top">
      <b>Research</b>
      <ul>
        <li>First author · region-aware satellite retrieval (RaP-Weather)</li>
        <li>Co-author · 2-bit post-training quantization for LLMs (EPTQ, CIKM 2026)</li>
        <li>Interests: image embeddings, self-supervised learning, model compression, efficient inference</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <b>Now (SKALA, Jul – Dec 2026)</b>
      <ul>
        <li>LangGraph agentic RAG with retrieval benchmarking</li>
        <li>FastAPI + MLflow serving with drift detection and warm-start retraining</li>
        <li>Spring Boot MSA with Kafka and a recommendation service</li>
      </ul>
    </td>
  </tr>
</table>

## Research

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>RaP-Weather · region-aware satellite retrieval</h3>
      <p>
        <img src="https://img.shields.io/badge/First_author-172554?style=flat-square" alt="First author" />
        <img src="https://img.shields.io/badge/IEEE_Access-under_revision-1e3a8a?style=flat-square" alt="IEEE Access, under revision" />
      </p>
      <p>
        Encodes a full satellite image sequence once, keeps a compact patch grid,
        and reuses arbitrary subsets for regional queries without
        crop-and-re-encode overhead.
      </p>
      <p>
        <code>Vision Transformer</code>
        <code>LoRA</code>
        <code>InfoNCE</code>
        <code>Spatio-temporal learning</code>
      </p>
    </td>
    <td width="50%" valign="top">
      <h3>EPTQ · 2-bit LLM quantization</h3>
      <p>
        <img src="https://img.shields.io/badge/Co--author-172554?style=flat-square" alt="Co-author" />
        <img src="https://img.shields.io/badge/CIKM_2026-accepted-7c3aed?style=flat-square" alt="CIKM 2026, accepted" />
      </p>
      <p>
        Post-training quantization on a Factored E8 lattice: a 4 KB codebook that
        stays in GPU L1 cache, Sinkhorn-based weight scale normalization, and
        per-matrix adaptive critical-weight preservation with zero bit overhead.
        FE8 quantizes up to 6.8x faster than QTIP and decodes faster than FP16 on
        Llama-2-7B and Llama-3-8B.
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
| **EventHub** <sub>SKALA team</sub> | Event-platform MSA with five services and Kafka; personalized recommendation that stacks collaborative-filtering KNN with an MLP to cover cold start (Hit@10 0.396 → 0.600) | Java, Spring Boot, JPA, Kafka, MariaDB, Python |
| **KV-cache optimization review agent** <sub>SKALA team</sub> | LangGraph pipeline of 10 agents that evaluates KV-cache optimization techniques from four perspectives; three RAG agents benchmarked across chunking, embeddings (bge-m3, e5, Qwen3-Embedding), and query rewriting | Python, LangGraph, LangChain, Vector DB, RAGAS |
| **TSA checkpoint forecasting** <sub>SKALA mini</sub> | FastAPI serving with an MLflow deployment gate, RMSE drift detection, warm-start retraining, and rule-based safe mode; cut service RMSE by 72.7% versus a static model during the COVID-19 collapse | Python, FastAPI, MLflow, LSTM, gradient boosting, Docker |
| [**Zhang et al.**](https://github.com/MargielaParis/zhang-et-al) <sub>SKALA solo</sub> | Research-topic reader that finds overlapping prior work by embedding search over 10,326 papers; requirements, UI flow, OpenAPI, and ERD design | Service design, OpenAPI, DBML |
| [**KBO Schedule API**](https://github.com/MargielaParis/Doosan-Schedule) | Automated collection and delivery of structured game schedules through a weekly GitHub Actions workflow and GitHub Pages | Python, JSON, GitHub Actions |
| [**Front-end Systems Lab**](https://github.com/MargielaParis/skala-front) | Responsive vanilla web portal with modular weather API integration and progressive HTML/CSS/JavaScript exercises | HTML, CSS, JavaScript, Open-Meteo |
| **Network security monitoring** | Four-person project combining graph-based features with deep learning for packet security monitoring | Python, PyTorch, PageRank, RWR |

## Toolkit

**Research**

<p>
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white" alt="PyTorch" />
  <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=flat-square&logo=tensorflow&logoColor=white" alt="TensorFlow" />
  <img src="https://img.shields.io/badge/Hugging_Face-FFD21E?style=flat-square&logo=huggingface&logoColor=black" alt="Hugging Face" />
  <img src="https://img.shields.io/badge/scikit--learn-F7931E?style=flat-square&logo=scikitlearn&logoColor=white" alt="scikit-learn" />
  <img src="https://img.shields.io/badge/pandas-150458?style=flat-square&logo=pandas&logoColor=white" alt="pandas" />
  <img src="https://img.shields.io/badge/NumPy-013243?style=flat-square&logo=numpy&logoColor=white" alt="NumPy" />
  <img src="https://img.shields.io/badge/R-276DC3?style=flat-square&logo=r&logoColor=white" alt="R" />
  <img src="https://img.shields.io/badge/Transformers-334155?style=flat-square" alt="Transformers" />
  <img src="https://img.shields.io/badge/Vision_Transformer-334155?style=flat-square" alt="Vision Transformer" />
  <img src="https://img.shields.io/badge/LoRA_%2F_QLoRA-334155?style=flat-square" alt="LoRA / QLoRA" />
  <img src="https://img.shields.io/badge/GNN-334155?style=flat-square" alt="GNN" />
  <img src="https://img.shields.io/badge/Gradient_Boosting-334155?style=flat-square" alt="Gradient Boosting" />
  <img src="https://img.shields.io/badge/Spatio--temporal_Forecasting-334155?style=flat-square" alt="Spatio-temporal Forecasting" />
  <img src="https://img.shields.io/badge/Contrastive_Learning-334155?style=flat-square" alt="Contrastive Learning" />
  <img src="https://img.shields.io/badge/2--bit_PTQ-334155?style=flat-square" alt="2-bit PTQ" />
</p>

**LLM & Agents**

<p>
  <img src="https://img.shields.io/badge/LangChain-1C3C3C?style=flat-square&logo=langchain&logoColor=white" alt="LangChain" />
  <img src="https://img.shields.io/badge/LangGraph-1C3C3C?style=flat-square&logo=langgraph&logoColor=white" alt="LangGraph" />
  <img src="https://img.shields.io/badge/Agentic_RAG-4c1d95?style=flat-square" alt="Agentic RAG" />
  <img src="https://img.shields.io/badge/Vector_DB-4c1d95?style=flat-square" alt="Vector DB" />
  <img src="https://img.shields.io/badge/RAGAS-4c1d95?style=flat-square" alt="RAGAS" />
  <img src="https://img.shields.io/badge/MCP-4c1d95?style=flat-square" alt="MCP" />
  <img src="https://img.shields.io/badge/Spring_AI-6DB33F?style=flat-square&logo=spring&logoColor=white" alt="Spring AI" />
</p>

**Engineering**

<p>
  <img src="https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white" alt="Java" />
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/JPA-59666C?style=flat-square&logo=hibernate&logoColor=white" alt="JPA" />
  <img src="https://img.shields.io/badge/Kafka-231F20?style=flat-square&logo=apachekafka&logoColor=white" alt="Kafka" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/MLflow-0194E2?style=flat-square&logo=mlflow&logoColor=white" alt="MLflow" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&logo=kubernetes&logoColor=white" alt="Kubernetes" />
  <img src="https://img.shields.io/badge/MSA-0f172a?style=flat-square" alt="MSA" />
  <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white" alt="Vue.js" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/SQL-0f172a?style=flat-square" alt="SQL" />
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white" alt="Git" />
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white" alt="GitHub Actions" />
  <img src="https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black" alt="Linux" />
  <img src="https://img.shields.io/badge/LaTeX-008080?style=flat-square&logo=latex&logoColor=white" alt="LaTeX" />
</p>

## Experience & Education

| Period | Organization | Role |
|---|---|---|
| **Jul 2026 – Dec 2026** | **SKALA 4th cohort** | Full-stack AI service training: Python, Java/Spring Boot, Vue.js, Docker, Kubernetes, MSA, LangChain/LangGraph, RAG, agents, MLflow-based serving and AIOps |
| Aug 2023 – Feb 2026 | **Data Mining Lab, Kookmin University** | Undergraduate researcher, then M.S. researcher; satellite-image retrieval and LLM quantization |
| Mar 2024 – Feb 2026 | **Kookmin University** | M.S. in Computer Science · GPA 4.39/4.50 |
| Mar 2016 – Feb 2024 | **Kookmin University** | B.A. in Political Science & Diplomacy and B.S. in Computer Science (double major) |

**Languages & credentials** · OPIc IH (May 2026) · TOEIC 915 (Nov 2023)

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=MargielaParis&show_icons=true&hide_border=true&theme=tokyonight&bg_color=0b1930&title_color=5eead4&icon_color=60a5fa&text_color=cbd5e1&hide=stars,issues" height="160" alt="GitHub stats" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=MargielaParis&layout=compact&hide_border=true&theme=tokyonight&bg_color=0b1930&title_color=5eead4&text_color=cbd5e1&langs_count=6&hide=html,css" height="160" alt="Top languages" />
</p>

<p align="center">
  <sub>Researching efficient representations from Seoul, South Korea.</sub>
</p>
