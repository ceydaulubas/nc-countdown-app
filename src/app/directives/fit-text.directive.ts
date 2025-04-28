// Angular Core
import {
  Directive,
  ElementRef,
  Renderer2,
  AfterViewInit,
  OnDestroy,
  HostListener,
  Input,
} from '@angular/core'

@Directive({
  selector: '[appFitText]',
  standalone: true,
})
export class FitTextDirective implements AfterViewInit, OnDestroy {
  // Optional tuning parameter: larger = smaller final font
  @Input() compressor = 1

  @Input() minFontSize = 16
  @Input() maxFontSize = 300

  private mutationObs!: MutationObserver

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit() {
    // whenever the element’s content or childNodes change, recalc
    this.mutationObs = new MutationObserver(() => this.adjust())
    this.mutationObs.observe(this.el.nativeElement, {
      characterData: true,
      childList: true,
      subtree: true,
    })

    // initial sizing
    this.adjust()
  }

  ngOnDestroy() {
    this.mutationObs.disconnect()
  }

  // On window-resize, re-adjust
  @HostListener('window:resize')
  onResize() {
    this.adjust()
  }

  // Binary-search style: find the largest fontSize that still fits
  private adjust() {
    const el = this.el.nativeElement as HTMLElement
    const parentWidth = el.clientWidth
    const text = el.innerText

    let low = this.minFontSize
    let high = this.maxFontSize
    let fitSize = low

    if (!text) return

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      this.renderer.setStyle(el, 'fontSize', `${mid}px`)
      if (el.scrollWidth <= parentWidth) {
        fitSize = mid
        low = mid + 1
      } else {
        high = mid - 1
      }
    }

    this.renderer.setStyle(el, 'fontSize', `${fitSize}px`)
  }
}
