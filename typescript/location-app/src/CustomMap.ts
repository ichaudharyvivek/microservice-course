export interface Mappable {
  markerContent(): string;
  location: {
    lat: number;
    lng: number;
  };
}

export class CustomMap {
  private googleMap: google.maps.Map | null;
  private div_id: string;

  constructor(div_id: string) {
    this.div_id = div_id;
    this.googleMap = null;
  }

  async initMap(): Promise<void> {
    // Request needed libraries
    // @ts-ignore
    const { Map } = await google.maps.importLibrary('maps');
    this.googleMap = new Map(document.getElementById(this.div_id), {
      zoom: 4,
      center: { lat: 0, lng: 0 },
    });
  }

  async addMarker(mappable: Mappable): Promise<void> {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });

    const infoWindow = new google.maps.InfoWindow({
      content: mappable.markerContent(),
      ariaLabel: mappable.markerContent(),
    });

    marker.addListener('click', () => {
      infoWindow.open({
        anchor: marker,
        map: this.googleMap,
      });
    });
  }

  // ====================
  // OLD CODE
  // ====================
  //   async addCompanyMarker(company: Company) {
  //     // Request needed libraries
  //     // @ts-ignore
  //     const { Marker } = await google.maps.importLibrary('marker');
  //     new Marker({
  //       map: this.googleMap,
  //       position: {
  //         lat: company.location.lat,
  //         lng: company.location.lng,
  //       },
  //     });
  //   }
}
