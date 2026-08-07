'use client'
import { forwardRef } from 'react'
import { MapPin, User } from 'lucide-react'
import Image from "next/image";

type CardData = {
  name: string
  role: string
  title: string
  photo: string | null
}

/* Small dotted decorative cluster */
function Dots({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`grid grid-cols-4 gap-1.5 ${className ?? ''}`}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="h-1 w-1 rounded-full bg-white/40"
        />
      ))}
    </div>
  )
}


function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/hacker-house-logo.png"
        alt="HH Goa 2026"
        className="h-10 w-10 object-contain"
      />

      <div className="leading-tight">
        <p className="font-display text-lg font-bold text-white">
          HH Goa 2026
        </p>

        <p className="text-[10px] uppercase tracking-[0.18em] text-grey">
          Official Builder
        </p>
      </div>
    </div>
  );
}
      


/* ----------------------------- Builder Card ----------------------------- */

export const BuilderCard = forwardRef<HTMLDivElement, CardData>(
  function BuilderCard({ name, role, title, photo }, ref) {
    return (
      <div
        ref={ref}
        className="relative w-full max-w-sm overflow-hidden rounded-[24px] border border-yellow/50 bg-gradient-to-b from-[#0f704b] via-[#0b5a3e] to-[#083f2c] p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
      >
        {/* pink accent line, top */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-pink to-transparent" />
        {/* soft yellow corner glow */}
        {/* Premium HH Goa Waves */}
<svg
  className="absolute inset-0 h-full w-full opacity-[0.50] pointer-events-none"
  viewBox="0 0 400 600"
  preserveAspectRatio="none"
>
  <path
    d="M-60 120 C70 40, 230 190, 460 90"
    stroke="#FFD233"
    strokeWidth="2"
    fill="none"
  />

  <path
    d="M-80 250 C80 170, 250 330, 470 240"
    stroke="#FFD233"
    strokeWidth="2"
    fill="none"
  />

  <path
    d="M-40 420 C120 330, 260 500, 450 410"
    stroke="#FFD233"
    strokeWidth="2"
    fill="none"
  />
</svg>

{/* Header */}
<div className="relative z-10 flex items-center justify-between">
  <LogoMark />
  <Dots />
</div>
       

        {/* photo */}
        <div className="relative z-10 mt-8 flex flex-col items-center text-center">
          <div className="relative mb-5">
            <div className="absolute -inset-[3px] rounded-full bg-gradient-to-tr from-yellow via-pink to-yellow" />
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-green-bg bg-green-2">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo || '/placeholder.svg'}
                  alt={name ? `${name}'s photo` : 'Profile photo'}
                  className="h-full w-full object-cover"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-white/40">
                  <User className="h-10 w-10" />
                </div>
              )}
            </div>
          </div>

          <h3 className="font-display text-3xl font-extrabold leading-tight tracking-wide text-balance text-white">
            {name || 'Your Name'}
          </h3>
          <p className="mt-1 text-sm font-medium text-grey">
            {role || 'Role / Stack'}
          </p>

          {/* pink accent divider */}
          <div className="my-5 flex w-full items-center gap-2">
            <div className="h-px flex-1 bg-white/15" />
            <div className="h-1.5 w-1.5 rounded-full bg-pink" />
            <div className="h-px flex-1 bg-white/15" />
          </div>

          {/* builder title pill */}
          <div className="inline-flex items-center rounded-full bg-yellow px-5 py-2 text-sm font-extrabold uppercase tracking-[0.2em] text-green-bg shadow-lg">
            {title || 'Official Builder'}
          </div>
        </div>

        {/* footer */}
        <div className="relative mt-8 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[0.7rem] font-medium text-white/70">
            <MapPin className="h-3.5 w-3.5 text-yellow" />
            Goa, India
          </div>
          <p className="text-sm font-bold tracking-tight text-pink">#FrameInGoa</p>
        </div>
      </div>
    )
  },
)

/* ----------------------------- Profile Frame ----------------------------- */

export const ProfileFrame = forwardRef<HTMLDivElement, CardData>(
  function ProfileFrame({ name, role, photo }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-[24px] border border-yellow/50 bg-gradient-to-br from-[#0f704b] via-[#0b5a3e] to-[#083f2c] p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
      >
        {/* corner dots */}
        <Dots className="absolute left-5 top-5 opacity-70" />
        <Dots className="absolute bottom-5 right-5 opacity-70" />

        {/* pink accent ticks */}
        <div className="absolute right-6 top-1/2 h-16 w-[3px] -translate-y-1/2 rounded-full bg-pink/70" />
        <div className="absolute left-6 top-1/2 h-16 w-[3px] -translate-y-1/2 rounded-full bg-pink/70" />

        {/* framed photo */}
        <div className="relative">
          <div className="absolute -inset-[5px] rounded-full bg-gradient-to-tr from-yellow via-pink to-yellow" />
          <div className="absolute -inset-[14px] rounded-full border border-dashed border-white/30" />
          <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-green-bg bg-green-2 sm:h-48 sm:w-48">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo || '/placeholder.svg'}
                alt={name ? `${name}'s photo` : 'Profile photo'}
                className="h-full w-full object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-white/40">
                <User className="h-14 w-14" />
              </div>
            )}
          </div>
        </div>

        {/* name + badge */}
        <h3 className="mt-6 font-display text-xl font-bold text-balance text-white">
          {name || 'Your Name'}
        </h3>
        <p className="mt-0.5 text-xs font-medium text-grey">
          {role || 'Role / Stack'}
        </p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-yellow px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-widest text-green-bg">
          HH Goa 2026 · Builder
        </div>

        <p className="mt-3 text-sm font-bold tracking-tight text-pink">#FrameInGoa</p>
      </div>
    )
  },
)
