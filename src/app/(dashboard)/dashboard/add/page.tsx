import { FunctionComponent } from "react";
import AddFriendButton from "@/components/AddFriendButton";

const page: FunctionComponent = () => {
  return (
    <main className="pt-8 block">
      <h1 className="font-bold text-5xl mb-8">Add a friend</h1>
      <AddFriendButton />
    </main>
  );
};

export default page;
