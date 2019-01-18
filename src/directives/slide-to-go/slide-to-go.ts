import { Directive, Input, ElementRef, Renderer } from "@angular/core";
import { DomController, AlertController } from "ionic-angular";

@Directive({
  selector: "[slide-to-go]"
})
export class SlideToGoDirective {
  @Input("startLeft") startLeft: any;

  constructor(
    public element: ElementRef,
    public renderer: Renderer,
    public domCtrl: DomController,
    public alertCtrl: AlertController
  ) {}

  ngAfterViewInit() {
    let hammer = new window["Hammer"](this.element.nativeElement);
    hammer.get("pan").set({ direction: window["Hammer"].DIRECTION_ALL });

    hammer.on("pan", ev => {
      this.handlePan(ev);
    });
  }

  newLeft: number;
  fixTouch: number = 65;
  breaker: boolean = true;

  handlePan(ev) {
    this.newLeft = ev.center.x - this.fixTouch;

    if (this.newLeft >= 0 && this.newLeft <= 243 && this.breaker) {
      this.domCtrl.write(() => {
        this.renderer.setElementStyle(
          this.element.nativeElement,
          "left",
          this.newLeft + "px"
        );

        console.log(this.newLeft);

        if (this.newLeft >= 243 && this.breaker) {
          this.slideEnd();
          this.breaker = !this.breaker;
        }
      });
    }
  }

  slideEnd() {
    console.log("Function");
    const confirm = this.alertCtrl.create({
      title: "Function works",
      buttons: [
        {
          text: "Ok",
          handler: () => {
            console.log("Ok");
          }
        }
      ]
    });

    confirm.present();
  }
}
