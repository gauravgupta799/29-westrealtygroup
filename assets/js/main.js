gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline();

// function hideLoader() {
//   const loader = document.querySelector(".loader-container");
//   loader.style.transform = "translateY(-100%)";
// }

console.log("start")


//========= Testimonials Swiper start =============
const swiper = new Swiper(".swiper",{
    direction: "horizontal",
    spaceBetween: 10,
    loop:true,
    grabCursor: true,
    navigation:{
        prevEl: ".backward-button",
        nextEl: ".forward-button",
    },
    parallax: true,
})
//========= Testimonials Swiper end =============
