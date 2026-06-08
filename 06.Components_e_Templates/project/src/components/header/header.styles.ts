export const headerStyles = {
  header: `flex flex-col items-center justify-between gap-4 px-0.5 py-3 md:flex-row md:gap-0 md:px-[10%] md:py-6 md:text-[1.25rem]`,
  logoWrapper: `h-22 w-22 rounded-full bg-[#eee8f2] p-5 shadow-[0_0_8px_rgba(0,0,0,0.35)]`,
  logo: `h-full w-full drop-shadow-[0_0_4px_rgba(29,29,29,0.35)]`,
  navList: `m-0 flex list-none items-center gap-8 p-0`,
  navLink: `font-bold text-[#3e3b3e] no-underline transition-colors hover:text-[#77207a]`,

  button: `inline-block cursor-pointer rounded bg-[#691ebe] px-[1.35rem] py-[0.65rem] text-center text-base text-white transition-colors hover:bg-[#551b98]`,
  buttonIcon: `ml-2 inline-block transition-transform duration-200 ease-in-out group-hover:translate-x-1`,
} as const;
