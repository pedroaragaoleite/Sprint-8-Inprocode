import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartType } from 'chart.js/auto';
import { DatabaseService } from '../../services/database/database.service';
import { map } from 'rxjs';
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
  labelData: any;
  realData: any;
  colorData: any;
  kms: any;
  months: any;

  public chart!: Chart;
  public kmsChart!: Chart;

  public chartType: ChartType = 'bar';


  constructor(private dbService: DatabaseService) {

  }

  ngOnInit(): void {
    this.getdata();
    // this.getNumberTypeRuns();
    // this.getKmMonth(this.eventsResults);
  }

  getMonths(dateString: string): number {
    const date = new Date(dateString);

    const month = date.getMonth() + 1;
    // console.log(month);
    return month

  }

  getNumberTypeRuns(results: any) {
    // console.log(results);
    if (results !== null) {
      this.realData = this.eventsResults.reduce((acc, value) => {

        if (acc[value.type]) {
          acc[value.type]++;
          // console.log(acc[value.type]);

        } else {
          acc[value.type] = 1;
          // this.labelData.push(value.route_type)
        }
        // console.log(acc);

        return acc;
      }, {} as { [eventType: string]: number })
      this.renderChart(this.realData)
    }

  }

  getKmMonth(events: any): void {
    console.log(events);

    // const eventsArray = Object.values(events);
    // console.log(events);
    const distanceMonthly: { [key: string]: number } = {};

    events.forEach((event: any) => {
      let month: any = this.getMonths(event.start);
      if (!distanceMonthly[month]) {
        distanceMonthly[month] = 0;
      };
      console.log(distanceMonthly[month]);

      distanceMonthly[month] += Number(event.distance);

    });

    // console.log(distanceMonthly);

    this.months = Object.keys(distanceMonthly); // Stores months
    this.kms = Object.values(distanceMonthly); // Stores corresponding distances
    this.renderChartKms();
  }

  renderChartKms() {
    console.log(this.months);
    console.log(this.kms);

    const newChart = new Chart('kmsChart', {
      type: 'line',
      data: {
        labels: this.months,
        datasets: [{
          label: "Km's per month",
          data: this.kms
        }]
      }
    })
  }

  getdata(): void {
    this.dbService.getEvents()
      .subscribe((events: EventsData[]) => {
        this.eventsResults = events;
        this.getNumberTypeRuns(events);
        this.getKmMonth(this.eventsResults);
      })

  }

  renderChart(realData: any) {
    const newChart = new Chart('chart', {
      type: 'bar',
      data: {
        labels: this.labelData,
        datasets: [{
          label: 'Number of type of runs in total runs',
          data: this.realData
        }]
      }
    })

  }


}
