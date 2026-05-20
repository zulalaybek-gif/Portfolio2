import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, Send } from "lucide-react";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "./theme";

type FormStep = "name" | "email" | "message" | "review" | "sending" | "success";
type FormData = { name: string; email: string; message: string };

const questionSteps: Array<Exclude<FormStep, "review" | "sending" | "success">> = ["name", "email", "message"];

const questions = {
  name: {
    label: "Comment vous appelez-vous ?",
    placeholder: "Marie Dupont",
  },
  email: {
    label: "Votre email ?",
    placeholder: "hello@example.com",
  },
  message: {
    label: "Parlez-moi de votre projet...",
    placeholder: "Je cherche à créer une identité visuelle pour...",
  },
} as const;

function rgbaFromHex(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const value = parseInt(clean, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

export function ContactPage() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [step, setStep] = useState<FormStep>("name");
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: typeof window === "undefined" ? 0 : window.innerWidth / 2, y: typeof window === "undefined" ? 0 : window.innerHeight / 2 });
  const cursorPosRef = useRef({ x: mouseRef.current.x, y: mouseRef.current.y });

  const isReview = step === "review";
  const activeIndex = questionSteps.includes(step as (typeof questionSteps)[number])
    ? questionSteps.indexOf(step as (typeof questionSteps)[number])
    : 2;
  const activeStep = questionSteps[activeIndex];
  const value = isReview ? "review" : activeStep ? formData[activeStep] : "";
  const canContinue = isReview || value.trim().length > 0;
  const isLastQuestion = activeStep === "message";
  const bg = isDark ? "#1c1e1b" : "#EAEAEA";
  const text = isDark ? "#F1F1F1" : "#232624";
  const accent = isDark ? "#DFF440" : "#4B8197";
  const textSoft = rgbaFromHex(text, 0.6);
  const textBright = rgbaFromHex(text, 0.85);

  useEffect(() => {
    if (step === "review" || step === "sending" || step === "success") return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 600);
    return () => window.clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let frame = 0;
    const tick = () => {
      const current = cursorPosRef.current;
      current.x += (mouseRef.current.x - current.x) * 0.15;
      current.y += (mouseRef.current.y - current.y) * 0.15;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const goNext = useCallback(() => {
    if (!canContinue || step === "sending" || step === "success") return;
    setIsFocused(false);

    if (step === "review") {
      setStep("sending");
      window.setTimeout(() => setStep("success"), 2000);
      return;
    }

    if (!isLastQuestion) {
      setStep(questionSteps[activeIndex + 1]);
      return;
    }

    setStep("review");
  }, [activeIndex, canContinue, isLastQuestion, step]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || activeStep === "message") return;
    event.preventDefault();
    goNext();
  };

  const handleBackStep = () => {
    if (step === "success" || step === "sending") {
      setStep("review");
      return;
    }
    if (step === "review") {
      setStep("message");
      return;
    }
    if (activeIndex > 0) {
      setStep(questionSteps[activeIndex - 1]);
      return;
    }
    navigate("/");
  };

  const progress = isReview ? 100 : ((activeIndex + 1) / questionSteps.length) * 100;

  return (
    <section
      className="fixed inset-0 z-[100] flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
      style={{
        ["--bg" as string]: bg,
        ["--text" as string]: text,
        ["--accent" as string]: accent,
        ["--text-bright" as string]: textBright,
        background: bg,
        color: text,
      }}
    >
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
        <filter id="contact-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
        </filter>
      </svg>
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-overlay" style={{ filter: "url(#contact-grain)" }} />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-20%] h-[50%] w-[60%] -translate-x-1/2"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${rgbaFromHex(accent, isDark ? 0.06 : 0.045)}, transparent 70%)`,
          filter: "blur(100px)",
        }}
      />
      <div
        ref={cursorRef}
        className="pointer-events-none absolute left-0 top-0 z-0 h-[400px] w-[400px]"
        style={{
          background: `radial-gradient(circle, ${rgbaFromHex(accent, isDark ? 0.08 : 0.055)}, transparent 70%)`,
          filter: "blur(60px)",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.3) 100%)" }}
      />

      <motion.button
        type="button"
        onClick={handleBackStep}
        className="absolute left-6 top-6 z-20 inline-flex items-center gap-3 rounded-full px-4 py-3 md:left-10 md:top-10"
        animate={{ x: [-4, 0, -4] }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          border: `1px solid ${rgbaFromHex(text, 0.12)}`,
          color: textSoft,
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.8rem",
          opacity: 0.6,
        }}
      >
        <ArrowLeft size={16} />
        Retour
      </motion.button>

      <div className="relative z-10 w-full max-w-3xl">
        <AnimatePresence mode="wait">
          {step === "success" ? (
            <SuccessState key="success" text={text} accent={accent} onHome={() => navigate("/")} />
          ) : step === "sending" ? (
            <motion.div
              key="sending"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex min-h-[420px] flex-col items-center justify-center text-center"
            >
              <motion.div
                className="mb-8 h-12 w-12 rounded-full border border-current border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ color: accent }}
              />
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Envoi en cours
              </p>
            </motion.div>
          ) : step === "review" ? (
            <ReviewState
              key="review"
              formData={formData}
              text={text}
              accent={accent}
              onEdit={setStep}
              onSubmit={goNext}
            />
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProgressIndicator current={activeIndex + 1} progress={progress} text={text} accent={accent} />

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mb-16"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(2.35rem, 6vw, 5rem)",
                  fontWeight: 700,
                  lineHeight: 0.95,
                  letterSpacing: "-0.05em",
                }}
              >
                {questions[activeStep].label}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                {activeStep === "message" ? (
                  <textarea
                    ref={(node) => {
                      inputRef.current = node;
                    }}
                    rows={4}
                    value={formData.message}
                    placeholder={questions.message.placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={handleKeyDown}
                    onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                    className="w-full resize-none border-none bg-transparent outline-none"
                    style={inputStyle(textBright)}
                  />
                ) : (
                  <input
                    ref={(node) => {
                      inputRef.current = node;
                    }}
                    type={activeStep === "email" ? "email" : "text"}
                    value={formData[activeStep]}
                    placeholder={questions[activeStep].placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={handleKeyDown}
                    onChange={(event) => setFormData((current) => ({ ...current, [activeStep]: event.target.value }))}
                    className="w-full border-none bg-transparent outline-none"
                    style={inputStyle(textBright)}
                  />
                )}
                <div className="mt-4 h-px w-full overflow-hidden" style={{ background: rgbaFromHex(text, 0.08) }}>
                  <div
                    className="h-full"
                    style={{
                      background: `linear-gradient(90deg, ${accent}, ${rgbaFromHex(accent, 0.5)})`,
                      transform: `scaleX(${isFocused ? 1 : value ? 0.3 : 0})`,
                      transformOrigin: "left",
                      transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />
                </div>
              </motion.div>

              <motion.button
                type="button"
                onClick={goNext}
                disabled={!canContinue}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: canContinue ? 1 : 0.3, y: 0 }}
                whileHover={canContinue ? { scale: 1.05, borderColor: accent } : undefined}
                whileTap={canContinue ? { scale: 0.95 } : undefined}
                transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-16 inline-flex items-center gap-3 rounded-full px-8 py-4"
                style={{
                  border: `1px solid ${rgbaFromHex(text, 0.15)}`,
                  color: textSoft,
                  cursor: canContinue ? "pointer" : "default",
                  pointerEvents: canContinue ? "auto" : "none",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {isLastQuestion ? "Relire" : "Continuer"}
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProgressIndicator({ current, progress, text, accent }: { current: number; progress: number; text: string; accent: string }) {
  return (
    <div className="mb-12">
      <p
        className="mb-4 uppercase"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "0.75rem",
          letterSpacing: "0.15em",
          color: rgbaFromHex(text, 0.48),
        }}
      >
        ÉTAPE {current} / 3
      </p>
      <div className="h-px w-full overflow-hidden" style={{ background: rgbaFromHex(text, 0.08) }}>
        <div
          className="h-full"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${accent}, ${rgbaFromHex(accent, 0.3)})`,
            transition: "width 0.6s ease",
          }}
        />
      </div>
    </div>
  );
}

function ReviewState({
  formData,
  text,
  accent,
  onEdit,
  onSubmit,
}: {
  formData: FormData;
  text: string;
  accent: string;
  onEdit: (step: "name" | "email" | "message") => void;
  onSubmit: () => void;
}) {
  const reviewItems: Array<{ key: "name" | "email" | "message"; label: string; value: string }> = [
    { key: "name", label: "Nom", value: formData.name },
    { key: "email", label: "Email", value: formData.email },
    { key: "message", label: "Message", value: formData.message },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <ProgressIndicator current={3} progress={100} text={text} accent={accent} />

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(2.1rem, 5vw, 4.4rem)",
          fontWeight: 700,
          lineHeight: 0.98,
          letterSpacing: "-0.045em",
          color: text,
        }}
      >
        Relisez votre message.
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4"
      >
        {reviewItems.map((item) => (
          <div
            key={item.key}
            className="rounded-[1.5rem] px-5 py-4 md:px-6"
            style={{
              border: `1px solid ${rgbaFromHex(text, 0.1)}`,
              background: rgbaFromHex(text, 0.035),
            }}
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: rgbaFromHex(text, 0.45),
                }}
              >
                {item.label}
              </p>
              <button
                type="button"
                onClick={() => onEdit(item.key)}
                className="rounded-full px-3 py-1"
                style={{
                  border: `1px solid ${rgbaFromHex(text, 0.12)}`,
                  color: rgbaFromHex(text, 0.58),
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                }}
              >
                Modifier
              </button>
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: item.key === "message" ? "clamp(1rem, 2vw, 1.25rem)" : "clamp(1.15rem, 2.4vw, 1.55rem)",
                fontWeight: 300,
                lineHeight: item.key === "message" ? 1.75 : 1.35,
                color: rgbaFromHex(text, 0.82),
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
              }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </motion.div>

      <motion.button
        type="button"
        onClick={onSubmit}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, borderColor: accent }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 inline-flex items-center gap-3 rounded-full px-8 py-4"
        style={{
          border: `1px solid ${rgbaFromHex(text, 0.15)}`,
          color: rgbaFromHex(text, 0.66),
          cursor: "pointer",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "1rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Envoyer
        <Send size={18} />
      </motion.button>
    </motion.div>
  );
}

function SuccessState({ text, accent, onHome }: { text: string; accent: string; onHome: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex min-h-[520px] flex-col items-center justify-center text-center"
    >
      <div className="relative mb-10">
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ scale: [1, 1.5], opacity: [1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
          style={{ border: `1px solid ${accent}` }}
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.2 }}
        >
          <CheckCircle2 size={64} color={accent} strokeWidth={1.7} />
        </motion.div>
      </div>
      <h1
        className="mb-5"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: text,
        }}
      >
        Message envoyé.
      </h1>
      <p
        className="mx-auto max-w-xl"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1.1rem",
          lineHeight: 1.8,
          color: rgbaFromHex(text, 0.62),
        }}
      >
        Je reviens vers vous très bientôt. Merci pour votre confiance.
      </p>
      <motion.button
        type="button"
        onClick={onHome}
        whileHover={{ scale: 1.05, borderColor: accent }}
        whileTap={{ scale: 0.95 }}
        className="mt-12 inline-flex items-center gap-3 rounded-full px-8 py-4"
        style={{
          border: `1px solid ${rgbaFromHex(text, 0.15)}`,
          color: rgbaFromHex(text, 0.6),
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "1rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Retour à l'accueil
        <ArrowRight size={18} />
      </motion.button>
    </motion.div>
  );
}

function inputStyle(color: string) {
  return {
    fontFamily: "'Inter', sans-serif",
    fontSize: "clamp(1.25rem, 3vw, 2rem)",
    fontWeight: 300,
    color,
    lineHeight: 1.45,
  };
}
