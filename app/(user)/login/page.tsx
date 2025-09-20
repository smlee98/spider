import LoginForm from "@/app/(user)/login/login-form";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="relative flex min-h-dvh flex-1 flex-col justify-center px-6 py-12">
      <div className="mx-auto mt-10 flex w-full max-w-md flex-1 flex-col items-center justify-center gap-8">
        <Link href="/" className="dark:invert">
          <Image src="/logo.png" alt="logo" width={184} height={40} />
        </Link>
        <h2 className="text-foreground text-center text-2xl leading-9 font-bold">로그인</h2>
        <LoginForm />
      </div>
    </div>
  );
}
