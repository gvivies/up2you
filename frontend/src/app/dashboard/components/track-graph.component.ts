import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Place, Track} from '../../core/generated/model';
import * as d3 from 'd3';

@Component({
  selector: 'app-track-graph',
  templateUrl: './track-graph.component.html',
  styleUrls: ['./track-graph.component.scss']
})
export class TrackGraphComponent implements OnInit, AfterViewInit {

  @Input() track: Track;

  private readonly BORDER = 2;
  private readonly PADDING = 4;
  private readonly NORMAL_COLOR = '#f5f5f5';
  private readonly HIGHLIGHT_COLOR = '#3bf945';
  private readonly HIGHLIGHT_BORDER_WIDTH = '4';
  private readonly TEXT_COLOR = '#000000';
  private readonly HIGHLIGHT_TEXT_COLOR = '#000000';

  private trackId: string;
  private canvas: any;
  private sizeOfPads: number;
  private left: number;

  constructor() { }

  ngOnInit() {
    this.trackId = 'track-' + this.track.id;
    this.sizeOfPads = (window.innerWidth * .9) / this.track.places.length;
    this.left = this.sizeOfPads * .1;
  }

  ngAfterViewInit() {
    this.canvas = d3.select('#' + this.trackId)
      .select('svg')
      .attr('height', this.sizeOfPads);
    this.initAllSvgDefs();
  }

  private normalize(name: string): string {
    return name.replace(' ', '').toLowerCase();
  }

  private initAllSvgDefs() {
    this.track.places.forEach((p, idx) => this.definePlayerPicture(p, idx));
    this.track.places.forEach((p, idx) => this.displayPlayer(p, idx));
  }

  private definePlayerPicture(place: Place, index: number) {
    const svgPatternId = this.normalize(place.player.name);
    const defs = this.canvas.append('svg:pattern')
      .attr('id', svgPatternId)
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', this.sizeOfPads)
      .attr('height', this.sizeOfPads)
      .attr('padding-left', 10)
      .append('svg:image')
      .attr('xlink:href', 'assets/img/' + place.player.picture)
      .attr('width', this.sizeOfPads)
      .attr('height', this.sizeOfPads)
      .attr('x', this.sizeOfPads * .1)
      .attr('y', this.sizeOfPads * .1);
  }

  private displayPlayer(place: Place, index: number) {
    const svgPatternId = this.normalize(place.player.name);
    const dragHandler = d3.drag()
      .on('drag', () => {
        d3.select('#player-' + place.player.id)
          .attr('x', d3.event.x)
          .attr('y', d3.event.y);
      });
    this.displayPlayerName(place.player.name, index);

    /*
    if (this.currentlyActive(place)) {
      this.buildCursorBasement(index);
    }
    */

    const fillValueWithPlayerPicture = 'url(#' + svgPatternId + ')';
    this.canvas
      .append('circle')
      .style('stroke-width', this.HIGHLIGHT_BORDER_WIDTH)
      .style('stroke', (this.currentlyActive(place)) ? this.HIGHLIGHT_COLOR : this.NORMAL_COLOR)
      .style('fill', fillValueWithPlayerPicture)
      .attr('id', '#player-' + place.player.id)
      .attr('cx', this.calculateXPosition(index))
      .attr('cy', '60%')
      .attr('r', this.sizeOfPads * .4);
  }

  private displayPlayerName(name: string, index: number) {
    this.canvas.append('text')
      .text(name)
      .attr('fill', '#000000')
      .attr('x', 20 + index * this.sizeOfPads)
      .attr('y', 30)
      .style('font-size', '1.2rem');
  }

  private calculateXPosition(index: number) {
    const firstOffset = this.sizeOfPads * .6;
    return firstOffset + (this.sizeOfPads * index);
  }

  private currentlyActive(place: Place): boolean {
    return this.track.currentPosition === place.position;
  }
}

