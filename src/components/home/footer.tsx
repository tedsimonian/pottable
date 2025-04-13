import { Leaf } from "lucide-react";
import Link from "next/link";
import { companyName } from "~/lib/constants";

export const Footer = () => {
  return (
    <footer className="bg-background border-t p-6">
      <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div className="flex items-center gap-2">
          <Leaf className="text-primary h-5 w-5" />
          <span className="text-sm font-medium">
            © 2025 {companyName}. All rights reserved.
          </span>
        </div>
        <nav className="flex gap-4 text-sm">
          <Link href="#" className="hover:text-primary text-gray-500">
            Terms
          </Link>
          <Link href="#" className="hover:text-primary text-gray-500">
            Privacy
          </Link>
          <Link href="#" className="hover:text-primary text-gray-500">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
};
