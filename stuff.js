
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