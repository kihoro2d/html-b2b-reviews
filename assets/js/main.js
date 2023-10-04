function stickyHeaderInit (header) {
  window.addEventListener('scroll', (event) => {
    header.classList.toggle('is-active', window.scrollY > 50)
  })
}

function mobileNavInit (header, hamburger, navigation) {
  hamburger.addEventListener('click', (event) => {
    header.classList.toggle('has-navigation')
    hamburger.classList.toggle('is-active')
    navigation.classList.toggle('is-active')
  })
}

window.addEventListener('DOMContentLoaded', (event) => {

  const header = document.querySelector('header.header')
  const hamburger = document.querySelector('button.hamburger')
  const navigation = document.querySelector('nav.navigation')

  if (header) stickyHeaderInit(header)
  if (header && hamburger && navigation) mobileNavInit(header, hamburger, navigation)

  document.querySelectorAll('.tabs').forEach((element) => {
    const buttons = Array.from(element.querySelectorAll('.tabs-button'))
    const panels = Array.from(element.querySelectorAll('.tabs-panel'))

    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        buttons.forEach((button) => button.classList.remove('is-active'))
        button.classList.add('is-active')

        panels.forEach((panel) => panel.classList.remove('is-active'))
        panels[buttons.indexOf(button)].classList.add('is-active')
      })
    })

    if (buttons.length > 0) buttons[0].click()
  })

  new window.Swiper('[data-swiper=people]', {
    freeMode: true,
    spaceBetween: 20,
    slidesPerView: 'auto',

    breakpoints: {
      576: {
        slidesPerView: 4
      },
      768: {
        slidesPerView: 5
      },
      1240: {
        spaceBetween: 24,
        slidesPerView: 7
      }
    }
  })

})
