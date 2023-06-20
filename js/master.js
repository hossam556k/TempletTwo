let mainColors= localStorage.getItem("color_op");
if(mainColors !== null){
    document.documentElement.style.setProperty('--main-color',localStorage.getItem("color_op"));
   
}




document.querySelector(".seettings-box .fa-gear").onclick=function() {

    document.querySelector(".seettings-box").classList.toggle("open");
    


}




//random background option
let backgroundOption=true;

//variable to control the interval
let backgroundInterval;

//cechk random
let backgroundLocalitem= localStorage.getItem("background_option");

// check if rndom bg not empty 
if (backgroundLocalitem !== null){
   if(backgroundLocalitem === 'true') {
    backgroundOption=true;
   }
   else {
    
    backgroundOption=false;
   }
   document.querySelectorAll(".random-background span").forEach(el => {
    el.classList.remove("active");
   })
   if(backgroundLocalitem === 'true'){
    document.querySelector(".random-background .yes").classList.add("active");
   }
   else {
    document.querySelector(".random-background .no").classList.add("active");
   }
    
}

//swtich colors
const colorsLi=document.querySelectorAll(".colors-list li");
// loop all on li
colorsLi.forEach(li => {
    li.addEventListener("click" , (e) => {
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
        localStorage.setItem("color_op",e.target.dataset.color);
        handleActive(e);

       

    });
})
//swtich rndom back-ground
const randomBackEl=document.querySelectorAll(".random-background span");
 //loop all spans
randomBackEl.forEach(span => {
    //click every span
    span.addEventListener("click" , (e) => {
        
      handleActive(e);
       

        if (e.target.dataset.background === "yes"){
           backgroundOption=true;

           randomizeImgs();

           localStorage.setItem("background_option",true);
        }else {
            backgroundOption=false;

            clearInterval(backgroundInterval);
            localStorage.setItem("background_option",false);
        }

    });
})




// function to randomiez Imgs 
function randomizeImgs(){
    if(backgroundOption===true){


    let landingPage = document.querySelector(".landing-page");

//get array of imges 
let imgeArray=["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"]


  backgroundInterval = setInterval(() => {
    let randomimges=Math.floor(Math.random() * imgeArray.length);
    //change back ground
landingPage.style.backgroundImage='url("imges/'+ imgeArray[randomimges]+'")';
    
}, 1000);

    }
}

let skills=document.querySelector(".skills");
let spans=document.querySelectorAll(".skill-progess span")


window.onscroll = function(){
    let skillsoffsetTop=skills.offsetTop;
    let skillsoffourHeight=skills.offsetHeight;
    let windowHeight=this.innerHeight;
    let windowScrollTop=this.pageYOffset;

    if(windowScrollTop > (skillsoffsetTop + skillsoffourHeight -windowHeight)){
       
        spans.forEach((span) => {
            span.style.width = span.dataset.width;
        })
      }
    };
    
    //create Popup with image 
    let ourGallery =document.querySelectorAll(".gallery img");

    ourGallery.forEach(img => {
        img.addEventListener('click' , (e) =>{
            // create overlay element 
            let overlay = document.createElement("div");

            //add class overlay 
            overlay.className="popup-overlay";

            //append overlay to the body 
            document.body.appendChild(overlay);
            //create element popup-box
            let popupBox=document.createElement("div");
            // class name
            popupBox.className=  "popup-box";
            if (img.alt !== null){
                // haeding 
                let imgheading =document.createElement("h3");

                //text node  
                let imgText=document.createTextNode(img.alt);
                //append heading 
                imgheading.appendChild(imgText);
                
                popupBox.appendChild(imgheading);
                         }
             
             //create img
             let popupimg=document.createElement("img");

             //set img saource 
             popupimg.src=img.src;
             //add imge to popub-box
             popupBox.appendChild(popupimg);

             //add boddy 
             document.body.appendChild(popupBox);
             
             //create to close span 
             let closeButton=document.createElement("span");

             //create to close button 
             let closebuttonText =document.createTextNode("x");

             closeButton.appendChild(closebuttonText);

             // add close 
             closeButton.className="close-button";
             
             popupBox.appendChild(closeButton);
            

             document.addEventListener("click",function(e){

                if(e.target.className=='close-button'){

                    e.target.parentNode.remove();

                    document.querySelector(".popup-overlay").remove();
                }
             })
        });
    });
    
    

//select all bulltes 
const allBulltes =document.querySelectorAll(".nav-bullets .bullet");
const alllinks =document.querySelectorAll(".links a");



function scrollToSomewhere(elements){
    elements.forEach(ele => {
        ele.addEventListener("click" , (e)=> {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:'smooth'
            });
        });
    });

}

scrollToSomewhere(allBulltes);
scrollToSomewhere(alllinks);

//active state
function handleActive(ev){
     //remvoe class active 
     ev.target.parentElement.querySelectorAll(".active").forEach(element =>{
        element.classList.remove("active");
    });
    //add active class
    ev.target.classList.add("active");
}


let bulletsSpan=document.querySelectorAll(".Show-bullets span");

 let bulletsContianer=document.querySelector(".nav-bullets"); 
  
let bulletsLocalItem = localStorage.getItem("Show-bullets");

if(bulletsLocalItem !== null){

    bulletsSpan.forEach(span => {
        span.classList.remove("active");
        });

}
if(bulletsLocalItem === 'block'){
    bulletsContianer.style.display="block";

    document.querySelector(".Show-bullets .yes").classList.add("active");
}
else {
    bulletsContianer.style.display="none";
    document.querySelector(".Show-bullets .no").classList.add("active");
}

 bulletsSpan.forEach(span => {
   span.addEventListener("click",(e) => {
    if(span.dataset.display === 'show'){
        bulletsContianer.style.display ="block";
        localStorage.setItem("Show-bullets", 'block');
    }
    else{
        bulletsContianer.style.display='none';

        localStorage.setItem("Show-bullets",'none');
    }
    handleActive(e);
})
    });
document.querySelector(".reset-options").onclick=function (){
    localStorage.clear();
    window.location.reload();
}


let toggleBtn=document.querySelector(".toggle-menu");
let tlinks =document.querySelector(".links");

toggleBtn.onclick=function(e){
    e.stopPropagation();

    this.classList.toggle("menu-active");

    tlinks.classList.toggle("open");
}

//click any where
document.addEventListener("click" , (e)=>{
    if(e.target !== toggleBtn && e.target !==tlinks){
        if(tlinks.classList.contains("open")){
            
    toggleBtn.classList.toggle("menu-active");

    tlinks.classList.toggle("open");
        }
    }
})

//stop pro on menu 
tlinks.onclick = function (e) {
    e.stopPropagation();
}