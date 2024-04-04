const html = document.querySelector("html");
const hamburgerBtn = document.getElementById("hamburgur");
const closeMenuBtn = document.getElementById("close-menu-btn");
const header = document.querySelector(".header");
const main = document.querySelector(".main");


gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline();

//========= Lenis Start =========
const lenis = new Lenis({
    duration: 1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical", // vertical, horizontal
    gestureOrientation: "vertical", // vertical, horizontal, both
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 1,
    infinite: false
});
  
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
//========= Lenis End =========


function hideLoader(){
    tl.to(".loader-upper",{
        y:"-100%",
        duration:0.9,
        ease: "sine.inOut",
    })
    tl.to(".loader-inner",{
        x:"100%",
        duration:0.9,
        ease: "sine.inOut",
    }, "-=0.2")
}

//========= Hide the Navbar when scrolling down start =========
let lastScrollTop = 0;
const checkScroll = () => {
    // let scrollTop = locoScroll.scrollY || document.documentElement.scrollTop;
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    if(scrollTop > lastScrollTop) {
        header.classList.remove("sticky");
        header.classList.add("hidden");
    }else {
        scrollTop === 0 ?  header.classList.remove("sticky") : header.classList.add("sticky");
        header.classList.remove("hidden");
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}

// window.addEventListener("scroll", checkScroll);
//========= Hide the Navbar when scrolling down end =========


//======  Active Page Link start ======
const windowPathname = window.location.pathname;
const navLinks = document.querySelectorAll(".nav__link");
navLinks.forEach(link =>{
  const navLinkPathname = new URL(link.href).pathname;
  if((windowPathname === navLinkPathname) || (windowPathname === "/index.html" && navLinkPathname === "/")){
    link.classList.add("active");
  }else{
    link.classList.remove("active");
  }
})
//======  Active Page Link end ======


//======= Toggle Menu Start =============
let isOpened = false;
function toggleMenu(){
	isOpened = !isOpened;
    const mobileMenu = document.querySelector('.header--mobile');
    mobileMenu.classList.toggle("hide");
    isOpened ?  lenis.stop() : lenis.start() 
}

hamburgerBtn.addEventListener('click', () => {
    toggleMenu();
    tl.from(".header--mobile", 1, { 
        x: "-100%",
        ease: "power3.inOut",
    })
    tl.from(".menu-img", 1,{
        opacity:0,
        x:-50,
        delay:-0.65,
        ease: "power3.inOut",
    })
    tl.from(".nav__link", 0.9,{
        opacity:0,
        y:50,
        ease: "power3.inOut",
        stagger:0.12,
        delay:-0.65,
    },)
    tl.from(".contact-list__link", 0.86,{
        opacity:0,
        x:-50,
        stagger:0.12,
        delay:-1.2,
        ease: "power3.inOut",
    },)
    tl.from(".socials__link", 0.9, {
        opacity:0,
        x:-100,
        stagger:0.15,
        delay:-1.25,
        ease: "power3.inOut",
    },)
});

if(closeMenuBtn){
    closeMenuBtn.addEventListener('click', toggleMenu);
}
//======= Toggle Menu ENd =============


//======= Scroll-Now Start =============
// const scrollButton = document.getElementById('scrollButton');
// const targetSection = document.getElementById('targetSection');
// if(scrollButton &&  targetSection ){
//     scrollButton.addEventListener('click', function(){
//         gsap.to(window, {
//             duration: 1, 
//             scrollTo: {
//                 y: targetSection,
//                 offsetY: 0
//             },
//             ease: "sine.inOut",
//         });
//     });
// }
//======= Scroll-Now End =============

const learnMoreBtn = document.querySelector(".learn-more-btn");
let scale = 1;
let X, Y;

function mousemoveHandler(e) {
    X = e.clientX;
    Y = e.clientY;
    const target = e.target;
    const tl = gsap.timeline({
        default:{ x:X,  y:Y, ease: "power2.out",}
    })
    if(target.tagName.toLowerCase() === "img" && target.closest(".grid__container--team")){
        tl.to(learnMoreBtn, {
            opacity:1,
            zIndex:5,
            duration: .5,
            ease:"power2.out",
            x:X,
            y:Y
        });
    }else{
        tl.to(learnMoreBtn, {
            opacity:0,
            x:X,
            y:Y
        });
    }
}

function mouseleaveHandler(){
    gsap.to(learnMoreBtn , {
      opacity: 0,
    });
}
  
if(learnMoreBtn){
    document.addEventListener("mousemove", mousemoveHandler);
    document.addEventListener("mouseleave", mouseleaveHandler);
}


//========= Swipers Start =============
const swiper1 = new Swiper(".swiper-testimonials",{
    direction: "horizontal",
    spaceBetween: 30,
    loop:true,
    grabCursor: true,
    navigation:{
        prevEl: ".backward-button",
        nextEl: ".forward-button",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    },
});

const swiper2 = new Swiper(".swiper-container-follows",{
    spaceBetween: 10,
    slidesPerView: 1.25,
    loop:true,
    grabCursor: true,
    breakpoints:{
        480:{
            slidesPerView: 1.75,
        },
        576:{
            slidesPerView: 2.25,
        },
        992:{
        slidesPerView: 3.25,
        },
        1200:{
        slidesPerView: 4.25,
        },
    }
});

var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 10,
    slidesPerView: 2,
    loop:true,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: true,
    breakpoints:{
        480:{
            slidesPerView: 3,
        },
        768:{
            slidesPerView: 4,
            spaceBetween: 15,
        },
        1200:{
            slidesPerView: 6,
        },
    }
});

var galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
    grabCursor: true,
    thumbs: {
    swiper: galleryThumbs
    }
});
const fill = document.querySelector(".swiper-pagination-progressbar-fill");
console.log(fill);

//========== Timeline animtion start =================
var mySwiper1 = new Swiper(".swiper-container--timeline", {
    autoHeight: true,
    spaceBetween:20,
    slidesPerView:1.4,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    speed: 500,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar"
    },
    loop: false,
    effect: "slide",
    on: {
      init: function () {
        $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
        $(".swiper-pagination-custom .swiper-pagination-switch").eq(0).addClass("active");
      },
      slideChangeTransitionStart: function () {
        // $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
        $(".swiper-pagination-custom .swiper-pagination-switch").eq(mySwiper1.realIndex).addClass("active");
      }
    }
});
  
let mySwiper2 = new Swiper(".swiper-container--content", {
    slidesPerView: "auto",
    allowTouchMove: false,
    grabCursor: true,
    touchRatio: 0,
    effect: "slide",
    speed: 500,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar"
    },
    autoplay: {
        delay: 2000,
        disableOnInteraction: false
    },
    // on: {
    //     init: function () {
    //       $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
    //       $(".swiper-pagination-custom .swiper-pagination-switch").eq(0).addClass("active");
    //     },
    //     slideChangeTransitionStart: function () {
    //       $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
    //       $(".swiper-pagination-custom .swiper-pagination-switch").eq(mySwiper2.realIndex).addClass("active");
    //     },
    // }
});

$(".swiper-pagination-custom .swiper-pagination-switch").click(function(){
    mySwiper1.slideTo($(this).index());
    mySwiper2.slideTo($(this).index());
    $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
    $(this).addClass("active");
});
//========== Timeline animtion end =================

//========= Swipers End =============


//======= Counter Start =============
function visible(partial) {
    let $t = partial,
    $w = jQuery(window),
    viewTop = $w.scrollTop(),
    viewBottom = viewTop + $w.height(),
    _top = $t.offset().top,
    _bottom = _top + $t.height(),
    compareTop = partial === true ? _bottom : _top,
    compareBottom = partial === true ? _top : _bottom;

    return (
    compareBottom <= viewBottom && compareTop >= viewTop && $t.is(":visible")
    );
}

function handleCounter(){
    const myCounter = document.querySelector('.count-digit');
    if(myCounter){
        if(visible($(".count-digit"))) {
            if ($(".count-digit").hasClass("counter-loaded")) return;
            $(".count-digit").addClass("counter-loaded");

            $(".count-digit").each(function () {
                if ($(this).html() == Math.floor($(this).html())) {
                    var $this = $(this);
                    jQuery({ Counter: 0 }).animate(
                    { Counter: $this.text() },
                    {
                        duration: 1000,
                        easing: "swing",
                        step: function () {
                            $this.text(Math.trunc(this.Counter) + 1);
                        },
                    }
                    );
                } else {
                    var $this = $(this);
                    jQuery({ Counter: 0 }).animate(
                    { Counter: $this.text() },
                    {
                        duration: 1000,
                        easing: "swing",
                        step: function () {
                            $this.text(((this.Counter * 10) / 10).toFixed(1));
                        },
                    }
                    );
                }
            });
        }
    }
} 
//======= Counter End =============


//====== custome cursor start ======
// var cursor = document.querySelector('.cursor'),
// cursorScales = document.querySelectorAll('.cursor-scale')
// mouseX = 0,
// mouseY = 0;
// gsap.to({}, 0.016, {
//     repeat:-1,
//     duration:0.75,
//     ease:"power2.out",
//     onRepeat:function(){
//         gsap.set(cursor,{
//             css:{
//                 left:mouseX,
//                 top:mouseY
//             }
//         })
//     }
// })
// cursorScales.forEach((cursorScale)=>{
//     cursorScale.addEventListener("mousemove", ()=>{
//         cursor.classList.add('grow');
//         if(cursorScale.classList.contains('small')){
//             cursor.classList.remove('grow');
//             cursor.classList.add('grow-small');
//         }
//     });
//     cursorScale.addEventListener("mouseleave", ()=>{
//         cursor.classList.remove('grow');
//         cursor.classList.remove('grow-small');
//     });
// });

// window.addEventListener("mousemove", (e) => {
//     mouseX = e.clientX;
//     mouseY = e.clientY;
// });

//====== custome cursor end ======


//========= Open Modal Video Start =============
// const modal = document.getElementById("modal");
// const closeBtn = document.getElementById("close-btn");
// const openVideoBtns = document.querySelectorAll(".open-video");
// const videoIframe = document.getElementById("video-iframe");
// const baseUrl = "https://www.youtube.com/embed";

// const testimonersVideoId = [
//     "0kWG5o7G5HE?si=aGpqv9kaaQliczP7", 
//     "o6oqc5XBKQc?si=lhekscWfS2TX8B9S",
//     "50ethB3GQho?si=4Nqjv56m3oaVapOv"
// ];

// let isModalActive = false;
// function toggleModal(){
//     isModalActive = !isModalActive;
//     modal.style.display = isModalActive ? "grid" : "none"
//     isModalActive ? lenis.stop() : lenis.start();
// }

// if(openVideoBtns && modal){
//     openVideoBtns.forEach((playbtn, index)=>{
//         playbtn.addEventListener("click", ()=>{
//             videoIframe.src = `${baseUrl}/${testimonersVideoId[index]}`;
//             toggleModal();
//         });
//     });
//     closeBtn.addEventListener("click", ()=>{
//         videoIframe.src = "";
//         toggleModal();
//     });
// }
//========= Open Modal Video End =============


//========== Filter Cards Start =================
const tabBtns = document.querySelectorAll(".tabs__item");
if(tabBtns.length > 0){
    tabBtns.forEach(function(tab) {
        tab.addEventListener("click", function(event) {
            const categoryType = event.currentTarget.getAttribute("value");
            filterCards(categoryType)
        });
    });
}

function filterCards(categoryType){
    const cards = document.querySelectorAll("#grid-properties > .grid-item");
    cards.forEach((card, index) => {
        let cardCategories = card.getAttribute("data-category").split(" ");
        if(categoryType === "all" || cardCategories.includes(categoryType)){
            card.classList.add("show");
            gsap.fromTo(card, 
                { opacity: 0, scale: 0, transformOrigin:"center",},
                { opacity: 1, scale: 1, duration:0.75, ease:"sine.inOut",},
            );
        }else{
            card.classList.remove("show");
            gsap.to(card, { duration: 0.75, opacity: 1, scale: 1, ease: "sine.inOut"} );
        }
    });
    updateTabStatus(categoryType)
}

function updateTabStatus(category){
    tabBtns.forEach((tab) => {
        tab.classList.remove("active");
        if(tab.getAttribute("value") === category){
            tab.classList.add("active");
        }
    })
}
//========== Filter Cards End =================


//========== Banner animtion start =================
function bannerAnimation(){
    tl.from(".header__wrapper",{
        opacity:0,
        duration:1,
        ease: "power3.inOut",
    },"-=0.6")
    tl.from(".banner-title",{
        opacity:0,
        y:50,
        duration:1,
        ease: "power3.inOut",
    },"-=0.78")
    const bannerSubtitle = document.querySelector(".banner-subTitle");
    if( bannerSubtitle){
        tl.from(".banner-subTitle",{
            opacity:0,
            y:50,
            duration:1,
            ease: "power3.inOut",
        },"-=0.88");
    }
    const galleryThumbImages = document.querySelectorAll(".gallery-thumbs-figure");
    if(galleryThumbImages.length > 0){
        const galleryThumb = gsap.utils.toArray(galleryThumbImages)
        tl.from(galleryThumb ,{
            y:50, opacity:0, duration:1, stagger:0.15, ease:Power3.easeOut,
        },"-=0.8")
    }
    // if(scrollButton &&  targetSection ){
    //     tl.from(".scroll-down-wrapper",{
    //         opacity:0,
    //         duration:1,
    //         ease: "power3.inOut",
    //     }, "-=0.9");
    // }
    if(tabBtns.length > 0){
        const tabs = gsap.utils.toArray(tabBtns);
        tl.fromTo(tabs,
            { y:60 },
            {  y:0, duration:1, stagger:0.1, ease: "power3.inOut" },
        "-=1.3");
    }
    const divider = document.querySelector(".divider");
    if(divider){
        tl.fromTo(".divider", 1.78,
            { scale:0, transformOrigin:"left" },
            { scale:1, ease: "power3.inOut" },
        "-=1.52");
    }
    const featuredCard = document.querySelector(".featured__card");
    if(featuredCard){
        tl.fromTo(".featured__card", 1, 
            { opacity: 0, y: 50,},
            { opacity: 1, y: 0, ease: "power3.inOut" },
        "-=1.7")
    } 
}

window.addEventListener("load", (e) =>{
    tabBtns && filterCards("all");
    hideLoader();
    bannerAnimation();
});
//========== Banner animtion end =================


//=========== Animation Start ==============
const fadeUp = gsap.utils.toArray(".fade-up");
fadeUp.forEach((item, index) => {
    const anim =  gsap.fromTo(item,
        { opacity:0,  y:50},
        { opacity:1, y:0, duration:1.2}
    );
    ScrollTrigger.create({
        trigger:item,
        animation:anim,
        toggleActions:"play",
        once:true,
        duration:1.2,
        stagger:0.2,
        ease: Power4.easeOut,
    })
})


const fadeIn = gsap.utils.toArray(".fade-in");
fadeIn.forEach((item, index) => {
    const anim =  gsap.fromTo(item,
        { opacity:0},
        { opacity:1, duration:1.5,},
    );
    ScrollTrigger.create({
        trigger:item,
        animation:anim,
        toggleActions:"play",
        once:true,
        duration:1.5,
        // stagger:0.2,
        ease: Power4.easeOut,
    })
})


// animation on image container
const imagesScale = gsap.utils.toArray(".scale-up");
imagesScale.forEach((imgContainer, i) => {
  const anim = gsap.fromTo(imgContainer,
    { opacity: 0, y: 50, scale:0.9, transformOrigin:"bottom"},
    { opacity: 1, y: 0, scale:1, duration:1.25, }
  );
  ScrollTrigger.create({
    trigger:imgContainer,
    animation: anim,
    toggleActions: "play",
    duration: 1.25,
    // stagger:0.1,
    ease: Power4.easeOut,
  });
});


// animation on image container
const dividers = gsap.utils.toArray(".divider");
dividers.forEach((divider, i) => {
  const anim = gsap.fromTo(divider,
    { opacity: 0,width:"0", scale:0, transformOrigin:"left" },
    { opacity: 1, width:"100%", scale:1, duration:1.2,}
  );
  ScrollTrigger.create({
    trigger:divider,
    animation: anim,
    toggleActions: "play",
    once: true,
    stagger:0.2,
    ease: Power4.easeOut,
  });
});

//=========== Animation End ==============

function handleScroll(){
    checkScroll();
    handleCounter();
}

window.addEventListener("scroll", handleScroll);

// Update ScrollTrigger when Lenis scroll event occurs
lenis.on('scroll', () => {
    ScrollTrigger.update();
});

// gsap.ticker.add((time)=>{
//     lenis.raf(time * 1000);
// });
  
gsap.ticker.lagSmoothing(0);