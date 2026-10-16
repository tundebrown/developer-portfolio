"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const formRef = useRef(null);

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name)
      setError((p) => ({ ...p, required: false }));
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    if (!userInput.email || !userInput.message || !userInput.name) {
      setError((p) => ({ ...p, required: true }));
      return;
    } else if (error.email) {
      return;
    } else {
      setError((p) => ({ ...p, required: false }));
    }

    try {
      setIsLoading(true);
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      );
      toast.success("Message sent successfully!");
      setUserInput({ name: "", email: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = `
    w-full rounded-[var(--r-md)] px-4 py-3 neu-inset
    text-fg text-[0.95rem] placeholder:text-fg-subtle
    outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]
    aria-[invalid=true]:border-danger
    transition-[border-color] duration-150
  `;
  const labelClass = "text-sm font-medium text-fg";

  return (
    <div>
      <p className="eyebrow mb-3 flex items-center gap-2">
        <span className="h-px w-6 bg-accent/60" aria-hidden="true" />
        Get in touch
      </p>
      <h2 id="contact-heading" className="mb-3 text-3xl font-extrabold tracking-tight text-fg lg:text-4xl">
        Let&apos;s work together
      </h2>
      <p className="mb-6 max-w-md text-[0.95rem] leading-relaxed text-fg-muted">
        Hiring for a frontend, full-stack, Web3 or backend role, or need a product built and deployed? Send me a message.
      </p>

      <div className="surface-card p-5 sm:p-7">
        {/* formRef is attached here so EmailJS can read input name attributes */}
        <form ref={formRef} onSubmit={handleSendMail} noValidate className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className={labelClass}>Your name</label>
            <input
              id="contact-name"
              className={inputClass}
              type="text"
              name="user_name" // EmailJS template variable
              autoComplete="name"
              maxLength={100}
              placeholder="Jane Doe"
              aria-invalid={error.required && !userInput.name}
              value={userInput.name}
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              onBlur={checkRequired}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className={labelClass}>Your email</label>
            <input
              id="contact-email"
              className={inputClass}
              type="email"
              name="user_email" // EmailJS template variable
              autoComplete="email"
              maxLength={100}
              placeholder="jane@company.com"
              aria-invalid={error.email || (error.required && !userInput.email)}
              aria-describedby={error.email ? "contact-email-error" : undefined}
              value={userInput.email}
              onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
              onBlur={() => {
                checkRequired();
                setError((p) => ({ ...p, email: !isValidEmail(userInput.email) }));
              }}
            />
            {error.email && (
              <p id="contact-email-error" className="text-sm text-danger">
                Please enter a valid email address.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-message" className={labelClass}>Your message</label>
            <textarea
              id="contact-message"
              className={inputClass}
              name="user_message" // EmailJS template variable
              maxLength={500}
              placeholder="Tell me about the role or project…"
              rows={5}
              aria-invalid={error.required && !userInput.message}
              value={userInput.message}
              onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
              onBlur={checkRequired}
            />
          </div>

          <div className="flex flex-col gap-3 pt-1">
            {error.required && (
              <p role="alert" className="text-sm text-danger">
                All fields are required.
              </p>
            )}
            <button type="submit" disabled={isLoading} className="btn btn-primary w-full">
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-on-accent/30 border-t-on-accent" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  Send message <TbMailForward size={16} aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
