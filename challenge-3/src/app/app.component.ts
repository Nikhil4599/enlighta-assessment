import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public isLoading = false;
  public cityName = "";
  public weatherDetails: any;

  constructor(private http: HttpClient) { }

  ngOnInit() { }


  public async getWeatherDetails() {
    this.isLoading = true;
    const response = await this.getHttpCall(`https://geocode.maps.co/search?q=${this.cityName}&api_key=65ba2165024d5660860737spwaae037`);
    const cityData = this.getCityData(response);
    const lon = cityData.lon, lat = cityData.lat;
    await this.getWeatherData(lon, lat)

    this.isLoading = false;
  }

  public getCityData(response: any) {
    const cityData = response.find((res: any) => res.type === 'city');
    if (cityData) {
      return cityData;
    } else {
      alert("Invalid city name please try again");
    }
  }

  public async getWeatherData(lon: any, lat: any) {
    const response: any = await this.getHttpCall(`https://api.weatherapi.com/v1/current.json?key=e53d5c7d88754035aca63021240202&q=${lat},${lon}`);
    console.log("weather: ", response.current);
    this.weatherDetails = response.current;
  }

  public async getHttpCall(api: string) {
    return firstValueFrom(this.http.get(api));
  }
}
