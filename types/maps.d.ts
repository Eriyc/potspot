import Mapbox from '@rnmapbox/maps';

declare module '@rnmapbox/maps' {
  export const setAccessToken: (token: string) => void;

  export class UserLocation extends Mapbox.MapboxGL.UserLocation {}
  export class MapView extends Mapbox.MapboxGL.MapView {}
  export class ShapeSource extends Mapbox.MapboxGL.ShapeSource {}
  export class RasterSource extends Mapbox.MapboxGL.RasterSource {}
  export class Camera extends Mapbox.MapboxGL.Camera {}
  export class MarkerView extends Mapbox.MapboxGL.MarkerView {}
  export class RasterLayer extends Mapbox.MapboxGL.RasterLayer {}
  export class SymbolLayer extends Mapbox.MapboxGL.SymbolLayer {}
  export class PointAnnotation extends Mapbox.MapboxGL.PointAnnotation {}
  export enum StyleURL {
    Street = 'mapbox://styles/mapbox/streets-v11',
    Dark = 'mapbox://styles/mapbox/dark-v10',
    Light = 'mapbox://styles/mapbox/light-v10',
    Outdoors = 'mapbox://styles/mapbox/outdoors-v11',
    Satellite = 'mapbox://styles/mapbox/satellite-v9',
    SatelliteStreet = 'mapbox://styles/mapbox/satellite-streets-v11',
    TrafficDay = 'mapbox://styles/mapbox/navigation-preview-day-v4',
    TrafficNight = 'mapbox://styles/mapbox/navigation-preview-night-v4',
  }
}
