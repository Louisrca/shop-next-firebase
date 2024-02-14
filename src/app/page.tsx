import AuthUserContext from "@/context/AuthUserContext";
import Image from "next/image";
import SignUp from "./(auth)/signup/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthUserContext>
        <SignUp />
      </AuthUserContext>
    </main>
  );
}
