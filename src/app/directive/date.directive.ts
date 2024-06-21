import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDate]',
  standalone: true
})
export class DateDirective {
  @Input() minDate: string = '';
  @Input() isDropoff: boolean = false;
  @Input() pickupDate: string = '';

  constructor(private el: ElementRef) { }

  @HostListener('ionChange', ['$event'])
  onDateChange(event: CustomEvent) {
    const selectedDate = new Date(event.detail.value);
    const minDate = new Date(this.minDate);
    const pickupDate = new Date(this.pickupDate);

    if (this.isDropoff && pickupDate >= selectedDate) {
      // Jika dropoff dan tanggal dropoff kurang dari atau sama dengan tanggal pickup, set minimum tanggal dropoff
      const correctedDate = new Date(pickupDate);
      correctedDate.setDate(pickupDate.getDate() + 1);
      this.el.nativeElement.value = correctedDate.toISOString().split('T')[0];
      console.log('Selected Date for Drop-off adjusted:', this.el.nativeElement.value);
    } else if (selectedDate < minDate) {
      // Jika tanggal yang dipilih kurang dari tanggal minimum, set minimum tanggal
      this.el.nativeElement.value = minDate.toISOString().split('T')[0];
      console.log('Selected Date adjusted to minDate:', this.el.nativeElement.value);
    } else {
      console.log('Selected Date:', selectedDate.toISOString().split('T')[0]);
    }
  }
}
