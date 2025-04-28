// Angular Core 
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core'

// Angular Common
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker'
import { provideNativeDateAdapter } from '@angular/material/core'

// Interfaces
import { CountdownForm } from '../../interfaces/countdownForm'

// Directives
import { FitTextDirective } from '../../directives/fit-text.directive'

// Services
import { TimeService } from '../../services/time.service'

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
  constructor(
    private timeService: TimeService,
    private cdr: ChangeDetectorRef  
  ) {}

  countdownForm: CountdownForm = {
    title: '',
    date: null,
  }

  todayDate: Date = new Date()
  private intervalId: any

  @ViewChild('titleElement') titleElement: ElementRef | undefined
  @ViewChild('countdownElement') countdownElement: ElementRef | undefined

  ngOnInit() {
    this.loadPersistedData()
    this.startCountdown()
  }

  ngAfterViewInit() {
    // Initial resize
    this.resizeText()

    // Resize on window changes
    window.addEventListener('resize', () => this.resizeText())
  }

  resizeText() {
    if (this.titleElement) {
      this.titleElement.nativeElement.resizeText()
    }
    if (this.countdownElement) {
      this.countdownElement.nativeElement.resizeText()
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
    window.removeEventListener('resize', () => this.resizeText())
  }

  startCountdown() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }

    this.intervalId = window.setInterval(() => {
      this.calculateTimeDifference(this.countdownForm.date);
      this.cdr.markForCheck();   
    }, 1000);
  
  }


  calculateTimeDifference(targetDate: Date | null): string {
    if (targetDate) {
      const difference = this.timeService.getTimeDifference(targetDate)
      this.save('date', targetDate)
      return difference
    }
    return ''
  }

  get camelCaseTitle() {
    return this.countdownForm.title.replace(/\w\S*/g, function (txt: string) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
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
  }

  isToday(date: Date | null): boolean {
    if (!date) return false
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }
}
