import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
// import { AngularFireList } from 'angularfire2';

// import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  username: string = '';
  message: string = '';
  messages: Object[] = [];
  chatSubscription;

  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.username = this.navParams.get('username');
    this.chatSubscription = db.list('chat').valueChanges().subscribe(data => {
      console.log(data);
      this.messages = data;
    });
  }

  sendMessage() {
    this.db.list('/chat').push({
      'username' : this.username,
      'message' : this.message
    });
    this.message = "";
  }

  ionViewWillLeave() {
    console.log("user is about to go");
    this.chatSubscription.unsubscribe();
    this.db.list('chat').push({
      specialMessage: true,
      message: this.username + ' has left the room'
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.db.list('chat').push({
      specialMessage: true,
      message: this.username + ' has joined the room'
    })
  }

}
