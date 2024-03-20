// function hideLoader() {
//   const loader = document.querySelector(".loader-container");
//   loader.style.transform = "translateY(-100%)";
// }

const html = document.querySelector("html");
const hamburgerBtn = document.getElementById("hamburgur");
const closeMenuBtn = document.getElementById("close-menu-btn");

gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline();

//======= Toggle Menu Start =============
function toggleMenu(){
    const mobileMenu = document.querySelector('.header--mobile');
    mobileMenu.classList.toggle("hide");
    html.classList.toggle("overflow-hidden");
}

hamburgerBtn.addEventListener('click', () => {
    toggleMenu();
    tl.from(".header--mobile", 0.5, { 
        x: "-100%",
        ease:"power3.easeIn"
    })
    tl.from(".menu-img", 0.65,{
        opacity:0,
        x:-50,
        ease:"power3.easeIn"
    })
    tl.from(".nav__link", 0.76,{
        opacity:0,
        y:-60,
        ease:"power4.easeInOut",
        stagger:0.1,
        delay:-0.65,
    },)
    tl.from(".contact-list__link", 0.86,{
        opacity:0,
        x:60,
        stagger:0.1,
        delay:-1.2,
        ease:"power4.easeInOut",
    },)
    tl.from(".socials__link", 1,{
        opacity:0,
        x:-100,
        stagger:0.2,
        delay:-1.25,
        ease:"power4.easeIn",
    },)
});

if(closeMenuBtn){
    closeMenuBtn.addEventListener('click', () => toggleMenu());
}
//======= Toggle Menu ENd =============


//========= Swipers Start =============
const swiper1 = new Swiper(".swiper-testimonials",{
    direction: "horizontal",
    spaceBetween: 10,
    loop:true,
    grabCursor: true,
    navigation:{
        prevEl: ".backward-button",
        nextEl: ".forward-button",
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
            slidesPerView: 2.5,
        },
        992:{
           slidesPerView: 3.5,
        },
        1200:{
           slidesPerView: 4.5,
        },
    }
});

var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 10,
    slidesPerView: 2,
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
  
$(window).scroll(function () {
    const myCounter = document.querySelector('.count-digit');
    if (myCounter) {
      if (visible($(".count-digit"))) {
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
});
//======= Counter End =============


//========= Open Modal Video Start =============
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close-btn");
const openVideoBtns = document.querySelectorAll(".open-video");


if(openVideoBtns && modal){
    openVideoBtns.forEach((playbtn)=>{
        playbtn.addEventListener("click", ()=> showModal());
    });
}

function showModal(){
    modal.style.display = "grid";
    html.classList.add("overflow-hidden");
}

function hideModal(){
    modal.style.display = "none";
    html.classList.remove("overflow-hidden");
}

closeBtn && closeBtn.addEventListener("click",()=> hideModal());

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
//========= Open Modal Video End =============



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
            gsap.from(card, { 
                duration: 0.5, 
                y:60,
                opacity: 0, 
                scale: 0,
                transformOrgin:"center", 
                ease: "power3.easeOut" 
            });
        }else{
            card.classList.remove("show");
            gsap.to(card, { 
              duration: 0.5, 
              y:0,
              opacity: 1, 
              scale: 1, 
              ease: "power3.easeOut" 
            });
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

window.addEventListener("load", function(e) {
    tabBtns && filterCards("all");
});
