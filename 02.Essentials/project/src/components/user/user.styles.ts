export const userStyles = {
  div: `overflow-hidden rounded-md shadow-[0_1px_6px_rgba(0,0,0,0.1)]`,
  button: `flex w-full min-w-40 cursor-pointer items-center gap-2 border-none bg-[#433352] px-2 py-[0.35rem] text-left text-[#c3b3d1] [font:inherit] hover:bg-[#9965dd] hover:text-[#150722] active:bg-[#9965dd] active:text-[#150722]`,
  buttonActive: `bg-[#9965dd] text-[#150722]`,
  img: `w-8 rounded-full object-contain shadow-[0_1px_8px_rgba(0,0,0,0.3)]`,
  span: `m-0 p-0 text-[0.8rem] font-normal`,
} as const;
