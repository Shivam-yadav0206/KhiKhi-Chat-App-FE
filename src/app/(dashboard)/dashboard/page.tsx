import Button from "@/components/ui/Button";
import { authOptions } from "@/lib/auth";
//import Image from "next/image";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  return (
    //<p className="text-red-500">Hello</p>
    <>
      <p>fcgvbhjnkcgfvbhnj</p>
      <p className="text-red-500">{JSON.stringify(session)}</p>
      <Button variant="default" isLoading={false} size="default">
        ClickMe
      </Button>
    </>
  );
}
