import { Component, inject } from '@angular/core';
import { ThemeService } from '../../shared/services/theme/theme.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  public themeService = inject(ThemeService);
}
