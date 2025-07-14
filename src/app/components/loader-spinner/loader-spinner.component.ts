import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader-spinner',
  imports: [NgClass],
  templateUrl: './loader-spinner.component.html',
  styleUrl: './loader-spinner.component.css',
})
export class LoaderSpinnerComponent {
  @Input({ required: true }) loaderSize!: string;
}
