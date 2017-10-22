import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from "@angular/animations";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('trigger',[
      state('smaller',style({
        transform:'rotate(0deg)',
      })),
      state('larger',style({
        transform: 'rotate(0deg)'
      })),
      transition('void <=> larger', animate("600ms", keyframes([
        style({opacity: 0 , transform: 'rotate(0deg)'}),
        style({opacity: 1 , transform: 'rotate(180deg)'}),
      ]))),
      transition('void <=> smaller', animate("600ms", keyframes([
        style({opacity: 0 , transform: 'rotate(180deg)'}),
        style({opacity: 1 , transform: 'rotate(0deg)'}),
      ])))
    ])
  ]
})
export class NavbarComponent implements OnInit {
  div1: boolean = true;
  div2: boolean = false;
  state:string = ''
  constructor() { }

  ngOnInit() {
  }

toggle() {
    this.div1=!this.div1;
    this.div2=!this.div2;
}

animate() {
  this.state = this.state == 'larger'? 'smaller': 'larger';
}

}
