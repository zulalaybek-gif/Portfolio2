import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, Send } from "lucide-react";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "./theme";
import { AmbientMovingLines } from "./AmbientMovingLines";
import { useI18n } from "./i18n";

type FormStep = "name" | "email" | "message" | "review" | "sending" | "success";
type FormData = { name: string; email: string; message: string };

const questionSteps: Array<Exclude<FormStep, "review" | "sending" | "success">> = ["name", "email", "message"];
const MIN_MESSAGE_LENGTH = 40;

const questions = {
  name: {
    label: "Comment vous appelez-vous ?",
    placeholder: "Marie Dupont",
  },
  email: {
    label: "Où puis-je vous répondre ?",
    placeholder: "hello@example.com",
  },
  message: {
    label: "Racontez ce que vous avez en tête.",
    placeholder: "Une idée, un besoin, un début de brief...",
  },
} as const;

const contactCopy = {
  fr: {
    questions,
    back: "Retour",
    sending: "Votre message est en route",
    next: "Continuer",
    reviewButton: "Relire",
    validationEmail: "Une adresse email valide permettra de vous répondre.",
    validationRemaining: (count: number) => `${count} caractères encore, histoire d'avoir de quoi travailler ensemble.`,
    stepLabel: "ÉTAPE",
    reviewTitle: "Dernière vérification.",
    reviewLabels: {
      name: "Nom",
      email: "Email",
      message: "Message",
    },
    edit: "Ajuster",
    submit: "Envoyer",
    successTitle: "Message bien reçu.",
    successDesc: "Merci, tout est bien arrivé. On prend le temps de lire ça avec attention, puis on revient vers vous vite, promis, pas dans trois saisons.",
    home: "Retour à l'accueil",
  },
  en: {
    questions: {
      name: {
        label: "What should we call you?",
        placeholder: "Marie Dupont",
      },
      email: {
        label: "Where can we reply?",
        placeholder: "hello@example.com",
      },
      message: {
        label: "Tell us what you have in mind.",
        placeholder: "An idea, a need, the start of a brief...",
      },
    },
    back: "Back",
    sending: "Sending your message",
    next: "Continue",
    reviewButton: "Review",
    validationEmail: "A valid email address will let us reply.",
    validationRemaining: (count: number) => `${count} more characters, so we have something to work with together.`,
    stepLabel: "STEP",
    reviewTitle: "One last look.",
    reviewLabels: {
      name: "Name",
      email: "Email",
      message: "Message",
    },
    edit: "Adjust",
    submit: "Send",
    successTitle: "Message received.",
    successDesc: "Thank you, everything arrived safely. We will read it properly and get back to you soon, promise, not in three seasons.",
    home: "Back home",
  },
} as const;

type ContactCopy = {
  questions: Record<"name" | "email" | "message", { label: string; placeholder: string }>;
  back: string;
  sending: string;
  next: string;
  reviewButton: string;
  validationEmail: string;
  validationRemaining: (count: number) => string;
  stepLabel: string;
  reviewTitle: string;
  reviewLabels: Record<"name" | "email" | "message", string>;
  edit: string;
  submit: string;
  successTitle: string;
  successDesc: string;
  home: string;
};

function rgbaFromHex(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const value = parseInt(clean, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function ContactPage() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { lang } = useI18n();
  const copy = contactCopy[lang];
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
  const canContinue =
    isReview ||
    (activeStep === "email"
      ? isValidEmail(formData.email)
      : activeStep === "message"
        ? formData.message.trim().length >= MIN_MESSAGE_LENGTH
        : value.trim().length > 0);
  const isLastQuestion = activeStep === "message";
  const validationHint =
    activeStep === "email" && formData.email.trim().length > 0 && !isValidEmail(formData.email)
      ? copy.validationEmail
      : activeStep === "message" && formData.message.trim().length > 0 && formData.message.trim().length < MIN_MESSAGE_LENGTH
        ? copy.validationRemaining(MIN_MESSAGE_LENGTH - formData.message.trim().length)
        : "";
  const bg = isDark ? "#050B14" : "#E9EDF3";
  const text = isDark ? "#F4F5F7" : "#0D1B2A";
  const accent = isDark ? "#7FD6FF" : "#5DA9FF";
  const successBackground =
    !isDark && step === "success"
      ? `radial-gradient(circle at 18% 18%, ${rgbaFromHex("#5DA9FF", 0.22)}, transparent 34%),
         radial-gradient(circle at 82% 22%, ${rgbaFromHex("#7B2D52", 0.18)}, transparent 30%),
         radial-gradient(circle at 72% 82%, ${rgbaFromHex("#D8C7D1", 0.24)}, transparent 34%),
         linear-gradient(135deg, #F4F5F7 0%, #E9EDF3 52%, #F4F5F7 100%)`
      : bg;
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
        background: successBackground,
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
      {step === "success" ? <SuccessAtmosphere text={text} accent={accent} isDark={isDark} /> : null}

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
        {copy.back}
      </motion.button>

      <div className="relative z-10 w-full max-w-3xl">
        <AnimatePresence mode="wait">
          {step === "success" ? (
            <SuccessState key="success" text={text} accent={accent} isDark={isDark} copy={copy} onHome={() => navigate("/")} />
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
                {copy.sending}
              </p>
            </motion.div>
          ) : step === "review" ? (
            <ReviewState
              key="review"
              formData={formData}
              text={text}
              accent={accent}
              copy={copy}
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
              <ProgressIndicator current={activeIndex + 1} progress={progress} text={text} accent={accent} label={copy.stepLabel} />

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
                {copy.questions[activeStep].label}
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
                    placeholder={copy.questions.message.placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={handleKeyDown}
                    onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                    aria-invalid={activeStep === "message" && formData.message.trim().length > 0 && !canContinue}
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
                    placeholder={copy.questions[activeStep].placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={handleKeyDown}
                    onChange={(event) => setFormData((current) => ({ ...current, [activeStep]: event.target.value }))}
                    aria-invalid={activeStep === "email" && formData.email.trim().length > 0 && !canContinue}
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
                <motion.p
                  initial={false}
                  animate={{ opacity: validationHint ? 1 : 0, y: validationHint ? 0 : -4 }}
                  className="mt-4 min-h-[1.4rem]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.78rem",
                    lineHeight: 1.5,
                    color: rgbaFromHex(text, 0.45),
                  }}
                >
                  {validationHint}
                </motion.p>
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
                {isLastQuestion ? copy.reviewButton : copy.next}
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProgressIndicator({ current, progress, text, accent, label }: { current: number; progress: number; text: string; accent: string; label: string }) {
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
        {label} {current} / 3
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
  copy,
  onEdit,
  onSubmit,
}: {
  formData: FormData;
  text: string;
  accent: string;
  copy: ContactCopy;
  onEdit: (step: "name" | "email" | "message") => void;
  onSubmit: () => void;
}) {
  const reviewItems: Array<{ key: "name" | "email" | "message"; label: string; value: string }> = [
    { key: "name", label: copy.reviewLabels.name, value: formData.name },
    { key: "email", label: copy.reviewLabels.email, value: formData.email },
    { key: "message", label: copy.reviewLabels.message, value: formData.message },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <ProgressIndicator current={3} progress={100} text={text} accent={accent} label={copy.stepLabel} />

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
        {copy.reviewTitle}
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
                {copy.edit}
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
        {copy.submit}
        <Send size={18} />
      </motion.button>
    </motion.div>
  );
}

function SuccessAtmosphere({ text, accent, isDark }: { text: string; accent: string; isDark: boolean }) {
  const secondary = isDark ? "#5DA9FF" : "#7B2D52";
  const tertiary = isDark ? "#7B2D52" : "#A34A6A";
  const gold = isDark ? "#7FD6FF" : "#D8C7D1";

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {!isDark ? (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(93,169,255,0.18) 0%, transparent 32%, rgba(123,45,82,0.1) 58%, rgba(216,199,209,0.2) 100%)",
            mixBlendMode: "multiply",
          }}
        />
      ) : null}
      <motion.div
        className="absolute rounded-full"
        animate={{ scale: [1, 1.12, 1], opacity: isDark ? [0.5, 0.72, 0.5] : [0.68, 0.9, 0.68] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: "clamp(420px, 48vw, 860px)",
          height: "clamp(420px, 48vw, 860px)",
          left: isDark ? "-14%" : "-8%",
          top: isDark ? "-18%" : "-12%",
          background: `radial-gradient(circle, ${rgbaFromHex(secondary, isDark ? 0.22 : 0.34)}, ${rgbaFromHex(secondary, isDark ? 0.08 : 0.17)} 38%, transparent 68%)`,
          filter: "blur(64px)",
        }}
      />
      <motion.div
        className="absolute rounded-full"
        animate={{ scale: [1.08, 0.96, 1.08], opacity: isDark ? [0.48, 0.68, 0.48] : [0.58, 0.82, 0.58] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: "clamp(360px, 42vw, 720px)",
          height: "clamp(360px, 42vw, 720px)",
          right: isDark ? "-10%" : "-6%",
          bottom: isDark ? "-18%" : "-12%",
          background: `radial-gradient(circle, ${rgbaFromHex(tertiary, isDark ? 0.18 : 0.32)}, ${rgbaFromHex(accent, isDark ? 0.08 : 0.18)} 42%, transparent 70%)`,
          filter: "blur(70px)",
        }}
      />
      <motion.div
        className="absolute rounded-full"
        animate={{ x: ["-3%", "4%", "-3%"], y: ["2%", "-2%", "2%"], opacity: isDark ? [0.18, 0.26, 0.18] : [0.42, 0.62, 0.42] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: "clamp(300px, 34vw, 620px)",
          height: "clamp(300px, 34vw, 620px)",
          left: "44%",
          top: "44%",
          background: `radial-gradient(circle, ${rgbaFromHex(gold, isDark ? 0.12 : 0.28)}, transparent 68%)`,
          filter: "blur(74px)",
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 rounded-full"
        animate={{ rotate: [0, 8, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: "clamp(520px, 56vw, 960px)",
          aspectRatio: "1 / 1",
          border: `1px solid ${rgbaFromHex(accent, isDark ? 0.16 : 0.28)}`,
          boxShadow: `0 0 110px ${rgbaFromHex(accent, isDark ? 0.11 : 0.22)}, inset 0 0 90px ${rgbaFromHex(secondary, isDark ? 0.05 : 0.11)}`,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-14" style={{ transform: "rotate(-7deg)" }}>
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "clamp(9rem, 19vw, 16rem)", opacity: isDark ? 0.82 : 1 }}
          transition={{ width: { duration: 1.75, delay: 0.45, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.35, delay: 0.35 } }}
          className="overflow-hidden whitespace-nowrap"
          style={{
            fontFamily: "'Reenie Beanie', 'Brush Script MT', cursive",
            fontSize: "clamp(3.5rem, 8vw, 7rem)",
            lineHeight: 0.8,
            letterSpacing: "-0.045em",
            color: "transparent",
            background: `linear-gradient(128deg, ${accent} 0%, ${secondary} 58%, ${tertiary} 110%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: `0 18px 48px ${rgbaFromHex(accent, isDark ? 0.2 : 0.3)}`,
          }}
        >
          merci
        </motion.div>
        <motion.span
          className="absolute top-2 h-2 w-2 rounded-full"
          style={{
            right: "-0.25rem",
            background: tertiary,
            boxShadow: `0 0 18px ${rgbaFromHex(tertiary, 0.55)}`,
          }}
          initial={{ opacity: 0, scale: 0.4, x: "-9rem" }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.4, 1, 1, 0.5], x: ["-9rem", "-5.4rem", "-2rem", "0rem"] }}
          transition={{ duration: 1.75, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <motion.div
        className="absolute inset-x-[-10%] top-[14%] h-px"
        animate={{ x: ["-4%", "4%", "-4%"], opacity: isDark ? [0.32, 0.58, 0.32] : [0.48, 0.76, 0.48] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: `linear-gradient(90deg, transparent, ${rgbaFromHex(accent, isDark ? 0.42 : 0.68)}, ${rgbaFromHex(secondary, isDark ? 0.28 : 0.58)}, transparent)`,
        }}
      />
      <motion.div
        className="absolute inset-x-[-20%] bottom-[18%] h-px"
        animate={{ x: ["5%", "-5%", "5%"], opacity: isDark ? [0.28, 0.5, 0.28] : [0.42, 0.68, 0.42] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: `linear-gradient(90deg, transparent, ${rgbaFromHex(tertiary, isDark ? 0.25 : 0.56)}, ${rgbaFromHex(accent, isDark ? 0.38 : 0.62)}, transparent)`,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            `linear-gradient(${rgbaFromHex(text, isDark ? 0.035 : 0.045)} 1px, transparent 1px)`,
            `linear-gradient(90deg, ${rgbaFromHex(text, isDark ? 0.028 : 0.035)} 1px, transparent 1px)`,
          ].join(", "),
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 0%, black 56%, transparent 82%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, black 56%, transparent 82%)",
          opacity: isDark ? 0.55 : 0.68,
        }}
      />

      <AmbientMovingLines className="absolute inset-0 size-full" accent={accent} secondary={secondary} text={text} opacity={isDark ? 0.62 : 0.72} />
    </div>
  );
}

function SuccessState({ text, accent, isDark, copy, onHome }: { text: string; accent: string; isDark: boolean; copy: ContactCopy; onHome: () => void }) {
  const visualAccent = isDark ? accent : "#7B2D52";

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
          style={{ border: `1px solid ${visualAccent}` }}
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.2 }}
          style={{
            filter: isDark
              ? `drop-shadow(0 0 20px ${rgbaFromHex(accent, 0.28)})`
              : `drop-shadow(0 18px 34px ${rgbaFromHex(visualAccent, 0.28)})`,
          }}
        >
          <CheckCircle2 size={64} color={visualAccent} strokeWidth={1.7} />
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
        {copy.successTitle}
      </h1>
      <p
        className="mx-auto max-w-xl"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1.1rem",
          lineHeight: 1.8,
          color: rgbaFromHex(text, isDark ? 0.62 : 0.7),
        }}
      >
        {copy.successDesc}
      </p>
      <motion.button
        type="button"
        onClick={onHome}
        whileHover={{ scale: 1.05, borderColor: visualAccent }}
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
        {copy.home}
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
