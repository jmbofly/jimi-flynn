import { Injectable } from '@angular/core';
import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { Draggable } from "gsap/Draggable";
import { EaselPlugin } from "gsap/EaselPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as d3 from "d3";
gsap.registerPlugin(CSSRulePlugin, Draggable, EaselPlugin, MotionPathPlugin, TextPlugin, ScrollToPlugin, ScrollTrigger);

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  GSAP = gsap;
  text = TextPlugin;
  utils = gsap.utils;

  D3 = d3;
  constructor() { }

  to(targets: gsap.DOMTarget, vars: gsap.AnimationVars) {
    return gsap.to(targets, vars);
  }

  from(targets: gsap.DOMTarget, vars: gsap.AnimationVars) {
    return gsap.from(targets, vars);
  }

  fromTo(targets: gsap.DOMTarget, fromVars: gsap.AnimationVars, toVars: gsap.AnimationVars) {
    return gsap.fromTo(targets, fromVars, toVars);
  }

  timeline(vars?: gsap.AnimationVars) {
    return gsap.timeline(vars ? vars:{ease: 'linear'})
  }

}
