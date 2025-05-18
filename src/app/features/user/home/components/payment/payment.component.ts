import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { injectStripe, StripeCardComponent } from 'ngx-stripe';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, switchMap } from 'rxjs';
import { Booking } from '../../../interfaces/api-responses/api-response-booking.interface';
import { BookingRoomService } from '../../../services/booking/booking-room.service';

interface IPaymentResponse {
  success: boolean;
  message?: string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild(StripeCardComponent) cardElement!: StripeCardComponent;

  // Services
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(UntypedFormBuilder);
  private readonly bookingService = inject(BookingRoomService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);

  // Properties
  readonly stripePublicKey = 'pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8';
  readonly stripe = injectStripe(this.stripePublicKey);
  bookingDetails: Booking | null = null;
  isPaymentProcessing = false;
  isCardComplete = false;


  // Form Groups
  readonly firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required],
  });

  readonly checkoutForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  // Stripe Options
  readonly cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  readonly elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  private get bookingId(): string {
    return this.route.snapshot.queryParams['bookingId'];
  }

  ngOnInit(): void {
    this.loadBookingDetails();
  }

  private loadBookingDetails(): void {
    this.bookingService.getBooking(this.bookingId).subscribe({
      next: (res) => {
        this.bookingDetails = res.data.booking;
      },
      error: (error) => {
        this.toastr.error('Failed to load booking details');
        console.error('Error loading booking:', error);
      }
    });
  }

  onCardChange(event: any): void {
    this.isCardComplete = event.complete;
  }

  createToken(): void {
    if (this.isPaymentProcessing || !this.isCardComplete) return;

    this.isPaymentProcessing = true;
    const name = this.checkoutForm.get('name')?.value;

    this.stripe
      .createToken(this.cardElement.element, { name })
      .pipe(
        switchMap(result => {
          if (result.token) {
            return this.bookingService.payBooking(this.bookingId, result.token.id);
          } else if (result.error) {
            this.toastr.error(result.error.message);
            return EMPTY;
          }
          return EMPTY;
        })
      )
      .subscribe({
        next: (res) => {
          this.firstFormGroup.get('firstCtrl')?.setValue('completed');
          setTimeout(() => {
            this.stepper.next();
          });
        },
        error: (err) => {
          this.toastr.error(err.error.message);
          this.isPaymentProcessing = false;
        },
        complete: () => {
          this.isPaymentProcessing = false;
        }
      });
  }

  returnHome(): void {
    this.router.navigate(['/']);
  }
}
