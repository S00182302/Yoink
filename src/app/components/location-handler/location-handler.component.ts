import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-location-handler',
  templateUrl: './location-handler.component.html',
  styleUrls: ['./location-handler.component.scss']
})
export class LocationHandlerComponent implements OnInit {
  locations = [
    {
      id: 2,
      location: 'Antrim'
    },
    {
      id: 3,
      location: 'Armagh'
    },
    {
      id: 4,
      location: 'Carlow'
    },
    {
      id: 5,
      location: 'Cavan'
    },
    {
      id: 6,
      location: 'Clare'
    },
    {
      id: 7,
      location: 'Cork'
    },
    {
      id: 8,
      location: 'Derry'
    },
    {
      id: 9,
      location: 'Donegal'
    },
    {
      id: 10,
      location: 'Down'
    },
    {
      id: 11,
      location: 'Dublin'
    },
    {
      id: 12,
      location: 'Fermanagh'
    },
    {
      id: 13,
      location: 'Galway'
    },
    {
      id: 14,
      location: 'Kerry'
    },
    {
      id: 15,
      location: 'Kildare'
    },
    {
      id: 16,
      location: 'Kilkenny'
    },
    {
      id: 17,
      location: 'Laois'
    },
    {
      id: 18,
      location: 'Leitrim'
    },
    {
      id: 19,
      location: 'Limerick'
    },
    {
      id: 20,
      location: 'Longford'
    },
    {
      id: 21,
      location: 'Louth'
    },
    {
      id: 22,
      location: 'Mayo'
    },
    {
      id: 23,
      location: 'Meath'
    },
    {
      id: 24,
      location: 'Monaghan'
    },
    {
      id: 25,
      location: 'Offaly'
    },
    {
      id: 26,
      location: 'Roscommon'
    },
    {
      id: 27,
      location: 'Sligo'
    },
    {
      id: 28,
      location: 'Tipperary'
    },
    {
      id: 29,
      location: 'Tyrone'
    },
    {
      id: 30,
      location: 'Westmeath'
    },
    {
      id: 31,
      location: 'Wexford'
    },
    {
      id: 32,
      location: 'Wicklow'
    }
  ];
  @Output() locationEmitter: EventEmitter<string>;
  location: string;

  constructor(private modalController: ModalController) {}

  handleLocation = e => {
    this.location = e.value;
  };

  emitLocation = () => {
    this.locationEmitter.emit(this.location);
  };

  dismiss = () => {
    this.modalController.dismiss(this.location);
  };

  ngOnInit() {}
}
