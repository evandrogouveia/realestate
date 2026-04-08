import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { EditThemeService } from 'src/app/modules/private/admin/components/edit-theme/services/edit-theme.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  quemSomos = [];

  constructor(private editThemeService: EditThemeService) { }

  ngOnInit(): void {
    this.editThemeService.getAllQuemSomos().pipe(
          map((d: any) => {
            const item = d[0];

            item.coluna1 = this.parseIfNeeded(item.coluna1)
            item.coluna2 = this.parseIfNeeded(item.coluna2)
            item.coluna3 = this.parseIfNeeded(item.coluna3)
            
            return d;
          })
        ).subscribe(data => {
      this.quemSomos = data;
    })
  }

  parseIfNeeded(value: any) {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  }

}
