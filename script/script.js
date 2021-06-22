window.addEventListener('DOMContentLoaded', function () {
//    'use strict';
   
//    Таймер
   function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours');
        let timerMinutes = document.querySelector('#timer-minutes');
        let timerSeconds = document.querySelector('#timer-seconds');


        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime();
            let dateNow = new Date().getTime();
            let timeRemaining = (dateStop - dateNow) / 1000;
            let seconds = Math.floor(timeRemaining % 60);
            let minutes = Math.floor((timeRemaining / 60) % 60);
            let hours = Math.floor(timeRemaining / 60 / 60);
            return {timeRemaining, hours, minutes, seconds};
        }

        function addZero(event) {
            if (String(event).length === 1) { return '0' + event; } else { return String(event); }
        };

        function updateClock() {
            let timer = getTimeRemaining();
            timerHours.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);

            if (timer.timeRemaining < 0) {
                clearInterval(thisInterval);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        };

        updateClock();
   };
   let thisInterval = setInterval(countTimer, 1000, '20 june 2021');

//  Меню
   function toggleMenu() {
        const btnMenu = document.querySelector('.menu');
        const menu = document.querySelector('menu');

        function menuAddOrRemove() {
            menu.classList.toggle('active-menu')
        }

        function heandlerMenu(event) {
            const target = event.target;
            if (target.closest('.menu')) {
                menuAddOrRemove();
            } else if (target.closest('menu') && target.closest('[href^="#"]')) {
                menuAddOrRemove();
            } else if (!target.closest('menu')) {
                menu.classList.remove('active-menu');
            }
        }
        document.body.addEventListener('click', heandlerMenu)
        // btnMenu.addEventListener('click', heandlerMenu);
        // menu.addEventListener('click', heandlerMenu);
   }
   toggleMenu();

//    Модальное окно
   function tooglePopUp() {
        const popup = document.querySelector('.popup');
        const popupBtn = document.querySelectorAll('.popup-btn');
        const popupClose = document.querySelector('.popup-close');
        const popupContent = document.querySelector('.popup-content')

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                    popup.style.display = 'block';
                    // popupAnimationInLibrary();
                    if (document.body.clientWidth > 786) {
                        popupLibrary.counter = popupLibrary.start;
                        popupAnimation();
				    } 
            });
        });
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.popup-content');
            if (!target) {
                popup.style.display = 'none'; 
            }
        });
        
        const popupLibrary = {
                counter: -100,
                start: -100,
                speed: 70,
                end: 0, 
        }
        function popupAnimation() {
            popupLibrary.counter++;
            popupContent.style.transform = `translateX(${popupLibrary.counter - 12.5}%)`;
            if (popupLibrary.counter < popupLibrary.end) {
                requestAnimationFrame(popupAnimation);
            }
        };

    //    function popupAnimationInLibrary() {
    //        popup.classList.add('animate__animated');
    //        popup.classList.add('animate__backInUp');
    //    }
    //    popupAnimationInLibrary();
       
   }
   tooglePopUp();

//    Табы

   function tabs() {
       const tabHeader = document.querySelector('.service-header');
       const tab = tabHeader.querySelectorAll('.service-header-tab');
       const tabContent = document.querySelectorAll('.service-tab');

        function toggleTabContent(index) {
            for(let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        }

        tabHeader.addEventListener('click', (event) => {
        let target = event.target;
        target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    }
   tabs();

// Слайдер
    
    function slider() {
        const slide = document.querySelectorAll('.portfolio-item');
        const btn = document.querySelectorAll('.portfolio-btn');
        const dot = document.querySelectorAll('.dot');
        const slider = document.querySelector('.portfolio-content');

        let currentSlide = 0;
        let interval;

        function prevSlide(elem, index,strClass) {
            elem[index].classList.remove(strClass);
        }

        function nextSlide(elem, index,strClass) {
            elem[index].classList.add(strClass);            
        }

        function autoPlaySlide() {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        }

        function startSlide(time = 3000) {
            interval = setInterval(autoPlaySlide, time);
        }

        function stopSlide() {
            clearInterval(interval);
        }

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');            

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });


        startSlide(1500);
    }
// Добавление точек на слайде
    function addDots() {
        const portfolioItem = document.querySelectorAll('.portfolio-item');
        const portfolioDots = document.querySelector('.portfolio-dots')
        
        portfolioItem.forEach(() => {
            const dot = document.createElement('li');
            dot.classList.add('dot');
            portfolioDots.appendChild(dot)
        });

        portfolioDots.children[0].classList.add('dot-active');
    }
    addDots()

    slider();

});