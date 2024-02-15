"use client";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthUserProvider";
import { Switch } from "@/components/ui/switch";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [checked, setChecked] = useState(true);
  const [role, setRole] = useState("client");
  const router = useRouter();
  const { signUp } = useAuth();

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (password)
        await signUp(email, password, firstname, lastname, role).then(() => {
          console.log("Success. The user is created in Firebase");

          router.push("/home");
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className="space-y-8">
      <div>
        <label>Email</label>
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <Input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>FirstName</label>
        <Input
          placeholder="firstname"
          type="firstname"
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div>
        <label>LastName</label>
        <Input
          placeholder="lastname"
          type="lastname"
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>

      <div>
        <label>Role</label>
        <div className="flex space-x-4">
          <Switch
            checked={checked}
            onClick={() => {
              setChecked(!checked);
              checked ? setRole("seller") : setRole("client");
            }}
          />
          <span>{role}</span>
        </div>
      </div>
      <div>
        <Button type="submit">Submit</Button>
      </div>
      <Button onClick={() => router.push("/login")}>Log In ? </Button>
    </form>
  );
};

export default SignUp;
