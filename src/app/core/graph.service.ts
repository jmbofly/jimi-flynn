import { Injectable } from '@angular/core';
import * as d3 from "d3";
import { Simulation } from 'd3';


export interface GraphConfig {
  container?: Selection | any;
  width?: number;
  height?: number;
  nodes?: any[],
  links?: any[],
  scale?: number;
  center?: number[];
  rescale?: boolean;
  svg?: Selection | any;
  node?: Selection | any;
  simulation?: any;
  tick?: () => void;
}
@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor() { }
  /**d3 graph layout
 * @arg d3 default d3 module
  */
  createGraph(el, config: GraphConfig) {
    const attributs = {};
    for (let i in config) {
      attributs[i] = config[i];
    }
    console.log(attributs)
  }
}
