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

  //   const checkRequired = () => {
  //   if (userInput.email && userInput.message && userInput.name)
  //     setError((p) => ({ ...p, required: false }));
  // };

  // const handleSendMail = async (e) => {
  //   e.preventDefault();
  //   if (!userInput.email || !userInput.message || !userInput.name) {
  //     setError((p) => ({ ...p, required: true })); return;
  //   } else if (error.email) { return; }
  //   else { setError((p) => ({ ...p, required: false })); }
  //   try {
  //     setIsLoading(true);
  //     await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/contact`, userInput);
  //     toast.success("Message sent successfully!");
  //     setUserInput({ name: "", email: "", message: "" });
  //   } catch (err) {
  //     toast.error(err?.response?.data?.message);
  //   } finally { setIsLoading(false); }
  // };

  const inputClass = `
    w-full px-4 py-2.5 rounded-xl
    bg-white/4 border border-indigo-500/18
    text-slate-100 text-sm placeholder:text-white/20
    focus:outline-none focus:border-indigo-400/50 focus:bg-indigo-500/5
    transition-all duration-300
  `;

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="h-px w-5 bg-indigo-500/50" />
        <span className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-indigo-400/70">
          Get in touch
        </span>
        <span className="h-px w-5 bg-indigo-500/50" />
      </div>
      <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-100 tracking-tight mb-6">
        Contact Me
      </h2>

      <div
        className="relative rounded-2xl overflow-hidden
        bg-white/[0.025] border border-indigo-500/15 backdrop-blur-xl
        p-5 lg:p-7
        shadow-[0_0_40px_rgba(99,102,241,0.05),inset_0_1px_0_rgba(255,255,255,0.03)]"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/35 to-transparent" />
        <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-indigo-400/18 rounded-tl-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-indigo-400/10 rounded-br-2xl pointer-events-none" />

        <p className="text-xs text-white/35 leading-relaxed mb-6">
          {
            "Have a question or want to work together? Don't hesitate to reach out."
          }
        </p>

        {/* formRef is attached here so EmailJS can read input name attributes */}
        <form
          ref={formRef}
          onSubmit={handleSendMail}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.7rem] font-semibold tracking-widest uppercase text-white/40">
              Your Name
            </label>
            <input
              className={inputClass}
              type="text"
              name="user_name" // EmailJS template variable
              maxLength={100}
              placeholder="John Doe"
              value={userInput.name}
              onChange={(e) =>
                setUserInput({ ...userInput, name: e.target.value })
              }
              onBlur={checkRequired}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[0.7rem] font-semibold tracking-widest uppercase text-white/40">
              Your Email
            </label>
            <input
              className={inputClass}
              type="email"
              name="user_email" // EmailJS template variable
              maxLength={100}
              placeholder="john@example.com"
              value={userInput.email}
              onChange={(e) =>
                setUserInput({ ...userInput, email: e.target.value })
              }
              onBlur={() => {
                checkRequired();
                setError((p) => ({
                  ...p,
                  email: !isValidEmail(userInput.email),
                }));
              }}
            />
            {error.email && (
              <p className="text-[0.7rem] text-red-400 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-red-400" />
                Please provide a valid email
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[0.7rem] font-semibold tracking-widests uppercase text-white/40">
              Your Message
            </label>
            <textarea
              className={inputClass}
              name="user_message" // EmailJS template variable
              maxLength={500}
              placeholder="Tell me about your project..."
              rows={4}
              value={userInput.message}
              onChange={(e) =>
                setUserInput({ ...userInput, message: e.target.value })
              }
              onBlur={checkRequired}
            />
          </div>

          <div className="flex flex-col items-center gap-3 pt-1">
            {error.required && (
              <p className="text-[0.7rem] text-red-400 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-red-400" />
                All fields are required
              </p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 hover:gap-3
                rounded-xl px-6 py-3
                bg-indigo-600 hover:bg-indigo-500
                text-[0.72rem] font-bold tracking-widest uppercase text-white
                hover:shadow-[0_8px_24px_rgba(79,70,229,0.35)]
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-250"
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message <TbMailForward size={15} />
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
