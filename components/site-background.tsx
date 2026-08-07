export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* deep green base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_-10%,#0f704b_0%,#0b5a3e_55%,#083f2c_100%)]" />

      {/* soft yellow glow, top-left */}
      <div className="absolute -left-40 -top-20 h-[30rem] w-[30rem] rounded-full bg-yellow opacity-[0.12] blur-[130px]" />
      {/* soft pink glow, right */}
      <div className="absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-pink opacity-[0.14] blur-[130px]" />
      {/* subtle green glow, bottom */}
      <div className="absolute bottom-[-8rem] left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-green-2 opacity-30 blur-[120px]" />

      {/* faint dotted texture */}
      <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:26px_26px]" />
    </div>
  )
}
