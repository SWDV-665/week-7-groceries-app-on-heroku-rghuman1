import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
}

ionViewDidLoad() {
  this.LoadItems();
}

loadItem() {
  this.dataService.getITems()
  .subscribe(
    items => this.items = items,
    error => this.errorMessage = <any>error);
}

removeITem(id) {
  this.dataService.removeItem(id);
}

shareItem(item){
  console.log("Sharing Item -", item);
  const toast = this.toastCtrl.create({
    message: 'Sharing Item -' + item.name + " ...",
    duration: 3000
  });
  
removeItem(item, index) {
  console.log("Removing Item - ", item, index);
  const toast = this.toastCtrl.create({
    message: 'Removing Item -' + index + "...",
    duration: 3000
  });
  toast.present();
  this.inputDialogService

  let message ="Grocery Item - Name" + item.name + "- Quantity:" + item.quantity;
  let subject ="Shared via Groceries app";
  this.socialSharing.share().then((message, subject) => {
    console.log("Message successful!");
  }).catch((error) => {
    console.log("Error whiling sharing", error);
  });
}

shareItem(item, index) {
  console.log("Sharing Item - ", item, index);
  const toast = this.toastCtrl.create({
    message: 'Sharing Item -' + index + "...",
    duration: 3000
  });
  toast.present();
}

editItem(item, index) {
  console.log("Edit Item - ", item, index);
  const toast = this.toastCtrl.create({
    message: 'Editing Item -' + index + "...",
    duration: 3000
  });
  toast.present();
  this.inputDialogService.showPrompt(item, index);
}

addItem() {
  console.log("ADding Item");
  this.inputDialogService.showPrompt();
}

showAddItemPrompt(item, index) {
  const prompt = this.alertCtrl.create({
    title: 'Add Item',
    message: "Please enter item..",
    inputs: [
      {
        name:'name',
        placeholder: 'Name'
      },
      {
        name: 'quantity',
        placeholder: 'Quantity'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: item=> {
          console.log('Cancel clicked', item);
          this.items.push(item);
        }
      }
    ]
  });
  prompt.present();
}
