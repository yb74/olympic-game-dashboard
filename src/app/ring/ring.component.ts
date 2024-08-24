import { Component, OnInit } from '@angular/core';
import { RetrieveDataService } from '../services/retrieve-data.service';
import { ContinentApiData } from '../models/continentApiData';
import { ContinentObj } from '../models/continentObj';

@Component({
  selector: 'app-ring',
  templateUrl: './ring.component.html',
  styleUrls: ['./ring.component.css']
})
export class RingComponent implements OnInit {

  public continents: ContinentApiData[] = [];
  public configuredContinents: ContinentObj[] = [];
  public ringBorderWidth: number = 0;

  constructor(private retrieveDataService: RetrieveDataService) {}

  ngOnInit(): void {
    this.retrieveDataService.getData().subscribe(data => {
      this.continents = data;

      this.configureContinentSettings(this.continents);
    });
  }

  configureContinentSettings = (continents: ContinentApiData[]) => {
    // colors are defined within an array and ordered as in the olympic game logo
    const colors = ["blue", "yellow", "black", "green", "red"];

    for (let i = 0; i < continents.length; i++) {
      // setting rings border size
      this.setRingBorderSize(continents[i]);

      // setting rings position

      const continent: ContinentObj = {
        name: continents[i].name,
        medal: {
          gold: {
            medalNumberPerGrade: continents[i].gold,
            medalColor: "gold"
          },
          silver: {
            medalNumberPerGrade: continents[i].silver,
            medalColor: "silver"
          },
          bronze: {
            medalNumberPerGrade: continents[i].bronze,
            medalColor: "brown"
          },
          totalMedals: continents[i].total
        },
        color: colors[i],
        ringBorderSize: this.ringBorderWidth,
        positionX: 20,
        positionY: 50
    };
  
      this.configuredContinents.push(continent);
    }
    return this.configuredContinents;
  }

  setRingBorderSize = (continent: ContinentApiData) => {
    continent.total === 0 ? 0 :
    continent.total >= 0 && continent.total < 20 ? this.ringBorderWidth = 1 :
    continent.total >= 20 && continent.total < 50 ? this.ringBorderWidth = 2 :
    continent.total >= 50 && continent.total < 100 ? this.ringBorderWidth = 4 :
    continent.total >= 100 && continent.total < 150 ? this.ringBorderWidth = 6 :
    continent.total >= 150 && continent.total < 200 ? this.ringBorderWidth = 8 :
    continent.total >= 200 && continent.total < 250 ? this.ringBorderWidth = 10 :
    continent.total >= 250 && continent.total < 300 ? this.ringBorderWidth = 12 :
    continent.total >= 300 && continent.total < 350 ? this.ringBorderWidth = 14 :
    continent.total >= 350 && continent.total < 400 ? this.ringBorderWidth = 16 :
    continent.total >= 400 && continent.total < 450 ? this.ringBorderWidth = 18 :
    continent.total >= 450 && continent.total < 500 ? this.ringBorderWidth = 20 : this.ringBorderWidth = 0;
  }
}