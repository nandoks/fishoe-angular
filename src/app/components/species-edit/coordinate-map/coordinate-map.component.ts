import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Coordinate } from '../../../models/coordinates';
import * as L from 'leaflet';

const icon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

@Component({
  selector: 'app-coordinate-map',
  imports: [],
  templateUrl: './coordinate-map.component.html',
  styleUrl: './coordinate-map.component.scss'
})
export class CoordinateMapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() coordinates: Coordinate[] = [];

  private map: L.Map | undefined;
  private markerLayer: L.LayerGroup = L.layerGroup();

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      setTimeout(() => this.initMap(), 50);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['coordinates'] && this.map) {
      this.updateMarkers();
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private initMap(): void {
    const el = document.getElementById('coordinate-map');
    if (!el || el.clientWidth === 0) {
      setTimeout(() => this.initMap(), 100);
      return;
    }

    this.map = L.map('coordinate-map', {
      center: [18.2208, -66.5901],
      zoom: 8,
    });

    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    });
    tileLayer.addTo(this.map);
    tileLayer.on('tileerror', (e: any) => {
      console.error('Tile failed to load:', e);
    });

    this.markerLayer.addTo(this.map);
    this.updateMarkers();

    setTimeout(() => this.map?.invalidateSize(), 100);
  }

  private updateMarkers(): void {
    if (!this.map) return;

    this.markerLayer.clearLayers();

    if (this.coordinates.length === 0) return;

    const bounds = L.latLngBounds(
      [this.coordinates[0].latitude, this.coordinates[0].longitude],
      [this.coordinates[0].latitude, this.coordinates[0].longitude]
    );

    for (const coord of this.coordinates) {
      const latlng: L.LatLngExpression = [coord.latitude, coord.longitude];
      this.markerLayer.addLayer(L.marker(latlng, { icon }));
      bounds.extend(latlng);
    }

    this.map.fitBounds(bounds, { padding: [30, 30], maxZoom: 15 });
  }
}
