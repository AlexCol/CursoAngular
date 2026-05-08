export const headerStyles = {
  container:
    'mx-auto mb-8 flex w-[90%] max-w-[70rem] flex-col items-center gap-4 rounded-b-[14px] bg-linear-to-b from-[#2d0b52] to-[#44107a] px-6 py-5 text-center shadow-[0_2px_14px_rgba(0,0,0,0.45)] md:px-8 md:py-8',
  innerContainer: 'flex flex-col items-center gap-1',
  title:
    'm-0 p-0 text-[1.9rem] font-extrabold leading-none tracking-[-0.03em] text-[#e9d8ff] md:text-[2.35rem]',
  logo: 'w-16 object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)] md:w-[4.75rem]',
  subtitle:
    'm-0 max-w-[34rem] text-[0.9rem] leading-5 text-balance text-[#d8c8ea] md:text-[0.95rem]',
} as const;
