document.addEventListener("DOMContentLoaded", () => {


  const breakdownTabs =
    document.querySelector(".breakdownTabs");

  const breakdownTabsItems =
    document.querySelectorAll(".breakdownTabs-item");

  const breakdownTabsButtons =
    document.querySelectorAll(".breakdownTabs-button");

  function selectBreakdownTab(selectedIndex) {

    for (let i = 0; i < breakdownTabsItems.length; i++) {

      const isSelected = i === selectedIndex;

      breakdownTabsItems[i]
        .classList.toggle("is-selected", isSelected);

      if (breakdownTabsButtons[i]) {
        breakdownTabsButtons[i]
          .classList.toggle("is-selected", isSelected);
      }

    }

  }

  if (breakdownTabs) {

    breakdownTabs.classList.add("breakdownTabs-ready");

    for (let i = 0; i < breakdownTabsButtons.length; i++) {

      breakdownTabsButtons[i].addEventListener(
        "click",
        () => {
          selectBreakdownTab(i);
        }
      );

    }

    selectBreakdownTab(0);

  }




  const navigationPanel =
    document.querySelector("#navigation-panel");

  const desktopMedia =
    window.matchMedia("(min-width: 1000px)");

  function isPopoverOpen(element) {

    try {
      return element.matches(":popover-open");
    } catch (error) {
      return false;
    }

  }

  function updateNavigation() {

    if (!navigationPanel) {
      return;
    }

    if (desktopMedia.matches) {

      if (isPopoverOpen(navigationPanel)) {
        navigationPanel.hidePopover();
      }

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
            isPopoverOpen(navigationPanel)
          ) {

            navigationPanel.hidePopover();

          }

        }
      );

    }

  }

});
