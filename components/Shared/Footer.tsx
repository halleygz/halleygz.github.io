import React from "react";
import Button from "./Button";
import {
  FaLinkedin,
  FaEnvelope,
  FaTelegram,
  FaGithub,
} from "react-icons/fa6";
import Link from "next/link";

import { getProfileContent } from "@/lib/content";

type FooterProps = {
  profile?: Awaited<ReturnType<typeof getProfileContent>>;
};

const Footer = async ({ profile: profileOverride }: FooterProps) => {
  const profile = profileOverride ?? await getProfileContent();

  if (!profile.footerHeading) {
    return null;
  }

  return (
    <>
      <div className="w-full font-mono">
        <h1 className="text-3xl lg:text-7xl font-thin mb-4">{profile.footerHeading}</h1>
        <div className="flex flex-wrap justify-bewteen gap-4 w-full">
          {profile.email && (
            <Link href={`mailto:${profile.email}`} className="cursor-pointer">
              <Button className="flex justify-center items-center align-middle gap-1 cursor-pointer">
                <FaEnvelope size={20} style={{ verticalAlign: "middle" }} />
                <span className="hidden sm:inline">Mail</span>
              </Button>
            </Link>
          )}

          {profile.linkedinUrl && (
            <Link href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="cursor-pointer">
              <Button className="flex justify-center items-center align-middle gap-1 cursor-pointer">
                <FaLinkedin size={20} style={{ verticalAlign: "middle" }} />
                <span className="hidden sm:inline">LinkedIn</span>
              </Button>
            </Link>
          )}

          {profile.telegramUrl && (
            <Link href={profile.telegramUrl} target="_blank" rel="noreferrer" className="cursor-pointer">
              <Button className="flex justify-center items-center align-middle gap-1 cursor-pointer">
                <FaTelegram size={20} style={{ verticalAlign: "middle" }} />
                <span className="hidden sm:inline">Telegram</span>
              </Button>
            </Link>
          )}

          {profile.githubUrl && (
            <Link href={profile.githubUrl} target="_blank" rel="noreferrer" className="cursor-pointer">
              <Button className="hidden lg:flex justify-center items-center align-middle gap-1 cursor-pointer">
                <FaGithub size={20} style={{ verticalAlign: "middle" }} />
                <span className="hidden sm:inline">Github</span>
              </Button>
            </Link>
          )}
        </div>
        <p className="font-mono mt-4 mb-8">{profile.footerSubtext}</p>
      </div>
      <div className="w-full flex items-center justify-center text-center">
        <p className="text-center font-mono">© {profile.copyrightName}</p>
      </div>
    </>
  );
};

export default Footer;
