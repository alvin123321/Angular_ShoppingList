import { DataStorageService } from './shared/data-storage.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService
  ) {}
  ngOnInit() {
    this.authService.autoLogin();
    if (this.authService.user.value) {
      this.dataStorageService.fetchRecipes().subscribe();
    }
  }
}
