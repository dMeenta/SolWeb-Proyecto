import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { LoaderSpinnerComponent } from './components/loader-spinner/loader-spinner.component';
import { NgIf } from '@angular/common';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSonnerToaster, LoaderSpinnerComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = '';

  constructor(public loadingService: LoadingService) {}
}
