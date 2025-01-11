import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [{ path: '', component: HomeComponent },
  {path: 'payment', component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
