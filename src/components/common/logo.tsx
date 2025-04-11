import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      alt="Your Company"
      src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
      className="h-8 w-auto data-[state=open]:h-4"
      width={16}
      height={16}
    />
  );
};
