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
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Mandala, { MandalaLayer } from "../model/Mandala";
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
        <Grid container>
          <Grid item>
            <FormControl>
              <InputLabel>Layer</InputLabel>
              <Select value={currentLayerIdx}>
                {props.mandala.layers.map((layer, i) => (
                  <MenuItem
                    key={i}
                    value={i}
                    onClick={() => {
                      setCurrentLayerIdx(i);
                    }}
                  >
                    Layer #{i + 1}
                    {/* <ListItemSecondaryAction>
                  </ListItemSecondaryAction> */}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => {
                const outermostLayer = getOutermostLayer(props.mandala);
                const newLayer: MandalaLayer = {
                  numberOfCircles: outermostLayer.numberOfCircles,
                  distanceFromCenter: Math.floor(
                    outermostLayer.distanceFromCenter * 0.9 + 500 * 0.1
                  ),
                  radius: Math.ceil(outermostLayer.radius * 0.9),
                  phase: (outermostLayer.phase + 0.5) % 1.0,
                  color: `hsl(${props.mandala.layers.size * 60},100%,50%)`,
                };
                console.log(newLayer);
                props.setMandala(
                  update(props.mandala, "layers", (prevLayers) =>
                    prevLayers.push(newLayer)
                  )
                );
                setCurrentLayerIdx(props.mandala.layers.size);
              }}
            >
              <AddIcon></AddIcon>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              edge="end"
              disabled={props.mandala.layers.size == 1}
              onClick={() => {
                if (currentLayerIdx == props.mandala.layers.size - 1) {
                  setCurrentLayerIdx(props.mandala.layers.size - 2);
                }
                props.setMandala(
                  removeIn(props.mandala, ["layers", currentLayerIdx])
                );
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item></Grid>
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
          min={1}
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

function getOutermostLayer(mandala: Mandala): MandalaLayer {
  let outermostLayer = mandala.layers.get(0)!;
  for (const layer of mandala.layers) {
    if (layer.distanceFromCenter > outermostLayer.distanceFromCenter) {
      outermostLayer = layer;
    }
  }
  return outermostLayer;
}
