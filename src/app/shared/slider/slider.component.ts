import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import gsap from "gsap";
import * as $ from "jquery";
type SliderConfig = {
  items?: any[];
  interval?: number;
  activeElement?: any;
  isPaused?: boolean;
  isSliding?: boolean;
};

@Component({
  selector: "jf-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"],
})
export class SliderComponent implements OnInit {
  @Input() images: string[] = [
    "https://picsum.photos/id/",
    "https://picsum.photos/id/",
    "https://picsum.photos/id/",
    "https://picsum.photos/id/",
    "https://picsum.photos/id/",
    "https://picsum.photos/id/",
    "https://picsum.photos/id/",
    "https://picsum.photos/id/",
    "https://picsum.photos/id/",
  ].map((img, i) => `${img}/${i * 10}/760`);
  @Input() data: any[];
  @Input() config: SliderConfig;
  @ViewChild("slider", { static: true }) element: ElementRef;
  @ViewChild("indicators", { static: true }) indicatorsElement: ElementRef;

  items: any[];
  interval: number;
  activeElement: any;
  isPaused: boolean;
  isSliding: boolean;
  currentSlideIndex: number;

  constructor() { }

  ngOnInit(): void {
    this.currentSlideIndex = 0;
    $("#controls-list")
      .find("li")
      .eq(0)
      .addClass("active")
    this.initControls();
  }

  next() {
    this.slideTo(this.currentSlideIndex + 1);
  }

  slideTo(idx?) {
    this.currentSlideIndex = idx;
  }

  initControls() {
    $(".controls-list li").click(function () {
      var delay = 0.05,
        init = 1;
      var li_ind = $(this).index();
      var li_ind_prev = $(".active").index();
      var li_length = $(this).length;
      var li_diff = li_ind - $(".active").index();
      var dur = Math.abs(li_diff);
      var left_pos = $(this).position().left + 7;
      $("#from-move").css({ left: left_pos });

      if (li_diff > 0) {
        for (let i = li_ind_prev; i < li_ind; i++) {
          dur = delay * init;
          $("#controls-list")
            .find("li")
            .eq(i)
            .addClass("animate-right")
            .css({ "animation-delay": dur + "s" });
          init = init + 1;
        }
      } else {
        for (let i = li_ind_prev; i > li_ind; i--) {
          dur = delay * init;
          $("#controls-list")
            .find("li")
            .eq(i)
            .addClass("animate-left")
            .css({ "animation-delay": dur + "s" });
          init = init + 1;
        }
      }
      $("#from-move").addClass("animate");

      $("#controls-list li").removeClass("active");
      $(this).addClass("active");

      $("#from-move").bind(
        "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function () {
          $("#from-move").removeClass("animate");
          $("#from-move").unbind(
            "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend"
          );
        }
      );
      $(".controls-list li").bind(
        "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
        function () {
          $(".controls-list li")
            .removeClass("animate-right")
            .removeAttr("style");
          $(".controls-list li")
            .removeClass("animate-left")
            .removeAttr("style");
          $("#controls-list li").unbind(
            "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd"
          );
        }
      );
    });
  }
}
