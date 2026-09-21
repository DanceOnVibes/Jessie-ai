\# Jessie AI Ingestion Notes



\## Purpose

This document explains how knowledge and training files should be added into the Jessie AI project.



The goal of ingestion is not just to collect information.  

The goal is to add information in a form that is:

\- structured

\- reusable

\- safe

\- clear

\- teachable

\- easy to expand later



\---



\## Main Ingestion Rule

Do not dump random information into the project.



Every new file should have:

\- a clear purpose

\- a clear domain

\- a consistent format

\- teachable content

\- safety awareness if relevant

\- room for later expansion



\---



\## Project Areas for Ingestion



\### 1. `knowledge/`

Use this for structured domain knowledge.



Examples:

\- anatomy

\- physiology

\- biology

\- psychology basics

\- communication concepts

\- educational frameworks



Knowledge files should contain:

\- definitions

\- concepts

\- organized sections

\- key facts

\- relationships between ideas

\- teaching notes when useful

\- safety boundaries if the domain needs them



Knowledge files should \*\*not\*\* be:

\- messy personal notes

\- mixed-topic brain dumps

\- unstructured copied text

\- vague fragments with no retrieval value



\---



\### 2. `training/qa\_pairs/`

Use this for direct question-answer examples.



Best uses:

\- basic fact training

\- misconception correction

\- short beginner explanations

\- common user questions

\- safe boundary examples



Each QA item should ideally include:

\- an ID

\- a clear question

\- a direct answer

\- tags if useful



Good QA answers are:

\- short

\- correct

\- clear

\- beginner-friendly unless intentionally advanced



\---



\### 3. `training/conversation\_examples/`

Use this for multi-turn behavior shaping.



Best uses:

\- teaching flow

\- emotional tone examples

\- clarification behavior

\- safe redirection

\- friendly explanation patterns



Conversation examples should show:

\- how Jessie starts

\- how Jessie clarifies

\- how Jessie handles confusion

\- how Jessie handles sensitive shifts

\- how Jessie offers deeper explanation



Good conversation examples are:

\- realistic

\- clear

\- natural

\- short enough to be reusable

\- focused on one lesson at a time



\---



\### 4. `training/style\_guides/`

Use this for identity and response behavior rules.



Best uses:

\- tone definition

\- emotional style

\- teaching pattern

\- formatting preferences

\- do/do-not guidance



Style guides should define:

\- how Jessie sounds

\- how Jessie explains

\- how Jessie reacts emotionally

\- how Jessie handles uncertainty

\- how Jessie stays consistent



\---



\### 5. `training/evaluation\_sets/`

Use this to test Jessie after adding knowledge or behavior files.



Evaluation sets should test:

\- factual accuracy

\- clarity

\- tone

\- teaching quality

\- safety boundaries



Every major domain should eventually have its own evaluation set.



\---



\## Ingestion Workflow

Recommended order for adding a new domain:



1\. Create the core knowledge file  

2\. Create matching QA pairs  

3\. Create a style or teaching guide if needed  

4\. Create conversation examples  

5\. Create an evaluation set  

6\. Review for clarity, safety, and overlap  



This creates a full package instead of isolated files.



\---



\## File Design Rules



\### Keep files modular

Prefer:

\- one strong file per topic



Avoid:

\- giant files covering many unrelated topics



\### Keep files readable

Prefer:

\- clear names

\- structured headings or fields

\- predictable formatting



\### Keep files expandable

Write files so they can later be:

\- split

\- merged

\- versioned

\- extended by subtopic



\---



\## Naming Conventions

Use names that clearly describe the content.



Good examples:

\- `jessie\_human\_body\_basics.yaml`

\- `human\_body\_basics\_qa.yaml`

\- `jessie\_teaching\_style.yaml`

\- `human\_body\_teaching\_examples.yaml`

\- `human\_body\_basics\_eval.yaml`



Good naming traits:

\- lowercase

\- underscores

\- domain-first or purpose-first consistency

\- no vague names like `stuff.yaml` or `notes2.yaml`



\---



\## Quality Standard for New Files

Before a file is accepted, check:



\- Is it clear?

\- Is it organized?

\- Is it useful for teaching or behavior shaping?

\- Is it safe for the domain?

\- Is it too repetitive with existing files?

\- Can it be expanded later?



If the answer to several of these is no, improve the file before keeping it.



\---



\## Safety Ingestion Notes

Some domains need extra caution.



Examples:

\- medicine

\- mental health

\- relationships involving abuse

\- legal issues

\- crisis situations

\- dangerous instructions



For sensitive domains:

\- include explicit safety boundaries

\- avoid overconfident wording

\- separate education from action advice

\- include escalation guidance when appropriate



Do not ingest risky material in a way that encourages unsafe behavior.



\---



\## Source Handling

When external information is used later, track the source quality.



Preferred future source types:

\- textbooks

\- trusted educational institutions

\- clinical guidance from reputable organizations

\- high-quality reference material

\- internally reviewed structured summaries



Avoid relying on:

\- random forum posts

\- unsourced social media claims

\- low-quality copied summaries

\- sensational or misleading material



\---



\## Expansion Strategy

As Jessie grows, each domain should eventually include:



\- core knowledge

\- beginner QA

\- intermediate QA

\- advanced QA if needed

\- conversation examples

\- evaluation tests

\- safety rules if relevant



This allows Jessie to gain both knowledge and behavior consistency together.



\---



\## Versioning Notes

When files improve significantly:

\- update the version

\- keep naming consistent

\- avoid replacing structure randomly

\- document major changes if needed later



Versioning matters because Jessie will become easier to maintain if changes are deliberate.



\---



\## Practical Rule of Thumb

If a file would confuse a future builder, rewrite it.



If a file cannot be quickly understood by:

\- a developer

\- a trainer

\- a reviewer



then it is probably not well-ingested yet.



\---



\## Final Ingestion Summary

Good ingestion means Jessie gains knowledge in a form that is:

\- clean

\- structured

\- teachable

\- testable

\- safe



The project should grow like a library, not like a junk drawer.



Each new topic should become a reusable package:

\- knowledge

\- training

\- style

\- examples

\- evaluation



That is the standard for building Jessie well.



