"use client";

import { AlertCircle, CheckCircle2, Loader2, Lock, Send } from "lucide-react";
import { useRef, useState } from "react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type FieldName = "name" | "email" | "subject" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateField(field: FieldName, value: string) {
  const trimmed = value.trim();
  if (field === "name") {
    if (trimmed.length < 2) return "Please enter your name.";
    if (trimmed.length > 80) return "Please keep your name under 80 characters.";
  }
  if (field === "email") {
    if (!trimmed) return "Please enter your email address.";
    if (!EMAIL_PATTERN.test(trimmed)) return "That email address doesn't look right.";
  }
  if (field === "subject") {
    if (trimmed.length < 3) return "Please add a subject of at least 3 characters.";
    if (trimmed.length > 120) return "Please keep the subject under 120 characters.";
  }
  if (field === "message") {
    if (trimmed.length < 10) return "Please write at least 10 characters.";
    if (trimmed.length > 2000) return "Please keep the message under 2,000 characters.";
  }
  return "";
}

export function ContactForm() {
  const [values, setValues] = useState<Record<FieldName, string>>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [banner, setBanner] = useState<{ message: string; delivered?: boolean } | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const update = (field: FieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const onBlur = (field: FieldName) => {
    if (!values[field].trim()) return;
    const error = validateField(field, values[field]);
    setErrors((current) => ({ ...current, [field]: error || undefined }));
  };

  const focusField = (field: FieldName) => {
    window.setTimeout(() => {
      const element = document.getElementById(`contact-${field}`);
      element?.focus();
    }, 40);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FieldErrors = {};
    (Object.keys(values) as FieldName[]).forEach((field) => {
      const error = validateField(field, values[field]);
      if (error) nextErrors[field] = error;
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      setBanner({ message: "Please check the highlighted fields." });
      const firstField = Object.keys(nextErrors)[0] as FieldName;
      focusField(firstField);
      return;
    }

    setStatus("sending");
    setBanner(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: honeypotRef.current?.value ?? "",
        }),
      });

      const data = (await response.json()) as {
        ok: boolean;
        delivered: boolean;
        message: string;
        errors?: FieldErrors;
      };

      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setStatus("error");
        setBanner({ message: data.message || "Your message could not be sent. Please try again." });
        const firstField = data.errors ? (Object.keys(data.errors)[0] as FieldName) : null;
        if (firstField) focusField(firstField);
        return;
      }

      setStatus("success");
      setBanner({ message: data.message, delivered: data.delivered });
      setErrors({});
      setValues({ name: "", email: "", subject: "", message: "" });
      if (honeypotRef.current) honeypotRef.current.value = "";
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch {
      setStatus("error");
      setBanner({
        message: "The network request failed. Please check your connection or use the direct email link.",
      });
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-label="Contact form"
      className="card-surface rounded-3xl"
    >
      <div className="relative z-[3] p-5 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-[1.05rem] font-medium text-frost">Send a message</h3>
            <p className="mt-1 text-[0.72rem] text-mist">All fields are required.</p>
          </div>
          <span className="hidden items-center gap-1.5 font-mono text-[0.48rem] uppercase tracking-[0.16em] text-mist sm:flex">
            <Lock className="h-3 w-3" aria-hidden="true" />
            Server validated
          </span>
        </div>

        {banner ? (
          <div
            role={status === "success" ? "status" : "alert"}
            className={cn(
              "mt-5 flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-[0.78rem] leading-relaxed",
              status === "success"
                ? "status-success"
                : "status-error",
            )}
          >
            {status === "success" ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
            ) : (
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
            )}
            <div>
              <p>{banner.message}</p>
              {status === "success" && banner.delivered === false ? (
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-1.5 inline-block font-medium text-frost underline decoration-cyan-glow/50 underline-offset-4 hover:text-cyan-glow"
                >
                  Email {profile.email} directly
                </a>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="mb-1.5 block text-[0.72rem] font-medium text-frost">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(event) => update("name", event.target.value)}
              onBlur={() => onBlur("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              placeholder="Your name"
              className="field"
              required
            />
            {errors.name ? (
              <p id="contact-name-error" className="mt-1.5 flex items-center gap-1 text-[0.68rem] text-danger">
                <AlertCircle className="h-3 w-3" aria-hidden="true" />
                {errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="contact-email" className="mb-1.5 block text-[0.72rem] font-medium text-frost">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={values.email}
              onChange={(event) => update("email", event.target.value)}
              onBlur={() => onBlur("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              placeholder="you@company.com"
              className="field"
              required
            />
            {errors.email ? (
              <p id="contact-email-error" className="mt-1.5 flex items-center gap-1 text-[0.68rem] text-danger">
                <AlertCircle className="h-3 w-3" aria-hidden="true" />
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="contact-subject" className="mb-1.5 block text-[0.72rem] font-medium text-frost">
              Subject
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={values.subject}
              onChange={(event) => update("subject", event.target.value)}
              onBlur={() => onBlur("subject")}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? "contact-subject-error" : undefined}
              placeholder="A product, a collaboration, a question…"
              className="field"
              required
            />
            {errors.subject ? (
              <p id="contact-subject-error" className="mt-1.5 flex items-center gap-1 text-[0.68rem] text-danger">
                <AlertCircle className="h-3 w-3" aria-hidden="true" />
                {errors.subject}
              </p>
            ) : null}
          </div>

          <div className="sm:col-span-2">
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <label htmlFor="contact-message" className="block text-[0.72rem] font-medium text-frost">
                Message
              </label>
              <span
                id="contact-message-count"
                className={cn(
                  "font-mono text-[0.52rem] tabular-nums",
                  values.message.length > 2000 ? "text-danger" : "text-mist",
                )}
              >
                {values.message.length} / 2000
              </span>
            </div>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={values.message}
              onChange={(event) => update("message", event.target.value)}
              onBlur={() => onBlur("message")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? "contact-message-error contact-message-count" : "contact-message-count"
              }
              placeholder="What are you building? What's the constraint? What does success look like?"
              className="field min-h-[132px] resize-y"
              required
            />
            {errors.message ? (
              <p id="contact-message-error" className="mt-1.5 flex items-center gap-1 text-[0.68rem] text-danger">
                <AlertCircle className="h-3 w-3" aria-hidden="true" />
                {errors.message}
              </p>
            ) : null}
          </div>
        </div>

        {/* Honeypot — hidden from people, tempting for bots */}
        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="contact-website">Leave this field empty</label>
          <input ref={honeypotRef} id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={status === "sending"}
            aria-busy={status === "sending"}
            className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-75 sm:w-auto"
          >
            {status === "sending" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                Send message
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
              </>
            )}
          </button>
          <p className="text-[0.66rem] text-mist">
            Your details are only used to reply. No lists, no tracking.
          </p>
        </div>
      </div>
    </form>
  );
}
