import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="top-0 sticky z-10 font-semibold w-full">
      <div className="nav-background opacity-20 z-0 w-full h-full absolute top-0" />
      <div className="px-4 flex items-center z-20 relative w-full">
        <Link href="/">
          <Image
            src="https://img.plasmic.app/img-optimizer/v1/img/e0f14830c802382c0463b987fc8a3887.png?w=48&q=75&f=webp"
            alt="Gen Z Writes Logo"
            loading="eager"
            width={50}
            height={48}
            className="[@media(max-width:330px)]:!w-[40px] [@media(max-width:330px)]:!h-[40px]"
            style={{ width: "50px", height: "48px" }}
          />
        </Link>
        <ul className="flex w-full justify-end sm:gap-4 gap-2 [@media(max-width:315px)]:text-[13px]">
          <li className="text-white sm:text-lg">
            <Link href="/database">Database</Link>
          </li>
          <li className="text-white sm:text-lg">
            <Link href="/how-to-participate">How to Participate</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
