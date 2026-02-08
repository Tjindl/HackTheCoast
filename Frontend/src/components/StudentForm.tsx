import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building,
  BookOpen,
  GraduationCap,
  Award,
  Globe,
  User,
  HeartHandshake,
  DollarSign,
  Users,
  ChevronRight,
  ChevronLeft,
  Check,
  Loader2,
  Sparkles,
  Zap,
} from "lucide-react";
import { StudentFormData } from "../types";

interface StudentFormProps {
  university: string;
  onSubmit: (data: StudentFormData) => void;
  loading: boolean;
}

const steps = [
  {
    id: 1,
    title: "Academic",
    icon: <GraduationCap className="w-5 h-5 drop-shadow-glow" />,
    description: "Your study details",
  },
  {
    id: 2,
    title: "Personal",
    icon: <User className="w-5 h-5 drop-shadow-glow" />,
    description: "About you",
  },
  {
    id: 3,
    title: "Financial",
    icon: <DollarSign className="w-5 h-5 drop-shadow-glow" />,
    description: "Financial status",
  },
  {
    id: 4,
    title: "Affiliations",
    icon: <Users className="w-5 h-5 drop-shadow-glow" />,
    description: "Connections",
  },
];

const StudentForm: React.FC<StudentFormProps> = ({
  university,
  onSubmit,
  loading,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [formData, setFormData] = useState<StudentFormData>({
    university,
    faculty: "",
    year: 1,
    program: "",
    gpa: 0,
    campus: "Vancouver",
    citizenshipStatus: "Canadian Citizen",
    indigenousStatus: false,
    hasDisability: false,
    hasStudentLoan: false,
    hasFinancialNeed: false,
    gender: "",
    affiliations: {},
    formerYouthInCare: false,
    partTimeStudent: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (name === "year") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value) || 1,
      }));
    } else if (type === "number") {
      let val = parseFloat(value) || 0;
      if (name === "gpa" && val > 4.33) {
        val = 4.33;
      }
      setFormData((prev) => ({
        ...prev,
        [name]: val,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Prevent double-clicks during transition
  const [isStepChanging, setIsStepChanging] = useState(false);

  // Helper to handle step transitions safely
  const handleTransition = (callback: () => void) => {
    if (isStepChanging) return;
    setIsStepChanging(true);
    callback();
    // Re-enable after animation completes (approx 500ms)
    setTimeout(() => setIsStepChanging(false), 500);
  };

  const nextStep = () => {
    handleTransition(() => {
      if (currentStep < steps.length) {
        setDirection(1);
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };

  const prevStep = () => {
    handleTransition(() => {
      if (currentStep > 1) {
        setDirection(-1);
        setCurrentStep((prev) => prev - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStepChanging) return;

    if (currentStep < steps.length) {
      nextStep();
    } else {
      onSubmit(formData);
    }
  };

  // Helper for cleaner card selection UI - Cosmic Glass Style
  const SelectionCard = ({
    title,
    description,
    checked,
    onChange,
    icon,
  }: {
    title: string;
    description?: string;
    checked: boolean;
    onChange: () => void;
    icon?: React.ReactNode;
  }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onChange}
      className={`cursor-pointer border rounded-2xl p-5 transition-all duration-300 flex items-start space-x-4 backdrop-blur-md relative overflow-hidden group
        ${checked
          ? "bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400/30"
          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-lg dark:hover:bg-white/5"
        }`}
    >
      {/* Dynamic glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

      <div
        className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 relative z-10
        ${checked
            ? "border-cyan-400 bg-cyan-400 text-slate-900 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
            : "border-slate-400 dark:border-slate-600 text-transparent group-hover:border-cyan-400/50"
          }`}
      >
        <Check size={14} strokeWidth={3} />
      </div>
      <div className="flex-1 relative z-10">
        <div className="flex items-center gap-2">
          {icon && (
            <span
              className={`${checked
                ? "text-cyan-400"
                : "text-slate-400 group-hover:text-cyan-200"
                } transition-colors duration-300`}
            >
              {icon}
            </span>
          )}
          <h4
            className={`font-bold text-lg tracking-wide ${checked
              ? "text-cyan-700 dark:text-cyan-300"
              : "text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white"
              }`}
          >
            {title}
          </h4>
        </div>
        {description && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );

  // Animation variants
  const pageVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100,
      rotateY: direction > 0 ? 15 : -15, // 3D flip effect
      scale: 0.9,
    }),
    animate: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100,
      rotateY: direction > 0 ? -15 : 15,
      scale: 0.9,
    }),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative z-10 font-sans">
      {/* Progress Header - Floating Orbs */}
      <div className="mb-8 md:mb-12 relative flex justify-between items-center px-2 md:px-6">
        {/* Connector Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -z-10 rounded-full overflow-hidden transform -translate-y-1/2 mx-4 md:mx-10">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-fuchsia-500 shadow-[0_0_15px_rgba(168,85,247,0.6)]"
            initial={{ width: "0%" }}
            animate={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.6, ease: "anticipate" }}
          />
        </div>

        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <motion.div
              key={step.id}
              className={`flex flex-col items-center cursor-pointer relative group`}
              onClick={() => {
                if (step.id < currentStep) {
                  setDirection(-1);
                  setCurrentStep(step.id);
                }
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-sm md:text-lg mb-3 border-4 backdrop-blur-sm transition-all duration-500 relative z-10
                  ${isCompleted
                    ? "bg-cyan-500 border-cyan-900 text-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                    : isCurrent
                      ? "bg-slate-900 border-cyan-400 text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.4)] ring-4 ring-cyan-500/20"
                      : "bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300"
                  }`}
              >
                {isCompleted ? <Check className="w-5 h-5 md:w-7 md:h-7" strokeWidth={3} /> : <div className="scale-75 md:scale-100">{step.icon}</div>}
              </div>
              <span
                className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 hidden sm:block absolute -bottom-8 w-max
                ${isCurrent
                    ? "text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]"
                    : isCompleted
                      ? "text-cyan-600"
                      : "text-slate-600"
                  }`}
              >
                {step.title}
              </span>
            </motion.div>
          );
        })}
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/5 dark:bg-slate-900/50 backdrop-blur-3xl shadow-2xl shadow-slate-200/10 dark:shadow-black/50 rounded-[2.5rem] overflow-hidden border border-white/20 dark:border-white/10 relative isolate transition-colors duration-300"
        initial={{ opacity: 0, y: 50, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* Glass Reflections & Glows */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30" />

        {/* Animated Background Orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: "2s" }} />

        <AnimatePresence mode="wait" custom={direction}>

          <motion.div
            key={currentStep}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="p-6 md:p-12 min-h-[550px]"
          >
            {/* Step 1: Academic Information */}
            {currentStep === 1 && (
              <div className="space-y-10">
                <div className="text-center mb-12 relative">
                  <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-display text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-800 to-slate-500 dark:from-white dark:to-white/50 mb-4 flex items-center justify-center gap-4 drop-shadow-sm"
                  >
                    <GraduationCap className="text-cyan-600 dark:text-cyan-400 w-12 h-12" />{" "}
                    Academic Profile
                  </motion.h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg tracking-wide font-medium">
                    Tell us about your academic journey.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3 group">
                    <label className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest ml-1 opacity-80 group-focus-within:opacity-100 transition-all">
                      Campus Location
                    </label>
                    <div className="relative flex items-center">
                      <Building className="absolute left-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors w-5 h-5 z-10" />
                      <select
                        name="campus"
                        value={formData.campus}
                        onChange={handleChange}
                        className="w-full p-4 pl-14 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all outline-none appearance-none font-medium text-slate-900 dark:text-white hover:bg-white/80 dark:hover:bg-white/10 cursor-pointer backdrop-blur-md"
                      >
                        <option value="Vancouver" className="text-slate-900 bg-white">Vancouver Campus</option>
                        <option value="Okanagan" className="text-slate-900 bg-white">Okanagan Campus</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3 group">
                    <label className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest ml-1 opacity-80 group-focus-within:opacity-100 transition-all">
                      Current Year
                    </label>
                    <div className="relative flex items-center">
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full p-4 pl-14 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all outline-none appearance-none font-medium text-slate-900 dark:text-white hover:bg-white/80 dark:hover:bg-white/10 cursor-pointer backdrop-blur-md"
                      >
                        {[1, 2, 3, 4, 5].map((y) => (
                          <option key={y} value={y} className="text-slate-900 bg-white">
                            {y === 5
                              ? "5+ Year"
                              : `${y}${y === 1
                                ? "st"
                                : y === 2
                                  ? "nd"
                                  : y === 3
                                    ? "rd"
                                    : "th"
                              } Year`}
                          </option>
                        ))}
                      </select>
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-600 dark:text-cyan-400 font-bold w-6 h-6 flex items-center justify-center pointer-events-none text-xs border-2 border-cyan-600/30 dark:border-cyan-400/30 rounded-lg group-focus-within:border-cyan-500 bg-cyan-500/10">
                        {formData.year}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 group">
                  <label className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest ml-1 opacity-80 group-focus-within:opacity-100 transition-all">
                    Faculty / Program
                  </label>
                  <div className="relative flex items-center">
                    <select
                      name="faculty"
                      value={formData.faculty}
                      onChange={handleChange}
                      className="w-full p-4 pl-14 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all outline-none appearance-none font-medium text-slate-900 dark:text-white hover:bg-white/80 dark:hover:bg-white/10 cursor-pointer backdrop-blur-md"
                    >
                      <option value="" className="text-slate-900 bg-white">Select your faculty...</option>
                      {[
                        "Arts",
                        "Science",
                        "Engineering",
                        "Forestry",
                        "Medicine",
                        "Dentistry",
                        "Law",
                        "Graduate Studies",
                        "Commerce/Sauder",
                        "Education",
                        "Land and Food Systems",
                        "Kinesiology",
                      ]
                        .sort()
                        .map((f) => (
                          <option key={f} value={f} className="text-slate-900 bg-white">
                            {f}
                          </option>
                        ))}
                    </select>
                    <BookOpen className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors w-5 h-5 z-10" />
                  </div>
                </div>

                <div className="space-y-3 group">
                  <label className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest ml-1 opacity-80 group-focus-within:opacity-100 transition-all">
                    Cumulative GPA (0-4.33)
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      name="gpa"
                      value={formData.gpa || ""}
                      onChange={handleChange}
                      min="0"
                      max="4.33"
                      step="0.01"
                      placeholder="e.g., 3.8"
                      className="w-full p-4 pl-14 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all outline-none font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 hover:bg-white/80 dark:hover:bg-white/10 backdrop-blur-md"
                    />
                    <Award className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors w-5 h-5" />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 text-sm font-bold bg-slate-200 dark:bg-white/10 px-2 py-1 rounded-lg">
                      / 4.33
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Personal Details */}
            {currentStep === 2 && (
              <div className="space-y-10">
                <div className="text-center mb-12 relative">
                  <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-display text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-700 to-purple-500 dark:from-purple-300 dark:to-purple-100 mb-4 flex items-center justify-center gap-4 drop-shadow-sm"
                  >
                    <User className="text-purple-600 dark:text-purple-400 w-12 h-12" />{" "}
                    Personal Details
                  </motion.h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg tracking-wide font-medium">
                    Help us verify your eligibility criteria.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3 group">
                    <label className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest ml-1 opacity-80 group-focus-within:opacity-100 transition-all">
                      Citizenship Status
                    </label>
                    <div className="relative flex items-center">
                      <select
                        name="citizenshipStatus"
                        value={formData.citizenshipStatus}
                        onChange={handleChange}
                        className="w-full p-4 pl-14 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none appearance-none font-medium text-slate-900 dark:text-white hover:bg-white/80 dark:hover:bg-white/10 cursor-pointer backdrop-blur-md"
                      >
                        <option value="Canadian Citizen" className="text-slate-900 bg-white">
                          Canadian Citizen
                        </option>
                        <option value="Permanent Resident" className="text-slate-900 bg-white">
                          Permanent Resident
                        </option>
                        <option value="Refugee" className="text-slate-900 bg-white">Refugee</option>
                        <option value="International" className="text-slate-900 bg-white">
                          International Student
                        </option>
                      </select>
                      <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors w-5 h-5 z-10" />
                    </div>
                  </div>

                  <div className="space-y-3 group">
                    <label className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest ml-1 opacity-80 group-focus-within:opacity-100 transition-all">
                      Gender Identity
                    </label>
                    <div className="relative flex items-center">
                      <select
                        name="gender"
                        value={formData.gender || ""}
                        onChange={handleChange}
                        className="w-full p-4 pl-14 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none appearance-none font-medium text-slate-900 dark:text-white hover:bg-white/80 dark:hover:bg-white/10 cursor-pointer backdrop-blur-md"
                      >
                        <option value="" className="text-slate-900 bg-white">Select Gender...</option>
                        <option value="Male" className="text-slate-900 bg-white">Male</option>
                        <option value="Female" className="text-slate-900 bg-white">Female</option>
                        <option value="Non-binary" className="text-slate-900 bg-white">Non-binary</option>
                        <option value="Two-Spirit" className="text-slate-900 bg-white">Two-Spirit</option>
                      </select>
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors w-5 h-5 z-10" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 grid grid-cols-1 gap-5">
                  <SelectionCard
                    title="I am an Indigenous Student"
                    description="First Nations, Métis, or Inuit ancestry"
                    checked={formData.indigenousStatus}
                    onChange={() =>
                      setFormData((p) => ({
                        ...p,
                        indigenousStatus: !p.indigenousStatus,
                      }))
                    }
                    icon={<Sparkles size={20} />}
                  />

                  <SelectionCard
                    title="I identify as a Person with a Disability"
                    description="Permanent disability or chronic health condition"
                    checked={formData.hasDisability}
                    onChange={() =>
                      setFormData((p) => ({
                        ...p,
                        hasDisability: !p.hasDisability,
                      }))
                    }
                    icon={<HeartHandshake size={20} />}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Financial Information */}
            {currentStep === 3 && (
              <div className="space-y-10">
                <div className="text-center mb-12 relative">
                  <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-display text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-700 to-teal-500 dark:from-emerald-300 dark:to-teal-100 mb-4 flex items-center justify-center gap-4 drop-shadow-sm"
                  >
                    <DollarSign className="text-emerald-600 dark:text-emerald-400 w-12 h-12" />{" "}
                    Financial Situation
                  </motion.h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg tracking-wide font-medium">
                    We use this to find needs-based bursaries.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <SelectionCard
                    title="Government Student Loan Recipient"
                    description="Receiving full-time government student loans for the current year"
                    checked={formData.hasStudentLoan}
                    onChange={() =>
                      setFormData((p) => ({
                        ...p,
                        hasStudentLoan: !p.hasStudentLoan,
                      }))
                    }
                    icon={<DollarSign size={20} />}
                  />

                  <SelectionCard
                    title="Demonstrated Financial Need"
                    description="You require financial assistance to continue your education"
                    checked={formData.hasFinancialNeed}
                    onChange={() =>
                      setFormData((p) => ({
                        ...p,
                        hasFinancialNeed: !p.hasFinancialNeed,
                      }))
                    }
                    icon={<Zap size={20} />}
                  />

                  <SelectionCard
                    title="Former Youth in Care"
                    description="You were in government care in BC or elsewhere"
                    checked={formData.formerYouthInCare || false}
                    onChange={() =>
                      setFormData((p) => ({
                        ...p,
                        formerYouthInCare: !p.formerYouthInCare,
                      }))
                    }
                    icon={<HeartHandshake size={20} />}
                  />

                  <SelectionCard
                    title="Part-Time Student Status"
                    description="Currently enrolled in less than a full-time course load"
                    checked={formData.partTimeStudent || false}
                    onChange={() =>
                      setFormData((p) => ({
                        ...p,
                        partTimeStudent: !p.partTimeStudent,
                      }))
                    }
                    icon={<Loader2 size={20} />}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Affiliations */}
            {currentStep === 4 && (
              <div className="space-y-10">
                <div className="text-center mb-12 relative">
                  <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-display text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-700 to-orange-500 dark:from-amber-300 dark:to-orange-100 mb-4 flex items-center justify-center gap-4 drop-shadow-sm"
                  >
                    <Users className="text-amber-600 dark:text-amber-400 w-12 h-12" />{" "}
                    Affiliations
                  </motion.h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg tracking-wide font-medium">
                    Select any communities or groups you belong to.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      key: "alphaGammaDelta",
                      label: "Alpha Gamma Delta Member",
                    },
                    {
                      key: "canadianArmedForces",
                      label: "Canadian Armed Forces",
                    },
                    { key: "chineseAncestry", label: "Chinese Ancestry" },
                    {
                      key: "iranianHeritage",
                      label: "Persian/Iranian Heritage",
                    },
                    { key: "swedishHeritage", label: "Swedish Heritage" },
                    { key: "ilwu", label: "ILWU Member/Family" },
                    { key: "ufcw", label: "UFCW Local 1518" },
                    { key: "beemCreditUnion", label: "Beem Credit Union" },
                    { key: "sikhCommunity", label: "Sikh Community" },
                    { key: "pipingIndustry", label: "Piping Industry/UA 170" },
                    {
                      key: "royalCanadianLegion",
                      label: "Royal Canadian Legion",
                    },
                    { key: "knightsPythias", label: "Knights Pythias" },
                  ].map((item) => {
                    const affiliationKey =
                      item.key as keyof typeof formData.affiliations;
                    const isSelected =
                      formData.affiliations[affiliationKey] || false;

                    return (
                      <motion.div
                        key={item.key}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            affiliations: {
                              ...prev.affiliations,
                              [affiliationKey]: !isSelected,
                            },
                          }));
                        }}
                        className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between backdrop-blur-md
                          ${isSelected
                            ? "bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400/30"
                            : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-lg dark:hover:bg-white/5"
                          }`}
                      >
                        <span
                          className={`font-semibold tracking-wide ${isSelected ? "text-cyan-700 dark:text-cyan-200" : "text-slate-600 dark:text-slate-300"
                            }`}
                        >
                          {item.label}
                        </span>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-900 flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                            <Check size={14} strokeWidth={3} />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-8 bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 flex items-start gap-4 backdrop-blur-md">
                  <div className="bg-blue-500/20 p-2 rounded-lg ring-1 ring-blue-400/30">
                    <Sparkles className="text-blue-500 w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h5 className="font-bold text-blue-700 dark:text-blue-300 mb-1 tracking-wide">
                      Did you know?
                    </h5>
                    <p className="text-blue-600/80 dark:text-blue-200/70 text-sm leading-relaxed font-medium">
                      Most awards are based on merit or financial need.
                      Affiliations are just extra bonuses! Don't worry if you
                      don't check any of these boxes.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer / Navigation Actions - Glassmorphic Footer */}
        <div className="px-8 md:px-12 py-8 bg-white/5 border-t border-white/10 backdrop-blur-xl flex justify-between items-center relative z-20">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              disabled={isStepChanging}
              className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold px-6 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />{" "}
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={isStepChanging}
              className="relative group overflow-hidden bg-cyan-500 text-white font-black py-4 px-10 rounded-2xl shadow-[0_10px_20px_-10px_rgba(6,182,212,0.5)] transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(6,182,212,0.6)] hover:-translate-y-1 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
            >
              <span className="relative z-10 flex items-center gap-2 text-lg tracking-wide uppercase">
                Next Step{" "}
                <ChevronRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading || isStepChanging}
              className={`
                relative overflow-hidden
                bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black py-4 px-12 rounded-2xl 
                shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)] 
                hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.6)] hover:-translate-y-1 hover:brightness-110
                transition-all duration-300 transform
                disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 text-lg tracking-wider uppercase
              `}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />{" "}
                  <span className="animate-pulse">Analyzing...</span>
                </>
              ) : (
                <>
                  Find My Awards <Sparkles className="animate-pulse" />
                </>
              )}
            </button>
          )}
        </div>
      </motion.form>

      <p className="text-center text-xs font-medium text-slate-500 mt-10 tracking-widest uppercase opacity-60">
        Secure • Private • Local Processing
      </p>
    </div>
  );
};

export default StudentForm;
