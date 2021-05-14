import {SvgPlus} from "../SvgPlus.js"
import {VList} from "../VList.js"
import {TrashIcon} from "../Icons.js"
import {DataSync} from "../DataSync.js"

let dataSync = new DataSync()

class FormPanel extends SvgPlus{
  constructor(){
    super("DIV");
    this.class = "form-panel"

    let el = this.createChild("DIV")

    el.createChild("H3").innerHTML = "Title"
    this.name = el.createChild("input");
    el.createChild("H3").innerHTML = "Link"
    this.link_el = el.createChild("input");
    let btns = el.createChild("DIV");
    this.add = btns.createChild("H1", {
      style: {
        float: "left",
        cursor: "pointer"
      }
    });
    this.add.onclick = () => {
      if (this.onadd instanceof Function) {
        this.onadd(this.link)
        this.remove()
        this.clear()
      }
    }
    this.done = btns.createChild("H1", {
      style: {
        float: "right",
        cursor: "pointer"
      }
    })
    this.done.onclick = () => {
      this.remove()
      this.clear()
    }
    this.add.innerHTML = "+"
    this.done.innerHTML = "x"
  }

  clear(){
    this.name.value = ""
    this.link_el.value = ""
  }

  get link(){
    return {
      title: this.name.value,
      href: this.link_el.value
    }
  }
}

class Link extends SvgPlus{
  constructor(link){
    super("DIV");
    this._link_el = this.createChild("A");
    this._trash = new TrashIcon();
    this._trash.onclick = () => {
      this.remove()
      let info = this.info;
      if (SvgPlus.is(info, Info)){
        info.updateInfo();
      }
    }
    this.link = link
    this.edit = true;
  }

  set link(link){
    this._link_el.href = link.href
    this._link_el.innerHTML = link.title
  }

  get link(){
    return {
      href: this._link_el.href,
      title: this._link_el.innerHTML
    }
  }

  set edit(edit){
    if (!!edit){
      if (!this.contains(this._trash)){
        this.appendChild(this._trash)
      }
    }else{
      this._trash.remove()
    }
  }
}

class Info extends VList{
  constructor(){
    super("Info", null, Link, false);
    dataSync.on("info", (e) => {
      this.list = dataSync.asList(e)
    })
    this.add = new SvgPlus("H1");
    this.add.styles = {
      'margin-left': '0.5em',
      cursor: "pointer"
    }
    this.add.onclick = () => {
      let form = new FormPanel()
      this.open = true;
      document.body.appendChild(form)
      form.onadd = (link) => {
        let links = this.links;
        links.push(link)
        this.list = links;
        this.updateInfo();
      }
    }
    this.add.innerHTML = "+"
    this.edit = false;
  }

  initItem(el){
    el.info = this;
    el.edit = this.edit;
  }

  updateInfo(){
    dataSync.set("info", this.links)
  }

  set edit(edit){
    this._edit = !!edit;
    if (!!edit){
      this.appendChildToHead(this.add)
    }else{
      this.removeChildFromHead(this.add)
    }
    for (let link of this._listElement.children) {
      if (SvgPlus.is(link, Link)) {
        link.edit = edit;
      }
    }
  }
  get edit(){
    return this._edit;
  }

  get links(){
    let links = []
    for (let link of this._listElement.children) {
      if (SvgPlus.is(link, Link)) {
        links.push(link.link)
      }
    }
    return links
  }
}

export {Info}
