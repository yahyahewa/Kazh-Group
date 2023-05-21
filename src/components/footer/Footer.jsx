import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  const currentYear = new Date().getFullYear();
  const logo =
    "https://scontent.febl2-1.fna.fbcdn.net/v/t39.30808-6/338972313_239979318401197_4033842869750944320_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6l0ZFLTn0swAX9-XEUj&_nc_oc=AQlnXTvu9-0zOK8GT6P6uc1nJPHEuwoF8ijH8oYIm37uQI859_TSHK7J-crTTOjhXzw&_nc_ht=scontent.febl2-1.fna&oh=00_AfByjsKHlwLxWhWOlDA13jSPOsLBrOjkYWc2rxer9m6pvw&oe=646AA136";
  return (
    <footer
      className={`w-full md:w-[90%] m-auto flex items-center flex-wrap
       justify-between sm:justify-evenly border-t px-2 py-4 mt-5 gap-3`}
    >
      <article className="flex flex-row items-center justify-center  ">
        <img src={logo} className="w-[60px]" />

        <div className="ml-2 text-lochmara-950">
          <Link to="https://www.facebook.com/kazhGroup/">
            <i className="fa-brands fa-square-facebook fa-lg mr-1"></i>
          </Link>
          <Link to="https://l.facebook.com/l.php?u=https%3A%2F%2Finstagram.com%2Fkazhgroup%3Figshid%3DNTc4MTIwNjQ2YQ%253D%253D%26fbclid%3DIwAR1P1HtbCccgBEJkztXrrDRnFXJx68cY9Zd0BhneucOzxOJ5by2wbOy8YRg&h=AT01JXiXplSDin4-O-yhl8VkpwcEpVxZ7aqt5H96RiLZsipNKivAeTVi_ODdlyDI_UjSwo3RiWY_B9r_fqjt_X0ThUojAi3P5c79uyz2Rww7jvE3uXlVg3fbqfrhast3nh3BcA">
            <i className="fa-brands fa-square-instagram fa-lg"></i>
          </Link>
        </div>
      </article>
      <article
        className="text-center text-lochmara-900 flex items-center justify-center
       font-medium"
      >
        <i className="fa-solid fa-copyright mr-1"></i>
        {currentYear}
        <h1 className="ml-1">Kazh Group</h1>
      </article>
    </footer>
  );
}

export default Footer;
