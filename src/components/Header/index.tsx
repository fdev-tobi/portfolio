"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faHome,
  faBriefcase,
  faProjectDiagram,
  faUser,
  faStar,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { projectItems } from "@/data/project-items";

const navItems = [
  { href: "/", label: "Home", icon: faHome },
  { href: "/services", label: "Services", icon: faBriefcase },
  { href: "/projects", label: "Projects", icon: faProjectDiagram, hasChildren: true },
  { href: "/skills", label: "Skills", icon: faUser },
  { href: "/testimonials", label: "Testimonials", icon: faStar },
  { href: "/contact", label: "Contact", icon: faEnvelope },
] as const;

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setIsOpen(false);
    setIsProjectsOpen(false);
  };

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        projectsRef.current &&
        !projectsRef.current.contains(event.target as Node)
      ) {
        setIsProjectsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-[100000] w-full border-b border-white/10 bg-[#0c0e12]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:h-20 md:px-6">
        <Link href="/" className="relative z-[100001] shrink-0" onClick={closeMenu}>
          <Image
            src="/assets/images/logo.png"
            alt="Logo"
            className="h-10 w-auto md:h-14"
            width={100}
            height={100}
            priority
          />
        </Link>

        <button
          type="button"
          className="relative z-[100001] flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-white transition-colors hover:border-[#c99efd] hover:text-[#c99efd] md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition-transform duration-300 ${
                isOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 rounded bg-current transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-5 rounded bg-current transition-transform duration-300 ${
                isOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>

        <nav className="hidden items-center gap-6 text-xl md:flex">
          {navItems.map((item) =>
            "hasChildren" in item && item.hasChildren ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setIsProjectsOpen(true)}
                onMouseLeave={() => setIsProjectsOpen(false)}
                ref={projectsRef}
              >
                <Link
                  href={item.href}
                  className={`flex items-center overflow-hidden text-center group ${
                    isActive(item.href) ? "text-[#c99efd]" : "text-white"
                  }`}
                >
                  <FontAwesomeIcon size="sm" icon={item.icon} className="mr-2" />
                  <span className="relative flex items-center text-[15px]">
                    <span className="relative inline-block transition-transform duration-300 group-hover:-translate-y-full">
                      {item.label}
                    </span>
                    <span className="absolute left-0 top-0 inline-block translate-y-full text-[#c99efd] transition-transform duration-300 group-hover:translate-y-0">
                      {item.label}
                    </span>
                  </span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`ml-1.5 text-[10px] transition-transform duration-300 ${
                      isProjectsOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>
                <div
                  className={`absolute left-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#12151d]/95 shadow-2xl shadow-black/40 backdrop-blur-md transition-all duration-200 ${
                    isProjectsOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-1 opacity-0"
                  }`}
                >
                  {projectItems.map((project) => (
                    <Link
                      key={project.link}
                      href={`/projects/${project.link}`}
                      className={`block px-4 py-2.5 text-sm transition-colors first:pt-3 last:pb-3 hover:bg-white/10 hover:text-[#c99efd] ${
                        pathname === `/projects/${project.link}`
                          ? "text-[#c99efd]"
                          : "text-white/90"
                      }`}
                    >
                      {project.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center overflow-hidden text-center group ${
                  isActive(item.href) ? "text-[#c99efd]" : "text-white"
                }`}
              >
                <FontAwesomeIcon size="sm" icon={item.icon} className="mr-2" />
                <span className="relative flex items-center text-[15px]">
                  <span className="relative inline-block transition-transform duration-300 group-hover:-translate-y-full">
                    {item.label}
                  </span>
                  <span className="absolute left-0 top-0 inline-block translate-y-full text-[#c99efd] transition-transform duration-300 group-hover:translate-y-0">
                    {item.label}
                  </span>
                </span>
              </Link>
            )
          )}
        </nav>
      </div>

      <div
        className={`fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden={!isOpen}
      />

      <nav
        className={`absolute left-0 right-0 top-full z-[100000] max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-white/10 bg-[#0c0e12] px-4 pb-6 pt-2 shadow-2xl transition-all duration-300 md:hidden ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col gap-1">
          {navItems.map((item) =>
            "hasChildren" in item && item.hasChildren ? (
              <div key={item.href} className="rounded-xl bg-white/[0.03]">
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`flex min-h-12 flex-1 items-center gap-3 rounded-l-xl px-4 text-[16px] transition-colors ${
                      isActive(item.href)
                        ? "text-[#c99efd]"
                        : "text-white hover:text-[#c99efd]"
                    }`}
                  >
                    <FontAwesomeIcon icon={item.icon} className="w-4" />
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    className="flex h-12 w-12 items-center justify-center text-white/80 hover:text-[#c99efd]"
                    aria-label="Toggle project categories"
                    aria-expanded={isProjectsOpen}
                    onClick={() => setIsProjectsOpen((open) => !open)}
                  >
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`text-xs transition-transform duration-300 ${
                        isProjectsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                <div
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
                    isProjectsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0">
                    <div className="mb-2 ml-4 flex flex-col border-l border-white/10 pb-2">
                      {projectItems.map((project) => (
                        <Link
                          key={project.link}
                          href={`/projects/${project.link}`}
                          onClick={closeMenu}
                          className={`min-h-11 px-4 py-2 text-[15px] transition-colors hover:text-[#c99efd] ${
                            pathname === `/projects/${project.link}`
                              ? "text-[#c99efd]"
                              : "text-white/70"
                          }`}
                        >
                          {project.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`flex min-h-12 items-center gap-3 rounded-xl px-4 text-[16px] transition-colors hover:bg-white/[0.04] ${
                  isActive(item.href)
                    ? "bg-white/[0.06] text-[#c99efd]"
                    : "text-white hover:text-[#c99efd]"
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="w-4" />
                {item.label}
              </Link>
            )
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
