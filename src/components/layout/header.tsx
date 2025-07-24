import { Link, NavLink } from "react-router";
import AuthButton from "@/pages/auth/components/auth-button";
import Logo from "@/components/shared/nodepop-react";
import type { ComponentProps } from "react";

function LogoLink() {
  return (
    <Link
      to="/"
      className="hover:bg-primary/20 flex h-14 w-14 rounded-md p-1.5 transition-colors duration-300"
    >
      <Logo />
    </Link>
  );
}

function PageLink(props: ComponentProps<typeof NavLink>) {
  return (
    <NavLink
      className="aria-[current=page]:text-primary underline-offset-8 aria-[current=page]:underline"
      {...props}
    />
  );
}

export default function Header() {
  return (
    <header className="border-b shadow">
      <div className="mx-8 flex h-20 items-center gap-4 md:mx-16 lg:mx-40">
        <LogoLink />
        <nav className="ml-auto">
          <ul className="flex items-center gap-4">
            <li className="hidden sm:list-item">
              <PageLink to="/adverts" end>
                Adverts List
              </PageLink>
            </li>
            <li>
              <PageLink to="/adverts/new">New Advert</PageLink>
            </li>
          </ul>
        </nav>
        <AuthButton />
      </div>
    </header>
  );
}
