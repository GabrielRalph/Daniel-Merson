import {SvgPlus} from "../SvgPlus.js"
import {DataSync} from "../DataSync.js"
import {Info} from "./Info.js"
import {Works} from "./Works.js"
import {Display} from "./Display.js"

let dataSync = new DataSync();


class Portfolio extends SvgPlus{
  constructor(){
    super("DIV")

    this.id = "portfolio"

    this.display = this.createChild(Display)
    this.works = this.createChild(Works)
    this.info = this.createChild(Info)



    this.works.onselect = (work) => {
      this.display.work = work
      this.works.open = false;
    }

    this.works.ontitleclick = (e) => {
      this.toggleWorks()
    }

    this.info.onstatechange = (e) => {
      if (e) this.works.open = false;
    }
  }

  toggleWorks(){
    if (this.works.open){
      this.works.open = false
    }else{
      if (!this.display.isShowreal) {
        this.display.back();
      }else{
        this.works.open = true;
      }
      this.info.open = false;
    }
  }

  set edit(val){
    this.display.edit = val;
    this.works.edit = val;
    this.info.edit = val;
    if (val){
      this.class = "edit"
    }else{
      this.class = ""
    }

  }

  async waitLoad(){
    return new Promise((resolve, reject) => {
      this.display.onplaying = () => {
        resolve(true)
      }
      setTimeout(() => {
        resolve(true)
      }, 4000)
    });
  }
}

export {Portfolio}
