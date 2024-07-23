import React, { useState, useEffect } from "react";
import { useLazyGetSummaryQuery } from "../redux/api";
import { ThreeCircles } from "react-loader-spinner";
import { Typewriter } from "react-simple-typewriter";
import { useToast } from "./ui/use-toast";

const Summary = () => {
  const [article, setArticle] = useState({ url: "", summary: "" });

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      setArticle(newArticle);
    }
  };

  const handleReset = () => {
    setArticle({ url: "", summary: "" });
  };

  const { toast } = useToast();
  useEffect(() => {
    toast({
      title: "Something went wrong",
      variant: "destructive",
    });
  }, [error]);

  return (
    <section className="mt-12 w-full max-w-xl">
      <div className="flex flex-col w-full gap-3">
        <form
          className="relative flex flex-col  justify-center items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="url"
            placeholder="Paste Article Link Here"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input mb-3"
          />

          <button value="submit" className="black_btn">
            Get Summary
          </button>
        </form>

        <div className="my-10 max-w-full flex justify-center items-center ">
          {isFetching ? (
            <ThreeCircles
              visible={true}
              height="50"
              width="50"
              color="#00000"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : error ? (
            <p className="font-inter font-bold text-center text-black">
              <span className="text-red-600">{error?.data?.error}</span>
            </p>
          ) : (
            article.summary && (
              <div className="flex flex-col gap-3">
                <h2 className="text-3xl font-bold text-black">Summary</h2>
                <div className="summary_box">
                  <p>
                    <Typewriter
                      words={[article.summary]}
                      loop={1}
                      cursor
                      cursorStyle="_"
                      typeSpeed={10}
                    />
                  </p>
                </div>
                <button className="black_btn" onClick={handleReset}>
                  Reset
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Summary;
