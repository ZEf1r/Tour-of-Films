import { animate, Component, Input, state, style, transition, trigger } from '@angular/core';

@Component({
	selector: 'my-test',
	template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/search" routerLinkActive="active">Search</a>
      <a routerLink="/detail" routerLinkActive="active">Heroes</a>
    </nav>
    <div [hidden]="!top()" [@scrollState]="scrollup.state"
	(mouseover)="scrollup.toggleState()"
	(mouseout)="scrollup.toggleState()"
	(click)="scrollTo()"><br>{{scrollup.name}}</div>
    <router-outlet></router-outlet>
  `,
	styles: [`
    div {
      width:50px;
	  height:110px;
	  background-image: url("images/shar.png");
	  font: 18pt bold;
	  text-align: center;
	  right: 3px;
	  bottom: 1%;
	  z-index: 222;
	  cursor: pointer;
	  position: fixed;
	  border-radius: 30px 30px;
    }
  `],
	animations: [
		trigger('scrollState', [
			state('a', style({
				//backgroundColor: '#cf0', <img src="images/shar.png" alt="{{scrollup.name}}">
				transform: 'scale(0.5)',
				opacity: '0.2'
			})),
			state('b', style({
				//backgroundColor: '#0cf',
				opacity: '0.8',
				transform: 'scale(1)'
			})),
			transition('a <=> b', [
				animate('480ms ease-in', style({
					backgroundColor: '#0cf',
					transform: 'translateY(-5px)'
				}))
			])
		])
	]
})
export class AppComponent {
	top() {
		return (window.pageYOffset > 2000)
	}
	private scrollup = {
		name: 'UP', state: 'a',
		toggleState() {
			this.state = (this.state === 'b' ? 'a' : 'b');
		}
	};
	title = 'Tour of Films';
	scrollTo() {
		console.log("click shar!");
		window.scroll(0, 0)
	}
}