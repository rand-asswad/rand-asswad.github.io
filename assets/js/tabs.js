const tabInstances = document.querySelectorAll(".tabs-container");

for (let t = 0; t < tabInstances.length; t++) {
  const tabId = '#' + tabInstances[t].id + ' ';
  const tabs = document.querySelectorAll(tabId + '.tabs .tab');

  // init active tab
  if (document.querySelector(tabId + '.tabs .active') === null) {
    if (tabs.length > 0) {
      tabs[0].classList.add('active');
      var contentId = tabs[0].getAttribute("href");
      var content = document.getElementById(contentId.substr(1));
      // remove active tab contents (just in case)
      var tabContents = document.querySelectorAll(tabId + '.tabs-content .active');
      for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
      }
      // make first tab contents active
      content.classList.add('active');
    }
  }

  // handle tab clicks
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', e => handleClick(e));
  }

  function handleClick(e) {
    e.preventDefault();
    e.stopImmediatePropagation(); // since prevent default didn't work
    const tab = e.target;
    const content = tab.getAttribute("href").substr(1);

    // clear active tab
    document.querySelector(tabId + '.tabs .active').classList.remove('active');
    document.querySelector(tabId + '.tabs-content .active').classList.remove('active');

    // select new tab
    tab.classList.add('active');
    document.getElementById(content).classList.add('active');

    return false;
  }
}