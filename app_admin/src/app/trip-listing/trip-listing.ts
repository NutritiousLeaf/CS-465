import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data';
import { TripCardComponent } from '../trip-card/trip-card';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.html',
  styleUrls: ['./trip-listing.css']
})
export class TripListing implements OnInit {
  trips: Trip[] = [];
  message: string = '';

  constructor(
    private tripService: TripDataService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.tripService.getTrips().subscribe({
      next: (value: Trip[]) => {
        this.trips = value;
        this.message = value.length > 0
          ? 'Found ' + value.length + ' trips'
          : 'No trips found';

        console.log('Trips loaded:', this.trips);
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        this.message = 'Error retrieving trips';
        console.log(error);
        this.cdr.detectChanges();
      }
    });
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }
}
