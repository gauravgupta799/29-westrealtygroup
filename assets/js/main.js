const html = document.querySelector("html");
const hamburgerBtn = document.getElementById("hamburgur");
const closeMenuBtn = document.getElementById("close-menu-btn");
const header = document.querySelector(".header");
const main = document.querySelector(".main");


gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline();

//========= Lenis Start =========
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    infinite: false,
    syncTouch:false, // mimic touch device scroll while allowing scroll sync (can be unstable on iOS<16)
    smooth: true,
    smoothTouch: false,
});

function raf(time){
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
//========= Lenis End =========
let isOpened = false;
function stopLenisScroll(){
  isOpened = !isOpened;
  isOpened ?  lenis.stop() : lenis.start() 
}


function hideLoader(){
    tl.to(".loader-upper",{
        y:"-100%",
        duration:0.8,
        ease: "sine.inOut",
    })
    tl.to(".loader-inner",{
        x:"100%",
        duration:0.8,
        ease: "sine.inOut",
    }, "-=0.15")
}

//========= Hide the Navbar when scrolling down start =========
let lastScrollTop = 0;
const checkScroll = () => {
    let scrollTop = lenis.scrollY || document.documentElement.scrollTop;
    if(scrollTop > lastScrollTop) {
        header.classList.remove("sticky");
        header.classList.add("hidden");
    }else {
        scrollTop === 0 ?  header.classList.remove("sticky") : header.classList.add("sticky");
        header.classList.remove("hidden");
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}
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
function toggleMenu(){
    const mobileMenu = document.querySelector('.header--mobile');
    mobileMenu.classList.toggle("hide");
    stopLenisScroll();
}

hamburgerBtn.addEventListener('click', () => {
    toggleMenu();
    tl.from(".header--mobile", 0.9, { 
        x: "-100%",
        ease: "power4.inOut",
    })
    tl.from(".menu-img", 1,{
        opacity:0,
        x:-50,
        delay:-0.65,
        ease: "power4.inOut",
    })
    tl.from(".nav__link", 0.9,{
        opacity:0,
        y:-50,
        stagger:0.1,
        delay:-0.65,
        ease: "power4.inOut",
    },)
    tl.from(".contact-list__link", 0.86,{
        opacity:0,
        x:-50,
        stagger:0.12,
        delay:-1.2,
        ease: "power4.inOut",
    },)
    tl.from(".socials__link", 0.9, {
        opacity:0,
        x:-100,
        stagger:0.15,
        delay:-1.25,
        ease: "power3.inOut",
    },)
});

closeMenuBtn && closeMenuBtn.addEventListener('click', toggleMenu);
//======= Toggle Menu ENd =============


//========= Swipers Start =============
const swiperTestimonials = new Swiper(".swiper-testimonials",{
    direction: "horizontal",
    spaceBetween: 30,
    loop:true,
    grabCursor: true,
    navigation:{
        prevEl: "#prev-btn",
        nextEl: "#next-btn",
    },
});


// ======== large thumbnail slider ===========
var galleryTop = new Swiper(".gallery-top", {
    spaceBetween: 10,
    grabCursor: true,
    loop: true,
    loopedSlides: 4,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    on: {
      click: function() {
        /* do something */
      }
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false
    }
  });
  
// ========== single property gallery img slider ==========
var galleryThumbs = new Swiper(".gallery-thumbs", {
    spaceBetween: 10,
    centeredSlides: true,
    touchRatio: 0.4,
    slideToClickedSlide: true,
    loop: true,
    loopedSlides: 4,
    slidesPerView: 3,
    breakpoints: {
        576: {
            slidesPerView: 3,
        },
        767: {
            slidesPerView: 4,
        },
        992: {
            slidesPerView: 5,
        },
        1200: {
            slidesPerView: 6,
        },
    },
    keyboard: {
        enabled: true,
        onlyInViewport: false
    }
});
  
/* set conteoller  */
if( galleryTop && galleryThumbs){
    galleryTop.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryTop;
}


// -----------------------------------
const swiperFollows = new Swiper(".swiper-container-follows",{
    spaceBetween: 10,
    slidesPerView: 1.2455,
    loop:true,
    grabCursor: true,
    breakpoints:{
        480:{
            slidesPerView: 1.65,
        },
        576:{
            slidesPerView: 2.65,
        },
        992:{
            slidesPerView: 3.25,
        },
        1200:{
            slidesPerView: 3.65,
        },
    }
});

//========== Timeline animtion start =================
var mySwiper1 = new Swiper(".swiper-imgs-container", {
    autoHeight: true,
    spaceBetween:20,
    slidesPerView:1,
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
    autoHeight: true,
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
        stagger:0.1,
        ease: "power3.inOut",
    },"-=0.78")
    tl.from(".banner-subtitle ",{
        opacity:0,
        y:50,
        duration:1,
        stagger:0.01,
        ease: "power3.inOut",
    },"-=0.85")
    tl.from(".banner-btn",{
        opacity:0,
        y:50,
        duration:1,
        ease: "power3.inOut",
    },"-=0.95")
    tl.from(".cta-link",{
        opacity:0,
        y:50,
        duration:1,
        stagger:0.1,
        ease: "power3.inOut",
    },"-=1.0");
    tl.from(".cta-link-item",{
        opacity:0,
        y:50,
        duration:1,
        stagger:0.2,
        ease: "power3.inOut",
    },"-=1.5");
    tl.from(".banner-img",{
        opacity: 0, 
        y: 50, 
        scale:0.9, 
        duration:1,
        transformOrigin:"bottom",
        ease: "power3.out",
    },"-=1.15")

    const formGroup = document.querySelectorAll(".banner-form-group");
    if(formGroup.length > 0){
        tl.from(".banner-form-group",{
            opacity:0,
            y:50,
            duration:1,
            stagger:0.1,
            ease: "power3.inOut",
        },"-=2.5");
    }
    const bannerSubtitle = document.querySelector(".banner-subTitle");
    if(bannerSubtitle){
        tl.from(".banner-subTitle",{
            opacity:0,
            y:50,
            duration:1,
            stagger:0.1,
            ease: "power3.inOut",
        },"-=3.5");
    }
    const galleryThumbImages = document.querySelectorAll(".gallery-thumbs-figure");
    if(galleryThumbImages.length > 0){
        const galleryThumb = gsap.utils.toArray(galleryThumbImages)
        tl.from(galleryThumb ,{
            y:50, opacity:0, duration:1, stagger:0.15, ease:Power3.easeOut,
        },"-=2.65")
    }
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
    const featuredCards = document.querySelectorAll(".featured__card-figure");
    const featuredCard = gsap.utils.toArray(featuredCards);
    if(featuredCard){
        tl.fromTo(featuredCard, 1, 
            { opacity: 0, y: 60,},
            { opacity: 1, y: 0, stagger:0.2, ease: "power3.inOut" },
        "-=1.6")
    } 
}

window.addEventListener("load", (e) =>{
    tabBtns && filterCards("all");
    hideLoader();
    bannerAnimation();
});
//========== Banner animtion end =================

// JavaScript for lazy loading background images start
let lazyBackgrounds = [].slice.call(document.querySelectorAll("[data-bg]"));

if("IntersectionObserver" in window){
    const lazyBackgroundObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                let lazyBackground = entry.target;
                let imgUrl = lazyBackground.getAttribute("data-bg");
                if(entry.target.classList.contains("banner-container")){
                    let linearGredient = "linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))";
                    lazyBackground.style.backgroundImage = `${linearGredient}, url("${imgUrl}")`;
                }else{
                    lazyBackground.style.backgroundImage = `url("${imgUrl}")`;
                }
                lazyBackground.classList.remove("lazy");
                lazyBackgroundObserver.unobserve(lazyBackground);
            }
        });
    });

    lazyBackgrounds.forEach((lazyBackground) =>{
        lazyBackgroundObserver.observe(lazyBackground);
    });
}
// JavaScript for lazy loading background images End



//=========== Animation Start ==============
const fadeUp = gsap.utils.toArray(".fade-up");
fadeUp.forEach((item, index) => {
    const anim =  gsap.fromTo(item,
        { opacity:0,  y:60},
        { opacity:1, y:0, duration:1.1}
    );
    ScrollTrigger.create({
        trigger:item,
        animation:anim,
        toggleActions:"play",
        once:true,
        // duration:1.1,
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
        // duration:1.5,
        stagger:0.2,
        ease: Power4.easeOut,
    })
})

const fadeRight = gsap.utils.toArray(".fade-right");
fadeRight.forEach((item, index) => {
    const anim =  gsap.fromTo(item,
        { opacity:0, x:-50},
        { opacity:1,x:0, duration:1.5,},
    );
    ScrollTrigger.create({
        trigger:item,
        animation:anim,
        toggleActions:"play",
        once:true,
        // duration:1.5,
        stagger:0.2,
        ease: Power4.easeOut,
    })
})


// animation on image container
const imagesScale = gsap.utils.toArray(".scale-up");
imagesScale.forEach((imgContainer, i) => {
  const anim = gsap.fromTo(imgContainer,
    { opacity: 0, y: 50, scale:0.9, transformOrigin:"bottom"},
    { opacity: 1, y: 0, scale:1, duration:1.15,}
  );
  ScrollTrigger.create({
    trigger:imgContainer,
    animation: anim,
    toggleActions: "play",
    duration: 1.15,
    // stagger:0.1,
    ease: Power4.easeOut,
  });
});


// animation on image container
const dividers = gsap.utils.toArray(".divider");
dividers.forEach((divider, i) => {
  const anim = gsap.fromTo(divider,
    { opacity: 0,width:"0", scale:0, transformOrigin:"left" },
    { opacity: 1, width:"100%", scale:1, duration:1.15,}
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
lenis.on('scroll', (e) => {
    ScrollTrigger.update();
});

gsap.ticker.lagSmoothing(0);