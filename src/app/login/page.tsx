"use client";

import { FC, useState } from "react";
import Google from "../../../public/google.svg";
import Image from "next/image";
import Logo from "../../../public/unknown.svg";
import Cell from "../../../public/mobile-phone.svg";
import Button from "@/components/ui/Button";
interface Props {}

const page: FC<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      <div>
        <div className="flex h-screen">
          <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
            <div className="max-w-md text-center">
              <Image src={Logo} alt="asd" />
            </div>
          </div>

          <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
            <div className="max-w-md w-full p-6">
              <h1 className="text-3xl font-semibold mb-6 text-black text-center">
                Sign In
              </h1>
              <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
                Connect, chat, share, enjoy, connect.{" "}
              </h1>

              <div className="space-y-4">
                <div>
                  <Button isLoading={false} className="w-full ">
                    <Image
                      className="w-[24px] h-[24px] "
                      src={Cell}
                      alt="Phone"
                    />
                    Sign In with OTP{" "}
                  </Button>
                </div>
                <div>
                  <Button className="w-full" isLoading={false}>
                    <Image
                      className="w-[20px] h-[20px] mr-1"
                      src={Google}
                      alt="Google"
                    />
                    Sign In with Google{" "}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
