'use client'
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Cropper from "react-easy-crop";
import Image from "next/image";
import { useCallback, useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { AnimatePresence, motion } from 'motion/react'
import {
  UploadCloud,
  Sparkles,
  Download,
  Loader2,
  X,
  IdCard,
  CircleUserRound,
} from 'lucide-react'
import { BuilderCard, ProfileFrame } from '@/components/builder-card'

type Mode = 'card' | 'frame'

export function CardGenerator() {
  const [mode, setMode] = useState<Mode>('card')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [customRole, setCustomRole] = useState('')
  const getBuilderTitle = (role: string) => {
  const value = role.toLowerCase().trim()

  if (value.includes("ai") || value.includes("ml"))
    return "Neural Architect"

  if (value.includes("frontend"))
    return "Pixel Crafter"

  if (value.includes("backend"))
    return "API Guardian"

  if (value.includes("full"))
    return "Code Alchemist"

  if (value.includes("devops"))
    return "Cloud Commander"

  if (value.includes("designer"))
    return "UX Visionary"

  if (value.includes("data"))
    return "Insight Explorer"

  return "Official Builder"
}
  const [photo, setPhoto] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleFile = useCallback((file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result as string)
    reader.readAsDataURL(file)
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      handleFile(e.dataTransfer.files?.[0])
    },
    [handleFile],
  )

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return
    setDownloading(true)
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
      })
      const link = document.createElement('a')
      const slug = (name || 'builder').toLowerCase().replace(/\s+/g, '-')
      link.download = `${slug}-hh-goa-2026-${mode}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.log('[v0] download error:', err)
    } finally {
      setDownloading(false)
    }
  }, [name, mode])

  const handleShare = useCallback(async () => {
  if (!cardRef.current) return;

  try {
    const dataUrl = await toPng(cardRef.current, {
      pixelRatio: 2,
      cacheBust: true,
    });

    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: dataUrl,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      alert("Upload failed.");
      return;
    }

    const text = encodeURIComponent(
      `I'm an official Builder at HH Goa 2026! ${
        name ? `— ${name} ` : ""
      } #FrameInGoa #HHGoa2026`
    );

    const shareUrl = encodeURIComponent(result.url);

    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
  } catch (err) {
    console.error(err);
    alert("Unable to share.");
  }
}, [name]);

const handleLinkedInShare = useCallback(() => {
  const text = encodeURIComponent(
    `I'm an official Builder at HH Goa 2026! ${
      name ? `— ${name} ` : ""
    } #FrameInGoa`
  );

  window.open(
    `https://www.linkedin.com/feed/?shareActive=true&text=${text}`,
    "_blank",
    "noopener,noreferrer"
  );
}, [name]);

const handleInstagramShare = useCallback(async () => {
  try {
    // Download the generated image
    await handleDownload();

    // Copy caption
    const caption = `I'm an official Builder at HH Goa 2026! ${
      name ? `— ${name} ` : ""
    }#FrameInGoa #HHGoa2026`;

    await navigator.clipboard.writeText(caption);
    alert("Image downloaded! Caption copied. Upload the image to Instagram and paste the caption.");

    // Open Instagram
    window.open("https://www.instagram.com/", "_blank");
  } catch (err) {
    console.error(err);
    alert("Couldn't prepare Instagram post.");
  }
}, [handleDownload, name]);

return (
    <div className="relative overflow-hidden flex flex-col gap-14">
      {/* ---------------- Header ---------------- */}
      {/* Background Glow */}
      <svg
  className="absolute bottom-0 left-0 w-full opacity-20 pointer-events-none"
  viewBox="0 0 1440 320"
  fill="none"
>
  <path
    d="M0,192L80,181.3C160,171,320,149,480,160C640,171,800,213,960,218.7C1120,224,1280,192,1360,176L1440,160"
    stroke="#FFD233"
    strokeWidth="3"
  />
  <path
    d="M0,250L90,240C180,230,360,210,540,224C720,238,900,286,1080,282C1260,278,1350,240,1440,220"
    stroke="#FFD233"
    strokeWidth="2"
  />
</svg>

{/* Left Palm */}
<svg
  className="absolute -top-6 -left-8 w-80 opacity-20 pointer-events-none"
  viewBox="0 0 420 520"
  fill="none"
>
  {/* Trunk */}
  <path
  d="M140 520 C150 420 160 320 175 220 C182 180 186 145 190 120"
  stroke="#FFD233"
  strokeWidth="10"
  strokeLinecap="round"
  strokeLinejoin="round"
/>
  {/* Crown */}
  <circle cx="190" cy="120" r="5" fill="#FFD233"/>

  {/* Left Fronds */}
  <path d="M190 120 C150 70 110 30 50 5" stroke="#FFD233" strokeWidth="2"/>
  <path d="M190 120 C135 90 80 70 10 60" stroke="#FFD233" strokeWidth="2"/>
  <path d="M190 120 C135 120 70 120 5 150" stroke="#FFD233" strokeWidth="2"/>
  <path d="M190 120 C145 145 90 180 25 235" stroke="#FFD233" strokeWidth="2"/>
  <path d="M190 120 C155 175 120 230 90 310" stroke="#FFD233" strokeWidth="2"/>
  <path d="M190 120 C170 220 170 300 180 370" stroke="#FFD233" strokeWidth="2"/>

  {/* Right Fronds */}
  <path d="M190 120 C240 60 300 20 385 20" stroke="#FFD233" strokeWidth="2"/>
  <path d="M190 120 C250 85 330 70 410 90" stroke="#FFD233" strokeWidth="2"/>
  <path d="M190 120 C255 120 340 145 410 190" stroke="#FFD233" strokeWidth="2"/>
  <path d="M190 120 C245 160 315 225 380 310" stroke="#FFD233" strokeWidth="2"/>
  <path d="M190 120 C220 210 250 300 270 395" stroke="#FFD233" strokeWidth="2"/>
  <path d="M190 120 C200 250 205 340 205 420" stroke="#FFD233" strokeWidth="2"/>

  {/* Extra Small Fronds */}
  <path d="M190 120 C160 85 140 45 120 5" stroke="#FFD233" strokeWidth="1.5"/>
  <path d="M190 120 C225 80 255 40 290 0" stroke="#FFD233" strokeWidth="1.5"/>
  <path d="M190 120 C150 150 130 190 110 250" stroke="#FFD233" strokeWidth="1.5"/>
  <path d="M190 120 C240 170 270 230 310 310" stroke="#FFD233" strokeWidth="1.5"/>
</svg>

{/* Sun */}
<svg
className="absolute top-0 right-0 w-72 h-72 opacity-[0.06] pointer-events-none"
  viewBox="0 0 100 100"
  fill="none"
>
  
  <circle
  cx="50"
  cy="50"
  r="24"
    stroke="#FFD233"
    strokeWidth="2.5"
  />

  
  <g stroke="#FFD233" strokeWidth="2.5" strokeLinecap="round">
    <line x1="50" y1="6" x2="50" y2="20"/>
    <line x1="50" y1="80" x2="50" y2="94"/>
    <line x1="6" y1="50" x2="20" y2="50"/>
    <line x1="80" y1="50" x2="94" y2="50"/>

    <line x1="18" y1="18" x2="28" y2="28"/>
    <line x1="72" y1="72" x2="82" y2="82"/>

    <line x1="82" y1="18" x2="72" y2="28"/>
    <line x1="18" y1="82" x2="28" y2="72"/>
  </g>
</svg>

      <header className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow text-sm font-bold text-green-bg shadow-lg">
           <Image
  src="/hacker-house-logo.png"
  alt="Hacker House Goa"
  width={80}
  height={80}
  className="object-contain"
/>
          </div>
          <div className="leading-tight">
            <p className="font-display text-lg font-bold tracking-tight text-white">
              HH Goa 2026
            </p>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-grey/80">
              Official Builder Program
            </p>
          </div>
        </div>

        {/* Toggle */}
        <ModeToggle mode={mode} setMode={setMode} />
      </header>

      {/* ---------------- Hero ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center text-center"
      >
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] text-balance text-white sm:text-5xl md:text-6xl">
          Build Your Official{' '}
          <span className="text-yellow">HH Goa</span> Identity
        </h1>
        <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-grey sm:text-lg">
          Upload your photo and instantly generate an official Builder Card or
          Profile Frame for HH Goa 2026.
        </p>
      </motion.div>

      {/* ---------------- Main content ---------------- */}
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        {/* Left: form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="rounded-[24px] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl sm:p-8"
        >
          <h2 className="font-display text-lg font-semibold text-white">
            Your details
          </h2>

          {/* Dropzone */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ')
                fileInputRef.current?.click()
            }}
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`group relative mt-5 flex min-h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
              dragging
                ? 'border-yellow bg-yellow/10'
                : 'border-white/20 bg-white/[0.03] hover:border-yellow/60 hover:bg-white/[0.06]'
            }`}
          >
            {photo ? (
              <div className="flex flex-col items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo || '/placeholder.svg'}
                  alt="Uploaded preview"
                  className="h-32 w-32 rounded-full border-[3px] border-yellow object-cover shadow-xl"
                />
                <span className="text-sm text-grey">
                  Photo added — click to replace
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setPhoto(null)
                  }}
                  className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-grey transition-colors hover:text-white"
                >
                  <X className="h-3 w-3" /> Remove
                </button>
              </div>
            ) : (
              <>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow text-green-bg shadow-lg transition-transform group-hover:scale-105">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Drag &amp; drop your photo here
                  </p>
                  <p className="mt-1 text-xs text-grey/80">
                    or click to browse · PNG, JPG up to ~5MB
                  </p>
                </div>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>

          {/* Inputs */}
          <div className="mt-6 flex flex-col gap-4">
            <Field
              id="name"
              label="Full Name"
              value={name}
              onChange={setName}
              placeholder="Ada Lovelace"
            />
            <SelectField
  id="role"
  label="Role / Stack"
  value={role}
  onChange={setRole}
/>

{role === "Other" && (
  <Field
    id="customRole"
    label="Your Role"
    value={customRole}
    onChange={setCustomRole}
    placeholder="e.g. Cybersecurity Engineer"
  />
)}
            
          </div>

          {/* Generate (scrolls / affirms — preview is already live) */}
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="group mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow px-6 py-4 text-base font-bold text-green-bg shadow-[0_12px_30px_-10px_rgba(255,210,51,0.8)] transition-all hover:brightness-105 active:scale-[0.99] disabled:opacity-70"
          >
            {downloading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
            )}
            Generate &amp; Download
          </button>
        </motion.div>

        {/* Right: live preview */}
        <div className="flex flex-col items-center gap-6 lg:sticky lg:top-10">
          <div className="flex items-center gap-2 self-center text-xs font-medium uppercase tracking-[0.2em] text-grey">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pink" />
            Live Preview
          </div>

          <div className="flex w-full justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, scale: 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -8 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex w-full justify-center"
              >
                {mode === 'card' ? (
                  <BuilderCard
                    ref={cardRef}
                    name={name}
                    role={role === "Other" ? customRole : role}
                    title={getBuilderTitle(role === "Other" ? customRole : role)}
                    photo={photo}
                  />
                ) : (
                  <ProfileFrame
  ref={cardRef}
  name={name}
  role={role === "Other" ? customRole : role}
  title={getBuilderTitle(role === "Other" ? customRole : role)}
  photo={photo}
/>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom actions */}
          <div className="grid w-full max-w-2xl grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-yellow px-5 py-3.5 text-sm font-bold text-green-bg transition-all hover:brightness-105 active:scale-[0.98] disabled:opacity-70"
            >
              {downloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              Download PNG
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/[0.06] px-5 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/[0.12] active:scale-[0.98]"
            >
              <XLogo className="h-4 w-4" />
              Share to X
            </button>

            <button
  type="button"
  onClick={handleLinkedInShare}
  className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#0A66C2]/30 bg-[#0A66C2]/10 px-5 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#0A66C2]/20 active:scale-[0.98]"
>
  <FaLinkedin className="h-4 w-4" />
  Share to LinkedIn
</button>

<button
  type="button"
  onClick={handleInstagramShare}
  className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-pink/30 bg-pink/10 px-5 py-3.5 text-sm font-bold text-white transition-all hover:bg-pink/20 active:scale-[0.98]"
>
  <FaInstagram className="h-4 w-4" />
  Share to Instagram
</button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------- Sub-components ---------------- */

function ModeToggle({
  mode,
  setMode,
}: {
  mode: Mode
  setMode: (m: Mode) => void
}) {
  const options: { value: Mode; label: string; icon: typeof IdCard }[] = [
    { value: 'card', label: 'Builder Card', icon: IdCard },
    { value: 'frame', label: 'Profile Frame', icon: CircleUserRound },
  ]
  return (
    <div className="relative inline-flex rounded-full border border-white/12 bg-white/[0.06] p-1 backdrop-blur-md">
      {options.map(({ value, label, icon: Icon }) => {
        const active = mode === value
        return (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            className={`relative z-10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              active ? 'text-green-bg' : 'text-grey hover:text-white'
            }`}
          >
            {active && (
              <motion.span
                layoutId="mode-pill"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                className="absolute inset-0 -z-10 rounded-full bg-yellow"
              />
            )}
            <Icon className="h-4 w-4" />
            {label}
          </button>
        )
      })}
    </div>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-grey">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/12 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-yellow/70 focus:bg-white/[0.08]"
      />
    </div>
  )
}

function SelectField({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-grey">
        {label}
      </label>

      <select
  id={id}
  value={value}
  onChange={(e) => onChange(e.target.value)}
  style={{ color: value ? "white" : "#9CA3AF" }}
        className="w-full appearance-none rounded-xl border border-white/12 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-yellow/70 focus:bg-white/[0.08]"
      >
        <option value="" disabled hidden>
  Select your role
</option>
<option value="AI/ML" className="bg-green-2 text-white">
  AI/ML
</option>

<option value="Full Stack" className="bg-green-2 text-white">
  Full Stack
</option>

<option value="Frontend" className="bg-green-2 text-white">
  Frontend
</option>

<option value="Backend" className="bg-green-2 text-white">
  Backend
</option>

<option value="Data Science" className="bg-green-2 text-white">
  Data Science
</option>

<option value="DevOps" className="bg-green-2 text-white">
  DevOps
</option>

<option value="UI/UX Designer" className="bg-green-2 text-white">
  UI/UX Designer
</option>

<option value="Mobile Developer" className="bg-green-2 text-white">
  Mobile Developer
</option>

<option value="Other" className="bg-green-2 text-white">
  Other
</option>
      </select>
    </div>
  )
}

function XLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  )
}
