document.getElementById("menu").onclick=()=>{
    document.getElementById("setting").style.left="0px"
}
document.getElementById("close").onclick=()=>{
    document.getElementById("setting").style.left="-450px"
}
document.getElementById("btn-show").onclick=()=>{
  document.getElementById("buttons").classList.add("show")
}
// slider 1
const slides = document.querySelectorAll('.slider img');
const arrows = document.querySelectorAll('.slider-controls .arrow .sahm');
const bullets = document.querySelectorAll(' .bullets li');



let currentSlide = 0;
let previousSlide = slides.length - 1;


function showSlide(slideIndex) {
  slides.forEach((slide) => {
    slide.style.display = 'none';
  });

  bullets.forEach((bullet) => {
    bullet.classList.remove('active');
  });

  slides[currentSlide].style.display = 'block';
  bullets[currentSlide].classList.add('active');
}


function goToPrevSlide() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  showSlide(currentSlide);
}


function goToNextSlide() {
  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  showSlide(currentSlide);
}


arrows.forEach((arrow) => {
  arrow.addEventListener('click', (e) => {
    if (e.target.classList.contains('left')) {
      goToPrevSlide();
    } else if (e.target.classList.contains('right')) {
      goToNextSlide();
    }
  });
});


bullets.forEach((bullet, index) => {
  bullet.addEventListener('click', () => {
    goToSlide(index);
  });
});


function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  showSlide(currentSlide);
}


showSlide(previousSlide);


slides[previousSlide].addEventListener('transitionend', () => {
  goToNextSlide();
});


////////////////////// slider2 ////////////////////////////////
const slides2 = document.querySelectorAll('.slider2 img');
const arrows2 = document.querySelectorAll('.slider-controls2 .arrow2 .sahm');
const bullets2 = document.querySelectorAll(' .bullets2 li');

let currentSlide2 = 0;
let previousSlide2 = slides2.length - 1;




function showSlide2(slideIndex) {
  slides2.forEach((slide) => {
    slide.style.display = 'none';
  });

  bullets2.forEach((bullet) => {
    bullet.classList.remove('active');
  });

  slides2[currentSlide2].style.display = 'block';
  bullets2[currentSlide2].classList.add('active');
}


function goToPrevSlide2() {
  currentSlide2--;
  if (currentSlide2 < 0) {
    currentSlide2 = slides2.length - 1;
  }
  showSlide2(currentSlide2);
}

function goToNextSlide2() {
  currentSlide2++;
  if (currentSlide2 >= slides2.length) {
    currentSlide2 = 0;
  }
  showSlide2(currentSlide2);
}


arrows2.forEach((arrow) => {
  arrow.addEventListener('click', (e) => {
    if (e.target.classList.contains('left')) {
      goToPrevSlide2();
    } else if (e.target.classList.contains('right')) {
      goToNextSlide2();
    }
  });
});

bullets2.forEach((bullet, index) => {
  bullet.addEventListener('click', () => {
    goToSlide2(index);
  });
});


function goToSlide2(slideIndex) {
  currentSlide2 = slideIndex;
  showSlide2(currentSlide2);
}


showSlide2(previousSlide2);


slides2[previousSlide2].addEventListener('transitionend', () => {
  goToNextSlide2();
});



////////////////////// slider3 ////////////////////////////////


$(document).ready(function() {
  const slides3 = $('.slider3 img');
  const arrows3 = $('.slider-controls3 .arrow3 .sahm');
  const bullets3 = $('.bullets3 li');

  let currentSlide3 = 0;
  let previousSlide3 = slides3.length - 1;

  function showSlide3(slideIndex) {
    slides3.hide();
    bullets3.removeClass('active');
    slides3.eq(currentSlide3).show();
    bullets3.eq(currentSlide3).addClass('active');
  }

  function goToPrevSlide3() {
    currentSlide3--;
    if (currentSlide3 < 0) {
      currentSlide3 = slides3.length - 1;
    }
    showSlide3(currentSlide3);
  }

  function goToNextSlide3() {
    currentSlide3++;
    if (currentSlide3 >= slides3.length) {
      currentSlide3 = 0;
    }
    showSlide3(currentSlide3);
  }

  arrows3.on('click', function() {
    if ($(this).hasClass('left')) {
      goToPrevSlide3();
    } else if ($(this).hasClass('right')) {
      goToNextSlide3();
    }
  });

  bullets3.on('click', function() {
    const slideIndex = bullets3.index(this);
    goToSlide3(slideIndex);
  });

  function goToSlide3(slideIndex) {
    currentSlide3 = slideIndex;
    showSlide3(currentSlide3);
  }

  showSlide3(previousSlide3);

  slides3.eq(previousSlide3).on('transitionend', function() {
    goToNextSlide3();
  });
});
