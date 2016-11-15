import { animate, Component, Input, state, style, transition, trigger } from '@angular/core';

@Component({
	selector: 'my-test',
	templateUrl: 'templates/app.html',
	styleUrls: ['css/app.css'],
	animations: [
		trigger('scrollState', [
			state('a', style({
				transform: 'scale(0.7)',
				opacity: '0.4'
			})),
			state('b', style({
				opacity: '0.9',
				transform: 'scale(1.05)'
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
		return (window.pageYOffset > 1200)
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