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
            d[0].coluna1 = JSON.parse(d[0].coluna1)
            d[0].coluna2 = JSON.parse(d[0].coluna2)
            d[0].coluna3 = JSON.parse(d[0].coluna3)
            return d;
          })
        ).subscribe(data => {
      this.quemSomos = data;
    })
  }

}
