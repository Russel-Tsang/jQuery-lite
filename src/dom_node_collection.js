class DOMNodeCollection {
  constructor (array) {
    this.collection = array;
  }

  children() {
    let nursery = [];
    // for each item in the collection
    this.collection.forEach(ele => {
      // get its children and push it into new array
      Array.from(ele.children).forEach(child => nursery.push(child));
    });
    // return children as node collection
    return new DOMNodeCollection(nursery);
  }

  parent() {
    let parents = [];
    this.collection.forEach(ele => {
      if (!parents.includes(ele.parentElement)) parents.push(ele.parentElement);
    });

    return new DOMNodeCollection(parents);
  }

  find(targetEle) {
    let selected = [];
    this.collection.forEach(ele => {
      Array.from(ele.querySelectorAll(targetEle)).forEach(found => {
        if (!selected.includes(found)) selected.push(found);
      })
    });
    return new DOMNodeCollection(selected);
  }


  html(string) {
    if (!string) {
      return this.collection[0].innerHTML;
    } else {
      this.collection.forEach(ele => {
        ele.innerHTML = string;
      })
    }
  }

  empty() {
    this.collection.forEach(ele => ele.innerHTML = "");
  }

  remove() {
    this.collection.forEach(ele => ele.outerHTML = '');
  }

  on(action, callback) {
    window.callback = callback;
    this.collection.forEach(ele => ele.addEventListener(`${action}`, window.callback));
  }

  off(action) {
    this.collection.forEach(ele => ele.removeEventListener(`${action}`, window.callback));
    window.callback = undefined;
  }

  append(arg) {
    if (typeof arg === 'string') {
      this.collection.forEach(ele => ele.innerHTML += arg);
    } else if (typeof arg === 'object') {
      arg.collection.forEach(ele => {
        this.collection.forEach(thisArr => thisArr.innerHTML += ele.outerHTML);
      });
    } 
  }

  attr(prop, val) {
    if (!val) return this.collection[0].attributes[prop].value;
    this.collection.forEach(ele => ele.setAttribute(`${prop}`, val));
  }

  addClass(name) {
    this.collection.forEach(ele => {
      name = ele.className === '' ? name : ` ${name}`;
      if (!ele.className.split(' ').includes(name.slice(1))) ele.className += name;
    })
  }

  removeClass(name) {
    if (!name) {
      this.collection.forEach(el => el.className = '');
    } else {
      let classesArr = name.split(" ");
      this.collection.forEach(el => {
        el.className = el.className.split(" ").filter(name => !classesArr.includes(name)).join(" "); 
      });
    }
  }
}

module.exports = DOMNodeCollection;