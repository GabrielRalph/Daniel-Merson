import {SvgPlus} from './SvgPlus.js'


class ContextMenu extends SvgPlus{
  constructor(menu){
    super("div")
    this.class = "context-menu"
    this.menu = menu;

    window.addEventListener('mousemove', (e) => {
      this._mouseOver = e.target == this || this.contains(e.target);
    })

    window.addEventListener('contextmenu', (pos) => {
      this._mouseOver = true;
      pos.preventDefault()
      this.show(pos)
    })
  }

  async show(pos){
    this.styles = {
      position: 'fixed',
      top: (pos.y-10)+'px',
      left: (pos.x-10)+'px',
    }
    this.opacity = 0;
    this.fade(true)

    let next = () => {
      setTimeout(async () => {
        console.log(this.mouseOver);
        if (this.mouseOver) {
          next()
        }else{
          this.fade(false)
        }
      }, 500)
    }
    next();
  }

  async fade(state){
    this.opacity = state ? 0 : 1;
    if (state) {
      document.body.appendChild(this)
    }
    await this.waveTransistion((t) => {
      this.opacity = t;
    }, 500, state)
    if (!state) {
      this.remove();
    }
  }

  set opacity(t){
    this.styles = {opacity: t}
  }

  get mouseOver(){
    return this._mouseOver;
  }

  set menu(menu){
    this.innerHTML = ""
    if (typeof menu === "object" && menu !== null) {
      for (let name in menu) {
        let item = new MenuItem(name, menu[name]);
        if (item !== undefined) {
          this.appendChild(item);
        }
      }
    }
  }
}

class MenuItem extends SvgPlus{
  constructor(name, callback){
    super("div");
    this.class = "item"
    this.name = name;
    this.callback = callback

    if (this.name === null || this.callback == null) {
      return undefined;
    }
  }

  onclick(){
    this.callback()
  }

  set name(name) {
    if (typeof name !== 'string'){
      name = null;
    }
    this._name = name;
    this.innerHTML = name;
  }

  set callback(callback){
    if (!(callback instanceof Function)) {
      callback = null;
    }
    this._callback = callback;
  }


  get name() {
    return this._name;
  }

  get callback() {
    return this._callback;
  }
}

export {ContextMenu}
