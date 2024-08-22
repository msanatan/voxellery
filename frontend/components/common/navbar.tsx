import { Button } from "@headlessui/react";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex flex-row justify-between py-4 px-4 sm:px-6 bg-black sticky w-full top-0 start-0 border-b border-gray-600">
      <a className="kenneyblocks text-white text-2xl">Voxellery</a>
      <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
        <Link href="/login" className="py-2 px-4 text-white text-md">
          Login
        </Link>
        <Button className="rounded bg-white py-2 px-4 text-md text-black">
          Upload Image
        </Button>
      </div>
    </nav>
  );
}
