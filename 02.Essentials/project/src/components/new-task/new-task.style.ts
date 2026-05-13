const newTaskStyles = {
  backdrop: 'fixed top-0 left-0 h-screen w-full bg-black/90',
  dialog: `
    fixed top-1/2 left-1/2
    w-[90%]
    max-w-[60rem]
    -translate-x-1/2
    -translate-y-1/2
    overflow-hidden
    rounded-[6px]
    border-none
    bg-[#433352]
    p-4
    shadow-[0_1px_6px_rgba(0,0,0,0.4)]
    md:p-8
  `,
  title: 'm-0 text-[#d0c2e1]',
  label: 'block text-[0.85rem] font-bold text-[#ab9ac0]',
  input: 'w-full rounded-[4px] border border-[#ab9ac0] bg-[#d0c2e1] px-1 py-[0.15rem] font-inherit',
  actions: 'mt-4 flex justify-end gap-1',
  buttonBase: 'cursor-pointer rounded-[4px] px-5 py-[0.35rem] font-inherit',
  cancelButton: `
    text-[#bdadcf]
    hover:text-[#d0c2e1]
    active:text-[#d0c2e1]
    transition-all
    duration-300
    ease-in-out
    border-1
    border-[#ab9ac0]
    hover:border-[#d0c2e1]
    active:border-[#d0c2e1]
  `,
  submitButton: `
    bg-[#895cce]
    border-none
    shadow-[0_1px_3px_rgba(0,0,0,0.3)]
    transition-all
    duration-300
    ease-in-out
    hover:bg-[#a678e0]
    hover:shadow-[0_1px_6px_rgba(0,0,0,0.3)]
    active:bg-[#895cce]
    active:shadow-[0_1px_6px_rgba(0,0,0,0.3)]`,
} as const;

export { newTaskStyles };
