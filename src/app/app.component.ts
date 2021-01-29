import { Component ,OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Subscription } from 'rxjs';
import {
  singleSpaPropsSubject,
  SingleSpaProps,
} from '../single-spa/single-spa-props';

@Component({
  selector: '#angular9 app-root',
  template: `<router-outlet></router-outlet>`,
  styles: [``]
})
export class AppComponent  implements OnInit {
  subscription: Subscription;
  singleSpaProps: SingleSpaProps;
  state;
  ngOnInit() {
    this.subscription = singleSpaPropsSubject.subscribe(async (props) => {
      props['onGlobalStateChange']((state, prev) => {
        this.state = state;
        console.log(this.state)
      });
      this.singleSpaProps = props;
    });
  }

}
