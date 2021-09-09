import {SvgPlus} from "./SvgPlus.js"

class Splash extends SvgPlus{
  constructor(contentId){
    super("splash");
    this.load(contentId);
  }

  async load(id){
    if (await this.waitFor(id)) {
      await this.waveTransistion((t) => {
        this.styles = {opacity: t}
      }, 400, false);
      this.styles = {display: "none"}
    }
  }

  async waitFor(contentId){
    return new Promise(function(resolve, reject) {
      window.onload = async () => {
        try{
          if (typeof contentId === 'string'){
            let content = document.getElementById(contentId);
            if (content instanceof Element && content.waitLoad instanceof Function) {
              await content.waitLoad()
            }
          }else if (contentId instanceof Function) {
            let res = contentId();
            if (res instanceof Promise) {
              await res
            }
          }
          resolve(true);
        }catch(e){
          console.log(e);
          resolve(false);
          return
        }
      }
    });
  }
}

export {Splash}
