import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../entities/contact.class';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  private contacts: Contact[];

  constructor(
    private alertController: AlertController,
    private contactsService: ContactsService,
    private socketService: SocketService
    ) { 
    this.socketService.newNotification().subscribe(data=>{
      this.loadContacts();
    });
  }

  ngOnInit() {
    this.loadContacts();
  }

  private loadContacts(){
    this.contactsService.getContacts().subscribe(res=>{
      this.contacts = res;
    });
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Add contact',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'name@email.com'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.alertController.dismiss();
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.contactsService.postContact({email:data.email}).subscribe(res=>{
              this.presentSuccessAlert(data.email);
            },err=>{
              if(err.status == 422){
                this.presentErrorAlert(data.email);
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentSuccessAlert(email) {
    const alert = await this.alertController.create({
      header: 'Success',
      message: `We will notify '${email}' that you want to be connected`,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentErrorAlert(email) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: `Email '${email}' is invalid`,
      buttons: ['OK']
    });

    await alert.present();
  }


}
