import Link from "next/link";

type Props = {
  onClose: () => void;
  scrollToProject: () => void;
  scrollToThanks: () => void;
};

export default function SlideMenu({ onClose, scrollToProject, scrollToThanks }: Props) {
  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-black text-white z-50 p-6 shadow-lg border-l border-pink-300 flex flex-col font-key">
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl font-bold">☰ Menu</div>
        <button onClick={onClose} className="text-2xl font-bold">✕</button>
      </div>

      <nav className="flex flex-col gap-6 text-lg leading-relaxed font-semibold">
        <Link href="https://testnet.succinct.xyz/prove/dashboard" className="py-2" target="_blank">
          Succinct Stage 2
        </Link>
        <Link href="https://discord.gg/succinctlabs" className="py-2" target="_blank">
          Discord
        </Link>
        <Link href="https://x.com/SuccinctLabs" className="py-2" target="_blank">
          X
        </Link>

        <hr className="border-pink-300 my-2" />

        <button onClick={scrollToProject} className="py-2 text-left">
          Project Dev
        </button>
        <button onClick={scrollToThanks} className="py-2 text-left">
          Korean members
        </button>
      </nav>
    </div>
  );
}