// slick sliders

$('.germangallery__carousel').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 500,
    lazyLoad: 'ondemand',
    arrows: true,
    prevArrow: $('.germangallery__left'),
    nextArrow: $('.germangallery__right'),
    // autoplay: true,
    // autoplaySpeed: 2000,
});

$('.gallery__carousel').slick({

    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    lazyLoad: 'ondemand',
    arrows: true,
    prevArrow: $('.gallery__left'),
    nextArrow: $('.gallery__right'),

    centerMode: true,
    centerPadding: '300px',

    responsive: [

  {
    breakpoint: 1280,
    settings: {
      centerPadding: '170px',
    }
  },
  {
    breakpoint: 768,
    settings: {
      centerPadding: '100px',
    }
  },
  {
    breakpoint: 420,
    settings: {
      centerPadding: '90px',
    }
  },
  {
    breakpoint: 360,
    settings: {
      centerPadding: '80px',
    }
  }
]
});

$('.review__list').slick({

    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    lazyLoad: 'ondemand',
    arrows: true,
    prevArrow: $('.review__left'),
    nextArrow: $('.review__right'),
    adaptiveHeight: true,
    centerMode: true,
    centerPadding: '300px',

    responsive: [
      {
        breakpoint: 1280,
        settings: {
          centerPadding: '170px',
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: '110px',
        }
      },
      {
        breakpoint: 420,
        settings: {
          centerPadding: '90px',
        }
      },
      {
        breakpoint: 360,
        settings: {
          centerPadding: '70px',
        }
      }
    ]
});


// $('.review__list').slick({
//     infinite: true,
//     speed: 300,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     arrows: true,
//     prevArrow: $('.review__left'),
//     nextArrow: $('.review__right'),
//     centerMode: false,
//     responsive: [
//         {
//           breakpoint: 1024,
//           settings: {
//             slidesToShow: 1,
//             slidesToScroll: 1 ,
//             centerPadding: '150px',
//             centerMode: true,
//           }
//         },
//         {
//           breakpoint: 768,
//           settings: {
//               slidesToShow: 1,
//               slidesToScroll: 1,
//               centerMode: false,
//           }
//         }
//     ]
// });





// send contact form

const contactForm = document.querySelector('#contact__form');
const popupCloseButton = document.querySelector('.popup__button')  ;
const backdrop = document.querySelector('.backdrop')

contactForm.addEventListener('submit', sendAppeal);
let popupTimer;

function sendAppeal(e) {
    e.preventDefault();
    clearContactFormErrorMessages();

    $.ajax({
      type: 'POST',
      data: $(this).serialize(),
      url: "",
      success: function (response) {
          console.log('success') ;
          contactForm.reset();
          openPopupWindow();
          popupTimer = setTimeout(closePopupWindow, 3000);

      },
      error: function (response) {
          const errors = response.responseJSON.errors;
          appendContactFormErrorMessages(errors);
      }
    });
}

function openPopupWindow() {
    backdrop.classList.remove('is-hidden');
    popupCloseButton.addEventListener('click', closePopupWindow);
    backdrop.addEventListener('click', closePopupWindow);
}

function closePopupWindow() {
    backdrop.classList.add('is-hidden') ;
    popupCloseButton.removeEventListener('click', closePopupWindow);
    backdrop.removeEventListener('click', closePopupWindow);
    if (popupTimer) {
        clearTimeout(popupTimer)
    }
}

function clearContactFormErrorMessages() {
    const errorMessages = document.querySelectorAll('.contact__form .errors');

    for (const message of errorMessages) {
        message.innerHTML ='';
    }
}

function appendContactFormErrorMessages(errors) {

    for (key in errors) {
        const errorMessagesEl = document.querySelector(`label[for="id_${key}"] .errors`);

        for (const error of errors[key]) {
          let li = document.createElement("li");
          li.append(error);
          errorMessagesEl.append(li)
        }
    }
}




// to do section tabs

const tabs = document.querySelectorAll('.todo__tabs-btn');
const switchLeft = document.querySelector('[data-switch-left]');
const switchRight = document.querySelector('[data-switch-right]');
const toDoTabs = [...tabs];

switchLeft.addEventListener('click', switchTabLeft);
switchRight.addEventListener('click', switchTabRight);
tabs.forEach(tab => tab.addEventListener('click', makeTabActive));

function switchTabLeft() {
  const activeTab = document.querySelector('.tabs-btn--active');
  const currentIndex = findIndexOfCurrentTodoTab(activeTab);

  const newIndex = getPreviousIndex(currentIndex);
  const newTab = toDoTabs[newIndex];

  switchToDoTab(activeTab, newTab);
  switchContentTab(activeTab, newTab);
}

function switchTabRight() {
  const activeTab = document.querySelector('.tabs-btn--active');
  const currentIndex = findIndexOfCurrentTodoTab(activeTab);

  const newIndex = getNextIndex(currentIndex);
  const newTab = toDoTabs[newIndex];

  switchToDoTab(activeTab, newTab);
  switchContentTab(activeTab, newTab);
}

function findIndexOfCurrentTodoTab(tab) {
  const index = toDoTabs.indexOf(tab);
  return index;
}

function getNextIndex(index) {
  if (index == toDoTabs.length - 1) {
    return 0;
  }
  return index + 1;
}

function getPreviousIndex(index) {
  if (index == 0) {
    return toDoTabs.length - 1;
  }
  return index - 1;
}

function switchToDoTab(activeTab, newTab) {
  activeTab.classList.remove('tabs-btn--active');
  newTab.classList.add('tabs-btn--active');
}

function switchContentTab(activeTab, newTab) {
  const activeTabName = activeTab.getAttribute('data-tab');
  const activeTabContent = document.querySelector(`#${activeTabName}`);
  activeTabContent.classList.remove('is-open');

  const newTabName = newTab.dataset.tab;
  const newTabContent = document.querySelector(`#${newTabName}`);
  newTabContent.classList.add('is-open');
}

function makeTabActive(e) {
  const newTab = e.currentTarget;
  if (newTab.classList.contains('tabs-btn--active')) return;

  const currentTab = document.querySelector('.tabs-btn--active');

  switchToDoTab(currentTab, newTab);
  switchContentTab(currentTab, newTab);
}


// program section

const switchProgramPhaseEl = document.querySelector('.program__button');
const programPhaseEls = [...document.querySelectorAll('.program__phase')];

window.addEventListener('resize', changeViewProgramBlock )
switchProgramPhaseEl.addEventListener('click', switchProgramPhase);

changeViewProgramBlock();

function changeViewProgramBlock() {
    const windowWidth = document.documentElement.clientWidth;

    if (windowWidth >= 1280 ) {
        const phaseTitles = document.querySelectorAll('.phase__title');
        const phaseTitlesList = [...phaseTitles];
        titleMaxWidth = findMaxWidth(phaseTitlesList)

        phaseTitlesList.forEach(title => {
            title.style.height = `${titleMaxWidth}px`
        });
    }

}

function findMaxWidth(phaseTitlesList) {
    return phaseTitlesList.reduce((maxWidth, title) => maxWidth = title.clientHeight > maxWidth  ? title.clientHeight  : maxWidth, 0);
}

function switchProgramPhase() {
  const currentProgramPhase = document.querySelector('.program__phase.is-active');
  const currentIndex = programPhaseEls.indexOf(currentProgramPhase);

  const nextIndex = getNextIndexProgramPhase(currentIndex);
  const nextProgramPhase = programPhaseEls[nextIndex];

  currentProgramPhase.classList.remove('is-active');
  nextProgramPhase.classList.add('is-active');
}

function getNextIndexProgramPhase(currentIndex) {
  if (currentIndex == programPhaseEls.length - 1) {
    return 0;
  }
  return currentIndex + 1;
}
