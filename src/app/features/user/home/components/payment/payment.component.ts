import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { injectStripe, StripeCardComponent } from 'ngx-stripe';
import { IBooking } from '../../../../admin/dashboard/booking-facilities/interfaces/booking-facility.interface';
import { PaymentService } from '../../../services/payment.service';
import { ToastrService } from 'ngx-toastr';
import { IApiResponse } from '../../../../../shared/interface/api-data-response/api-response.interface';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  // theme = 'light';
  // backgroundColor = computed(() => this.theme === 'light' ? '#fff' : '#000');
  bookingId = '';
  stepCompleted = false;
  booking: IBooking | undefined = undefined;
  stripePublicKey = 'pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8';
  @ViewChild(StripeCardComponent) cardElement!: StripeCardComponent;
  constructor(private toast: ToastrService,private paymentService: PaymentService, private route: ActivatedRoute, private _formBuilder: FormBuilder) {
    this.bookingId = this.route.snapshot.queryParamMap.get('bookingId') || '';
  }
  ngOnInit(): void {
    this.getBookingDetails();
  }

  getBookingDetails() {
    this.paymentService.getBookingDetails(this.bookingId).subscribe({
      next: (res) => {
        this.booking = res.data.booking;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  private readonly fb = inject(UntypedFormBuilder);
  isEditable = false;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        backgroundColor:  'transparent',
        color: '#6668CEFF',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  checkoutForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    cardNumber: ['', [Validators.required]],
  });

  stripe = injectStripe(this.stripePublicKey);

  createToken() {
    const name = this.checkoutForm.get('name')?.value;
    this.stripe
      .createToken(this.cardElement.element, { name })
      .subscribe((result) => {
        if (result.token) {
          this.payBooking(result.token.id);
        } else if (result.error) {
          console.log(result.error.message);
        }
      });
  }
  payBooking(token: string) {
    this.paymentService.payBooking(this.bookingId, token).subscribe({
      next: (res: IApiResponse) => {
        this.toast.success(res.message);
        this.stepCompleted = true;
      },
      error: (err) => {
        this.toast.error(err.error.message);
      },
    })
  }
}
