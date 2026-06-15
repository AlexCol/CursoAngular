export const headerStyles = {
  header: `flex flex-col items-center justify-between gap-4 px-0.5 py-3 md:flex-row md:gap-0 md:px-[10%] md:py-6 md:text-[1.25rem]`,
  logoWrapper: `h-22 w-22 rounded-full bg-[#eee8f2] p-5 shadow-[0_0_8px_rgba(0,0,0,0.35)]`,
  logo: `h-full w-full drop-shadow-[0_0_4px_rgba(29,29,29,0.35)]`,
  navList: `m-0 flex list-none items-center gap-8 p-0`,
  navLink: `font-bold text-[#3e3b3e] no-underline transition-colors hover:text-[#77207a]`,
} as const;
