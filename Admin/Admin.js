import {SvgPlus} from '../SvgPlus.js'
import {LockIcon, TrashIcon, AdminIcon, ContentAdminIcon} from '../Icons.js'
import {DataSync} from "../DataSync.js"

let dataSync = new DataSync();

class Admin extends SvgPlus{
  constructor(){
    super('div');
    this.class = 'admin'
    this.header = this.createChild('H1');
    this.header.innerHTML = 'Admin';

    this.adminUsers = new AdminUsers();
    this.appendChild(this.adminUsers);
  }
}

class AdminUsers extends SvgPlus{
  constructor(){
    super('TABLE');
    this.class = "admin-users"
    this.body = this.createChild('TBODY');
    let head = this.body.createChild('TR');
    head.class = "admin-user"
    head.createChild('TD');
    head.createChild('TD').innerHTML = "Name";
    head.createChild('TD').innerHTML = "Email";
    head.createChild('TD').appendChild(new AdminIcon());
    this.syncStart();
  }


  addUser(user){
    if (user !== null && typeof user === 'object' && 'uid' in user){
      this.body.appendChild(new AdminUser(user.uid));
    }
  }

  removeUser(user){
    if (user !== null && typeof user === 'object' && 'uid' in user){
      for (var userX of this.body.children) {
        if (SvgPlus.is(userX, AdminUser) && userX.uid === user.uid) {
          this.body.removeChild(userX)
        }
      }
    }
  }

  syncStart(){
    dataSync.on('users', (sc) => {
      this.addUser(sc)
    }, 'child_added')
    dataSync.on('users', (sc) => {
      this.removeUser(sc)
    }, 'child_removed')
  }
}

class AdminUser extends SvgPlus{
  constructor(uid){
    super('TR');
    this._uid = uid;
    this.class = "admin-user"
    this._image = this.createChild('TD').createChild('IMG');
    this._name = this.createChild('TD');
    this._email = this.createChild('TD');
    this._admin = this.createChild('TD');
    this._delete = this.createChild('TD');
    this._delete.appendChild(new TrashIcon())
    this._delete.onclick = () => {
      this.delete()
    }
    this.syncStart();
  }

  get uid(){
    return this._uid;
  }

  delete(){
    this.syncStop();
    dataSync.remove(`users/${this.uid}`).remove()
  }

  fireRefTo(name){
    return dataSync.ref(`users/${this.uid}/${name}`)
  }

  syncStop(){
    this.fireRefTo('photoURL').off()
    this.fireRefTo('name').off()
    this.fireRefTo('email').off();
    this.adminIcon.reference.off();
  }

  syncStart(){
    this.fireRefTo('photoURL').on('value', (value) => {
      this._image.src = value.val();
    })

    this.fireRefTo('name').on('value', (value) => {
      this._name.innerHTML = value.val();
    })

    this.fireRefTo('email').on('value', (value) => {
      this._email.innerHTML = value.val();
    })

    this.adminIcon = new LockIcon(`users/${this.uid}/admin`);
    this._admin.appendChild(this.adminIcon);
  }
}

export {Admin}
