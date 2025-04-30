// Angular Core
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  NgZone
} from '@angular/core'

// Angular Common
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

// Angular Material
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import {
  MatDatepickerModule,
  MatDatepicker,
} from '@angular/material/datepicker'
import { provideNativeDateAdapter } from '@angular/material/core'

// Interfaces
import { CountdownForm } from '../../interfaces/countdownForm'

// Directives
import { FitTextDirective } from '../../directives/fit-text.directive'

// Services
import { TimeService } from '../../services/time.service'
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    FormsModule,
    CommonModule,
    FitTextDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit, OnDestroy, AfterViewInit {
  countdownForm: CountdownForm = { title: '', date: null }
  todayDate: Date = new Date()
  public timeLeft = ''
  private intervalId: any
  private hasCelebrated = false;

  @ViewChild('titleElement') titleElement?: ElementRef
  @ViewChild('countdownElement') countdownElement?: ElementRef

  constructor(
    private timeService: TimeService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone   
  ) {}

  ngOnInit() {
    this.loadPersistedData()
    this.startCountdown()
  }

  ngAfterViewInit() {
    this.resizeText()
    window.addEventListener('resize', () => this.resizeText())
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
    window.removeEventListener('resize', () => this.resizeText())
  }

  // Title and countdown text are resized using the fit-text directive
  private resizeText() {
    this.titleElement?.nativeElement.resizeText()
    this.countdownElement?.nativeElement.resizeText()
  }

  // Both the time difference is displayed on the screen and saved to localStorage
  private updateTime() {
    if (!this.countdownForm.date) return;
    this.timeLeft = this.timeService.getTimeDifference(this.countdownForm.date);
    this.save('date', this.countdownForm.date);
    this.cdr.detectChanges();
  }

  startCountdown() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
    if (
      this.isToday(this.countdownForm.date) &&
      this.countdownForm.title?.trim().length > 0
    ) {
      confetti({ particleCount: 800, spread: 800, origin: { y: 0.5 } })
      confetti({ particleCount: 1000, spread: 1000, origin: { y: 0.5 } })
    }
    this.updateTime()
    // Every second, update the countdown: interval is started outside the zone for performance,
    // then on every tick, trigger Angular change detection
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = window.setInterval(() => {
        this.ngZone.run(() => {
          this.updateTime()
        })
      }, 1000)
    })
  }

  get camelCaseTitle(): string {
    return this.countdownForm.title.replace(
      /\w\S*/g,
      (txt: string) =>
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    )
  }

  private loadPersistedData() {
    const savedTitle = localStorage.getItem('title')
    const savedDate = localStorage.getItem('date')
    if (savedTitle) {
      this.countdownForm.title = savedTitle
    }
    if (savedDate && savedDate !== 'null' && savedDate !== 'undefined') {
      this.countdownForm.date = new Date(savedDate)
    }
  }

  public save(key: string, value: any) {
    if (value instanceof Date) {
      localStorage.setItem(key, value.toISOString())
    } else {
      localStorage.setItem(key, value)
    }
  }

  public titleChange(e: any) {
    this.countdownForm.title = e.target.value
    this.save('title', this.countdownForm.title)
    this.resizeText()
    this.cdr.detectChanges();  
  }

  public isToday(date: Date | null): boolean {
    if (!date) return false
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }
}
