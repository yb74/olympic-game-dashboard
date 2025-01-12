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
    const colors = ["blue", "yellow", "black", "green", "red"];
    const positions = [
      { x: 50, y: 50 },  // 1st ring
      { x: 125, y: 150 }, // 2nd ring
      { x: 200, y: 50 },  // 3rd ring
      { x: 275, y: 150 }, // 4th ring
      { x: 350, y: 50 }   // 5th ring
    ];
  
    // Order continents by descendant order of number of medals
    const sortedContinents = continents.sort((a, b) => b.total - a.total);
  
    this.setHighestTotalMedals(sortedContinents);
  
    for (let i = 0; i < sortedContinents.length; i++) {
      this.setRingBorderSize(sortedContinents[i]);
  
      const continent: ContinentObj = {
        name: sortedContinents[i].name,
        medal: {
          gold: {
            medalNumberPerGrade: sortedContinents[i].gold,
            medalColor: "gold"
          },
          silver: {
            medalNumberPerGrade: sortedContinents[i].silver,
            medalColor: "silver"
          },
          bronze: {
            medalNumberPerGrade: sortedContinents[i].bronze,
            medalColor: "brown"
          },
          totalMedals: sortedContinents[i].total
        },
        color: colors[i],
        ringBorderSize: this.ringBorderWidth,
        positionX: positions[i].x,
        positionY: positions[i].y
      };
  
      this.configuredContinents.push(continent);
    }
  };
  
  

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