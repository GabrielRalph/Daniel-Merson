import {SvgPlus, Vector} from "./SvgPlus.js"
import {Icon, Phi} from "./Icons.js"

Vector.precision = 3;

const logo = `
<svg viewBox="0 0 1038.8 140.6">
	<path d="M2.2,106.8V32.4H55c8.3,0,15.6,0.7,22,2c6.4,1.3,11.6,3.1,15.5,5.3c3.9,2.2,7.1,4.9,9.6,8c2.5,3.1,4.2,6.3,5.1,9.5c0.9,3.2,1.4,6.7,1.4,10.4v3c0,3.7-0.4,7.1-1.2,10.3c-0.8,3.2-2.5,6.4-4.9,9.7c-2.4,3.3-5.6,6.1-9.4,8.4c-3.8,2.3-9,4.2-15.5,5.6c-6.5,1.5-14,2.2-22.5,2.2H2.2z M30.6,51.9v35.2h21.1c18.3,0,27.5-5.8,27.5-17.4v-0.6c0-11.5-9.2-17.2-27.5-17.2H30.6z"/>
	<path d="M163.1,99.6c-5.5,5.5-13.9,8.2-25.2,8.2h-1.1c-8.4,0-14.6-1.7-18.8-5c-4.1-3.3-6.1-7.4-6.1-12.3v-1.2c0-4.7,1.7-8.3,5.1-10.9c3.4-2.6,8.9-4.1,16.8-4.8l25.9-2.3c2-0.3,3-1.1,3-2.6c0-0.8-0.2-1.5-0.6-2c-0.4-0.5-1.6-1-3.4-1.5c-1.8-0.4-4.4-0.6-7.7-0.6h-0.4c-2.7,0-4.9,0.2-6.6,0.6c-1.8,0.4-3,0.9-3.7,1.6c-0.7,0.7-1.1,1.3-1.3,1.6c-0.2,0.4-0.3,0.9-0.5,1.6h-25.2v-0.6c0-1.8,0.1-3.4,0.4-4.7c0.3-1.3,1.1-2.9,2.5-4.7c1.3-1.8,3.1-3.3,5.4-4.4c2.3-1.1,5.7-2.1,10.2-3c4.5-0.8,9.8-1.2,16-1.2h5.6c6.4,0,11.9,0.4,16.6,1.2c4.7,0.8,8.2,1.7,10.6,2.8s4.3,2.5,5.7,4.2c1.4,1.7,2.2,3.2,2.5,4.5c0.3,1.3,0.5,2.8,0.5,4.6v19.9c0,1.5,0.8,2.3,2.3,2.3h2.9v15.7h-22.6C166.8,106.8,163.9,104.4,163.1,99.6z M162.6,83.7v-2.3l-18,3.2c-2.4,0.4-4.1,0.9-5.1,1.6c-1,0.7-1.5,1.7-1.5,3v0.1c0,1.5,0.6,2.8,2,3.9c1.3,1.1,3.5,1.6,6.5,1.6c4.8,0,8.7-1.1,11.6-3.4C161.1,89.2,162.6,86.6,162.6,83.7z"/>
	<path d="M199.1,106.8V53h27v9.5c1-0.9,1.8-1.7,2.4-2.2c0.6-0.5,1.8-1.4,3.7-2.6c1.9-1.3,3.8-2.2,5.6-2.9c1.8-0.7,4.1-1.4,7-2c2.9-0.6,6-1,9.1-1h0.6c4.8,0,9,0.6,12.6,2c3.6,1.3,6.3,3,8.2,5.1c1.9,2.1,3.3,4.3,4.2,6.5c0.9,2.2,1.3,4.5,1.3,6.9v34.6h-27.3V81.1c0-3.8-1-6.8-3.1-9c-2.1-2.2-5.4-3.4-9.9-3.4c-4.5,0-8,1.2-10.5,3.6c-2.5,2.4-3.8,5.6-3.8,9.5v25H199.1z"/>
	<path d="M316,32.4v16.1h-27.2V32.4H316z M316,53v53.8h-27.2V53H316z"/>
	<path d="M406.9,87.2v0.2c0,1.8-0.2,3.5-0.7,5.1c-0.5,1.6-1.5,3.4-3.2,5.4c-1.7,2-3.9,3.8-6.6,5.2c-2.7,1.4-6.6,2.6-11.7,3.6c-5,1-10.9,1.5-17.5,1.5h-5.3c-6.3,0-11.9-0.6-16.8-1.7c-4.9-1.1-8.7-2.6-11.6-4.4c-2.9-1.8-5.2-3.9-7-6.4s-3-5-3.7-7.4c-0.6-2.4-0.9-5-0.9-7.8v-2c0-18.1,13.2-27.1,39.7-27.1h5.5c4.9,0,9.3,0.3,13.2,0.9c4,0.6,7.3,1.5,10.1,2.6c2.7,1.1,5.1,2.4,7.1,4c2,1.6,3.7,3.2,4.9,4.8c1.2,1.6,2.2,3.5,2.9,5.5c0.7,2,1.2,3.9,1.5,5.7c0.2,1.8,0.3,3.7,0.3,5.8v3h-58.5c0.9,6.6,6.4,9.9,16.3,9.9h0.1c2.4,0,4.5-0.2,6.5-0.6c1.9-0.4,3.4-0.8,4.4-1.3c1-0.5,1.9-1.1,2.6-1.8c0.7-0.7,1.1-1.2,1.3-1.7c0.2-0.4,0.3-0.8,0.4-1.1H406.9z M364.4,64.7c-8.9,0-14,2.7-15.5,8.1h31C378.7,67.4,373.6,64.7,364.4,64.7z"/>
	<path d="M440,32.4v74.4h-27.2V32.4H440z"/>
	<path d="M479.2,106.8V32.4h39L541,74.2l23.2-41.8h37.4v74.4h-28.1V60.4l-26.1,46.4h-14.5l-26-46.4v46.4H479.2z"/>
	<path d="M693.3,87.2v0.2c0,1.8-0.2,3.5-0.7,5.1c-0.5,1.6-1.5,3.4-3.2,5.4c-1.7,2-3.9,3.8-6.6,5.2c-2.7,1.4-6.6,2.6-11.7,3.6c-5,1-10.9,1.5-17.5,1.5h-5.3c-6.3,0-11.9-0.6-16.8-1.7c-4.9-1.1-8.7-2.6-11.6-4.4c-2.9-1.8-5.2-3.9-7-6.4s-3-5-3.7-7.4c-0.6-2.4-0.9-5-0.9-7.8v-2c0-18.1,13.2-27.1,39.7-27.1h5.5c4.9,0,9.3,0.3,13.2,0.9c4,0.6,7.3,1.5,10.1,2.6c2.7,1.1,5.1,2.4,7.1,4c2,1.6,3.7,3.2,4.9,4.8c1.2,1.6,2.2,3.5,2.9,5.5c0.7,2,1.2,3.9,1.5,5.7c0.2,1.8,0.3,3.7,0.3,5.8v3H635c0.9,6.6,6.4,9.9,16.3,9.9h0.1c2.4,0,4.5-0.2,6.5-0.6c1.9-0.4,3.4-0.8,4.4-1.3c1-0.5,1.9-1.1,2.6-1.8c0.7-0.7,1.1-1.2,1.3-1.7c0.2-0.4,0.3-0.8,0.4-1.1H693.3z M650.8,64.7c-8.9,0-14,2.7-15.5,8.1h31C665.1,67.4,660,64.7,650.8,64.7z"/>
	<path d="M726.2,53v9.9c1-1.5,2.2-2.9,3.8-4.4c1.5-1.4,4-2.9,7.5-4.5c3.5-1.5,7.2-2.3,11.3-2.3h1.2c4.3,0,7.9,0.7,11,2c3.1,1.4,5.4,3.2,7,5.6c1.6,2.4,2.8,4.9,3.5,7.5c0.7,2.6,1.1,5.5,1.1,8.6V81h-26.4v-1.9c0-3.3-0.8-5.9-2.4-7.9c-1.6-2-4-3.1-7.3-3.1c-3.1,0-5.6,1.1-7.4,3.2c-1.8,2.1-2.6,4.9-2.6,8.4v27.1h-27.2V53H726.2z"/>
	<path d="M816.9,108.3h-5.5c-23.9,0-35.9-6.4-35.9-19.1v-0.7h27.7c0,0.7,0.1,1.3,0.3,1.9c0.2,0.6,0.7,1.3,1.4,2.1c0.7,0.8,1.8,1.4,3.5,1.9c1.6,0.5,3.6,0.7,5.9,0.7h0.2c4.3,0,7.3-0.4,8.8-1.2c1.5-0.8,2.3-1.9,2.3-3.3v-0.2c0-1.4-0.7-2.5-2-3.1c-1.3-0.7-4.1-1.1-8.3-1.2l-11.4-0.3c-18.5-0.7-27.8-6.3-27.8-16.9v-0.6c0-2.4,0.5-4.5,1.4-6.4c0.9-1.8,2.6-3.6,5-5.2c2.4-1.7,6.1-2.9,10.9-3.8c4.8-0.9,10.8-1.3,18-1.3h5.3c23.5,0,35.3,5.6,35.3,16.7v0.7h-27.2c-0.1-0.9-0.4-1.6-0.7-2.1c-0.3-0.6-1.4-1.2-3.1-1.9c-1.7-0.7-4-1-7-1h-0.1c-4.1,0-6.9,0.3-8.4,0.9c-1.4,0.6-2.1,1.5-2.1,2.8v0.1c0,1.2,0.7,2.1,2.1,2.8c1.4,0.7,4,1.1,7.9,1.2l11.3,0.3c7.9,0.3,14.1,1.1,18.4,2.5c4.3,1.4,7.2,3.2,8.7,5.5c1.5,2.3,2.2,5.3,2.2,9.1v0.7c0,2.1-0.3,4-0.8,5.8c-0.5,1.7-1.6,3.4-3.2,5c-1.6,1.6-3.7,3-6.4,4.1c-2.7,1.1-6.2,2-10.8,2.6S823,108.3,816.9,108.3z"/>
	<path d="M905.7,108.3h-7.4c-6.6,0-12.4-0.6-17.4-1.9s-9-2.8-11.8-4.6c-2.9-1.8-5.2-4-7-6.6c-1.8-2.6-3-5.1-3.6-7.4c-0.6-2.3-0.9-4.8-0.9-7.4v-1.6c0-2.5,0.3-5,0.9-7.2c0.6-2.3,1.8-4.7,3.5-7.2c1.8-2.5,4.1-4.7,7-6.5c2.9-1.8,6.8-3.3,11.9-4.5c5-1.2,10.8-1.8,17.4-1.8h7.6c27.1,0,40.6,9.1,40.6,27.2v1.8c0,2.7-0.2,5.1-0.7,7.3c-0.5,2.2-1.5,4.7-3.2,7.4c-1.7,2.7-3.9,4.9-6.8,6.7c-2.8,1.8-6.8,3.3-11.9,4.5C918.6,107.7,912.6,108.3,905.7,108.3z M902.1,66.7L902.1,66.7c-6.2,0-10.6,1.2-13.2,3.6c-2.6,2.4-3.8,5.4-3.8,9v0.4c0,3.6,1.3,6.7,3.8,9.4c2.6,2.6,6.9,4,13.1,4h0.1c6,0,10.3-1.4,12.9-4.1c2.6-2.7,3.9-5.8,3.9-9.2v-0.4c0-3.5-1.3-6.5-3.8-9C912.5,67.9,908.1,66.7,902.1,66.7z"/>
	<path d="M952.3,106.8V53h27v9.5c1-0.9,1.8-1.7,2.3-2.2s1.8-1.4,3.7-2.6c1.9-1.3,3.8-2.2,5.5-2.9c1.8-0.7,4.2-1.4,7.1-2c2.9-0.6,5.9-1,9.1-1h0.6c4.8,0,9,0.6,12.5,2c3.6,1.3,6.3,3,8.2,5.1c1.9,2.1,3.3,4.3,4.2,6.5c0.9,2.2,1.3,4.5,1.3,6.9v34.6h-27.3V81.1c0-3.8-1-6.8-3.2-9c-2.1-2.2-5.4-3.4-9.8-3.4c-4.5,0-8,1.2-10.5,3.6c-2.5,2.4-3.8,5.6-3.8,9.5v25H952.3z"/>
</svg>`

class SplashScreen extends SvgPlus{
  constructor(){
    super('DIV');
		this._icon = new Icon(logo);
		this._phi = new Phi()
		this._phi.styles = {
			position: 'fixed',
			left: '50%',
			bottom: '30px',
			transform: 'translate(-50%, 0)',
			'pointer-events': 'all'
		}
		this._phi.onclick = () => {
			let link = new SvgPlus("A");
			link.href = "https://www.galetora.com"
			link.click()
		}
		this.appendChild(this._phi)

		this._icon_pos = new Vector(50, 50);
		this._icon_offset = new Vector(0, 0);
		this._icon_transform = new Vector(-50, -50);


		this.opacity = 1;
		this.class = "splash-screen";
		this.styles = {
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			'z-index': 100,
			'pointer-events': 'none',
			'font-size': '2em'
		}

		this.icon.styles = {
			position: 'fixed',
		}
		this.iconSize = "2em"
		this.showIcon = true;

  }

	waitFor(logoParentId, contentId){
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
				let element = document.getElementById(logoParentId);
				if (element instanceof Element) {
					element.innerHTML = ""
					this.moveToElement(element);
				}
			}catch(e){
				console.log(e);
				return
			}
		}
	}


	updateIconStyle(){
		// console.log(`calc(${this.iconPos.x}% + ${this.iconOffset.x}px)`);
		this.icon.styles = {
			top: `calc(${this.iconPos.y}% + ${this.iconOffset.y}px)`,
			left: `calc(${this.iconPos.x}% + ${this.iconOffset.x}px)`,
			transform: `translate(${this.iconTransform.x}%, ${this.iconTransform.y}%)`,
			height: this.iconSize
		}
	}

	async moveToElement(element){
		if (!(element instanceof Element)) return;
		this.opacity = 1;
		let empty = this.emptyIcon;
		empty.styles = {height: '1.3em'}
		element.appendChild(empty);

		let bb = empty.getBoundingClientRect();
		let size = bb.height;
		let destination = new Vector(bb)
		let pos = this.iconPos;
		let offset = this.iconOffet;
		let trans = this.iconTransform;
		await this.waveTransistion((t) => {
			this.iconOffset = destination.mul(1 - t);
			this.iconTransform = trans.mul(t);
			this.iconSize = `calc(${size*(1 - t)}px + ${2*t}em)`
			let a = pos.mul(t);
			let b = new Vector(1,-1);
			b = b.mul( -1 * 1.5 * Math.sin(t * Math.PI * 3) )
			this.iconPos = a.add(b);
			this.opacity = t;

		}, 1000, false)
		// console.log('x');
		this.iconSize = `1.3em`
		this.icon.styles = {
			position: "inherit"
		}
		element.replaceChild(this.icon, empty)
	}

	get emptyIcon(){
		let svg = new SvgPlus("svg");
		svg.props = {
			viewBox: this.icon.getAttribute("viewBox")
		}
		return svg;
	}

	set opacity(x){
		this.styles = {
			background: `rgba(0, 0, 0, ${x})`
		}
		this._phi.styles = {
			opacity: x
		}
	}



	set showIcon(val){
		if (val) {
			if (!this.contains(this._icon)){
				this.appendChild(this._icon);
			}
		}else{
			this._icon.remove();
		}
	}

	get icon(){
		return this._icon;
	}
	set iconPos(pos){
		if (pos instanceof Vector){
			this._icon_pos = pos;
			this.updateIconStyle()
		}
	}
	get iconPos(){
		return this._icon_pos.clone();
	}

	set iconOffset(offset){
		if (offset instanceof Vector){
			this._icon_offset = offset;
			this.updateIconStyle()
		}
	}
	get iconOffset(){
		return this._icon_offset.clone();
	}

	set iconTransform(trans){
		if (trans instanceof Vector){
			this._icon_transform = trans
			this.updateIconStyle()
		}
	}
	get iconTransform(){
		return this._icon_transform.clone();
	}

	set iconSize(size){
		this._icon_size = size;
		this.updateIconStyle()
	}
	get iconSize(){
		return this._icon_size;
	}

}

export {SplashScreen}
