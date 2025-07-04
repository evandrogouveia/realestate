import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { EditFooterService } from 'src/app/modules/private/admin/components/edit-theme/edit-footer/services/edit-footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footer = [];

  constructor(private editFooterService: EditFooterService) { }

  ngOnInit(): void {
    this.editFooterService.getFooter().pipe(
          map(d => {
            d[0].menu = JSON.parse(d[0].menu)
            d[0].redesSociais = JSON.parse(d[0].redesSociais)
            return d;
          })
        ).subscribe(footer => {
      this.footer = footer;
    });
  }

}
