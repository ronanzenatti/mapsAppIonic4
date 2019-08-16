import { Component, OnInit } from '@angular/core';

// Importa componentes para orientação do Usuário.
import {
  ToastController,
  LoadingController
} from '@ionic/angular';

// Importa o Geolocation do Ionic
import { Geolocation } from '@ionic-native/geolocation/ngx';

// Importa o Google Maps
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  Environment
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  map: GoogleMap;

  constructor(private geolocation: Geolocation) { }

  ionViewDidEnter() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude, ' - ', resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {

      console.log('2 - ', data);
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }

  async ngOnInit() {
    await this.loadMap();
  }

  loadMap() {

    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyDk2yGynZbb14iz3XEefAou-Y5FJBSQN2o',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyDk2yGynZbb14iz3XEefAou-Y5FJBSQN2o'
    });

    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: -22.6249805,
          lng: -48.792351
        },
        zoom: 18,
        tilt: 30
      }
    });

  }
}
