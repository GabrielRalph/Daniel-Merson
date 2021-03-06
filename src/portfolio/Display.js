import {SvgPlus} from "../SvgPlus.js"
import {EditIcon} from "../Icons.js"
import {DataSync} from "../DataSync.js"
let dataSync = new DataSync();

class Display extends SvgPlus{
  constructor(){
    super("DIV")
    this.props = {
      position: "relative"
    }
    this._sreal = this.createChild('DIV')
    this._works = new SvgPlus("DIV")
    this._editbox = new SvgPlus("DIV")
    this._editIcon = this._editbox.createChild(EditIcon)
    this._editbox.styles = {
      position: 'absolute',
      right: 0,
      bottom: 0,
      'font-size': '3em'
    }
    this._namebox = this.createChild("H1", {
      style: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        margin: 0
      }
    })
    this._editIcon.onclick = () => {
      this.loadVideo()
    }

    dataSync.on("showreal", (e) => {
      this.showreal = e;
    })
    document.body.onclick = () => {
      this.playShowreal()
    }
    this._works.class = "display"
  }

  get isShowreal(){
    return this.contains(this._sreal)
  }

  loadVideo(){
    console.log('x');
    let input = new SvgPlus("input")
    input.props = {
      type : "file",
      accept: "video/mp4"
    }
    input.click()
    input.oninput = () => {
      this.uploadVideo(input.files[0])
    }
  }

  async uploadVideo(file){
    this._editIcon.remove()
    let url = await dataSync.uploadFile(file, "", (p) => {
      this._editbox.innerHTML = Math.round(p) + "%"
    }, "showreal.mp4")
    this._editbox.innerHTML = ""
    this._editbox.appendChild(this._editIcon)
  }

  set showreal(src){

    this._sreal.innerHTML = `
    <video id = "showreal" autoplay loop muted playsinline>
      <source id = "showreal-src" src= "${src}" type="video/mp4">
    </video>`

    this.playShowreal();
    if (this.svideo){
      this.svideo.onplaying = () => {
        if (this.onplaying instanceof Function) {
          this.onplaying();
        }
      }
    }

  }
  get svideo(){
    return this._svideo;
  }
  playShowreal(){
    let vid = this._sreal.getElementsByTagName("video")[0]
    if (vid) {
      this._svideo = vid;
      vid.play();
    }
  }

  back(){
    this.appendChild(this._sreal)
    this._works.remove();
    this.playShowreal();
    this._namebox.innerHTML = ""
  }
  set work(work){
    this._sreal.remove();
    this.appendChild(this._works)
    this._works.innerHTML = work.video
    let iframe = this._works.getElementsByTagName("iframe")[0];
    if (iframe){
      let resize = () => {
        if (iframe){
          let bb = iframe.getBoundingClientRect();
          let h = iframe.getAttribute("height")
          let w = iframe.getAttribute("width")

          iframe.style.setProperty("height", `${bb.width * h / w}px`);
        }
      }
      window.onresize = resize;
      resize();
    }
    this._namebox.innerHTML = work.client
  }

  set edit(val){
    if (val){
      if (!this.contains(this._editbox)){
        this.appendChild(this._editbox)
      }
    }else{
      this._editbox.remove();
    }
  }

}
export {Display}
