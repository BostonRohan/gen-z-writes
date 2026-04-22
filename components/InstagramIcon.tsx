import Image from "next/image";

export default function InstagramIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/instagram.svg"
      alt="Instagram"
      width={24}
      height={24}
      className={className}
    />
  );
}