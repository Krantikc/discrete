import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  // imports: [
  //   CommonModule,
  //   MatToolbarModule,
  //   MatMenuModule,
  //   MatTabsModule,
  //   MatDividerModule,
  //   MatCardModule,
  //   MatListModule,
  //   MatExpansionModule,
  //   MatButtonModule,
  //   MatIconModule,
  //   MatDialogModule,
  //   MatInputModule,
  //   MatSnackBarModule,
  //   FormsModule,
  //   ReactiveFormsModule,
  //   MatSidenavModule,
  //   MatTreeModule,
  //   MatProgressBarModule,
  //   MatFormFieldModule,
  //   MatSelectModule,
  //   FlexLayoutModule,
  //   MatTableModule,
  //   MatAutocompleteModule,
  //   MatBadgeModule,
  //   MatBottomSheetModule,
  //   MatButtonToggleModule,
  //   MatCheckboxModule,
  //   MatChipsModule,
  //   MatStepperModule,
  //   MatDatepickerModule,
  //   MatGridListModule,
  //   MatNativeDateModule,
  //   MatPaginatorModule,
  //   MatProgressSpinnerModule,
  //   MatRadioModule,
  //   MatRippleModule,
  //   MatSliderModule,
  //   MatSlideToggleModule,
  //   MatSortModule,
  //   MatTooltipModule,
  //   CdkTableModule,
  //   CdkTreeModule
  // ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatTableModule,
    CdkTableModule,
    CdkTreeModule
  ],
  declarations: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
