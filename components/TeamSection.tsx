import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";

type Member = {
  image: string;
  x: string;
  discord: string;
  xLink: string;
};

const members: Member[] = [
  {
    image: "/members/AceB.png",
    x: "@Skdnjsqo",
    discord: "@aceb2410",
    xLink: "https://x.com/Skdnjsqo",
  },
  {
    image: "/members/0xblackcow.png",
    x: "@0xblackcow",
    discord: "@0xblackcow",
    xLink: "https://x.com/0xblackcow",
  },
  {
    image: "/members/goldenori.png",
    x: "@DevinBookerT",
    discord: "@goldenori_",
    xLink: "https://x.com/DevinBookerT",
  },
  {
    image: "/members/Greenmelon.png",
    x: "@bjdrst",
    discord: "@sangwook06",
    xLink: "https://x.com/bjdrst",
  },
  {
    image: "/members/gyeouri.png",
    x: "@gyeouri_",
    discord: "@gyeouri2",
    xLink: "https://x.com/gyeouri_",
  },
  {
    image: "/members/Jasmine.png",
    x: "@asmine_e26",
    discord: "@jasm1ne_",
    xLink: "https://x.com/Jasmine_e26",
  },
  {
    image: "/members/joh.png",
    x: "@sksxhxh1",
    discord: "@joh3729",
    xLink: "https://x.com/sksxhxh1",
  },
  {
    image: "/members/johnsmith.png",
    x: "@johnsmiths_",
    discord: "@johnsmith_112",
    xLink: "https://x.com/johnsmiths_",
  },
  {
    image: "/members/0xkimbab.png",
    x: "@0xKimBab",
    discord: "@0xkimbab",
    xLink: "https://x.com/0xKimBab",
  },
  {
    image: "/members/King_J_W.png",
    x: "@King_J_W",
    discord: "@usswolf",
    xLink: "https://x.com/King_J_W",
  },
  {
    image: "/members/paulc.png",
    x: "@Ho53903Ho",
    discord: "@pchoi7",
    xLink: "https://x.com/Ho53903Ho",
  },
];

export default function TeamSection() {
  return (
    <section className="p-6 font-key">
      <h2 className="text-xl font-bold mb-4">Succinct Korean Members</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-10">
        {members.map((member, idx) => (
          <div
            key={idx}
            className="flex flex-col items-start bg-white rounded-xl shadow p-4"
          >
            <Image
              src={member.image}
              alt={`Member ${member.x}`}
              width={160}
              height={160}
              className="rounded-xl mb-2"
            />
            <div className="text-m">X : {member.x}</div>
            <div className="text-m">Discord : {member.discord}</div>
            <a
              href={member.xLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-[#868e96]"
            >
              <FaXTwitter className="w-4 h-4" />
              Visit Profile
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
