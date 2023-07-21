"use client";
import Mandala from "@/model/Mandala";
import MandalaCanvas from "@/components/MandalaCanvas";
import MandalaSettings from "@/components/MandalaSettings";
import { List } from "immutable";
import { useState } from "react";

export default function Home() {
  const [mandala, setMandala] = useState<Mandala>({
    layers: List([
      {
        color: "#ffffff",
        distanceFromCenter: 0,
        numberOfCircles: 1,
        radius: 70,
        phase: 0,
      },
      {
        color: "#f44e3b",
        distanceFromCenter: 107,
        numberOfCircles: 12,
        radius: 25,
        phase: 0,
      },
    ]),
    center: { x: 250, y: 250 },
  });
  return (
    <div className="flex flex-col py-5 gap-5">
      <h1 className="text-3xl text-center font-bold">Circle Art Generator</h1>
      <p className="text-center max-w-xl self-center">
        This tool lets you create a circle-based pattern composed of multiple
        layers. Each layer is a set of circles arranged around the center. You
        can customize each layer using the sliders, and add more layers.
      </p>
      <div className="flex gap-10 flex-wrap justify-center">
        <MandalaCanvas mandala={mandala}></MandalaCanvas>
        <MandalaSettings
          mandala={mandala}
          setMandala={setMandala}
        ></MandalaSettings>
      </div>
    </div>
  );
}
