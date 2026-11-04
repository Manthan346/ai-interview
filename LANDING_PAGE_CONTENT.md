# AI Interview Product Overview

This document captures the current projects, features, and positioning we can use to build a strong landing page for our AI interview platform.

## 1) Current Projects

### Project 1: AI Interview App
Type: Next.js frontend application

This is the main user-facing product where recruiters, hiring managers, and candidates interact with the interview workflow.

Core areas:
- Authentication and onboarding
- Interview scheduling and preparation
- Candidate dashboard and past interviews
- Real-time live interview experience
- AI-generated evaluation and reporting

Key screens and capabilities:
- Sign-up and email verification flow
- OTP-based login and account validation
- Interview preparation form to capture role, experience, and question count
- Dashboard for scheduling and managing interviews
- Interview candidate list with pagination
- Interview evaluation page with score summaries and reports
- Question-by-question expected-answer review
- Reusable UI system with Tailwind + shadcn components
- Theme support and modern responsive layout

### Project 2: WebSocket Server
Type: Node.js + Express + Socket.io backend

This powers the live interview engine and AI orchestration.

Core areas:
- Real-time interview sessions
- AI voice processing
- Candidate answer evaluation
- JWT auth and protected routes
- Database-backed session and interview management

Key capabilities:
- WebSocket live interview communication
- Deepgram-based speech-to-text transcription
- ElevenLabs-based text-to-speech responses
- LLM-driven interviewer prompts and follow-up logic
- Interview creation and retrieval APIs
- Authentication and refresh-token handling
- Email OTP sending and verification
- Prisma + PostgreSQL persistence

## 2) Product Summary

Our platform is an AI-powered interview system designed to help companies run faster, smarter, and more consistent technical interviews.

It combines:
- live voice-based interviewing
- structured hiring workflows
- instant AI scoring and summary
- recruiter dashboards for review and decision-making

## 3) Features We Already Have

### Candidate & Hiring Experience
- AI voice-based interview sessions
- Theory-only technical interviews focused on concepts, reasoning, and communication
- One-question-at-a-time conversational flow
- Follow-up questioning when a candidate answer is vague or incomplete
- Session creation based on role, experience, and interview length
- Interview history and management

### Assessment & Evaluation
- AI-generated interview summary
- Strengths and weaknesses analysis
- Per-question expected answer references
- Interview score generation
- Overall performance evaluation
- Candidate reports for recruiters

### Platform & Workflow Features
- User sign-up and OTP verification
- Secure access using JWT and refresh-token flow
- Interview options API for configurable sessions
- Interview detail fetching and question retrieval
- Pagination for multiple interviews
- Modern dashboards and reusable UI components
- Theme support for better user experience

### Technical Infrastructure
- Real-time communication with Socket.io
- Speech recognition using Deepgram
- Text-to-speech using ElevenLabs
- LLM-powered interviewer behavior with prompt engineering
- PostgreSQL persistence with Prisma ORM
- Express REST API architecture
- Next.js frontend with strong app-level structure

## 4) Landing Page Feature Sections

### Hero headline ideas
- AI-powered interviews that feel like a real technical conversation
- Hire better talent with faster, smarter AI interviews
- Screen candidates at scale without losing the human touch

### Key value propositions
- Faster hiring cycles
- Consistent candidate assessment
- Reduced interviewer workload
- Better technical evaluation quality
- Scalable interview operations

### Feature blocks for landing page
1. Live AI Interviewing
   - Real-time voice-based interviews
   - Conversational AI interviewer
   - Adaptive follow-up questions

2. Smart Candidate Evaluation
   - Automatic scoring
   - Question-level insights
   - Summary of strengths and areas to improve

3. Recruiter Dashboard
   - Track all interview sessions
   - Review interview reports and outcomes
   - Manage candidate workflows from one place

4. Built for Technical Hiring
   - Role-based interview customization
   - Experience-aware question difficulty
   - Concept and reasoning-focused assessment

5. Secure & Scalable Platform
   - Authenticated workflows
   - Database-backed interview records
   - Real-time processing infrastructure

## 5) Suggested Landing Page Copy

### Hero section
AI interviews for modern hiring.

Run structured technical interviews with voice-based AI that evaluates real candidate thinking, communication, and problem-solving ability.

CTA buttons:
- Book a demo
- Start free trial
- Explore platform

### Benefits section
Why teams choose our platform:
- Cut interview time without compromising quality
- Standardize technical evaluations across hiring teams
- Reduce manual screening burden for recruiters
- Gain structured reports that support better hiring decisions

### Use cases
- Tech recruitment teams
- Startup hiring pipelines
- Internal engineering assessment
- Candidate screening before final panel interviews

## 6) Suggested Metrics / Trust Signals

These can be included on the landing page if we want stronger conversion:
- 80% faster screening
- AI-driven interview consistency across candidates
- Evaluations across multiple roles and experience levels
- Real-time interview completion workflow
- Recruiter-ready reports

## 7) Recommended Landing Page Structure

1. Hero section
2. Product value proposition
3. How it works
4. Features grid
5. Use cases / audience
6. Benefits and outcomes
7. Testimonials or case studies
8. CTA section

## 8) Short Product Positioning Statement

We build AI-powered interview experiences that help companies evaluate candidates faster, more consistently, and with more insight than traditional screening methods.

## 9) Quick Pitch for Marketing

Our platform combines AI voice interviewing, structured assessments, and intelligent scoring to reduce hiring friction while improving decision quality for technical teams.

## 10) Best Messaging Angle

The strongest message for landing page positioning is:

"AI interviews that assess candidate thinking, communication, and technical readiness in real time."

This is the clearest value proposition because it combines the platform's most distinctive capabilities:
- realistic voice conversations
- technical evaluation
- recruiter-friendly reporting
- scalable hiring workflow
