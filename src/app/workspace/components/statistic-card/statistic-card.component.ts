import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-statistic-card',
  imports: [MatIconModule, MatCardModule],
  templateUrl: './statistic-card.component.html',
  styleUrl: './statistic-card.component.css'
})
export class StatisticCardComponent {
  @Input() status: string = ''
  @Input() icon: string = ''
  @Input() title: string = ''
  @Input() description: string = ''
  @Input() number: number =  0
}
