"use client";
import Mandala from "@/model/Mandala";
import MandalaCanvas from "@/components/MandalaCanvas";
import MandalaSettings from "@/components/MandalaSettings";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { List } from "immutable";
import { useState } from "react";

export default function Home() {
  const [mandala, setMandala] = useState<Mandala>({
    layers: List([
      {
        color: "white",
        distanceFromCenter: 0,
        numberOfCircles: 1,
        radius: 70,
        phase: 0,
      },
      {
        color: "red",
        distanceFromCenter: 107,
        numberOfCircles: 12,
        radius: 25,
        phase: 0,
      },
    ]),
    center: { x: 250, y: 250 },
  });
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={9}>
          <MandalaCanvas mandala={mandala}></MandalaCanvas>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MandalaSettings
            mandala={mandala}
            setMandala={setMandala}
          ></MandalaSettings>
        </Grid>
      </Grid>
    </Container>
  );
}
