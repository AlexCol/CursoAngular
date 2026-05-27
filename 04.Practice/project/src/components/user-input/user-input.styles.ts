export const userInputStyles = {
  form: `
    m-auto
    w-[92%]
    max-w-150
    p-6
    rounded-md
    bg-linear-to-b from-teal-700 to-emerald-600
    shadow-[0_8px_24px_rgba(0,0,0,0.45)]`,

  inputGroup: `
    flex
    justify-center
    gap-6
    mb-2`,

  field: `flex-1`,

  label: `
    block
    mb-2
    text-[0.68rem]
    font-bold
    uppercase
    text-teal-100/80`,

  input: `
    w-full
    h-10
    px-3
    border
    border-teal-300/60
    rounded-md
    bg-transparent
    text-teal-100
    outline-none
    focus:border-teal-100`,

  button: `
    w-full
    mt-1
    h-10
    rounded-md
    bg-emerald-300
    text-emerald-950
    font-extrabold
    uppercase
    hover:bg-emerald-200
    transition-colors`,
};
