import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";

export default function DevSection() {
  return (
    <section className="p-6 font-key bg-white">
      <h2 className="mt-10 text-xl font-bold mb-4">Project Dev</h2>

      <div className="mt-10 flex flex-col items-start">
        <Image
          src="/members/kesoonho-dev.png"
          alt="Project Dev"
          width={160}
          height={160}
          className="rounded-xl mb-2"
        />
        <div className="text-m">X : @kesoonho</div>
        <div className="text-m">Discord : @kesoonho</div>
        <a
          href="https://x.com/kesoonho"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-[#868e96]"
        >
          <FaXTwitter className="w-4 h-4" />
          Visit Profile
        </a>
      </div>
    </section>
  );
}
