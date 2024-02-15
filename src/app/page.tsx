"use client";

import SignUp from "./(auth)/signup/page";






export default function Home() {
<<<<<<< Updated upstream

  const [role, setRole] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserById(user, user.uid);
      setRole(data);
    };

    // Appeler la fonction fetchData définie dans useEffect
    fetchData();
  }, [user]);
  console.log(role);
=======
>>>>>>> Stashed changes

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignUp />
    </main>
  );
}
