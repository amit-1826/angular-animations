import {style, trigger, state, transition, animate, keyframes, group} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      // 'initial' name is as per we define it, but it should match with the 'state' variable in the component
      state('initial', style(
        {
          backgroundColor: 'red',
          transform: 'translateX(0) scale(1)'
        }
      )),
      state('final', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      // transition defined the from and to state to animate
      // if we want to have same timing 300 from back and forth state, then we can do it in one line ie. initial <=> final
      transition('initial => final', animate(300)),
      transition('final => initial', animate(800))
    ]),
    trigger('shrunkState', [
      // 'initial' name is as per we define it, but it should match with the 'state' variable in the component
      state('initial', style(
        {
          backgroundColor: 'red',
          transform: 'translateX(0) scale(1)'
        }
      )),
      state('final', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      // shrunken name is given to shrink the div
      state('shrunken', style({
        backgroundColor: 'green',
        transform: 'translateX(100px) scale(0.5)'
      })),
      // transition defined the from and to state to animate
      // if we want to have same timing 300 from back and forth state, then we can do it in one line ie. initial <=> final
      transition('initial => final', animate(300)),
      transition('final => initial', animate(800)),
      transition('shrunken <=> *', [
        style({
          backgroundColor: 'orange'
        }),
        animate(1000, style({
          borderRadius: '50px'
        })),
        animate(500)
      ])
    ]),
    trigger('listState1', [
      // 'initial' name is as per we define it, but it should match with the 'state' variable in the component
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      // void means when element is not in dom, it does not have a state
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(500, style({
          opacity: 0,
          transform: 'translateX(100px)'
        }))
      ])
    ]),
    trigger('listState2', [
      // 'initial' name is as per we define it, but it should match with the 'state' variable in the component
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      // void means when element is not in dom, it does not have a state
      transition('void => *', [
        animate(1000, keyframes([
          style({
            opacity: 0,
            transform: 'translateX(-100px)',
            offset: 0 // offset define the internal at which the style should set
          }),
          style({
            opacity: 0.5,
            transform: 'translateX(-50px)',
            offset: 0.3
          }),
          style({
            opacity: 0.8,
            transform: 'translateX(-20px)',
            offset: 0.8
          }),
          style({
            opacity: 1,
            transform: 'translateX(0)',
            offset: 1
          }),
        ]))
      ]),
      transition('* => void', [
        group([
          animate(300, style({
            color: 'red'
          })),
          animate(800, style({
            opacity: 0,
            transform: 'translateX(100px)'
          }))
        ])
      ])
    ])
  ]
})
export class AppComponent {
  state = 'initial'; // should match with the disState's first state, as it is initial state when dom loads
  shrunkState = 'initial';
  list = ['Milk', 'Sugar', 'Bread'];

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  onShrink() {
    this.shrunkState = 'shrunken';
  }

  animate() {
    this.state = this.state == 'initial' ? 'final' : 'initial';
    this.shrunkState = this.state;
  }

  animationStarted(event) {
    console.log(event);
  }

  animationEnded(event) {
    console.log(event);
  }
}
