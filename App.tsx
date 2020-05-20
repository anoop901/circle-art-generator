import * as React from "react";
import MandalaCanvas from "./MandalaCanvas";
import Mandala from "./Mandala";
import MandalaSettings from "./MandalaSettings";
import { List } from "immutable";
import { Container, Grid, Paper } from "@material-ui/core";

export default function App() {
  const [mandala, setMandala] = React.useState<Mandala>({
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
