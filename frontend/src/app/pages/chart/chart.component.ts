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
export class ChartComponent implements OnInit{
  eventsResults: EventsData[] = [];
  labelData: any;
  realData: any;
  colorData: any;

  public chart!: Chart;

  public chartType: ChartType = 'bar';


constructor(private dbService: DatabaseService) {

}

  ngOnInit(): void {
this.getdata();
    
  }

  getdata():void {

    this.dbService.getEvents()
    .subscribe((events: EventsData[]) => {
      this.eventsResults = events;
      if(this.eventsResults !== null) {
      // console.log(this.eventsResults)
       this.realData = this.eventsResults.reduce((acc, value) => {

        if(acc[value.route_type]) {
          acc[value.route_type] ++;
        } else {
          acc[value.route_type] = 1;
          this.labelData.push(value.route_type)
        }
        console.log(acc);
        
        return acc;
       }, {} as {[ eventType: string]: number})

      } 
      this.renderChart(this.realData)
      
    })
  console.log(this.realData);

  }

  renderChart(realData:any) {
    const newChart = new Chart('chart', {
      type: 'bar',
      data: {
        labels: this.labelData,
        datasets: [{
          data: this.realData
        }]
      }
    })

  }
  

}
