import { Component, computed, inject, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, injectStripe } from 'ngx-stripe';
import { ThemeService } from '../../../../../shared/services/theme/theme.service';
import { HelperService } from '../../../../../shared/services/helpers/helper.service';
import { RoomsService } from '../../../services/rooms.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  // theme = 'light';
  // backgroundColor = computed(() => this.theme === 'light' ? '#fff' : '#000');
  bookingId = '';


  stripePublicKey = 'pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8';
  @ViewChild(StripeCardComponent) cardElement!: StripeCardComponent;
  constructor(private roomsService: RoomsService, private route: ActivatedRoute) {
    this.bookingId = this.route.snapshot.queryParamMap.get('bookingId') || '';
  }

  private readonly fb = inject(UntypedFormBuilder);

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
          console.log(result.token.id);
        } else if (result.error) {
          console.log(result.error.message);
        }
      });
  }
}
