import React from "react";
import { Link } from "react-router-dom";
function contact() {
  return (
    <section className="flex flex-col items-center justify-center w-full">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl text-center font-serif text-lochmara-700 px-2">
          Contact
        </h1>
      </div>
      <section className="flex justify-evenly items-center text-lochmara-900 w-full my-10">
        <Link
          to="https://www.facebook.com/kazhGroup/"
          className="flex items-center gap-x-2 font-sans"
        >
          <i className="fa-brands fa-facebook"></i> kazh Group
        </Link>
        <h1 className="flex items-center gap-x-2 font-sans">
          <i className="fa-solid fa-phone"></i> +964 770 030 70 70
        </h1>
        <Link
          to="https://l.facebook.com/l.php?u=https%3A%2F%2Finstagram.com%2Fkazhgroup%3Figshid%3DNTc4MTIwNjQ2YQ%253D%253D%26fbclid%3DIwAR1P1HtbCccgBEJkztXrrDRnFXJx68cY9Zd0BhneucOzxOJ5by2wbOy8YRg&h=AT01JXiXplSDin4-O-yhl8VkpwcEpVxZ7aqt5H96RiLZsipNKivAeTVi_ODdlyDI_UjSwo3RiWY_B9r_fqjt_X0ThUojAi3P5c79uyz2Rww7jvE3uXlVg3fbqfrhast3nh3BcA"
          className="flex items-center gap-x-2 font-sans"
        >
          <i className="fa-brands fa-square-instagram"></i> Kazh Group
        </Link>
      </section>
    </section>
  );
}

export default contact;
