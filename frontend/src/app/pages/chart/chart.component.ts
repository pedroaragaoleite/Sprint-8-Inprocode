import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartType } from 'chart.js/auto';
import { DatabaseService } from '../../services/database/database.service';
import { EventsData } from '../../interfaces/events-data';



@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {
  eventsResults: EventsData[] = [];
  // labelData: any;
  // realData: any;
  // colorData: any;
  kms: any;
  months: any;
  monthsNames: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  typeRunsData: any;
  runs: any;


  public chart!: Chart;
  public kmsChart!: Chart;

  // public chartType: ChartType = 'bar';


  constructor(private dbService: DatabaseService) {

  }

  ngOnInit(): void {
    this.getdata();
    // this.getNumberTypeRuns();
    // this.getKmMonth(this.eventsResults);
  }

  
  getdata(): void {
    this.dbService.getEvents()
      .subscribe((events: EventsData[]) => {
        this.eventsResults = events;
        this.getTypeRuns(events);
        this.getKmMonth(events);
      })

  }

  getMonths(dateString: string): number {
    const date = new Date(dateString);

    const month = date.getMonth() + 1;
    // console.log(month);
    return month
  }

  generateColors(count: number, alpha:number) {
    const colors = [];
    for(let i = 0; i < count; i++ ) {
      const red = (i * 50) % 255;
      const green = (i * 100) % 255;
      const blue = (i * 150) % 255;
      colors.push(`rgb(${red}, ${green}, ${blue}, ${alpha})`);
    }
    return colors;
  }

  getTypeRuns(events:any): void {
    const typeRuns: { [key: string]: number} = {};

    events.forEach((event: any) => {
      if(!typeRuns[event.type]) {
        typeRuns[event.type] = 1;
      }
      typeRuns[event.type] ++;
    })

    this.runs = Object.keys(typeRuns);
    this.typeRunsData = Object.values(typeRuns);
    this.renderChart();
  }

  getKmMonth(events: any): void {
    const distanceMonthly: { [key: string]: number } = {};

    events.forEach((event: any) => {
      let month: any = this.getMonths(event.start);
      if (!distanceMonthly[month]) {
        distanceMonthly[month] = 0;
      };
      distanceMonthly[month] += Number(event.distance);
    });

    this.months = Object.keys(distanceMonthly);
    this.kms = Object.values(distanceMonthly);
    this.renderChartKms();
  }

 

  renderChartKms() {
    const color = this.generateColors(this.kms.length, 0.9);

    new Chart('kmsChart', {
      type: 'line',
      data: {
        labels: this.monthsNames,
        datasets: [{
          label: "Km's per month",
          data: this.kms,
          backgroundColor: color
        }]
      }
    })
  }


  renderChart() {
    const color = this.generateColors(this.runs.length, 0.9);
    console.log(this.runs);
    

    new Chart('chart', {
      type: 'bar',
      data: {
        labels: this.runs,
        datasets: [{
          label: 'Number of type of runs in total runs',
          data: this.typeRunsData,
          backgroundColor: color
        }]
      }
    })
  }


}
