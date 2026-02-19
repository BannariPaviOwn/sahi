"use client";

import { useState } from "react";

const TOPIC_OPTIONS = [
  { value: "", label: "Select an area" },
  { value: "Individual Counselling & Psychotherapy", label: "Individual Counselling & Psychotherapy (Adults)" },
  { value: "Child & Adolescent Psychological Support", label: "Child & Adolescent Psychological Support" },
  { value: "Couple & Family Counselling", label: "Couple & Family Counselling" },
  { value: "Psychological Assessments", label: "Psychological Assessments" },
  { value: "Career Counselling & Academic Guidance", label: "Career Counselling & Academic Guidance" },
  { value: "Corporate Mental Health & Leadership", label: "Corporate Mental Health & Leadership Programs" },
  { value: "Online Therapy", label: "Online Therapy (Pan-India)" },
  { value: "Something else", label: "Something else" },
];

export default function ContactForm() {
  const [status, setStatus] = useState("");
  const [statusClass, setStatusClass] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");
    setStatusClass("");
    const form = e.target;
    const payload = {
      name: form.name.value,
      email: form.email.value,
      topic: form.topic.value,
      message: form.message.value,
    };
    if (!payload.name || !payload.email || !payload.message) {
      setStatus("Please fill in your name, email, and message.");
      setStatusClass("error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Something went wrong.");
      setStatus("Thank you for reaching out. We'll respond via email soon.");
      setStatusClass("success");
      form.reset();
    } catch {
      setStatus("We couldn't send your message. Please try again or email us directly.");
      setStatusClass("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Full name<span>*</span></label>
        <input type="text" id="name" name="name" placeholder="How should we address you?" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email address<span>*</span></label>
        <input type="email" id="email" name="email" placeholder="you@example.com" required />
      </div>
      <div className="field">
        <label htmlFor="topic">What would you like support with?</label>
        <select id="topic" name="topic">
          {TOPIC_OPTIONS.map((o) => (
            <option key={o.value || "empty"} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">Tell us a little about what you&apos;re going through<span>*</span></label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Share only what feels okay right now. This helps us understand how to support you best."
          required
        />
      </div>
      <p className="form-note">Your message is confidential. We will respond within one business day.</p>
      <button type="submit" className={`btn primary full-width ${loading ? "loading" : ""}`} disabled={loading}>
        Begin a Conversation
        <span className="btn-spinner" aria-hidden="true" />
      </button>
      <p id="form-status" className={`form-status ${statusClass}`} role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
