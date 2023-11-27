"use client";
import {useState} from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {inter} from "@/app/ui/fonts";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let navigation: { name: string; href: string }[] = [
    {name: "Home", href: "/"},
    {name: "Restaurants", href: "/restaurants"},
    {name: "Shopping", href: "/shopping"},
    {name: "Groups & Links", href: "/links"},
    {name: "Blog", href: "/blog"},
    {name: "About", href: "/about"},
  ];

  return (
    <header className={`bg-white ${inter.className}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5 text-lg font-bold">
            VegDex
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
              {item.name}
            </a>
          ))}
        </div>
      </nav>
      <Dialog as="div" className={`lg:hidden ${inter.className}`} open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5 text-lg font-bold">
              VegDex
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export const Footer = () => {
  const user = null;

  return (
    <footer className="footer border-t text-sm text-gray-700 py-4 mt-auto w-full box-border bg-gray-100/60">
      <div className="mx-auto w-4/5 px-3">
        <div className="flex flex-row flex-wrap mx-3 mt-2 items-center">
          <div className="flex-grow-0 flex-shrink-0 basis-auto w-1/3">
            <SiteBio/>
            {user ? "Logged in" : "Not logged in"}
          </div>

          <div className="flex-grow flex-shrink-0 basis-auto text-right">
            <p>
              The content for this site is <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC-BY-NC-SA</a> unless specified otherwise.
            </p>
            <p>
              The <a href="https://github.com/VeganMSP/veganmsp.com">code</a> for
              this site is <a href="https://www.gnu.org/licenses/agpl-3.0.txt">GNU AGPL-3.0</a>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SiteBio = () => {
  return (
    <div>
      <p>
        Built by <a target="_blank" rel="noreferrer" href="https://jrgnsn.net">Matthew Jorgensen</a>.
      </p>
      <p>
        Inspired by <a target="_blank" rel="noreferrer"
                       href="https://veganmilwaukee.com/">https://veganmilwaukee.com</a>.
      </p>
    </div>
  );
};
