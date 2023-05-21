import React, { useState } from "react";

function Services() {
  const [transform, setTransform] = useState({ x: 0, y: 0, z: "" });
  const handleMouseMove = (e) => {
    const position = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - position.left - position.width / 2;
    const y = e.pageY - position.top - position.height / 2;

    setTransform({ x: x * 0.1, y: y * 0.01, z: e.target.id });
  };
  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0, z: "" });
  };
  return (
    <>
      <main>
        <Navbar />
        <section className={`w-full m-auto mt-10 text-center capitalize`}>
          <h1 className="text-xl sm:text-2xl md:text-3xl text-center font-serif text-lochmara-700 px-2">
            Kazh Group <span className="lowercase">is</span> working
            <span className="lowercase"> on</span> creating the following
            technology
          </h1>
          <section className="flex flex-col gap-y-2 mt-10 w-full items-center">
            <article
              id="a"
              className={`w-[60%]  md:w-[50%] lg:w-1/2 border bg-lochmara-900 py-2 px-1
           text-base md:text-xl font-serif text-white hover:shadow mt-1 rounded-md ease-out duration-300 
            `}
              style={
                transform.z === "a"
                  ? {
                      transform: `translate(${transform.x}px, ${transform.y}px)`,
                    }
                  : {}
              }
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              Web Development
            </article>
            <article
              id="b"
              className={`w-[60%]  md:w-[50%] lg:w-1/2 border bg-lochmara-900 py-2 px-1
           text-base md:text-xl font-serif text-white hover:shadow mt-1 rounded-md ease-out duration-300 
            `}
              style={
                transform.z === "b"
                  ? {
                      transform: `translate(${transform.x}px, ${transform.y}px)`,
                    }
                  : {}
              }
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              Database Development
            </article>
            <article
              id="d"
              className={`w-[60%]  md:w-[50%] lg:w-1/2 border bg-lochmara-900 py-2 px-1
           text-base md:text-xl font-serif text-white hover:shadow mt-1 rounded-md ease-out duration-300 
            `}
              style={
                transform.z === "d"
                  ? {
                      transform: `translate(${transform.x}px, ${transform.y}px)`,
                    }
                  : {}
              }
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              Mobile Application
            </article>
            <article
              id="e"
              className={`w-[60%]  md:w-[50%] lg:w-1/2 border bg-lochmara-900 py-2 px-1
           text-base md:text-xl font-serif text-white hover:shadow mt-1 rounded-md ease-out duration-300 
            `}
              style={
                transform.z === "e"
                  ? {
                      transform: `translate(${transform.x}px, ${transform.y}px)`,
                    }
                  : {}
              }
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              UI/UX Design
            </article>
            <article
              id="f"
              className={`w-[60%]  md:w-[50%] lg:w-1/2 border bg-lochmara-900 py-2 px-1
           text-base md:text-xl font-serif text-white hover:shadow mt-1 rounded-md ease-out duration-300 
            `}
              style={
                transform.z === "f"
                  ? {
                      transform: `translate(${transform.x}px, ${transform.y}px)`,
                    }
                  : {}
              }
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              Logo Design
            </article>
          </section>
        </section>
      </main>
    </>
  );
}

export default Services;
