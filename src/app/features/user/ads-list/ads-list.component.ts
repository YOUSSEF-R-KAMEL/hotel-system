import { Component, OnInit } from '@angular/core';
import { AdsService } from './services/ads.service';
import { IAds } from './interfaces/ads.interface';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrl: './ads-list.component.scss'
})
export class AdsListComponent implements OnInit {
  allRes!:IAds
  constructor(private _adsService:AdsService) {
    // this.getAllAds()
  }
  ngOnInit(): void {
    this.getAllAds()
  }

  getAllAds(){
    this._adsService.getAllAds().subscribe({
      next: (res)=>{
        // this.allRes = res
        console.log(res)
      },
      error(err) {
        console.log(err)
      },
      complete() {
      },
    })
  }
}
