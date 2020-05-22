import * as React from "react";
import {
  Slider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Grid,
  ListItemSecondaryAction,
  IconButton,
  Button,
  InputLabel,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Mandala from "./Mandala";
import { setIn, removeIn, update } from "immutable";

interface P {
  mandala: Mandala;
  setMandala: (newValue: Mandala) => void;
}

export default function MandalaSettings(props: P) {
  const [currentLayerIdx, setCurrentLayerIdx] = React.useState(0);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Paper>
          <List>
            {props.mandala.layers.map((layer, i) => (
              <ListItem
                key={i}
                button
                selected={i === currentLayerIdx}
                onClick={() => {
                  setCurrentLayerIdx(i);
                }}
              >
                <ListItemText>Layer #{i + 1}</ListItemText>
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    disabled={props.mandala.layers.size == 1}
                    onClick={() => {
                      if (currentLayerIdx == props.mandala.layers.size - 1) {
                        setCurrentLayerIdx(props.mandala.layers.size - 2);
                      }
                      props.setMandala(removeIn(props.mandala, ["layers", i]));
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={() => {
            props.setMandala(
              update(props.mandala, "layers", (prevLayers) =>
                prevLayers.push({
                  color: "red",
                  distanceFromCenter: 107,
                  numberOfCircles: 12,
                  radius: 25,
                  phase: 0,
                })
              )
            );
            setCurrentLayerIdx(props.mandala.layers.size);
          }}
        >
          Add layer
        </Button>
      </Grid>
      <Grid item>
        <InputLabel>Distance to center</InputLabel>
        <Slider
          value={props.mandala.layers.get(currentLayerIdx)!.distanceFromCenter}
          onChange={(event, newValueOrList) => {
            const newValue = newValueOrList as number;
            props.setMandala(
              setIn(
                props.mandala,
                ["layers", currentLayerIdx, "distanceFromCenter"],
                newValue
              )
            );
          }}
          min={0}
          max={300}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item>
        <InputLabel>Number of circles</InputLabel>
        <Slider
          value={props.mandala.layers.get(currentLayerIdx)!.numberOfCircles}
          onChange={(event, newValueOrList) => {
            const newValue = newValueOrList as number;
            props.setMandala(
              setIn(
                props.mandala,
                ["layers", currentLayerIdx, "numberOfCircles"],
                newValue
              )
            );
          }}
          min={1}
          max={50}
          marks
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item>
        <InputLabel>Radius of circles</InputLabel>
        <Slider
          value={props.mandala.layers.get(currentLayerIdx)!.radius}
          onChange={(event, newValueOrList) => {
            const newValue = newValueOrList as number;
            props.setMandala(
              setIn(
                props.mandala,
                ["layers", currentLayerIdx, "radius"],
                newValue
              )
            );
          }}
          min={0}
          max={100}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item>
        <InputLabel>Phase</InputLabel>
        <Slider
          value={props.mandala.layers.get(currentLayerIdx)!.phase}
          onChange={(event, newValueOrList) => {
            const newValue = newValueOrList as number;
            props.setMandala(
              setIn(
                props.mandala,
                ["layers", currentLayerIdx, "phase"],
                newValue
              )
            );
          }}
          min={0}
          max={1}
          step={0.01}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item>
        <TextField
          label="Color"
          value={props.mandala.layers.get(currentLayerIdx)!.color}
          onChange={(event) => {
            const newValue = event.target.value;
            props.setMandala(
              setIn(
                props.mandala,
                ["layers", currentLayerIdx, "color"],
                newValue
              )
            );
          }}
        ></TextField>
      </Grid>
    </Grid>
  );
}
