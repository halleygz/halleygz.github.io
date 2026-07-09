"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Nav = () => {
  const path = usePathname();
  return (
    <nav className="font-mono font-light">
      <p className="text-3xl font-extralight mb-5">
        $cd{" "}
        {path === "/" ? (
          "."
        ) : (
          <Link href="/" className="underline">
            ..
          </Link>
        )}
        /
      </p>
      <ul className="text-2xl flex flex-col gap-4">
        <li>
          <Link
            href="/experience"
            className={path === "/experience" ? "underline" : ""}
          >
            Experience
          </Link>
        </li>
        <li>
          <Link
            href="/projects"
            className={path === "/projects" ? "underline" : ""}
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            href="/skills"
            className={path === "/skills" ? "underline" : ""}
          >
            Skills
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const NavSm = () => {
  const path = usePathname();

  return (
    <nav className="font-mono font light">
      <p className="text-xl font-extralight mb-2">
        $cd{" "}
        {path === "/" ? (
          "."
        ) : (
          <Link href="/" className="underline">
            ..
          </Link>
        )}
        /
      </p>
      <ul className="text-md flex gap-4">
        <li>
          <Link
            href="/experience"
            className={path === "/experience" ? "underline" : ""}
          >
            <span className="underline">E</span>xperience
          </Link>
        </li>
        <li>
          <Link
            href="/projects"
            className={path === "/projects" ? "underline" : ""}
          >
            <span className="underline">P</span>rojects
          </Link>
        </li>
        <li>
          <Link
            href="/skills"
            className={path === "/skills" ? "underline" : ""}
          >
            <span className="underline">S</span>kills
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export {Nav, NavSm};
