// Angular Core
import { Injectable } from '@angular/core'

// Date-FNS
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns'

@Injectable({
  providedIn: 'root', // Make the service available throughout the application
})
export class TimeService {
  constructor() {}

  getTimeDifference(targetDate: Date | undefined): string {
    if (!targetDate) {
      return ''
    }

    const now = new Date()
    const days = differenceInDays(targetDate, now)
    const hours = differenceInHours(targetDate, now) % 24
    const minutes = differenceInMinutes(targetDate, now) % 60
    const seconds = differenceInSeconds(targetDate, now) % 60

    const parts: string[] = []
    if (days > 0) {
      parts.push(`${days} days`)
    }
    if (hours > 0) {
      parts.push(`${hours} h`)
    }
    if (minutes > 0) {
      parts.push(`${minutes}m`)
    }
    if (seconds > 0) {
      parts.push(`${seconds}s`)
    }

    return parts.join(', ')
  }
}
