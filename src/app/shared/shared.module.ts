import { CommonModule, NgFor } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StarRatingModule } from 'angular-star-rating';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SingleRoomComponent } from '../features/user/components/single-room/single-room.component';
import { DeleteItemComponent } from './components/delete-item/delete-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserNavbarComponent } from './components/navbar/user-navbar.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    TableComponent,
    DeleteItemComponent,
    UserNavbarComponent,
    FooterComponent,
    SingleRoomComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    NgFor,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    NgxDropzoneModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    StarRatingModule,
    TranslateModule,
  ],
  exports: [
    RouterModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    TableComponent,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    NgxDropzoneModule,
    FooterComponent,
    UserNavbarComponent,
    MatDatepickerModule,
    SingleRoomComponent,
    MatSlideToggleModule,
    StarRatingModule,
    TranslateModule,
  ],
})
export class SharedModule {}
