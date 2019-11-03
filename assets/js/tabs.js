activateAllTabs();

function activateAllTabs() {
  const tabs = document.querySelectorAll(".tabs-container");
  for (let i = 0; i < tabs.length; i++) {
    let status = activateTabs(tabs[i].id);
    if (!status) console.log("Error parsing tabs for '#" + id + "'");
  }
}

function activateTabs(id) {
  const parent = document.querySelector('#' + id + '.tabs-container');
  if (parent === null) return false;

  // tabs
  const tabs = parent.querySelector('.tabs');
  const tabList = tabs.querySelectorAll('.tab');
  // contents
  const contents = parent.querySelector('.tabs-content');

  // init active tab
  if (tabs.querySelector('.active') === null) {
    if (tabList.length > 0) {
      tabList[0].classList.add('active');
      const first = contents.querySelector(tabList[0].getAttribute('href'));
      // remove active tab contents (just in case)
      const activeCont = contents.querySelectorAll('.active');
      for (let i = 0; i < activeCont.length; i++) {
        activeCont[i].classList.remove('active');
      }
      // make first tab contents active
      first.classList.add('active');
    }
  }

  // handle tab clicks
  for (let i = 0; i < tabList.length; i++) {
    tabList[i].addEventListener('click', e => {
      e.preventDefault();
      e.stopImmediatePropagation(); // since prevent default didn't work
      const tab = e.target;
      const content = tab.getAttribute("href");

      // clear active tab
      tabs.querySelector('.active').classList.remove('active');
      contents.querySelector('.active').classList.remove('active');

      // select new tab
      tab.classList.add('active');
      contents.querySelector(content).classList.add('active');

      return false;
    });
  }

  return true;
}