// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Initialize Firebase
let firebaseConfig = {
  apiKey: "AIzaSyDlVXAW24qYo7BIrqj527dsueGrZ-lLY54",
  authDomain: "daniel-merson.firebaseapp.com",
  databaseURL: "https://daniel-merson-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "daniel-merson",
  storageBucket: "daniel-merson.appspot.com",
  messagingSenderId: "131865111716",
  appId: "1:131865111716:web:60ab7e190a8581cf524a31",
  measurementId: "G-9DH1WQ51BS"
};
firebase.initializeApp(firebaseConfig);

class DataSync{

  constructor(){
    this._listeners = {}

  }

  asList(e){
    let list = [];
    for (let key in e){
      list.push(e[key])
    }
    return list
  }

  async listAllFilePaths(path){
    if (path == null) return null;

    let array = [];
    try{
      let ref = this.storageChild(path);
      let list = await ref.listAll();

      if (list == null) return null;

      for ( var prefix of list.prefixes ){
        let sublist = await this.listAllStorageFiles(prefix.fullPath);
        if (sublist != null) array = array.concat(sublist);
      }

      for (var item of list.items ){
        array.push(item.fullPath);
      }

      return array;
    }catch(e){
      console.log(e);
      return null
    }
  }

  async deleteStorageFolder(path){
    let filepaths = await listAllStorageFiles(path);
    if (filepaths === null) return 0;
    for ( var filepath of filepaths ){
      try{
        await this.storageChild(filepath).delete();
        await this.ref(filepath.split("\.")[0]).remove()
      }catch(e){
        ec++;
        console.log(e);
      }
    }

    return ec;
  }

  // Upload file to firebase storage bucket
  async uploadFile(file, path, statusCallback, filename = file.name){
    path = `${path}`
    if ( !(file instanceof File) || typeof path !== 'string' ){
      console.log('invalid file');
      return null;
    }
    return new Promise((resolve, reject) => {

      try{
        var uploadTask = this.storageChild(path + '/' + filename).put(file);
      }catch(e){
        console.log(e);
        resolve(null)
      }

      uploadTask.on('state_changed', (snapshot) => {

        // Observe state change events such as progress, pause, and resume
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (statusCallback instanceof Function) {
          statusCallback(progress);
        }

      }, (error) => {
        resolve(null);
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.set(path +'/' + filename.split("\.")[0], downloadURL)
          resolve(downloadURL);
        });
      });
    })
  }

  ref(ref){
    return firebase.database().ref(ref)
  }

  get storageRef(){
    return firebase.storage().ref();
  }

  storageChild(child){
    return this.storageRef.child(child)
  }

  async get(ref){
    return new Promise((resolve, reject) => {
      try{
        this.ref(ref).once("value").then((e) => {
          resolve(e.val());
        }).catch((e) => {
          console.log(e);
          resolve(null);
        })
      }catch(e){
        console.log(e);
        resolve(null);
      }
    });
  }

  async set(ref, value){
    console.log(value);
    return new Promise((resolve, reject) => {
      try{
        this.ref(ref).set(value).then((e) => {
          resolve(true);
        }).catch((e) => {
          console.log(e);
          resolve(false);
        })
      }catch(e){
        resolve(false)
        console.log(e);
      }
    });
  }

  remove(ref){
    this.ref(ref).remove()
  }

  on(ref, callback, listmode = 'value'){
    if (callback instanceof Function){
      try{
        this._listeners[ref] = true
        this.ref(ref).on(listmode, (e) => {
          callback(e.val())
        }, (e) => {
          delete this._listeners[ref]
        })
      }catch(e){
        console.log(e);
        return false
      }
    }else{
      return false
    }
  }

  off(ref){
    this.ref(ref).off()
    delete this._listeners[ref]
  }
}

class FireAuth{
  constructor(returnPath = "/"){
    this.init = true;
    this.uiConfig = {
      // Url to redirect to after a successful sign-in.
      'signInSuccessUrl': returnPath,
      'callbacks': {
        uiShown: function() {
          // // The widget is rendered.
          // // Hide the loader.
        }
      },
      'signInOptions': [
        // TODO(developer): Remove the providers you don't need for your app.
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          // Required to enable ID token credentials for this provider.
          // clientId: CLIENT_ID,
          customParameters: {
            // Forces account selection even when one account
            // is available.
            prompt: 'select_account'
          }
        },
      ],
      // Terms of service url.
      'tosUrl': 'https://www.google.com',
    };

    this.user = null;
    this.onuser = [];
    this['onuser-auth'] = [];
    this['onuserleave'] = [];


    // Initialize the FirebaseUI Widget using Firebase.
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());

    firebase.auth().onAuthStateChanged((user) => {
      this.init = false;

      //If no user then start auth container
      if (!user){
        this.runEventListener('userleave');
          let authContainer = document.createElement('DIV');
          authContainer.setAttribute('id', 'firebaseui-auth-container');
          document.body.appendChild(authContainer);
          this.ui.start('#firebaseui-auth-container', this.uiConfig)

      }else{
        this.runEventListener('user-auth', user);
      }
    });
  }

  parseElement(elem){
    if (elem == null){
      return null
    }
    if (typeof elem === 'string'){
      return this.parseElement(document.getElementById(elem))
    }else if ((`${elem.constructor}`).indexOf('Element') != -1){
      return elem
    }else{
      return null
    }
  }



  signOut(){
    firebase.auth().signOut();
  }
  attachSignOutButton(elem){
    elem = this.parseElement(elem);
    if (elem instanceof Element){
      elem.onclick = () => {
        this.signOut();
      }
    }else{
      console.error(`${elem} is neither a valid element or id`);
    }
  }
  runEventListener(name, param){
    name = 'on' + name;
    if (!(name in this)){
      throw `${name} is not a valid event`
      return
    }
    let event_listener = this[name]
    if (event_listener instanceof Function){
      event_listener(param)
    }else if(event_listener instanceof Array){
      event_listener.forEach((callback) => {
        callback(param)
      })
    }
  }
  addEventListener(type, callback){
    type = 'on' + type;
    if (!(type in this)){
      throw `${type} is not a valid event listener`
      return
    }
    if (!(callback instanceof Function)){
      throw 'Callback must be a function'
      return
    }
    this[type].push(callback)
  }
}

class User extends FireAuth{
  constructor(path){
    super(path);
    this.default = {
      name: '',
      email: '',
      photoURL: '',
      admin: false,
      uid: null,
    }
    this.data = null;

    this._hasUser = false;
    this._userRef = null;

    //When a fireAuth gets a user auth link
    this.addEventListener('user-auth', (userAuth) => {
      console.log('user authenticated');
      this.data = userAuth;
      this.syncDatabase();
      this.syncAuthToken(userAuth);
    });
  }


  syncAuthToken(userAuth){
    let ref = firebase.database().ref(`/users/${userAuth.uid}/update`);
    ref.on('value', () => {
      console.log('user authentication update');
      userAuth.getIdToken(true);
    })
  }

  get hasUser(){
    return this._hasUser
  }


  get userRef(){
    if (this.uid !== null){
      return firebase.database().ref(`users/${this.uid}`);
    }
    return null;
  }

  isValidUser(user){
    if (user === null || typeof user !== 'object') return false;
    for (let key in this.default){
      if (!(key in user)) return false;
    }
    return true;
  }


  async __getDatabaseUser(){
    //If no user reference return null
    if (this.userRef === null){
      return null;
    }

    //Get user once from firebase
    try{
      let user = await this.userRef.once('value');
      return user.val();
    }catch(e){
      console.log(e);
      return null;
    }
  }

  async _checkDatabaseForUser(){
    //If no user reference return
    let user = await this.__getDatabaseUser();
    if (!this.isValidUser(user)){
      try{
        await this.userRef.set(this.data);
        console.log("user created");
      }catch(e){
        console.log(e);
        return false;
      }
    }
    return true;
  }

  set listening(val){
    if (this.userRef === null) return;
    if (val && !this.listening){
      try{
        this.userRef.on('value', (sc) => {
          this._hasUser = true;
          this.data = sc.val();
          console.log('user updated');
          this.runEventListener('user');
        })
        this._listening = true;
      }catch(e){
        this._listening = false;
      }
    }else if (!val && this.listening){
      this.userRef.off();
    }
  }



  async syncDatabase(){
    this._hasUser = false;
    let hasUser = await this._checkDatabaseForUser();
    if (hasUser) {
      this.listening = true;
    } else {
      this._hasUser = false;
    }
  }


  set data(user){
    if (user === null || typeof user !== 'object') return;

    for (var key in this.default){
      if (key in user){
        this[key] = user[key]
      }else{
        this[key] = this.default[key];
      }
    }

    if ('displayName' in user){
      this.name = user.displayName;
    }else{
      this.name = this.default.name;
    }
  }

  get data(){
    let data = {}
    for (var key in this.default){
        data[key] = this[key]
    }
    return data;
  }
}


export {DataSync, User}
