import { Component, OnInit,  } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { DataService } from '../../shared/data.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contactUs: FormGroup;
  
  constructor(private data: DataService) { }

  ngOnInit() {
    this.contactUs=new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email]),
      name : new FormControl('', [Validators.required]),
      number : new FormControl('', [Validators.required, Validators.pattern(`^\\+(?:[0-9]●?){6,14}[0-9]$`)]),
      message : new FormControl('')
    });
  }


  onSubmit(){
     console.log(this.contactUs.value)
     this.data.sendMail(this.contactUs.value).subscribe(
       (response) => console.log(response),
       (error) => console.log(error)
     );
     this.contactUs.reset();
  }
}

