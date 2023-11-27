"use client";
import {useState} from "react";

export const Header = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  let navigation: { name: string; href: string }[] = [
    {name: "Home", href: "/"},
    {name: "Restaurants", href: "/restaurants"},
    {name: "Shopping", href: "/shopping"},
    {name: "Groups & Links", href: "/links"},
    {name: "Blog", href: "/blog"},
    {name: "About", href: "/about"},
  ];

  return (
    <header>
      <div className={"bg-white shadow mb-4 relative py-2 border-b border-b-gray-200 w-full"}>
        <div className={"flex justify-between items-center mx-auto px-4 w-4/5"}>
          <a className={"text-2xl text-center break-all"}
             href={"/"}
          >
            VegDex
          </a>
          <div className={"inline-flex flex-row justify-between space-x-4"}>
            {navigation.map(({name, href}) => (
              <a className={"text-center break-all"}
                 href={href}
                 key={name}>
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
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
