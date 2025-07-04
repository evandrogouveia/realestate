import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EditThemeService } from 'src/app/modules/private/admin/components/edit-theme/services/edit-theme.service';

@Component({
  selector: 'app-entry-banner-pages',
  templateUrl: './entry-banner-pages.component.html',
  styleUrls: ['./entry-banner-pages.component.scss']
})
export class EntryBannerPagesComponent implements OnInit {
  @Input() title: string;
  banner = [];
  
  constructor(private editThemeService: EditThemeService) { }

  ngOnInit(): void {
    this.editThemeService.getAllBannerPaginas().subscribe(banner => {
      this.banner = banner;
    })
  }

}
