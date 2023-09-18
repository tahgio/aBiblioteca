import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Colors as ColorsEnum } from 'src/app/core/types/Consts';
import { Nullable } from 'src/app/core/types/Methods';
import { Colors } from 'src/app/core/types/Unions';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
})
export class TooltipComponent {
  // Init
  // -- bg
  private _bgcss!: ` bg-${Colors} `;
  protected get bgcss(): typeof this._bgcss {
    return this._bgcss;
  }
  // -- border
  private _bordercss!: ` border border-${Colors} ` | ' border-0 ';
  protected get bordercss(): Nullable<typeof this._bordercss> {
    return this.border ? this._bordercss : ' border-0 ';
  }
  // -- textColor
  // Set right color for contrast depending on color input
  protected textColor!: ` text-${Extract<
    Colors,
    typeof ColorsEnum.highlight | typeof ColorsEnum.card
  >} `;
  // Inputs
  // -- text to be shown
  @Input()
  text!: string;
  // -- position setters
  @Input()
  left!: number;
  @Input()
  top!: number;
  // Set bg, border and text tailwind classes according to color input
  @Input()
  set color(val: Colors) {
    if (val) {
      const isLightBg = [ColorsEnum.card, ColorsEnum.main].some((color) => {
        return color === val;
      });

      this._bgcss = ` bg-${val} `;
      this._bordercss = ` border border-${
        !isLightBg ? ColorsEnum.card : ColorsEnum.highlight
      } `;
      this.textColor = isLightBg
        ? ` text-${ColorsEnum.highlight} `
        : ` text-${ColorsEnum.card} `;
    }
  }
  // -- border
  @Input()
  border: boolean = false;
  // -- animation
  @Input()
  animation!: string;
}
