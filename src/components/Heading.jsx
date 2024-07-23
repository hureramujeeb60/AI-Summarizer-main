import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useToast } from "@/components/ui/use-toast";

const Heading = () => {
  const [state, setState] = useState({
    value: "",
    copied: false,
  });
  const { toast } = useToast();
  useEffect(() => {
    if (state.copied) {
      toast({
        title: "Copied",
      });
    }
  }, [state]);

  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-center items-center w-full pt-2 mb-12">
        <h1 className="logo object-contain">AI - ARTICLE SUMMARIZER</h1>
      </nav>

      <h1 className="head_text ">GET SUMMARY OF ANY ARTICLE</h1>
      <div className="mt-6 flex flex-col justify-center items-center">
        <p className="font-bold">Demo article link</p>
        <p className="text-gray-500">https://medium.com/....</p>
      </div>

      <CopyToClipboard
        text={
          "https://medium.com/@elle.neal_71064/8-real-world-examples-of-ai-powered-summarization-4c76d823706a"
        }
        onCopy={() => setState({ copied: true })}
      >
        <button className="black_btn mt-2">Copy</button>
      </CopyToClipboard>
    </header>
  );
};

export default Heading;
