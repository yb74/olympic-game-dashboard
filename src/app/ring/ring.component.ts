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

  continents: ContinentApiData[] = [];
  configuredContinents: ContinentObj[] = [];
  ringBorderWidth: number = 0;
  highestTotalMedals: number = 0;

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

    /*
    stocking highest total medals among all continents in this.highestTotalMedals variable
    */
    this.setHighestTotalMedals(continents);

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

  sortFromMinToMax = (numbersToSort: number[]) => {
    numbersToSort.sort((a, b) => a-b);
  }

  /**
   * function to determine ring border size
   * to do so, the total number of medals is divided by the highest one and multiply by the max pixel size we want
   * @param continent 
   */
  setRingBorderSize = (continent: ContinentApiData) => {
    this.ringBorderWidth = Math.ceil(continent.total / this.highestTotalMedals * 30);
  }

  /**
   * this function store highest total medals in highestTotalMedals variable
   * the array of continents is cloned before sorting its values to avoid affecting the original array
   * 
   * @param continents
   */
  private setHighestTotalMedals(continents: ContinentApiData[]) {
    const totalMedalsOfContinents = continents.map(continent => continent.total);
    const totalMedalsGapClone = [...totalMedalsOfContinents];

    this.sortFromMinToMax(totalMedalsGapClone);

    this.highestTotalMedals = totalMedalsGapClone[totalMedalsGapClone.length - 1];
  }
}