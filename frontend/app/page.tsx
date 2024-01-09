import applicationFlowImg from "@/public/assets/images/application_flow.png";
import Image from "next/image";
import Link from "next/link";

export default function MainPage() {
  return (
    <main className="z-0 flex-1">
      <section className="flex h-full flex-col items-center justify-around">
        <article className="flex max-w-[500px] flex-col items-center gap-10 p-4 drop-shadow-lg">
          <h1 className="text-[1.8rem] font-bold">Company Name</h1>
          <p>
            You can checkout our available jobs by clicking the button below. If
            you would like to apply to any of them you need to have an account
            with an uploaded CV in it.
          </p>
          <Link
            href="/jobs"
            className="rounded bg-blue-4 px-4 py-2 font-bold text-white hover:bg-blue-2"
          >
            Available Jobs
          </Link>
        </article>
        <Image
          priority
          draggable={false}
          src={applicationFlowImg}
          alt="jobApplicationFlow"
          className="max-h-[45vh] w-auto"
        />
      </section>
    </main>
  );
}
