document.addEventListener("DOMContentLoaded", () => {


  const breakdownTabs =
    document.querySelector(".breakdownTabs");

  const breakdownTabsItems =
    document.querySelectorAll(".breakdownTabs-item");

  const breakdownTabsButtons =
    document.querySelectorAll(".breakdownTabs-button");


  if (breakdownTabs) {

    breakdownTabs.classList.add("breakdownTabs-ready");

    function selectBreakdownTab(selectedIndex) {

      for (let i = 0; i < breakdownTabsItems.length; i++) {

        if (i === selectedIndex) {

          breakdownTabsItems[i]
            .classList.add("is-selected");

        } else {

          breakdownTabsItems[i]
            .classList.remove("is-selected");

        }

      }

    }

    for (let i = 0; i < breakdownTabsButtons.length; i++) {

      breakdownTabsButtons[i].addEventListener(
        "click",
        () => {
          selectBreakdownTab(i);
        }
      );

    }

  }


  const navigation =
    document.querySelector(".navigation");

  const navigationPanel =
    document.querySelector("#navigation-panel");

  const desktopMedia =
    window.matchMedia("(min-width: 1000px)");

  function updateNavigation() {

    if (!navigationPanel) {
      return;
    }

    if (desktopMedia.matches) {

      navigationPanel.removeAttribute("popover");

    } else {

      navigationPanel.setAttribute(
        "popover",
        "auto"
      );

    }

  }


  updateNavigation();

  desktopMedia.addEventListener(
    "change",
    updateNavigation
  );


  if (navigationPanel) {

    const navigationLinks =
      navigationPanel.querySelectorAll("a");

    for (let i = 0; i < navigationLinks.length; i++) {

      navigationLinks[i].addEventListener(
        "click",
        () => {

          if (
            !desktopMedia.matches &&
            navigationPanel.matches(":popover-open")
          ) {

            navigationPanel.hidePopover();

          }

        }
      );

    }

  }

});