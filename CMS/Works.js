import {SvgPlus} from "../SvgPlus.js"
import {VList} from "../VList.js"
import {Arrow, TrashIcon} from "../Icons.js"
import {DataSync} from "../DataSync.js"

let dataSync = new DataSync()

class FormPanel extends SvgPlus{
  constructor(){
    super("DIV");
    this.class = "form-panel"

    let el = this.createChild("DIV")

    el.createChild("H3").innerHTML = "Client Name"
    this.name = el.createChild("input");
    el.createChild("H3").innerHTML = "Vimeo Iframe"
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
        this.onadd(this.work)
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

  get work(){
    return {
      client: this.name.value,
      video: this.link_el.value
    }
  }
}

class Order extends SvgPlus{
  constructor(){
    super("DIV");
    this._order_end = 5;
    this.styles = {
      'display': 'inline-block'

    }

    let up = this.createChild(Arrow);
    up.styles = {
      'margin-bottom': '6px',
    }
    up.onclick = () => {
      if (this.up.color == this.color) this.reorder(this.order - 1)
    }
    up.size = 12;
    up.direction = "up";
    up.color = this.color;
    this.up = up;

    let down = this.createChild(Arrow);
    down.onclick = () => {
      if (this.down.color == this.color) this.reorder(this.order + 1)
    }
    down.size = 12;
    down.direction = "down";
    down.color = this.color;
    this.down = down;
  }

  reorder(newOrder){
    if (this.onorder instanceof Function){
      this.onorder(newOrder)
    }
  }

  get color(){
    return window.getComputedStyle(document.body).getPropertyValue('color')
  }

  set orderEnd(orderEnd){
    this._order_end = orderEnd;
    this.order= this.order;
  }
  get orderEnd(){
    return this._order_end;
  }

  set order(order){
    order = parseInt(order);
    if (Number.isNaN(order)) return;

    if (order <= 0) {
      this.up.color = "transparent";
      if (this.orderEnd > 0) {
        this.down.color = this.color;
      }else{
        this.down.color = "transparent";
      }
      this._order = 0;
    }else if (order >= this.orderEnd) {
      this.down.color = "transparent";
      if (this.orderEnd > 0) {
        this.up.color = this.color;
      }else{
        this.up.color = "transparent";
      }
      this._order = this.orderEnd;
    }else{
      this.down.color = this.color;
      this.up.color = this.color;

      this._order = order;
    }
  }
  get order(){
    return this._order;
  }

}

class Work extends SvgPlus{
  constructor(data){
    super("DIV");
    this.class = "work"

    this._edit_el = new SvgPlus("DIV")
    this._order_el = this._edit_el.createChild(Order);
    let trash = this._edit_el.createChild(TrashIcon);
    trash.onclick = () => {
      this.remove();
      let works = this.works;
      if (SvgPlus.is(works, Works)) {
        works.updateWorks();
      }

    }
    trash.size = '30px';
    this._order_el.onorder = (order) => {this.order = order}

    this._client_el = this.createChild("SPAN");
    this._client_el.onclick = () => {
      this.select();
    }

    this.work = data;
    this.edit = false;
  }
  reorder(){
    if (this.works instanceof Works){
    }
  }

  select(){
    let works = this.works;
    if (SvgPlus.is(works, Works)) {
      if (works.onselect instanceof Function) {
        works.onselect(this.work)
      }
    }
  }

  set orderEnd(end){
    this._order_el.orderEnd = end;
  }
  get orderEnd(){
    return this._order_el.orderEnd;
  }

  set order(order){
    order = parseInt(order);
    if (Number.isNaN(order)) return;

    if (order > this.order && this.order < this.orderEnd) {
      let next = this.nextSibling;
      if (SvgPlus.is(next, Work)) {
        next._order_el.order --;
      }
    }else if (order < this.order && this.order > 0) {
      let previous = this.previousSibling;
      if (SvgPlus.is(previous, Work)) {
        previous._order_el.order ++;
      }
    }
    this._order_el.order = order;

    let works = this.works;
    if (SvgPlus.is(works, Works)) {
      this.works.updateWorks();
    }
  }
  get order(){
    return this._order_el.order;
  }

  set edit(edit){
    this._edit = !!edit;
    if (this.edit) {
      this.class = "work edit"
      if (!this.contains(this._edit_el)) {
        this.prepend(this._edit_el)
      }
    }else{
      this.class = "work"
      if (this.contains(this._edit_el)) {
        this.removeChild(this._edit_el)
      }
    }
  }
  get edit(){
    return this._edit;
  }

  set work(data){
    this.client = data.client;
    this.video = data.video;
    this.order = data.order;
  }
  get work(){
    return {
      client: this.client,
      video: this.video,
      order: this.order
    }
  }

  set client(client){
    if (typeof client === 'string') {
      this._client = client;
      this._client_el.innerHTML = client;
    }else{
      console.log("client must be set to type string");
    }
  }
  get client(){
    return this._client;
  }
}

class Works extends VList{
  constructor(){
    super("Dan Merson", null, Work, false);
    dataSync.on("works", (e) => {
      this.works = e;
    })

    this._headerTitle.id = "logo"

    this.add = new SvgPlus("H1");
    this.add.innerHTML = "+"
    this.add.styles = {
      'margin-left': '20px',
      cursor: "pointer",
      float: 'right'
    }
    this.add.onclick = () => {
      let form = this.createChild(FormPanel)
      this.open = true;
      form.onadd = (e) => {
        let works = this.works;
        e.order = works.length;
        works.push(e)
        this.works = works;
        this.updateWorks()
      }
    }
    this.edit = false;
  }

  initItem(el){
    el.works = this;
    el.orderEnd = this.orderEnd;
    el.edit = this.edit;
  }

  ontitledblclick(){
    console.log(this.works);
  }

  sortWorks(works){
    let list = works.sort((a,b) => {
      return a.order > b.order ? 1 : -1
    })
    let i = 0;
    for (let work of list) {
      work.order = i;
      i++
    }
    return list;
  }

  updateWorks(){
    dataSync.set("works", this.works)
  }

  get works(){
    let list = []
    for (let work of this._listElement.children) {
      if (SvgPlus.is(work, Work)) {
        list.push(work.work)
      }
    }

    return this.sortWorks(list)
  }

  set works(works){
    if (works === null) return;
    this.orderEnd = works.length - 1;
    this.list = this.sortWorks(works)
  }

  set edit(edit){
    this._edit = !!edit;
    if (!!edit){
      this.appendChildToHead(this.add)
    }else{
      this.removeChildFromHead(this.add)
    }
    for (let work of this._listElement.children) {
      if (SvgPlus.is(work, Work)) {
        work.edit = edit;
      }
    }
  }
  get edit(){
    return this._edit;
  }
}

export {Work, Works}
